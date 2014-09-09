/* global angular */
/* global glicko2 */
'use strict';

console.log('\'Allo \'Allo! app.js');

var settings = {
    // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
    //      be tested to decide which value results in greatest predictive accuracy."
    tau : 0.5,
    // rating : default rating
    rating : 1500,
    //rd : Default rating deviation
    //     small number = good confidence on the rating accuracy
    rd : 200,
    //vol : Default volatility (expected fluctation on the player rating)
    vol : 0.06
};
var ranking = new glicko2.Glicko2(settings);

var priorizeApp = angular.module('priorizeApp', []);

priorizeApp.controller('ItemCtrl', function ($scope) {
    var index = 0;
    $scope.items = [];

    $scope.orderProp = '-player.getRating()';
    // $scope.orderProp = 'wins';

    $scope.itemText = '';

    $scope.addItem = function() {
        if($scope.itemText === ''){ return; }
        $scope.items.push({index: index++, text:$scope.itemText, player: ranking.makePlayer(), wins: 0, loses: 0});
        $scope.itemText = '';
    };

    $scope.removeItem = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.player1 = null;
    $scope.player2 = null;

    // torneio: conjunto de batalhas (atualmente: n x n)
    var tournament = [];
    // batalha: 1x1 com resultado 1 ou 0 (ganha ou perde)
    var matches = []; // resultados das batalhas (escolhas de quem vence)

    var newTournament = function() {
        console.log('CREATING new tournament...');
        tournament = []; // reset tournament
        matches = []; // reset battles

        for(var i=0; i < $scope.items.length; i++){
            for(var j=i+1; j < $scope.items.length; j++){
                if(i === j ) { continue; } // no battle with himself
                tournament.push({
                    p1: $scope.items[i],
                    p2: $scope.items[j]
                });
            }
        }
        console.log('CREATED new tournament.');

        newBattle();
    };
    $scope.newTournament = newTournament;

    var newBattle = function() {
        if(tournament.length === 0){
            console.log('No more battles in this tournament. Please, create a new tournament.');

            if(matches.length > 0){
                console.log('Tournament finished. Ranking...');
                unsetPlayers();
                console.log('matches', matches);
                ranking.updateRatings(matches);
            }
            return;
        }

        console.log('CREATING new battle...');
        var players = tournament.pop();

        $scope.player1 = players.p1;
        $scope.player2 = players.p2;
        console.log('Conflict: [' + $scope.player1.text + '] x ['+ $scope.player2.text + ']');

        console.log('CREATED new battle.');
    };
    $scope.newBattle = newBattle;

    var unsetPlayers = function(){
        $scope.player1 = null;
        $scope.player2 = null;
    };


    $scope.win = function(player) {
        console.log('winner: ', player.text);
        var result = 0.5;

        if($scope.player1 === player){
            $scope.player1.wins++;
            $scope.player2.loses++;
            result = 1;
        }else{
            $scope.player1.loses++;
            $scope.player2.wins++;
            result = 0;
        }

        matches.push([$scope.player1.player, $scope.player2.player, result]);
        newBattle();
    };
});

/* global introJs */
(function(){
    'use strict';
    var intro = introJs();
    intro.setOptions({
        'nextLabel': 'Próximo',
        'prevLabel': 'Anterior',
        'skipLabel': 'Pular',
        'doneLabel': 'Fechar',
        steps: [{
            intro: '<h1>Priorize!</h1><p>A sua ferramenta de prioridades.</p>'
        }, {
            element: '#step1',
            intro: 'Informe sua tarefa aqui.'
        }, {
            element: '#step2',
            intro: 'Clique no botão "Cadastrar" para inserir sua tarefa na lista de tarefas.',
            position: 'right'
        }, {
            element: '#step3',
            intro: 'Após cadastrar todas as suas tarefas,<br/>clique no botão "Priorizar!".',
            position: 'right'
        }, {
            intro: 'Obrigado por testar a ferramenta.<br/>Visite a <a target="_blank" href="http://github.com/leonardomerlin/priorize">página no Github</a>'
        }]
    });

    intro.start();
}());


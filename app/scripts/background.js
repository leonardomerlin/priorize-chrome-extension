'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('details', details);
});

// chrome.browserAction.setBadgeText({text: 'Tasks'});

// console.log('\'Allo \'Allo! Event Page for Browser Action');

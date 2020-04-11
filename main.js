"use strict";
var DOMDay = document.querySelector("#date-day");
var DOMWeekDay = document.querySelector("#date-weekday");
var DOMMonth = document.querySelector("#date-month");
// DATUM AKTUALISIEREN
window.addEventListener("load", function updateDate() {
    var today = new Date();
    var weekdayList = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    var monthList = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    var day = today.getDate();
    var weekday = today.getDay();
    var month = today.getMonth();
    DOMDay.textContent = "" + day;
    DOMMonth.textContent = monthList[month];
    DOMWeekDay.textContent = weekdayList[weekday];
});
//INPUT + TO DO LISTE
var DOMInput = document.getElementById("listinput");
var DOMList = document.querySelector(".list");
var DOMButton = document.querySelector(".add-button");
function remInput() {
    return DOMInput.value = "";
}
function addTask() {
    var getInput = DOMInput.value;
    var html = "<li class=\"task\" >\n    <div class=\"checkbox\"></div>\n    <div class=\"task-text\"> %text% </div>\n    <div class=\"timer\">\n        <div class=\"play\"></div>\n        <div class=\"pause\"></div>\n        <div class=\"time\"> <span class=\"hour\">00</span>:<span class=\"min\">00</span>:<span class=\"sec\">00</span></div>\n    </div>\n    <div class=\"remove-task\"> <span></span> <span></span> </div>\n    </li>";
    var replacement = html.replace('%text%', getInput);
    DOMList.insertAdjacentHTML("afterbegin", replacement);
    remInput();
}
DOMButton.addEventListener('click', addTask);
DOMInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTask();
    }
});
// Abhaken
var DOMCheck = document.querySelectorAll('.checkbox');
DOMCheck.forEach(function (element) {
    element.addEventListener('click', function () {
        element.toggleAttribute('checked');
    });
});

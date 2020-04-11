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
var a = 0;
function remInput() {
    return DOMInput.value = "";
}
function addTask() {
    var getInput = DOMInput.value;
    var html = "<li class=\"task\">\n    <div class=\"checkbox\" onclick=\"check(event)\"></div>\n    <div class=\"task-text\"> %text% </div>\n    <div class=\"timer\">\n        <div class=\"play\"></div>\n        <div class=\"pause\"></div>\n        <div class=\"time\"> <span class=\"hour\">00</span>:<span class=\"min\">00</span>:<span class=\"sec\">00</span></div>\n    </div>\n    <div class=\"remove-task\" onclick=\"removeTask(event)\"> <span></span> <span></span> </div>\n    </li>";
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
//ABHAKEN
function check(event) {
    if (event.target.classList.contains('checked')) {
        event.target.classList.remove('checked');
        event.target.nextElementSibling.classList.remove('line');
    }
    else {
        event.target.classList.add('checked');
        event.target.nextElementSibling.classList.add('line');
    }
}
//LOESCHEN
function removeTask(event) {
    event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
}

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
    a++;
    var html = "<li class=\"task\">\n    <div class=\"checkbox\" onclick=\"check(event)\"><span></span></div>\n    <div class=\"task-text\"> %text% </div>\n    <div class=\"timer\">\n        <div class=\"play\" onclick=\"start(event)\" ></div>\n        <div class=\"pause\" onclick=\"pause(event)\" ></div>\n        <div class=\"time\" id=\"%id%\">  </div>\n    </div>\n    <div class=\"remove-task\" onclick=\"removeTask(event)\"> <span></span> <span></span> </div>\n    </li>";
    html = html.replace('%text%', getInput);
    html = html.replace('%id%', "" + a);
    DOMList.insertAdjacentHTML("afterbegin", html);
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
// TIMER
var stop = 1;
var hour = 0;
var min = 0;
var sec = 0;
var id;
function start(event) {
    stop = 0;
    var sib1 = event.target.nextElementSibling;
    var sib2 = sib1.nextElementSibling;
    id = sib2.getAttribute("id");
    return id;
}
function pause(event) {
    stop = 1;
}
function timer() {
    if (stop === 0) {
        sec++;
        if (sec === 60) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            hour++;
            min = 0;
        }
        if (hour === 24) {
            hour = 0;
        }
        clearHTML(id);
        insertHTML(id);
    }
}
function clearHTML(id) {
    document.getElementById(id).innerHTML = "";
}
function insertHTML(id) {
    var code = "<span class=\"hour\">" + hour + "</span>:<span class=\"min\">" + min + "</span>:<span class=\"sec\">" + sec + "</span>";
    document.getElementById(id).innerHTML = "" + code;
}
setInterval(timer, 1000);

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
var newTimer = { stop: 1, hour: 0, min: 0, sec: 0 };
var id;
var idArray = ['0'];
function pause(event) {
    var DOMPause = event.target;
    var DOMStart = DOMPause.previousElementSibling;
    newTimer.stop = 1;
    styleTagReverse(DOMPause, DOMStart);
}
function start(event) {
    newTimer.stop = 0;
    var DOMStart = event.target;
    var DOMPause = DOMStart.nextElementSibling;
    var DOMTimer = DOMPause.nextElementSibling;
    id = DOMTimer.getAttribute("id");
    styleTag(DOMStart, DOMPause);
    if (idArray.some(function (el) { return el === id; })) {
        setTime(DOMTimer);
    }
    else {
        newTimer.hour = 0;
        newTimer.min = 0;
        newTimer.sec = 0;
        idArray.push(id);
    }
    return id;
}
function styleTag(p_DOMStart, p_DOMPause) {
    p_DOMStart.style.display = "none";
    p_DOMPause.style.display = "block";
}
function styleTagReverse(p_DOMPause, p_DOMStart) {
    p_DOMStart.style.display = "block";
    p_DOMPause.style.display = "none";
}
function setTime(p_DOMTimer) {
    var hourTag = p_DOMTimer.firstElementChild;
    var minTag = hourTag.nextElementSibling;
    var secTag = minTag.nextElementSibling;
    var hourText = hourTag.innerHTML;
    var minText = minTag.innerHTML;
    var secText = secTag.innerHTML;
    newTimer.hour = parseFloat(hourText);
    newTimer.min = parseFloat(minText);
    newTimer.sec = parseFloat(secText);
}
function timer() {
    if (newTimer.stop === 0) {
        newTimer.sec++;
        if (newTimer.sec === 60) {
            newTimer.min++;
            newTimer.sec = 0;
        }
        if (newTimer.min === 60) {
            newTimer.hour++;
            newTimer.min = 0;
        }
        if (newTimer.hour === 24) {
            newTimer.hour = 0;
        }
        clearHTML(id);
        insertHTML(id);
    }
}
function clearHTML(p_id) {
    document.getElementById(p_id).innerHTML = "";
}
function insertHTML(p_id) {
    var code = "<span class=\"hour\">" + newTimer.hour + "</span>:<span class=\"min\">" + newTimer.min + "</span>:<span class=\"sec\">" + newTimer.sec + "</span>";
    document.getElementById(p_id).innerHTML = "" + code;
}
setInterval(timer, 1000);

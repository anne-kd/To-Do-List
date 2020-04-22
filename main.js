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
    var DOMRead = document.querySelector("#read");
    DOMRead.addEventListener("click", getOutput);
}
DOMButton.addEventListener('click', addTask);
DOMInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTask();
    }
});
// VORLESEN
function getOutput(event) {
    var tasks = document.querySelectorAll(".task-text");
    if (tasks.length == 0) {
        var output = new SpeechSynthesisUtterance("F\u00FCr heute stehen keine Aufgaben an.");
        output.lang = "de-DE";
        output.pitch = 5;
        speaker(output);
    }
    for (var i = 0; i < tasks.length; i++) {
        var element = tasks[i];
        var task = element.innerHTML;
        var output = void 0;
        if (element.classList.contains('line')) {
            task = "";
        }
        if (i == 0) {
            output = new SpeechSynthesisUtterance("Heute stehen noch folgende Aufgaben an: " + task);
        }
        else {
            output = new SpeechSynthesisUtterance("" + task);
        }
        output.lang = "de-DE";
        output.pitch = 5;
        speaker(output);
    }
}
// Speak text
function speaker(p_output) {
    speechSynthesis.speak(p_output);
}
//ABHAKEN
function check(event) {
    var box = event.target;
    if (box.classList.contains('checked')) {
        box.classList.remove('checked');
        box.nextElementSibling.classList.remove('line');
    }
    else {
        box.classList.add('checked');
        box.nextElementSibling.classList.add('line');
    }
}
//LOESCHEN
function removeTask(event) {
    var rem = event.target;
    rem.parentNode.parentNode.parentNode.removeChild(rem.parentNode.parentNode);
    //sorry xD
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
    var hourTag = p_DOMTimer.querySelector(".hour");
    var minTag = p_DOMTimer.querySelector(".min");
    var secTag = p_DOMTimer.querySelector(".sec");
    newTimer.hour = parseFloat(hourTag.innerHTML);
    newTimer.min = parseFloat(minTag.innerHTML);
    newTimer.sec = parseFloat(secTag.innerHTML);
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

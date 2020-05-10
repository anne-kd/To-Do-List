"use strict";
const DOMDay = document.querySelector("#date-day");
const DOMWeekDay = document.querySelector("#date-weekday");
const DOMMonth = document.querySelector("#date-month");
// DATUM AKTUALISIEREN
window.addEventListener("load", function updateDate() {
    let today = new Date();
    let weekdayList = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    let monthList = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    let day = today.getDate();
    let weekday = today.getDay();
    let month = today.getMonth();
    DOMDay.textContent = `${day}`;
    DOMMonth.textContent = monthList[month];
    DOMWeekDay.textContent = weekdayList[weekday];
});
//INPUT + TO DO LISTE
const DOMInput = document.getElementById("listinput");
const DOMList = document.querySelector(".list");
const DOMButton = document.querySelector(".add-button");
let a = 0;
function remInput() {
    return DOMInput.value = "";
}
function addTask() {
    let getInput = DOMInput.value;
    console.log(getInput);
    a++;
    let html = `<li class="task">
    <div class="checkbox" onclick="check(event)"><span></span></div>
    <div class="task-text"> %text% </div>
    <div class="timer">
        <div class="play" onclick="start(event)" ></div>
        <div class="pause" onclick="pause(event)" ></div>
        <div class="time" id="%id%">  </div>
    </div>
    <div class="remove-task" onclick="removeTask(event)"> <span></span> <span></span> </div>
    </li>`;
    html = html.replace('%text%', getInput);
    html = html.replace('%id%', `${a}`);
    DOMList.insertAdjacentHTML("afterbegin", html);
    remInput();
    let DOMRead = document.querySelector("#read");
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
    const tasks = document.querySelectorAll(".task-text");
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let task = element.innerHTML;
        let output;
        if (element.classList.contains('line')) {
            task = "";
        }
        if (i == 0) {
            output = new SpeechSynthesisUtterance(`Heute stehen noch folgende Aufgaben an: ${task}`);
        }
        else {
            output = new SpeechSynthesisUtterance(`${task}`);
        }
        output.lang = "de-DE";
        output.pitch = 5;
        speaker(output);
    }
}
function speaker(p_output) {
    speechSynthesis.speak(p_output);
}
//ABHAKEN
function check(event) {
    let box = event.target;
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
    let rem = event.target;
    rem.parentElement.parentElement.parentElement.removeChild(rem.parentElement.parentElement);
    //sorry xD
}
let newTimer = { stop: 1, hour: 0, min: 0, sec: 0 };
let id;
let idArray = ['0'];
function pause(event) {
    let DOMPause = event.target;
    let DOMStart = DOMPause.previousElementSibling;
    newTimer.stop = 1;
    styleTagReverse(DOMPause, DOMStart);
}
function start(event) {
    newTimer.stop = 0;
    let DOMStart = event.target;
    let DOMPause = DOMStart.nextElementSibling;
    let DOMTimer = DOMPause.nextElementSibling;
    id = DOMTimer.getAttribute("id");
    styleTag(DOMStart, DOMPause);
    if (idArray.some(el => el === id)) {
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
    let hourTag = p_DOMTimer.querySelector(".hour");
    let minTag = p_DOMTimer.querySelector(".min");
    let secTag = p_DOMTimer.querySelector(".sec");
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
    let code = `<span class="hour">${newTimer.hour}</span>:<span class="min">${newTimer.min}</span>:<span class="sec">${newTimer.sec}</span>`;
    document.getElementById(p_id).innerHTML = `${code}`;
}
setInterval(timer, 1000);

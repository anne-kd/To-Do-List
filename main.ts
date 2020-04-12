export {}
const DOMDay = document.querySelector("#date-day");
const DOMWeekDay = document.querySelector("#date-weekday");
const DOMMonth = document.querySelector("#date-month");

// DATUM AKTUALISIEREN
window.addEventListener("load", 
    function updateDate() : void {
        let today: Date = new Date();
        let weekdayList: string[] = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        let monthList: string[] = ["Januar","Februar","März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

        let day: number = today.getDate();
        let weekday: number = today.getDay();
        let month: number = today.getMonth();

        DOMDay.textContent =`${day}`;
        DOMMonth.textContent = monthList[month];
        DOMWeekDay.textContent = weekdayList[weekday];
    });


//INPUT + TO DO LISTE

const DOMInput = (<HTMLInputElement>document.getElementById("listinput"));
const DOMList = document.querySelector(".list");
const DOMButton = document.querySelector(".add-button");
let a = 0;



function remInput(){
    return DOMInput.value = "";
}

function addTask(){
    let getInput = DOMInput.value;
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
}

DOMButton.addEventListener('click', addTask);
DOMInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     addTask();
    }
  });
//ABHAKEN
function check(event){
    if (event.target.classList.contains('checked')) {
        event.target.classList.remove('checked');
        event.target.nextElementSibling.classList.remove('line');
    } else {
        event.target.classList.add('checked');
        event.target.nextElementSibling.classList.add('line');
    }
}

//LOESCHEN
function removeTask(event) {
    event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
}

// TIMER
let stop= 1;
let hour= 0;
let min = 0;
let sec = 0;
let id;
let idArray: Array<String> = ['0'];


function pause(event) : void {
    let DOMPause = event.target;
    let DOMStart = DOMPause.previousElementSibling;
    stop = 1;
    styleTagReverse(DOMPause, DOMStart);
}

function start(event) : string {
    stop = 0;
    let DOMStart = event.target;
    let DOMPause = DOMStart.nextElementSibling;
    let DOMTimer = DOMPause.nextElementSibling;
    id = DOMTimer.getAttribute("id");
    styleTag(DOMStart, DOMPause);
    if (idArray.some(el => el === id)){
        setTime(DOMTimer);
    }
    else {
        hour = 0;
        min = 0;
        sec = 0;
        idArray.push(id);
    }
    
    return id;
}

function styleTag(p_DOMStart, p_DOMPause){
    p_DOMStart.style.display = "none";
    p_DOMPause.style.display = "block";
}
function styleTagReverse(p_DOMPause, p_DOMStart){
    p_DOMStart.style.display = "block";
    p_DOMPause.style.display = "none";
}

function setTime(p_DOMTimer) {
    let hourTag = p_DOMTimer.firstElementChild;
    let minTag = hourTag.nextElementSibling;
    let secTag = minTag.nextElementSibling;

    let hourText = hourTag.innerHTML;
    let minText = minTag.innerHTML;
    let secText = secTag.innerHTML;

    hour = parseFloat(hourText);
    min = parseFloat(minText);
    sec = parseFloat(secText);
}


function timer(): void{
    if(stop === 0){
        sec++;
        if (sec === 60){
            min++;
            sec = 0; 
        }
        if (min === 60){
            hour++;
            min = 0;
        }
        if (hour === 24){
            hour = 0;
        }
    clearHTML(id);
    insertHTML(id);
    }
}

function clearHTML(p_id) : void{
    document.getElementById(p_id).innerHTML = "";
}

function insertHTML(p_id) : void {
    let code = `<span class="hour">${hour}</span>:<span class="min">${min}</span>:<span class="sec">${sec}</span>`;
    document.getElementById(p_id).innerHTML = `${code}`;
}


setInterval(timer, 1000);
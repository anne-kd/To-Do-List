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



function remInput() : string{
    return DOMInput!.value = "";
}

function addTask() : void{
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


    let DOMRead = document.querySelector("#read");
    DOMRead.addEventListener("click", getOutput);
    
}

DOMButton.addEventListener('click', addTask);
DOMInput.addEventListener("keyup", 
    function(event) : void {
        if (event.keyCode === 13) {
        event.preventDefault();
        addTask();
        }
    });

// VORLESEN
function getOutput(event: Event) {
    const tasks = document.querySelectorAll<HTMLElement>(".task-text");


    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        let task = element.innerHTML;
        let output;

        if (element.classList.contains('line')){
            task = "";
        }

        if (i == 0){
            output = new SpeechSynthesisUtterance(
                `Heute stehen noch folgende Aufgaben an: ${task}`
              ); 
        }
        else{
            output = new SpeechSynthesisUtterance(
                `${task}`
              );
        }
        
        
        output.lang = "de-DE";
        output.pitch = 5;
        speaker(output);
    }
  }
  
  // Speak text
  function speaker(p_output: any) {
    speechSynthesis.speak(p_output);
  }
  

//ABHAKEN
function check(event : Event) : void {
    let box = event.target as HTMLElement;
    if (box.classList.contains('checked')) {
        box.classList.remove('checked');
        box.nextElementSibling.classList.remove('line');
    } else {
        box.classList.add('checked');
        box.nextElementSibling.classList.add('line');
    }
}

//LOESCHEN
function removeTask(event : Event) : void {
    let rem = event.target as HTMLElement;
    rem.parentNode.parentNode.parentNode.removeChild(rem.parentNode.parentNode);
    //sorry xD
}

// TIMER
interface ITimer {
    stop: number;
    hour: number;
    min: number;
    sec: number;
    id?: string;
} 
let newTimer : ITimer = {stop: 1, hour: 0, min: 0, sec: 0};
let id : string;
let idArray: Array<String> = ['0'];


function pause(event : Event) : void {
    let DOMPause = event.target as HTMLElement;
    let DOMStart = DOMPause.previousElementSibling as HTMLElement;
    newTimer.stop = 1;
    styleTagReverse(DOMPause, DOMStart);
}

function start(event : Event) : string {
    newTimer.stop = 0;
    let DOMStart = event.target as HTMLElement;
    let DOMPause = DOMStart!.nextElementSibling as HTMLElement;
    let DOMTimer = DOMPause!.nextElementSibling as HTMLElement;

    id = DOMTimer.getAttribute("id") as string ;

    styleTag(DOMStart, DOMPause);
    if (idArray.some(el => el === id)){
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

function styleTag(p_DOMStart : HTMLElement, p_DOMPause : HTMLElement) : void {
    p_DOMStart.style.display = "none";
    p_DOMPause.style.display = "block";
}
function styleTagReverse(p_DOMPause : HTMLElement, p_DOMStart : HTMLElement) : void {
    p_DOMStart.style.display = "block";
    p_DOMPause.style.display = "none";
}

function setTime(p_DOMTimer : HTMLElement) : void {
    let hourTag = p_DOMTimer!.querySelector(".hour") as HTMLElement;
    let minTag = p_DOMTimer!.querySelector(".min") as HTMLElement;
    let secTag = p_DOMTimer!.querySelector(".sec") as HTMLElement;

    newTimer.hour = parseFloat(hourTag.innerHTML);
    newTimer.min = parseFloat(minTag.innerHTML);
    newTimer.sec = parseFloat(secTag.innerHTML);
}


function timer(): void{
    if(newTimer.stop === 0){
        newTimer.sec++;
        if (newTimer.sec === 60){
            newTimer.min++;
            newTimer.sec = 0; 
        }
        if (newTimer.min === 60){
            newTimer.hour++;
            newTimer.min = 0;
        }
        if (newTimer.hour === 24){
            newTimer.hour = 0;
        }
    clearHTML(id);
    insertHTML(id);
    }
}

function clearHTML(p_id : string) : void{
    document.getElementById(p_id).innerHTML = "";
}

function insertHTML(p_id : string) : void {
    let code = `<span class="hour">${newTimer.hour}</span>:<span class="min">${newTimer.min}</span>:<span class="sec">${newTimer.sec}</span>`;
    document.getElementById(p_id).innerHTML = `${code}`;
}


setInterval(timer, 1000);
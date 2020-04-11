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



function remInput(){
    return DOMInput.value = "";
}

function addTask(){
    let getInput = DOMInput.value;
    
    let html = `<li class="task" >
    <div class="checkbox"></div>
    <div class="task-text"> %text% </div>
    <div class="timer">
        <div class="play"></div>
        <div class="pause"></div>
        <div class="time"> <span class="hour">00</span>:<span class="min">00</span>:<span class="sec">00</span></div>
    </div>
    <div class="remove-task"> <span></span> <span></span> </div>
    </li>`;

    let replacement = html.replace('%text%', getInput);
    DOMList.insertAdjacentHTML("afterbegin", replacement);

    remInput();
}

DOMButton.addEventListener('click', addTask);
DOMInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     addTask();
    }
  });


// Abhaken

const DOMCheck = document.querySelectorAll('.checkbox');

DOMCheck.forEach(element => {
     element.addEventListener('click', function(){
         element.toggleAttribute('checked');
    });
});


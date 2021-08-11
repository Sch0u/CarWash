//  ------------------------ VARIABLES ------------------------ 

//  Creating variables for the Database 
const licensePlate = document.getElementById('licensePlate');

// Creating variables for random car picker
const cars = ["Alfa Romeo 147 Ducati Hatchback", "Aston Martin Vanquish", "Audi RS3", "Bentley Bentayga", "BMW M5", "Chevrolet LS Spark", "Citroen C3", "Ferrai Le Ferrai", "Honda Jazz", "Hyundai I20", "Skoda Fabia", "Tesla Model 3 S", "Seat Cupra", "Volvo b18", "Volkswagen Passat"];

// Creating variables for the timer
let countdown;

const timerDisplay = document.querySelector('.display_time-left');
const buttons = document.querySelectorAll('[data-time]');

// ------------------------ FUNCTIONS ------------------------ 

// Function that creates the timer.
function timer(seconds){
    // Clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // Makes sure that the timer isnt going to minus
        if(secondsLeft < 0){
            clearInterval(countdown);
            washFinished()
            return;
        }
        // Disables the buttons if a wash is in progress.
        if(secondsLeft > 0){
            document.getElementById("bronze").disabled = true;
            document.getElementById("silver").disabled = true;
            document.getElementById("gold").disabled = true;
            document.getElementById("diamond").disabled = true;
        }
        displayTimeLeft(secondsLeft);
    })
}

// Function to display the time there is left on the timer.
function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;

    const display = `${minutes}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`;

    document.title = display;
    timerDisplay.textContent = display;
}

// Creating a var for all the different options in the dropmenu
var subjectObject = {
    "Bronze": {},
    "Silver": {},
    "Gold": {},
    "Diamond": {}
}

// Function to start the wash
function washStart(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
    document.querySelector('.display_time-text').innerHTML = "";
    document.getElementById('washStopBTN').style.display = "block"

    var car = cars[Math.floor(Math.random()*cars.length)]; 
    document.querySelector('.display_car-model').innerHTML = car;
    console.log(car)
    console.log(licensePlate.value)
    writeCarData(car, licensePlate.value)
}

// Function top stop the wash
function washStop(){
    document.querySelector('.display_time-text').innerHTML = "The Wash Has Been Canceled!"
    timer(0);
}

// Function to finish the wash
function washFinished(){
    document.querySelector('.display_car-model').innerHTML = "";
    document.querySelector('.display_time-text').innerHTML = "The wash is done!";
    document.getElementById('washStopBTN').style.display = "none"
    document.querySelector('.display_time-left').innerHTML = "";
    // Enables the buttons again
    document.getElementById("bronze").disabled = false;
    document.getElementById("silver").disabled = false;
    document.getElementById("gold").disabled = false;
    document.getElementById("diamond").disabled = false;
}



// Creates Options For Each Option In subjectObject
window.onload = function(){
    var washSel = document.getElementById("washes");
    for (var x in subjectObject) {
        washSel.options[washSel.options.length] = new Option(x, x);
    }
}

// Checks which option there is selected in the dropdown menu
function washSelectedInfo() {
    var text;
    var x = document.getElementById("washes").selectedIndex;

     switch(x){
     case 1:
        text = "Pris: 69 DKK<br> Skumforvask &#10004<br>Hjulvask &#10004<br>Sidehøjtryk &#10004<br>Børstevask &#10004<br>Tørring &#10004";
        document.querySelector("#selectedText").innerHTML = text;
          break;

     case 2:
         text = "Pris: 89 DKK<br> Skumforvask &#10004<br> Fælgrens &#10004<br> Hjulvask &#10004<br> Sidehøjtryk &#10004<br> Undervognsskyld &#10004<br> Børstevask &#10004<br> Skumvask &#10004<br> Tørring &#10004";
         document.querySelector("#selectedText").innerHTML = text;
         break;

     case 3:
         text = "Pris: 109 DKK<br> Grundigvask+ &#10004<br> Sæsonvask &#10004<br> Højtryksspuling &#10004<br>Panelvask &#10004<br> Superglans &#10004<br> Ekstra tørring &#10004";
         document.querySelector("#selectedText").innerHTML = text;
         break;

     case 4:
         text = "Pris: 129 DKK<br> Grundigvask+ &#10004<br> Sæsonvask &#10004<br> Højtryksspuling &#10004<br> Panelvask &#10004<br> Hjulvask med højtryk &#10004<br> Panelvask &#10004<br>Superglans &#10004<br> Polering &#10004<br> Ekstra tørring &#10004";
         document.querySelector("#selectedText").innerHTML = text;
         break;
     default:
        text = "Waiting for selected program";
        document.querySelector("#selectedText").innerHTML = text;
    }
}

// ------------------------ EVENTLISTENERS ------------------------

// Eventlistener for clicks on the program buttons
buttons.forEach(button => button.addEventListener('click',washStart));

document.form.addEventListener('submit', function(e){
    e.preventDefault();
})

// ------------------------ DATABASE / FIREBASE ------------------------ 
function writeCarData(car, licensePlate){
    firebase.database().ref('cars/').push().set({
        Carmodel: car,
        Licenseplate: licensePlate,
    });
}


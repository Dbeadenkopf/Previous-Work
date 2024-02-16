// this file will contain all the javascript , this will
// have the code that will pass through the container of 
// div clock, using this because we want a file that contains
// all of our logic of our clock


// The Digital Clock class makes it so the object has a reference point
class DigitalClock{
    constructor(element){
        this.element = element;
        console.log(this.element);
    }
    // new method to make sure clock actually works as time progresses
    start(){
        setInterval(() => {
            this.update();
        } ,500); // update every 500 millisecond/half second(for fast time)
    }


    // this method will grab our time parts
    update(){
        const parts = this.getTimeParts();
        // minuteFormatted > 0 and formats numbers two total chars
        const minuteFormatted = parts.minute.toString().padStart(2, "0");
        //
        const timeFormatted = `${parts.hour}:${minuteFormatted}`;
        const amPm = parts.isAm ? "AM" : "PM";
        
        this.element.querySelector(".clock-time").textContent = timeFormatted;
        this.element.querySelector(".clock-ampm").textContent = amPm;
    }

    // function method that will return the hours
    // either am or pm of the current time
    getTimeParts(){
        const now = new Date();
        return{
            hour: now.getHours() % 12 || 12, // applying 24hr time
            minute: now.getMinutes(),
            isAm: now.getHours() < 12 // if the current time < 12 then am
        };
    }
}


// const to reference clock element
const clockElement = document.querySelector(".clock");

// new const
const clockObject = new DigitalClock(clockElement);


clockObject.start();
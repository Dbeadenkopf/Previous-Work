"use strict"

// write a function that ask for the sum
// and then stores those numbers into the array
function sumInput(){
    let numbers = []; // arrary to store numbers
    let num;
    do{
        num = prompt("Please enter a number: ",0);
        numbers.push(+num);
        if(num === " " || num  === null) break;
    }while(!isFinite(num));

    // now lets calculate and return the sum of the array
    let sum = 0;
    for(let number of numbers){
        sum += number;
    }
    return sum;

};

alert(sumInput());

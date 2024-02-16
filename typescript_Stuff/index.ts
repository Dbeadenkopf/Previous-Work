// the objective is to turn this whole programm into typescript



const button = document.querySelector('.button');
const firstInput = document.querySelector('#first-input') as HTMLInputElement
const secondInput = document.querySelector('second-input') as HTMLInputElement
export const screen = document.querySelector('.screen'); // this needs to be exported since we 


function addNumbers(a: number,b: number){ // assing the type number to as and b
    screen.innerHTML = (a+b).toString();
}




button.addEventListener("click", () =>
  addNumbers(parseInt(firstInput.value), parseInt(secondInput.value))
);



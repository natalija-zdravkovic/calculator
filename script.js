// dodaj back
// dodaj negativne brojeve 
// dodaj decimalne brojeve

const equalButton = document.getElementById("equal")
const numberButtons = document.querySelectorAll(".number")
const clearButton = document.getElementById("clear")
const operatorButtons = document.querySelectorAll(".operator")
const display = document.querySelector(".calculator-display")

let number1 = 0
let number2 = 0
let operator = null
let result = 0
operatorButtons.disabled = true
equalButton.disabled = true


numberButtons.forEach(button => 
{
    button.addEventListener("click", pickNumber)
})

equalButton.addEventListener("click", operate)

clearButton.addEventListener("click", clear)

operatorButtons.forEach(button => 
{
    button.addEventListener("click", function () 
    {
        if (operator !== null && number2 !== 0) 
        {
            operate()
        }
        operator = button.dataset.operator
    })
})

function clear() 
{
    number1 = 0
    number2 = 0
    operator = null
    result = null
    operatorButtons.disabled = true
    equalButton.disabled = true
    display.innerHTML = ""
}

function operate() 
{
    switch (operator) 
    {
        case "add":
            result = number1 + number2
            display.innerHTML = result
            break

        case "substract":
            result = number1 - number2
            display.innerHTML = result
            break

        case "multiply":
            result = number1 * number2
            display.innerHTML = result
            break

        case "divide":
            if (number2 === 0)
            {
                display.innerHTML = "Error"
                clear()
            }
            else
            {
                result = number1 / number2
                display.innerHTML = result
                break
            }
    }
    number1 = result
    number2 = 0
    equalButton.disabled = true
}

function pickNumber(event) 
{
    const pickedNumber = parseInt(event.target.dataset.value)
    console.log(pickedNumber)

    if (operator === null) 
    {
        number1 = number1 * 10 + pickedNumber
        display.innerHTML = number1
        operatorButtons.disabled = false
    } 

    else 
    {
        number2 = number2 * 10 + pickedNumber
        display.innerHTML = number2
        equalButton.disabled = false
    }
}




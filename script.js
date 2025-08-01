let number1 = null
let number2 = null
let operator = null
let result = null

const plusButton = document.getElementById("add")
const minusButton = document.getElementById("substract")
const multiplyButton = document.getElementById("multiply")
const divideButton = document.getElementById("divide")

const numberButtons = document.querySelectorAll(".number")

const clearButton = document.getElementById("clear")

numberButtons.forEach(button => {
    button.addEventListener("click", pickNumber)
})

plusButton.addEventListener("click", function() {
    operator = "add"
})

minusButton.addEventListener("click", function() {
    operator = "substract"
})

multiplyButton.addEventListener("click", function() {
    operator = "multiply"
})

divideButton.addEventListener("click", function() {
    operator = "divide"
})


function pickNumber(event)
{
    const pickedNumber = parseInt(event.target.dataset.value)
        console.log(pickedNumber)
        if (number1 === null)
        {
            number1 = pickedNumber
            //dozvoli operande
        }
        else
        {
            number2 = pickedNumber
            operate()
        }
}

function operate()
{
    switch (operator)
    {
        case "add":
            //rezultat tek na = ili sledeci broj
            result = number1 + number2
            break
        case "substract":
            result = number1 - number2
            break
        case "multiply":
            result = number1 * number2
            break
        case "divide":
            result = number1 / number2
            break
    }

    console.log(result)
    number1 = result
    number2 = null
    operator = null
}

function clear()
{
    number1 = null
    number2 = null
    operator = null
    result = null
}

clearButton.addEventListener("click", clear)
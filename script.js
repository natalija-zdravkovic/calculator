// treba da radi i za višecifrene brojeve
// dodaj back
// dodaj negativne brojeve 
// dodaj decimalne brojeve
// štampa brojeve i rezultat na ekranu

let number1 = 0
let number2 = 0
let operator = null
let result = 0

const plusButton = document.getElementById("add")
const minusButton = document.getElementById("substract")
const multiplyButton = document.getElementById("multiply")
const divideButton = document.getElementById("divide")
const equalButton = document.getElementById("equal")

const numberButtons = document.querySelectorAll(".number")
const clearButton = document.getElementById("clear")
const operatorButtons = document.querySelectorAll(".operator")

numberButtons.forEach(button => 
{
    button.addEventListener("click", pickNumber)
})

plusButton.addEventListener("click", function() 
{
    operator = "add"
})

minusButton.addEventListener("click", function() 
{
    operator = "substract"
})

multiplyButton.addEventListener("click", function() 
{
    operator = "multiply"
})

divideButton.addEventListener("click", function() 
{
    operator = "divide"
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
    })
})

function operate() 
{
    switch (operator) 
    {
        case "add":
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
    number2 = 0
    // blokiraj jednako
}

function pickNumber(event) 
{
    const pickedNumber = parseInt(event.target.dataset.value)
    console.log(pickedNumber)

    if (operator === null) 
        {
        number1 = number1 * 10 + pickedNumber
        // dozvoli operatore
    } else 
    {
        number2 = number2 * 10 + pickedNumber
        // dozvoli jednako
    }
}

function clear() 
{
    number1 = 0
    number2 = 0
    operator = null
    result = null
}

function disableOperators() 
{
}

function enableOperators() 
{
}



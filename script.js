// dodaj back
// dodaj negativne brojeve 
// dodaj decimalne brojeve
// štampa brojeve i rezultat na ekranu *
// blokiraj i dozvoli sta kad treba *
// promeni operator kad se klikne umesto =
// deljenje sa nulom

const equalButton = document.getElementById("equal")
const numberButtons = document.querySelectorAll(".number")
const clearButton = document.getElementById("clear")
const operatorButtons = document.querySelectorAll(".operator")

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
    equalButton.disabled = true
}

function pickNumber(event) 
{
    const pickedNumber = parseInt(event.target.dataset.value)
    console.log(pickedNumber)

    if (operator === null) 
    {
        number1 = number1 * 10 + pickedNumber
        operatorButtons.disabled = false
        // dozvoli operatore
    } 

    else 
    {
        number2 = number2 * 10 + pickedNumber
        // dozvoli jednako
        equalButton.disabled = false
    }
}

function clear() 
{
    number1 = 0
    number2 = 0
    operator = null
    result = null
    operatorButtons.disabled = true
    equalButton.disabled = true
}

function disableOperators() 
{
    
}

function enableOperators() 
{

}



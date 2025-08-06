// dodaj negativne brojeve 
// dodaj decimalne brojeve

const equalButton = document.getElementById("equal")
const numberButtons = document.querySelectorAll(".number")
const clearButton = document.getElementById("clear")
const operatorButtons = document.querySelectorAll(".operator")
const display = document.querySelector(".calculator-display")
const backButton = document.getElementById("back")

let number1 = 0
let number2 = 0
let currentNumber = 0
let operator = null
let result = 0
operatorButtons.forEach(button => {
    button.disabled = true})
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
        setOperator(button.dataset.operator)
    })
})

backButton.addEventListener("click", back)

function handleNumberInput(pickedNumber) {
    if (operator === null) {
        if (number1 < 100000000) {
            number1 = number1 * 10 + pickedNumber
            currentNumber = number1
            display.innerHTML = number1
            operatorButtons.forEach(button => {
                button.disabled = false
            })
        }
    } else {
        if (number2 < 100000000) {
            number2 = number2 * 10 + pickedNumber
            currentNumber = number2
            display.innerHTML = number2
            equalButton.disabled = false
        }
    }
}

function setOperator(op)
{
    if (operator !== null && number2 !== 0) 
        {
            operate()
        }
        operator = op
}

document.addEventListener('keydown', function(event) {
    const key = event.key

    if (/[0-9]/.test(key)) {
        handleNumberInput(parseInt(key))
    }

    if (key === 'Escape' || key === 'Delete') {
        clear()
    }

    if (key === '=' || key === 'Enter') {
        operate()
    }

    if (key === '+') {
        setOperator('add')
    }

    if (key === '-') {
        setOperator('substract')
    }

    if (key === '*') {
        setOperator('multiply')
    }

    if (key === '/') {
        setOperator('divide')
    }
})

function clear() 
{
    number1 = 0
    number2 = 0
    currentNumber = 0
    operator = null
    result = null
    operatorButtons.forEach(button => {
        button.disabled = true})
    equalButton.disabled = true
    numberButtons.forEach(button => {
        button.disabled = false})
    display.innerHTML = ""
}

function operate() 
{
    if (operator === null && lastOperator !== null)
    {
        operator = lastOperator
        number2 = lastNumber2
    }

    switch (operator) 
    {
        case "add":
            result = number1 + number2
            display.innerHTML = parseFloat(result.toFixed(8))
            break

        case "substract":
            result = number1 - number2
            display.innerHTML = parseFloat(result.toFixed(8))
            break

        case "multiply":
            result = number1 * number2
            display.innerHTML = parseFloat(result.toFixed(8))
            break

        case "divide":
            if (number2 === 0)
            {
                display.innerHTML = "Error"
                number1 = 0
                number2 = 0
                currentNumber = 0
                operator = null
                result = null
                operatorButtons.forEach(button => {
                    button.disabled = true})
                equalButton.disabled = true
                numberButtons.forEach(button => {
                    button.disabled = false})
            }
            else
            {
                result = number1 / number2
                display.innerHTML = parseFloat(result.toFixed(8))
                break
            }
    }

    lastOperator = operator
    lastNumber2 = number2

    number1 = result
    currentNumber = number1
    number2 = 0
    operator = null
}

function pickNumber(event) 
{
    const pickedNumber = parseInt(event.target.dataset.value)
    handleNumberInput(pickedNumber)
}

function back()
{
    if (currentNumber !== 0) 
    {
        currentNumber = Math.floor(currentNumber / 10)

        if (operator === null)
        {
            number1 = currentNumber
            display.innerHTML = parseFloat(number1.toFixed(8))
        }

        else 
        {
            number2 = currentNumber
            display.innerHTML = parseFloat(number2.toFixed(8))
        }
    }

    if (operator === null && number1 === 0) 
    {
        operatorButtons.forEach(button => 
        {
            button.disabled = true
        })
    }

    if (operator !== null && number2 === 0) 
    {
        equalButton.disabled = true
    }
}




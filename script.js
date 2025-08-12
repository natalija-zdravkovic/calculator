const equalButton = document.getElementById("equal")
const numberButtons = document.querySelectorAll(".number")
const clearButton = document.getElementById("clear")
const operatorButtons = document.querySelectorAll(".operator")
const display = document.querySelector(".calculator-display")
const backButton = document.getElementById("back")
const signChangeButton = document.getElementById("negate")
const decimalButton = document.getElementById("decimal-point")

let number1 = 0
let number2 = 0
let currentNumber = 0
let operator = null
let result = 0
let lastOperator = null
let lastNumber2 = 0
let decimal = false
let decimalFactor = 1
operatorButtons.forEach(button => {button.disabled = true})
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

signChangeButton.addEventListener("click", negate)

decimalButton.addEventListener("click", decimalPoint)

function handleNumberInput(pickedNumber) 
{
    if (operator === null) 
    {
        if (!decimal)
        {
            if (number1 < 100000000)
            {
                number1 = number1 * 10 + pickedNumber
            }
        }

        else
        {
            decimalFactor *= 0.1
            number1 = parseFloat((number1 + pickedNumber * decimalFactor).toFixed(7))
        }
        currentNumber = number1
        display.innerHTML = parseFloat(number1.toFixed(7)).toString()
        console.log(number1)
        operatorButtons.forEach(button => {button.disabled = false})
    }
    
    else
    {
        if (!decimal)
        {
            if (number2 < 100000000)
            {
                number2 = number2 * 10 + pickedNumber
            }
        }

        else
        {
            decimalFactor *= 0.1
            number2 = parseFloat((number2 + pickedNumber * decimalFactor).toFixed(7))
        }

        currentNumber = number2
        display.innerHTML = parseFloat(number2.toFixed(7)).toString()
        equalButton.disabled = false
    }
} 

function setOperator(op)
{
    if (operator !== null && number2 !== 0) 
        {
            operate()
        }
        operator = op
        decimal = false
        decimalFactor = 1
}

function operatorKeyboard() 
{
    return (number1 !== 0 && operator === null)
}

document.addEventListener('keydown', function(event) 
{
    const key = event.key

    if (/[0-9]/.test(key)) 
    {
        handleNumberInput(parseInt(key))
    }

    if (key === 'Escape' || key === 'Delete') 
    {
        clear()
    }

    if (key === '+' && operatorKeyboard) 
    {
        setOperator('add')
    }

    if (key === '-' && operatorKeyboard) 
    {
        setOperator('subtract')
    }

    if (key === '*' && operatorKeyboard) 
    {
        setOperator('multiply')
    }

    if (key === '/' && operatorKeyboard) 
    {
        setOperator('divide')
    }

    if (key === 'Enter')
    {
        operate()
        event.preventDefault()
    }

    if (key === "~")
    {
        negate()
    }

    if (key === '.' || key === ',')
    {
        decimalPoint()
    }
})

function clear() 
{
    number1 = 0
    number2 = 0
    currentNumber = 0
    operator = null
    result = 0
    decimal = false
    decimalFactor = 1
    operatorButtons.forEach(button => {button.disabled = true})
    equalButton.disabled = true
    numberButtons.forEach(button => {button.disabled = false})
    display.innerHTML = ""
    lastOperator = null
    lastNumber2 = 0
}

function operate() 
{
    if (operator === null && lastOperator !== null && lastNumber2 !== 0)
    {
        operator = lastOperator
        number2 = lastNumber2
    }

    switch (operator) 
    {
        case "add":
            result = number1 + number2
            break

        case "subtract":
            result = number1 - number2
            break

        case "multiply":
            result = number1 * number2
            break

        case "divide":
            if (number2 === 0)
            {
                display.innerHTML = "Error"
                number1 = 0
                number2 = 0
                currentNumber = 0
                operator = null
                result = 0
                lastOperator = null
                lastNumber2 = 0
                operatorButtons.forEach(button => {button.disabled = true})
                numberButtons.forEach(button => {button.disabled = false})
                return 
            }
            else
            {
                result = number1 / number2
            }
            break
    }
    
    display.innerHTML = parseFloat(result.toFixed(7))

    lastOperator = operator
    lastNumber2 = number2

    number1 = result
    currentNumber = number1
    number2 = 0
    decimalFactor = 1
    operator = null
    decimal = false

    operatorButtons.forEach(button => {button.disabled = false})
    numberButtons.forEach(button => {button.disabled = false})
}

function pickNumber(event) 
{
    const pickedNumber = parseInt(event.target.dataset.value)
    handleNumberInput(pickedNumber)
}

function back()
{
    if (display.innerHTML !== "") 
    {
        display.innerHTML = display.innerHTML.slice(0, -1)
        if (display.innerHTML === "" || display.innerHTML === "-") 
        {
            currentNumber = 0
        } 
        else 
        {
            currentNumber = parseFloat(display.innerHTML)
        }

        if (operator === null) 
        {
            number1 = currentNumber
        } 
        else 
        {
            number2 = currentNumber
        }
    }

    if (operator === null && number1 === 0) 
    {
        operatorButtons.forEach(button => {button.disabled = true})
    }

    if (operator !== null && number2 === 0) 
    {
        equalButton.disabled = true
    }
}

function negate()
{
    if (currentNumber === number1)
    {
        number1 *= (-1)
        display.innerHTML = parseFloat(number1.toFixed(7))
    }

    else if (currentNumber === number2)
    {
        number2 *= (-1)
        display.innerHTML = parseFloat(number2.toFixed(7))
    }   
}

function decimalPoint()
{
    if (!decimal)
    {
        display.innerHTML += "."
        decimal = true
        decimalFactor = 1
    }
}
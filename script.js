const previous = document.querySelector("#preview")

const current = document.querySelector("#result")

const buttons = document.querySelectorAll("#button-group")

function square() {
    const exponent = "2"
    if (document.getElementById("result").innerHTML === "0.") {
        document.getElementById("result").innerText = "0"
    }
    if (document.getElementById("result").innerHTML === "") {
        document.getElementById("result").innerHTML = "0"
        document.getElementById("preview").innerHTML = "0" + exponent.sup() + " ="
    } else {
        var x = document.getElementById("result").innerHTML
        document.getElementById("result").innerHTML = Math.pow(x, 2)
        document.getElementById("preview").innerHTML = x + exponent.sup() + " ="
    }
}

function root() {
    if (document.getElementById("result").innerHTML === "0.") {
        document.getElementById("result").innerText = "0"
    }
    if (document.getElementById("result").innerHTML === "") {
        document.getElementById("result").innerHTML = "0"
        document.getElementById("preview").innerHTML = " √ " + "0" + " ="
    } else {
        var x = document.getElementById("result").innerHTML
        document.getElementById("result").innerHTML = Math.sqrt(x)
        document.getElementById("preview").innerHTML = " √ " + x + " ="
    }
}

function cleanTheLast() {
    document.getElementById("result").innerHTML = document.getElementById("result").innerHTML.slice(0, -1)
}

class Calculator {
    constructor(previous, current) {
        this.previous = previous
        this.current = current
        this.operation = ""
    }
    addDigit(digit) {
        if (digit === "." && this.current.innerText.includes(".")) {
            return
        }
        this.operation = digit
        if (digit === "." && this.current.innerText === "") {
            this.operation = "0" + digit
        }
        this.updateScreen()
    }
    processOperation(operation) {
        if (this.current.innerText === "" && operation !== "C") {
            if (this.previous.innerText !== "") {
                this.changeOperation(operation)
            }
            return
        }
        let operationValue
        const previous = +this.previous.innerText.split(" ")[0]
        const current = +this.current.innerText
        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "C":
                this.processClear()
                break
            case "=":
                this.equal()
                break
            default:
                return
        }
    }
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        if (operationValue === null) {
            this.current.innerText += this.operation
        } else {
            if (previous === 0) {
                operationValue = current
            }
            this.previous.innerText = `${ operationValue } ${ operation }`
            this.current.innerText = ""
        }
    }
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]
        if (!mathOperations.includes(operation)) {
            return
        }
        this.previous.innerText = this.previous.innerText.slice(0, -1) + operation
    }
    processClear() {
        this.previous.innerText = ""
        this.current.innerText = ""
    }
    equal() {
        var resultFinal = document.getElementById("preview").innerText + document.getElementById("result").innerText
        if (document.getElementById("result").innerText === "") {
            document.getElementById("preview").innerHTML = document.getElementById("preview").innerHTML.slice(0, -1) + "="
            document.getElementById("result").innerHTML = document.querySelector("#preview").innerText.slice(0, -1)
        } else {
            if (resultFinal) {
                document.getElementById("preview").innerHTML = document.querySelector("#preview").innerText + " " + document.querySelector("#result").innerText + " ="
                document.getElementById("result").innerHTML = eval(resultFinal)
            } else {
                document.getElementById("result").innerHTML = "NaN"
            }
        }
    }
}

const calculate = new Calculator(previous, current)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText
        if (+value >= 0 || value === ".") {
            calculate.addDigit(value)
        } else {
            calculate.processOperation(value)
        }
    })
})
import { useState } from "react"




function Keys(){

    const [opened, setOpen] = useState(false)
    const [bracNum, setBracNum] = useState(0)
        
        function HandleClick(operation){
            const input = document.getElementById("display")
            const operands = ['+', '-', '/', '*']
            
            if(input.textContent[0] === "0"){
                input.textContent = ''
            }

            let values = input.textContent.split(/(?=[+-/()*])|(?<=[+-/()*])/g)

            if(operation === 'bracket'){
                if(values[0] === "" && values.length === 1){
                    values = []
                }
                if(values.length ===  0 || operands.includes(values[values.length-1])){
                    input.textContent = input.textContent + '('
                    setOpen(true)
                    setBracNum(bracNum + 1)
                }
                else if(operands.includes(values[values.length - 1]) === false && opened === false) {
                    input.textContent = input.textContent + '*('
                    setOpen(true)
                    setBracNum(bracNum + 1)
                }
                else if(opened){
                    input.textContent = input.textContent + ')'
                    if(bracNum === 0){
                        setOpen(false)
                    }
                    else{
                        console.log("Closing bracket")
                        setBracNum(bracNum - 1)
                        if((bracNum - 1) === 0){
                            setOpen(false)
                        }
                    }
                }
                
            }

            else if(operation === 'inverse'){
                if(operands.includes(values[values.length - 1]) === false){
                    let temp = values[values.length - 1]
                    values.splice(values.length - 1, 1, "(" , "-", temp)
                    setOpen(true)
                    setBracNum(bracNum + 1)
                }

                input.textContent = values.join("")
            }
            
            else if (operands.includes(operation)){
                if(operands.includes(values[values.length - 1])){
                    if(values[values.length - 1] === '/' && operation === "*"){
                        values[values.length - 1] =  "*"
                    }
                    else if(values[values.length - 1] === '*' && operation === "/"){
                        values[values.length - 1] =  "/"
                    }
                    input.textContent = values.join("")
                }
                else{
                    input.textContent = input.textContent + `${operation}`
                }
               
            }

            else if(operation === "."){
                if(operands.includes(values[values.length - 1]) === false && values[values.length - 1].includes('.')){

                }
                else if(operands.includes(values[values.length - 1]) || values.length === 0){
                    values.push('0.')
                    input.textContent = values.join("")
                }
                else{
                    let temp = values[values.length - 1]
                    console.log("Do this one", temp)
                    values[values.length - 1] = `${temp}.`
                    input.textContent = values.join("")
                }
                
            }

            else{
                console.log("0-9")
                input.textContent = input.textContent + operation
            }
            values = input.textContent.split(/(?=[+-/()*])|(?<=[+-/()*])/g)
            console.log("The values and input after ",values, input.textContent)
            console.log(opened, bracNum)
        }
        
        console.log(opened, bracNum)
        function clearDisplay(){
            document.getElementById("display").textContent = "0"
        }

    return(
        <>
            <div class='key-body'>
                <button class='keys operand' id='clear'onClick={clearDisplay} >AC</button>
                <button class='keys operand' id='bracket' onClick={() => HandleClick('bracket')} >()</button>
                <button class='keys operand' id='percent' onClick={() => HandleClick("%")}>%</button>
                <button class='keys operand' id='divide' onClick={() => HandleClick("/")}>/</button>
                <button class='keys' id='seven' onClick={() => HandleClick("7")}>7</button>
                <button class='keys' id='eight' onClick={() => HandleClick("8")}>8</button>
                <button class='keys' id='nine' onClick={() => HandleClick("9")}>9</button>
                <button class='keys operand' id='multiply' onClick={() => HandleClick("*")}>*</button>
                <button class='keys' id='four' onClick={() => HandleClick("4")}>4</button>
                <button class='keys' id='five' onClick={() => HandleClick("5")}>5</button>
                <button class='keys' id='six' onClick={() => HandleClick("6")}>6</button>
                <button class='keys operand' id='subtract' onClick={() => HandleClick("-")}>-</button>
                <button class='keys' id='one' onClick={() => HandleClick("1")}>1</button>
                <button class='keys' id='two' onClick={() => HandleClick("2")}>2</button>
                <button class='keys' id='three' onClick={() => HandleClick("3")}>3</button>
                <button class='keys operand' id='add' onClick={() => HandleClick("+")}>+</button>
                <button class='keys' id='zero' onClick={() => HandleClick("0")}>0</button>
                <button class='keys' id='decimal' onClick={() => HandleClick(".")}>.</button>
                <button class='keys operand' id='plus-or-minus' onClick={() => HandleClick("inverse")}>+/-</button>
                <button class='keys operand' id='equal'>=</button>
            </div>
        </>
    )
}

export default Keys
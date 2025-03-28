import { useState } from "react"
import { actions} from "./Actions"
import { useDispatch, useSelector } from "react-redux"



let prevValue = ''

function Keys(){

    const [opened, setOpen] = useState(false)
    const [bracNum, setBracNum] = useState(0)
    const display = useSelector(state => state.calculate)
    const [calculated, setCalculated] = useState(false) 
    const dispatch = useDispatch()
    const operands = ['+', '-', '/', '*']
    
        
        function formatEval(value){
            const newValue = value.map(val =>  {
                if(val.includes('%')){
                    val = val.substring(0, val.length - 1);
                    val = Number((val / 100).toFixed(2))
                }
                return val
            })
            const evalText = newValue.join('')
            const found = newValue.findLast((element) => operands.includes(element));
            const index = newValue.indexOf(found)
            const text = newValue.slice(index).join('');
            console.log("Text ", text, index, found, newValue);
            prevValue = text;
            console.log(evalText, " the prevValue ",prevValue, text)
            dispatch(actions.calculate(evalText))
        }

        function HandleClick(operation){
            const input = document.getElementById("display")
            const pattern = /([+\-*/])/
            const digits = /[\d]+/

            input.textContent = input.textContent.trim()
            if(input.textContent[0] === "0" && input.textContent.length === 1){
                input.textContent = ''
            }

            let values = input.textContent.split(pattern)
            let lastNum = values[values.length - 1] || ""

            if(lastNum === ""){
                values.pop(lastNum)
            }
           
            lastNum = values[values.length - 1] || ""
            console.log("Before: ", values)
            if(operation === 'bracket'){
                if(values[0] === "" && values.length === 1){
                    values = []
                }
                if(values.length ===  0 || operands.includes(values[values.length-1])){
                    input.textContent = input.textContent + '('
                    setOpen(true)
                    setBracNum(bracNum + 1)
                }
                else if(operands.includes(lastNum) === false && opened === false) {
                    console.log(lastNum)
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
                if(operands.includes(lastNum) === false && !opened){
                    let temp = lastNum
                    values.splice(values.length - 1, 1, "(" , "-", temp)
                    setOpen(true)
                    setBracNum(bracNum + 1)
                }

                input.textContent = values.join("")
            }
            
            else if (operands.includes(operation)){
                if(operands.includes(lastNum) ){
                    if(lastNum === '/' && operation === "*"){
                        lastNum =  "*"
                    }
                    else if(lastNum === '*' && operation === "/"){
                        lastNum =  "/"
                    }
                    input.textContent = values.join("")
                }
                else{
                    input.textContent = input.textContent + `${operation}`
                }
               
            }

            else if(operation === "."){
                console.log(lastNum)
                if(lastNum.match(digits) && lastNum.includes('.')){

                }
                else if(operands.includes(lastNum) || values.length === 0 ){
                    values.push('0.')
                    input.textContent = values.join("")
                }
                else{
                    let temp = lastNum
                    console.log("Do this one", temp)
                    values[values.length - 1] = `${temp}.`
                    input.textContent = values.join("")
                }
                
            }

            else if(operation === '%'){
                if(lastNum.match(digits) && lastNum.includes(operation) === false){
                    input.textContent = input.textContent + operation
                }
            }

            else{
                console.log("0-9")
                if(lastNum.includes('%')){
                    input.textContent = input.textContent + `*${operation}`
                }
                else if(lastNum.length === 9){

                }
                else{
                    input.textContent = input.textContent + operation
                }
                
            }

            values = input.textContent.split(pattern)
            if(values[values.length - 1] === ""){
                values.pop(values.length - 1)
            }
            console.log("The values and input after ",values, input.textContent)
            console.log(opened, bracNum)
            
            formatEval(values)

        }
        
        function clearDisplay(){
            setOpen(false)
            setBracNum(0)
            setCalculated(false)
            document.getElementById("display").textContent = "0";
            dispatch(actions.clear())
        }

        function Calculate(){
            console.log(calculated, prevValue)
            if(calculated){
                const text = display + prevValue
                console.log(text)
                dispatch(actions.calculate(text))
            }
            else{
                setCalculated(true)
                document.getElementById("display").textContent = display;
                console.log("This one")
                document.querySelector(".result").textContent = "";
            }
           
        }

        if(calculated){
            document.getElementById("display").textContent = display;
            document.querySelector(".result").textContent = "";
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
                <button class='keys operand' id='equals' onClick={() => Calculate()}>=</button>
            </div>
        </>
    )
}

export default Keys
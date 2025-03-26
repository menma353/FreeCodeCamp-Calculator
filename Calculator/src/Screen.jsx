import { useSelector, useDispatch } from "react-redux"
import { actions} from "./Actions"


function Screen(){

    const display = useSelector(state => state.calculate)
    const dispatch = useDispatch()

    function Delete(){
        const pattern = /([+\-*/])/
        let input = document.getElementById("display")
        if(input.textContent.length > 0){
            input.textContent = input.textContent.substring(0, input.textContent.length - 1);  
            let value = input.textContent.split(pattern)
            formatEval(value)
        }
    }

    function formatEval(value){
                const newValue = value.map(val =>  {
                    if(val.includes('%')){
                        val = val.substring(0, val.length - 1);
                        val = Number((val / 100).toFixed(2))
                    }
                    return val
                })
                const evalText = newValue.join('')
                console.log(evalText)
                dispatch(actions.calculate(evalText))
            }
    return(
        <>
            <div class='screen'>
                <div class='calculations'><p id='display'>0</p></div>
                <div class='result'>{display}</div>
                <button class='delete' onClick={Delete}> <i class="material-icons">backspace</i></button>
            </div>
        </>
    )
}


export default Screen
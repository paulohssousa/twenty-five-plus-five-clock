import { useSelector, useDispatch } from 'react-redux'
import Button from "./Button"
import "./break.css"
import { incBreak, decBreak, selectBreak } from '../reducers/timerSlice'

export default function Break () {
    const breakLength = useSelector(selectBreak);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(incBreak())
    }

    const handleDecrement = () => {
        dispatch(decBreak())
    }

    return (
        <div id='break-wrapper'>
            <label id="break-label" htmlFor="break-ctrl">Break Length</label>
            <div id="break-ctrl">
                <Button identifier="break-decrement" content="-" handleClick={handleDecrement}/>
                <span id="break-length">{breakLength}</span>
                <Button identifier="break-increment" content="+" handleClick={handleIncrement}/>
            </div>
        </div>
    )
}
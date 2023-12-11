import { useSelector, useDispatch } from 'react-redux'
import Button from "./Button"
import "./session.css"
import { increment, decrement, selectSession } from "../reducers/timerSlice";

export default function Session () {
    const session = useSelector(selectSession);
    const dispatch = useDispatch()

    const handleIncrement = () => {
        dispatch(increment())
    }

    const handleDecrement = () => {
        dispatch(decrement())
    }

    return (
        <div id="session-wrapper">
            <label id="session-label" htmlFor="session-ctrl">Session Length</label>
            <div id="session-ctrl">
                <Button identifier="session-decrement" content="-" handleClick={handleDecrement}/>
                <span id="session-length">{session}</span>
                <Button identifier="session-increment" content="+" handleClick={handleIncrement}/>
            </div>
        </div>
    )
}
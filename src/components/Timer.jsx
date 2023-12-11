import { useSelector, useDispatch } from 'react-redux'
import Button from "./Button"
import "./timer.css"
import { selectLabel, reset, tick, selectMinutes, selectSeconds } from '../reducers/timerSlice'
import { useCallback, useEffect, useRef, useState } from 'react'
import wav from '../audio/96063__reecord2__alarm-beep-electronic.wav'

// function useInterval(callback, delay) {
//     const savedCallback = useRef();
   
//     // Remember the latest callback.
//     useEffect(() => {
//       savedCallback.current = callback;
//     }, [callback]);
   
//     // Set up the interval.
//     useEffect(() => {
//       function tick() {
//         savedCallback.current();
//       }
//       if (delay !== null) {
//         let id = setInterval(tick, delay);
//         return () => clearInterval(id);
//       }
//     }, [delay]);
//   }

export default function Timer() {
    const timerLabel = useSelector(selectLabel);
    const minutes = useSelector(selectMinutes);
    const seconds = useSelector(selectSeconds);
    const [running, setRunning] = useState(false);
    const [playStop, setPlayStop] = useState("play");
    const audio = useRef(null);
    const timeLeft = useRef(null);
    const dispatch = useDispatch();
    
    const playAlarm  = useCallback(() => {
        audio.current.currentTime = 0;
        audio.current.play().catch(error => console.log(error));
    }, []);

    const pauseAlarm = () => {
        audio.current.pause();
        audio.current.currentTime = 0;
    }
    
    let timer = useRef(null);
    
    const handleStart = () => {
        if (running) {
            setPlayStop("play");
            pauseAlarm();
            clearInterval(timer.current);
            setRunning(!running);
            return
        } 
        setPlayStop("stop");
        timer.current = setInterval(() => {
            dispatch(tick());
        }, 1000);
        setRunning(!running);
    }
    
    useEffect(() => {
        if (minutes < 1) {
            timeLeft.current.classList.add("time-alert")
        }
        if (minutes >= 1) {
            timeLeft.current.classList.remove("time-alert")
        }
        if (minutes === 0 && seconds === 0) {
            playAlarm();
        }
    }, [minutes, seconds, playAlarm])
    

    const handleReset = () => {
        pauseAlarm();
        clearInterval(timer.current);
        dispatch(reset());
        setPlayStop("play");
        timeLeft.current.classList.remove("time-alert")
        if (running) {
            setRunning(!running);
         }
    }

    return (
        <div id="timer-wrapper">
            <label id="timer-label" htmlFor="controls" >{timerLabel}</label>
            <span id="time-left" ref={timeLeft}>{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}</span>
            <div id="controls" >
                <Button identifier="start_stop" content={playStop} handleClick={handleStart}/>
                <Button identifier="reset" content="reset" handleClick={handleReset}/>
            </div>
            <audio type="audio/wav"  id="beep" ref={audio} src={wav} autoPlay={false}></audio>
        </div>
    )
}
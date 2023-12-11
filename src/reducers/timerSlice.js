import { createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
    name: "timer",
    initialState: {
        label: "Session",
        minutes: 25,
        seconds: 0,
        session: 25,
        break: 5
    },
    reducers: {
        reset: state => {
            state.label = "Session";
            state.minutes = 25;
            state.seconds = 0;
            state.session = 25;
            state.break = 5;
        },
        tick: state => {
            if (state.minutes === 0 && state.seconds === 0) {
                if (state.label === "Session") {
                    state.label = "Break";
                    state.minutes = state.break;
                    state.seconds = 0;
                    return
                }
                state.label = "Session";
                state.minutes = state.session;
                state.seconds = 0;
                return
            }
            if (state.seconds <= 0 ) {
                state.minutes -= 1;
                state.seconds = 59;
                return
            } 
            state.seconds -= 1
        },
        increment: state => {
            if (state.session < 60) {
                state.minutes += 1;
                state.session += 1;
            }
        },
        decrement: state => {
            if (state.session > 1) {
                state.minutes -= 1;
                state.session -= 1
            }
        },
        incBreak: state => {
            if (state.break < 60) {
                state.break += 1;
            }
        },
        decBreak: state => {
            if (state.break > 1) {
                state.break -= 1;
            }
        }
    }
})



export const { reset, tick, increment, decrement, incBreak, decBreak } = timerSlice.actions;

export const selectMinutes = (state) => state.timer.minutes;

export const selectSeconds = (state) => state.timer.seconds;

export const selectSession = (state) => state.timer.session;

export const selectBreak = (state) => state.timer.break;

export const selectLabel = (state) => state.timer.label;

export const selectDelay = (state) => state.timer.delay;

export default timerSlice.reducer;
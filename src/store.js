import { configureStore } from '@reduxjs/toolkit'
import timerReducer from './reducers/timerSlice'

export default configureStore({
    reducer: {
        timer: timerReducer
    }
})
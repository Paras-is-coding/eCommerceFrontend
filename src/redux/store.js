import { configureStore } from "@reduxjs/toolkit"
import UserReducers from "./reducers/user.reducers"


const store = configureStore({
    reducer: {
        User: UserReducers
    }
})

export default store
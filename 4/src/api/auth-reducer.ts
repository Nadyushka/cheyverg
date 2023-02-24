import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../app/app-reducer'
import {authAPI} from "./todolists-api";
import {handleServerAppError} from "../utils/error-utils";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN': {
            debugger
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: any) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            // handleServerAppError(res.data.data,dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e: any) {
        // handleServerAppError(e,dispatch)
        dispatch(setAppStatusAC('failed'))
    }

}

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            // handleServerAppError(res.data.data,dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e: any) {
        debugger
        console.log(e)
        // handleServerAppError(e,dispatch)
        dispatch(setAppStatusAC('failed'))
    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType

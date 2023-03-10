import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from "./store";
import {changeTaskTitleAC} from "./tasks-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetToDoType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOS": {
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const setToDos = (todos: TodolistType[]) => {
    return {
        type: 'SET-TODOS',
        todos
    } as const
}

export type SetToDoType = ReturnType<typeof setToDos>


export const getToDoListsTC = () => (dispatch: Dispatch) => {
    return todolistsAPI.getTodolists()
        .then((res) => {
            let todos = res.data;
            dispatch(setToDos(todos))
        })
}

export const addToDoListsTC = (title: string) => (dispatch: Dispatch) => {
    return todolistsAPI.createTodolist(title)
        .then((res) => {
            let newToDo = res.data.data.item.title;
            dispatch(addTodolistAC(newToDo))
        })
}

export const deleteToDoListsTC = (todoListId: string) => (dispatch: Dispatch) => {
    return todolistsAPI.deleteTodolist(todoListId)
        .then((res) => {
            dispatch(removeTodolistAC(todoListId))
        })
}


export const updateToDoTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const allToDoFromState = getState().todolists;
        const todo = allToDoFromState.find(t => {
            return t.id === todolistId
        })

        if (todo) {
            todolistsAPI.updateTodolist(todolistId, title)
                .then(() => {
                    const action = changeTodolistTitleAC(todolistId, title)
                    dispatch(action)
                })
        }
    }
}


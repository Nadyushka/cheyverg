import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {todoListApi} from "../api/todoList-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a99718f7-23ff-4c8c-aaa8-bda50310d20d',
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        todoListApi.get()
            .then(res => {
                const result = res.data
                setState(result)
            })


    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoName = 'REACT&REDAX';
        // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: todoName}, settings)
        //
        todoListApi.create(todoName)
            .then(res => {
                const result = res.data
                setState(result)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '39b322e8-e096-4e1a-8d1d-a25d88d1640b';
        // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, settings)
        todoListApi.delete(todoId)
            .then(res => {
                const result = res.data
                setState(result)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoName = 'REACT++';
        const todoId = '39b322e8-e096-4e1a-8d1d-a25d88d1640b'

        todoListApi.update(todoId, todoName)
            .then(res => {
                const result = res
                setState(result)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}


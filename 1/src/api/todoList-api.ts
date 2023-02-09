import axios from "axios";

const settings = {}

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1',
        withCredentials: true,
        headers: {
            'API-KEY': 'a99718f7-23ff-4c8c-aaa8-bda50310d20d',
        }
    }
)


export const todoListApi = {
    update: (todoId: string, title: string) => {
        return instance.put<todoListType>(`/todo-lists/${todoId}`, {title})
    },
    create: (title: string) => {
        return instance.post<todoListType<{item: ItemType}>>('/todo-lists', {title})
    },
    delete: (todoId: string) => {
        return instance.delete<todoListType>(`/todo-lists/${todoId}`)
    },
    get: () => {
        return instance.get<todoListType<{item: ItemType}>>('/todo-lists')

    }
}

type ItemType = {
        id: string
        title: string
        addedDate: string
        order: number
}

type todoListType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../helpers/todosAcess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoAccess = new TodoAccess()

export async function getTodosForUser(userId: string) {
    return await todoAccess.getAllTodos(userId);
}

export async function createTodo(
    createTodoRequest: CreateTodoRequest,
    userId: string
): Promise<TodoItem> {
    const itemId = uuid.v4()
    return await todoAccess.saveTodo({
        todoId: itemId,
        userId: userId,
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false,
        createdAt: new Date().toISOString(),
        attachmentUrl: ''
    })
}

export async function updateTodo(
    updateTodoRequest: UpdateTodoRequest,
    todoId: string, userId: string
) {
    return await todoAccess.updateTodo(todoId, userId, updateTodoRequest)
}

export async function deleteTodo(todoId: string, userId: string) {
    return await todoAccess.deleteTodo(todoId, userId)
}


export async function todoExists(todoId: string) {
    return await todoAccess.todoExists(todoId);
}

export async function createAttachmentPresignedUrl(todoId: string, userId: string) {
    return await todoAccess.createAttachImageUrl(todoId, userId);
}
import { TodoAccess } from './todosAcess'
import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// const logger = createLogger('TodosBusinessLogic')

const todoAccess = new TodoAccess()

export async function actionToGetTodosForUser(userId: string) {
    return await todoAccess.getAllTodos(userId);
}

export async function actionTocreateTodoItem(todoItem: TodoItem): Promise<TodoItem> {
    return await todoAccess.saveTodo(todoItem)
}

export async function actionToUpdateTodoItem(
    updateTodoRequest: UpdateTodoRequest,
    todoId: string, userId: string
) {
    return await todoAccess.updateTodo(todoId, userId, updateTodoRequest)
}

export async function actionToDeleteTodoItem(todoId: string, userId: string) {
    return await todoAccess.deleteTodo(todoId, userId)
}


export async function actionToVerifyTodoExists(todoId: string) {
    return await todoAccess.todoExists(todoId);
}

export async function actionToCreateAttachmentPresignedUrl(todoId: string, userId: string) {
    return await todoAccess.createAttachImageUrl(todoId, userId);
}
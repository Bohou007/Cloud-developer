// import * as uuid from 'uuid'

// import { TodoItem } from '../models/TodoItem'
// // import {
// //   actionTocreateTodoItem, actionToGetTodosForUser,
// //   actionToUpdateTodoItem, actionToDeleteTodoItem, actionToVerifyTodoExists,
// //   actionToCreateAttachmentPresignedUrl
// // } from '../helpers/todos'

// import {
//   actionTocreateTodoItem
// } from '../helpers/todos'
// import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// // import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'



// // export async function getTodosForUser(userId: string) {
// //   return await actionToGetTodosForUser(userId);
// // }

// export async function createTodo(
//   createTodoRequest: CreateTodoRequest,
//   userId: string
// ): Promise<TodoItem> {
//   const itemId = uuid.v4()
//   return await actionTocreateTodoItem({
//     todoId: itemId,
//     userId: userId,
//     name: createTodoRequest.name,
//     dueDate: createTodoRequest.dueDate,
//     done: false,
//     createdAt: new Date().toISOString()
//   })
// }

// // export async function updateTodo(
// //   todo: UpdateTodoRequest,
// //   todoId: string, userId: string
// // ) {
// //   return await actionToUpdateTodoItem(todo, todoId, userId)
// // }

// // export async function deleteTodo(todoId: string, userId: string) {
// //   return await actionToDeleteTodoItem(todoId, userId)
// // }


// // export async function todoExists(todoId: string) {
// //   return await actionToVerifyTodoExists(todoId);
// // }

// // export async function createAttachmentPresignedUrl(todoId: string, userId: string) {
// //   return await actionToCreateAttachmentPresignedUrl(todoId, userId);
// // }
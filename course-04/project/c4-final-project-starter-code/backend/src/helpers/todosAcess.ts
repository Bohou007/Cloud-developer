import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk-core'

import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { AttachmentUtils } from './attachmentUtils'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
const AWSXRay = require('aws-xray-sdk')

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('TodosAccess')
export class TodoAccess {

    constructor(
        private docClient: DocumentClient = createDynamoDBClient(),
        private attachementCtrl: AttachmentUtils = new AttachmentUtils(),
        private todosTable = process.env.TODOS_TABLE) {
    }

    // Get All todo by user id 
    async getAllTodos(userId: string) {
        logger.info('Getting all todos for user ID : ', userId)
        const res = await this.docClient
            .query({
                TableName: this.todosTable,
                KeyConditionExpression: 'userId = :userId',
                ExpressionAttributeValues: {
                    ':userId': userId
                },
                ScanIndexForward: false
            })
            .promise()
        return res.Items as TodoItem[]
    }

    // Action to save Todo item
    async saveTodo(todo: TodoItem): Promise<TodoItem> {
        await this.docClient.put({
            TableName: this.todosTable,
            Item: todo
        }).promise()
        return todo
    }

    // Action to udapte Todo item
    async updateTodo(todoId: string, userId: string, todo: any) {
        return await this.docClient
            .update(
                {
                    TableName: this.todosTable,
                    Key: { userId, todoId },
                    ExpressionAttributeNames: { '#N': 'name' },
                    UpdateExpression: 'set #N=:todoName, dueDate=:dueDate, done=:done',
                    ExpressionAttributeValues: {
                        ':todoName': todo.name,
                        ':dueDate': todo.dueDate,
                        ':done': todo.done
                    },
                    ReturnValues: 'UPDATED_NEW'
                },
                function (err, data) {
                    if (err) {
                        const error = JSON.stringify(err, null, 2)
                        logger.error('=> Unable to update todo item. Error JSON:', error)
                    } else {
                        const updatedTodoItem = JSON.stringify(data, null, 2)
                        logger.info('=> Successfully updated todo item:', updatedTodoItem)
                    }
                }
            )
            .promise()
    }

    // Action to delete todo item
    async deleteTodo(todoId: string, userId: string) {
        return await this.docClient
            .delete({
                TableName: this.todosTable,
                Key: { userId, todoId }
            })
            .promise()
    }

    // Action to verify if todo id is already exists
    async todoExists(todoId: string) {
        const result = await this.docClient
            .get({
                TableName: this.todosTable,
                Key: {
                    todoId: todoId
                }
            })
            .promise()

        console.log('Get todo: ', result)
        return !!result.Item
    }

    async createAttachImageUrl(
        todoId: string,
        userId: string
    ) {
        const UploadUrl = await this.attachementCtrl.getUploadUrl(todoId);
        const attachementUrl = await this.attachementCtrl.getAttachmentUrl(todoId);
        await this.docClient
            .update(
                {
                    TableName: this.todosTable,
                    Key: { userId, todoId },
                    UpdateExpression: 'set attachmentUrl=:attachmentUrl',
                    ExpressionAttributeValues: {
                        ':attachmentUrl': attachementUrl
                    },
                    ReturnValues: 'UPDATED_NEW'
                },
                function (err, data) {
                    if (err) {
                        const error = JSON.stringify(err)
                        logger.error('Update todo item. Error JSON:', error)
                    } else {
                        const updatedItem = JSON.stringify(data)
                        logger.info('Successfully updated todo item:', updatedItem)
                    }
                }
            )
            .promise()
        return UploadUrl;
    }

}

function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
        console.log('Creating a local DynamoDB instance')
        return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }

    return new XAWS.DynamoDB.DocumentClient()
}

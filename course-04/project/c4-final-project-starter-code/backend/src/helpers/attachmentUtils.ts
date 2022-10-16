import * as AWS from 'aws-sdk'
import { createLogger } from '../utils/logger'
const AWSXRay = require('aws-xray-sdk')

const XAWS = AWSXRay.captureAWS(AWS)
// TODO: Implement the fileStogare logic
const logger = createLogger('AttachmentUtils')
export class AttachmentUtils {
    constructor(
        private readonly s3 = createS3Bucket(),
        private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
        private readonly urlExpiration = +process.env.SIGNED_URL_EXPIRATION
    ) { }

    async getUploadUrl(todoId: string): Promise<string> {
        logger.info(`Getting upload url for todo item with id ${todoId}`)
        return this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: todoId,
            Expires: this.urlExpiration
        })
    }

    getAttachmentUrl(todoId: string): string {
        logger.info(`Getting attachement url for todo item with id ${todoId}`)
        return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
    }
}


const createS3Bucket = () =>
    new XAWS.S3({
        signatureVersion: 'v4'
    })
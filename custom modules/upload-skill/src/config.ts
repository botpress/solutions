/**
 * Anything that you would like to make configurable to the bot owner would go in this file.
 * Botpress handles itself loading the configuration files.
 *
 * Bot configuration files will override Global configuration when available:
 * For example, `data/bots/MY_BOT/config/complete-module.json` will be used by MY_BOT, while `data/global/config/complete-module.json` will be used for all others
 */
export interface Config {
  /**
   * @default false
   */
  uploadsUseS3?: boolean
  /**
   * @default bucket-name
   */
  uploadsS3Bucket?: string
  /**
   * @default eu-west-1
   */
  uploadsS3Region?: string
  /**
   * @default your-aws-key-name
   */
  uploadsS3AWSAccessKey?: string
  /**
   * @default secret-key
   */
  uploadsS3AWSAccessSecret?: string
  /**
   * Maximum file size for media files upload (in mb)
   * @default 25mb
   */
  maxFileSize: string

  /**
   * The list of allowed extensions for media file uploads
   * @default ["image/jpeg","image/png","image/gif","image/bmp","image/webp","audio/mpeg","audio/webm","audio/ogg","audio/wav","video/mp4","video/webm","video/ogg","application/pdf"]
   * @TJS-type Array<string>
   */
  allowedMimeTypes: Array<string>
}

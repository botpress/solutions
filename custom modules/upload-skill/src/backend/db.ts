import * as sdk from 'botpress/sdk'
import { TABLE_NAME } from '../constants'
import _ from 'lodash'

export interface IMediaFile {
  id: string
  name: string
  size: Number
  data: any
}

export default class Db {
  constructor(private bp: typeof sdk) {}

  getMediaFile = (id: string) => {
    return this.bp
      .database<IMediaFile>(TABLE_NAME)
      .select('*')
      .where({ id })
      .first()
  }

  insertMediaFile = async (mediaFile: IMediaFile) => {
    return await this.bp.database(TABLE_NAME).insert(mediaFile)
  }

  clearFiles = async (threadId: string) => {
    return await this.bp
      .database(TABLE_NAME)
      .where({ threadId })
      .del()
  }
}

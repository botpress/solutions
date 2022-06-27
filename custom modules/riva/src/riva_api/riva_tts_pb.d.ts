// package: nvidia.riva.tts
// file: riva_tts.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from 'google-protobuf'
import * as riva_audio_pb from './riva_audio_pb'

export class SynthesizeSpeechRequest extends jspb.Message {
  getText(): string
  setText(value: string): SynthesizeSpeechRequest
  getLanguageCode(): string
  setLanguageCode(value: string): SynthesizeSpeechRequest
  getEncoding(): riva_audio_pb.AudioEncoding
  setEncoding(value: riva_audio_pb.AudioEncoding): SynthesizeSpeechRequest
  getSampleRateHz(): number
  setSampleRateHz(value: number): SynthesizeSpeechRequest
  getVoiceName(): string
  setVoiceName(value: string): SynthesizeSpeechRequest

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): SynthesizeSpeechRequest.AsObject
  static toObject(includeInstance: boolean, msg: SynthesizeSpeechRequest): SynthesizeSpeechRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: SynthesizeSpeechRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): SynthesizeSpeechRequest
  static deserializeBinaryFromReader(
    message: SynthesizeSpeechRequest,
    reader: jspb.BinaryReader
  ): SynthesizeSpeechRequest
}

export namespace SynthesizeSpeechRequest {
  export type AsObject = {
    text: string
    languageCode: string
    encoding: riva_audio_pb.AudioEncoding
    sampleRateHz: number
    voiceName: string
  }
}

export class SynthesizeSpeechResponseMetadata extends jspb.Message {
  getText(): string
  setText(value: string): SynthesizeSpeechResponseMetadata
  getProcessedText(): string
  setProcessedText(value: string): SynthesizeSpeechResponseMetadata
  clearPredictedDurationsList(): void
  getPredictedDurationsList(): Array<number>
  setPredictedDurationsList(value: Array<number>): SynthesizeSpeechResponseMetadata
  addPredictedDurations(value: number, index?: number): number

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): SynthesizeSpeechResponseMetadata.AsObject
  static toObject(
    includeInstance: boolean,
    msg: SynthesizeSpeechResponseMetadata
  ): SynthesizeSpeechResponseMetadata.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: SynthesizeSpeechResponseMetadata, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): SynthesizeSpeechResponseMetadata
  static deserializeBinaryFromReader(
    message: SynthesizeSpeechResponseMetadata,
    reader: jspb.BinaryReader
  ): SynthesizeSpeechResponseMetadata
}

export namespace SynthesizeSpeechResponseMetadata {
  export type AsObject = {
    text: string
    processedText: string
    predictedDurationsList: Array<number>
  }
}

export class SynthesizeSpeechResponse extends jspb.Message {
  getAudio(): Uint8Array | string
  getAudio_asU8(): Uint8Array
  getAudio_asB64(): string
  setAudio(value: Uint8Array | string): SynthesizeSpeechResponse

  hasMeta(): boolean
  clearMeta(): void
  getMeta(): SynthesizeSpeechResponseMetadata | undefined
  setMeta(value?: SynthesizeSpeechResponseMetadata): SynthesizeSpeechResponse

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): SynthesizeSpeechResponse.AsObject
  static toObject(includeInstance: boolean, msg: SynthesizeSpeechResponse): SynthesizeSpeechResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: SynthesizeSpeechResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): SynthesizeSpeechResponse
  static deserializeBinaryFromReader(
    message: SynthesizeSpeechResponse,
    reader: jspb.BinaryReader
  ): SynthesizeSpeechResponse
}

export namespace SynthesizeSpeechResponse {
  export type AsObject = {
    audio: Uint8Array | string
    meta?: SynthesizeSpeechResponseMetadata.AsObject
  }
}

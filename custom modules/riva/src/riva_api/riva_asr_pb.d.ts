// package: nvidia.riva.asr
// file: riva_asr.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from 'google-protobuf'
import * as riva_audio_pb from './riva_audio_pb'

export class RecognizeRequest extends jspb.Message {
  hasConfig(): boolean
  clearConfig(): void
  getConfig(): RecognitionConfig | undefined
  setConfig(value?: RecognitionConfig): RecognizeRequest
  getAudio(): Uint8Array | string
  getAudio_asU8(): Uint8Array
  getAudio_asB64(): string
  setAudio(value: Uint8Array | string): RecognizeRequest

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): RecognizeRequest.AsObject
  static toObject(includeInstance: boolean, msg: RecognizeRequest): RecognizeRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: RecognizeRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): RecognizeRequest
  static deserializeBinaryFromReader(message: RecognizeRequest, reader: jspb.BinaryReader): RecognizeRequest
}

export namespace RecognizeRequest {
  export type AsObject = {
    config?: RecognitionConfig.AsObject
    audio: Uint8Array | string
  }
}

export class StreamingRecognizeRequest extends jspb.Message {
  hasStreamingConfig(): boolean
  clearStreamingConfig(): void
  getStreamingConfig(): StreamingRecognitionConfig | undefined
  setStreamingConfig(value?: StreamingRecognitionConfig): StreamingRecognizeRequest

  hasAudioContent(): boolean
  clearAudioContent(): void
  getAudioContent(): Uint8Array | string
  getAudioContent_asU8(): Uint8Array
  getAudioContent_asB64(): string
  setAudioContent(value: Uint8Array | string): StreamingRecognizeRequest

  getStreamingRequestCase(): StreamingRecognizeRequest.StreamingRequestCase

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): StreamingRecognizeRequest.AsObject
  static toObject(includeInstance: boolean, msg: StreamingRecognizeRequest): StreamingRecognizeRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: StreamingRecognizeRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): StreamingRecognizeRequest
  static deserializeBinaryFromReader(
    message: StreamingRecognizeRequest,
    reader: jspb.BinaryReader
  ): StreamingRecognizeRequest
}

export namespace StreamingRecognizeRequest {
  export type AsObject = {
    streamingConfig?: StreamingRecognitionConfig.AsObject
    audioContent: Uint8Array | string
  }

  export enum StreamingRequestCase {
    STREAMING_REQUEST_NOT_SET = 0,
    STREAMING_CONFIG = 1,
    AUDIO_CONTENT = 2
  }
}

export class RecognitionConfig extends jspb.Message {
  getEncoding(): riva_audio_pb.AudioEncoding
  setEncoding(value: riva_audio_pb.AudioEncoding): RecognitionConfig
  getSampleRateHertz(): number
  setSampleRateHertz(value: number): RecognitionConfig
  getLanguageCode(): string
  setLanguageCode(value: string): RecognitionConfig
  getMaxAlternatives(): number
  setMaxAlternatives(value: number): RecognitionConfig
  clearSpeechContextsList(): void
  getSpeechContextsList(): Array<SpeechContext>
  setSpeechContextsList(value: Array<SpeechContext>): RecognitionConfig
  addSpeechContexts(value?: SpeechContext, index?: number): SpeechContext
  getAudioChannelCount(): number
  setAudioChannelCount(value: number): RecognitionConfig
  getEnableWordTimeOffsets(): boolean
  setEnableWordTimeOffsets(value: boolean): RecognitionConfig
  getEnableAutomaticPunctuation(): boolean
  setEnableAutomaticPunctuation(value: boolean): RecognitionConfig
  getEnableSeparateRecognitionPerChannel(): boolean
  setEnableSeparateRecognitionPerChannel(value: boolean): RecognitionConfig
  getModel(): string
  setModel(value: string): RecognitionConfig
  getVerbatimTranscripts(): boolean
  setVerbatimTranscripts(value: boolean): RecognitionConfig

  getCustomConfigurationMap(): jspb.Map<string, string>
  clearCustomConfigurationMap(): void

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): RecognitionConfig.AsObject
  static toObject(includeInstance: boolean, msg: RecognitionConfig): RecognitionConfig.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: RecognitionConfig, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): RecognitionConfig
  static deserializeBinaryFromReader(message: RecognitionConfig, reader: jspb.BinaryReader): RecognitionConfig
}

export namespace RecognitionConfig {
  export type AsObject = {
    encoding: riva_audio_pb.AudioEncoding
    sampleRateHertz: number
    languageCode: string
    maxAlternatives: number
    speechContextsList: Array<SpeechContext.AsObject>
    audioChannelCount: number
    enableWordTimeOffsets: boolean
    enableAutomaticPunctuation: boolean
    enableSeparateRecognitionPerChannel: boolean
    model: string
    verbatimTranscripts: boolean

    customConfigurationMap: Array<[string, string]>
  }
}

export class StreamingRecognitionConfig extends jspb.Message {
  hasConfig(): boolean
  clearConfig(): void
  getConfig(): RecognitionConfig | undefined
  setConfig(value?: RecognitionConfig): StreamingRecognitionConfig
  getInterimResults(): boolean
  setInterimResults(value: boolean): StreamingRecognitionConfig

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): StreamingRecognitionConfig.AsObject
  static toObject(includeInstance: boolean, msg: StreamingRecognitionConfig): StreamingRecognitionConfig.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: StreamingRecognitionConfig, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): StreamingRecognitionConfig
  static deserializeBinaryFromReader(
    message: StreamingRecognitionConfig,
    reader: jspb.BinaryReader
  ): StreamingRecognitionConfig
}

export namespace StreamingRecognitionConfig {
  export type AsObject = {
    config?: RecognitionConfig.AsObject
    interimResults: boolean
  }
}

export class SpeechContext extends jspb.Message {
  clearPhrasesList(): void
  getPhrasesList(): Array<string>
  setPhrasesList(value: Array<string>): SpeechContext
  addPhrases(value: string, index?: number): string
  getBoost(): number
  setBoost(value: number): SpeechContext

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): SpeechContext.AsObject
  static toObject(includeInstance: boolean, msg: SpeechContext): SpeechContext.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: SpeechContext, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): SpeechContext
  static deserializeBinaryFromReader(message: SpeechContext, reader: jspb.BinaryReader): SpeechContext
}

export namespace SpeechContext {
  export type AsObject = {
    phrasesList: Array<string>
    boost: number
  }
}

export class RecognizeResponse extends jspb.Message {
  clearResultsList(): void
  getResultsList(): Array<SpeechRecognitionResult>
  setResultsList(value: Array<SpeechRecognitionResult>): RecognizeResponse
  addResults(value?: SpeechRecognitionResult, index?: number): SpeechRecognitionResult

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): RecognizeResponse.AsObject
  static toObject(includeInstance: boolean, msg: RecognizeResponse): RecognizeResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: RecognizeResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): RecognizeResponse
  static deserializeBinaryFromReader(message: RecognizeResponse, reader: jspb.BinaryReader): RecognizeResponse
}

export namespace RecognizeResponse {
  export type AsObject = {
    resultsList: Array<SpeechRecognitionResult.AsObject>
  }
}

export class SpeechRecognitionResult extends jspb.Message {
  clearAlternativesList(): void
  getAlternativesList(): Array<SpeechRecognitionAlternative>
  setAlternativesList(value: Array<SpeechRecognitionAlternative>): SpeechRecognitionResult
  addAlternatives(value?: SpeechRecognitionAlternative, index?: number): SpeechRecognitionAlternative
  getChannelTag(): number
  setChannelTag(value: number): SpeechRecognitionResult
  getAudioProcessed(): number
  setAudioProcessed(value: number): SpeechRecognitionResult

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): SpeechRecognitionResult.AsObject
  static toObject(includeInstance: boolean, msg: SpeechRecognitionResult): SpeechRecognitionResult.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: SpeechRecognitionResult, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): SpeechRecognitionResult
  static deserializeBinaryFromReader(
    message: SpeechRecognitionResult,
    reader: jspb.BinaryReader
  ): SpeechRecognitionResult
}

export namespace SpeechRecognitionResult {
  export type AsObject = {
    alternativesList: Array<SpeechRecognitionAlternative.AsObject>
    channelTag: number
    audioProcessed: number
  }
}

export class SpeechRecognitionAlternative extends jspb.Message {
  getTranscript(): string
  setTranscript(value: string): SpeechRecognitionAlternative
  getConfidence(): number
  setConfidence(value: number): SpeechRecognitionAlternative
  clearWordsList(): void
  getWordsList(): Array<WordInfo>
  setWordsList(value: Array<WordInfo>): SpeechRecognitionAlternative
  addWords(value?: WordInfo, index?: number): WordInfo

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): SpeechRecognitionAlternative.AsObject
  static toObject(includeInstance: boolean, msg: SpeechRecognitionAlternative): SpeechRecognitionAlternative.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: SpeechRecognitionAlternative, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): SpeechRecognitionAlternative
  static deserializeBinaryFromReader(
    message: SpeechRecognitionAlternative,
    reader: jspb.BinaryReader
  ): SpeechRecognitionAlternative
}

export namespace SpeechRecognitionAlternative {
  export type AsObject = {
    transcript: string
    confidence: number
    wordsList: Array<WordInfo.AsObject>
  }
}

export class WordInfo extends jspb.Message {
  getStartTime(): number
  setStartTime(value: number): WordInfo
  getEndTime(): number
  setEndTime(value: number): WordInfo
  getWord(): string
  setWord(value: string): WordInfo

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): WordInfo.AsObject
  static toObject(includeInstance: boolean, msg: WordInfo): WordInfo.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: WordInfo, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): WordInfo
  static deserializeBinaryFromReader(message: WordInfo, reader: jspb.BinaryReader): WordInfo
}

export namespace WordInfo {
  export type AsObject = {
    startTime: number
    endTime: number
    word: string
  }
}

export class StreamingRecognizeResponse extends jspb.Message {
  clearResultsList(): void
  getResultsList(): Array<StreamingRecognitionResult>
  setResultsList(value: Array<StreamingRecognitionResult>): StreamingRecognizeResponse
  addResults(value?: StreamingRecognitionResult, index?: number): StreamingRecognitionResult

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): StreamingRecognizeResponse.AsObject
  static toObject(includeInstance: boolean, msg: StreamingRecognizeResponse): StreamingRecognizeResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: StreamingRecognizeResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): StreamingRecognizeResponse
  static deserializeBinaryFromReader(
    message: StreamingRecognizeResponse,
    reader: jspb.BinaryReader
  ): StreamingRecognizeResponse
}

export namespace StreamingRecognizeResponse {
  export type AsObject = {
    resultsList: Array<StreamingRecognitionResult.AsObject>
  }
}

export class StreamingRecognitionResult extends jspb.Message {
  clearAlternativesList(): void
  getAlternativesList(): Array<SpeechRecognitionAlternative>
  setAlternativesList(value: Array<SpeechRecognitionAlternative>): StreamingRecognitionResult
  addAlternatives(value?: SpeechRecognitionAlternative, index?: number): SpeechRecognitionAlternative
  getIsFinal(): boolean
  setIsFinal(value: boolean): StreamingRecognitionResult
  getStability(): number
  setStability(value: number): StreamingRecognitionResult
  getChannelTag(): number
  setChannelTag(value: number): StreamingRecognitionResult
  getAudioProcessed(): number
  setAudioProcessed(value: number): StreamingRecognitionResult

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): StreamingRecognitionResult.AsObject
  static toObject(includeInstance: boolean, msg: StreamingRecognitionResult): StreamingRecognitionResult.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: StreamingRecognitionResult, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): StreamingRecognitionResult
  static deserializeBinaryFromReader(
    message: StreamingRecognitionResult,
    reader: jspb.BinaryReader
  ): StreamingRecognitionResult
}

export namespace StreamingRecognitionResult {
  export type AsObject = {
    alternativesList: Array<SpeechRecognitionAlternative.AsObject>
    isFinal: boolean
    stability: number
    channelTag: number
    audioProcessed: number
  }
}

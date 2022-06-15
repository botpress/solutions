// package: nvidia.riva.nlp
// file: riva_nlp.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from 'google-protobuf'

export class NLPModelParams extends jspb.Message {
  getModelName(): string
  setModelName(value: string): NLPModelParams
  getLanguageCode(): string
  setLanguageCode(value: string): NLPModelParams

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): NLPModelParams.AsObject
  static toObject(includeInstance: boolean, msg: NLPModelParams): NLPModelParams.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: NLPModelParams, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): NLPModelParams
  static deserializeBinaryFromReader(message: NLPModelParams, reader: jspb.BinaryReader): NLPModelParams
}

export namespace NLPModelParams {
  export type AsObject = {
    modelName: string
    languageCode: string
  }
}

export class TextTransformRequest extends jspb.Message {
  clearTextList(): void
  getTextList(): Array<string>
  setTextList(value: Array<string>): TextTransformRequest
  addText(value: string, index?: number): string
  getTopN(): number
  setTopN(value: number): TextTransformRequest

  hasModel(): boolean
  clearModel(): void
  getModel(): NLPModelParams | undefined
  setModel(value?: NLPModelParams): TextTransformRequest

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): TextTransformRequest.AsObject
  static toObject(includeInstance: boolean, msg: TextTransformRequest): TextTransformRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: TextTransformRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): TextTransformRequest
  static deserializeBinaryFromReader(message: TextTransformRequest, reader: jspb.BinaryReader): TextTransformRequest
}

export namespace TextTransformRequest {
  export type AsObject = {
    textList: Array<string>
    topN: number
    model?: NLPModelParams.AsObject
  }
}

export class TextTransformResponse extends jspb.Message {
  clearTextList(): void
  getTextList(): Array<string>
  setTextList(value: Array<string>): TextTransformResponse
  addText(value: string, index?: number): string

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): TextTransformResponse.AsObject
  static toObject(includeInstance: boolean, msg: TextTransformResponse): TextTransformResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: TextTransformResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): TextTransformResponse
  static deserializeBinaryFromReader(message: TextTransformResponse, reader: jspb.BinaryReader): TextTransformResponse
}

export namespace TextTransformResponse {
  export type AsObject = {
    textList: Array<string>
  }
}

export class TextClassRequest extends jspb.Message {
  clearTextList(): void
  getTextList(): Array<string>
  setTextList(value: Array<string>): TextClassRequest
  addText(value: string, index?: number): string
  getTopN(): number
  setTopN(value: number): TextClassRequest

  hasModel(): boolean
  clearModel(): void
  getModel(): NLPModelParams | undefined
  setModel(value?: NLPModelParams): TextClassRequest

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): TextClassRequest.AsObject
  static toObject(includeInstance: boolean, msg: TextClassRequest): TextClassRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: TextClassRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): TextClassRequest
  static deserializeBinaryFromReader(message: TextClassRequest, reader: jspb.BinaryReader): TextClassRequest
}

export namespace TextClassRequest {
  export type AsObject = {
    textList: Array<string>
    topN: number
    model?: NLPModelParams.AsObject
  }
}

export class Classification extends jspb.Message {
  getClassName(): string
  setClassName(value: string): Classification
  getScore(): number
  setScore(value: number): Classification

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): Classification.AsObject
  static toObject(includeInstance: boolean, msg: Classification): Classification.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: Classification, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): Classification
  static deserializeBinaryFromReader(message: Classification, reader: jspb.BinaryReader): Classification
}

export namespace Classification {
  export type AsObject = {
    className: string
    score: number
  }
}

export class Span extends jspb.Message {
  getStart(): number
  setStart(value: number): Span
  getEnd(): number
  setEnd(value: number): Span

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): Span.AsObject
  static toObject(includeInstance: boolean, msg: Span): Span.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: Span, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): Span
  static deserializeBinaryFromReader(message: Span, reader: jspb.BinaryReader): Span
}

export namespace Span {
  export type AsObject = {
    start: number
    end: number
  }
}

export class ClassificationResult extends jspb.Message {
  clearLabelsList(): void
  getLabelsList(): Array<Classification>
  setLabelsList(value: Array<Classification>): ClassificationResult
  addLabels(value?: Classification, index?: number): Classification

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): ClassificationResult.AsObject
  static toObject(includeInstance: boolean, msg: ClassificationResult): ClassificationResult.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: ClassificationResult, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): ClassificationResult
  static deserializeBinaryFromReader(message: ClassificationResult, reader: jspb.BinaryReader): ClassificationResult
}

export namespace ClassificationResult {
  export type AsObject = {
    labelsList: Array<Classification.AsObject>
  }
}

export class TextClassResponse extends jspb.Message {
  clearResultsList(): void
  getResultsList(): Array<ClassificationResult>
  setResultsList(value: Array<ClassificationResult>): TextClassResponse
  addResults(value?: ClassificationResult, index?: number): ClassificationResult

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): TextClassResponse.AsObject
  static toObject(includeInstance: boolean, msg: TextClassResponse): TextClassResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: TextClassResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): TextClassResponse
  static deserializeBinaryFromReader(message: TextClassResponse, reader: jspb.BinaryReader): TextClassResponse
}

export namespace TextClassResponse {
  export type AsObject = {
    resultsList: Array<ClassificationResult.AsObject>
  }
}

export class TokenClassRequest extends jspb.Message {
  clearTextList(): void
  getTextList(): Array<string>
  setTextList(value: Array<string>): TokenClassRequest
  addText(value: string, index?: number): string
  getTopN(): number
  setTopN(value: number): TokenClassRequest

  hasModel(): boolean
  clearModel(): void
  getModel(): NLPModelParams | undefined
  setModel(value?: NLPModelParams): TokenClassRequest

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): TokenClassRequest.AsObject
  static toObject(includeInstance: boolean, msg: TokenClassRequest): TokenClassRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: TokenClassRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): TokenClassRequest
  static deserializeBinaryFromReader(message: TokenClassRequest, reader: jspb.BinaryReader): TokenClassRequest
}

export namespace TokenClassRequest {
  export type AsObject = {
    textList: Array<string>
    topN: number
    model?: NLPModelParams.AsObject
  }
}

export class TokenClassValue extends jspb.Message {
  getToken(): string
  setToken(value: string): TokenClassValue
  clearLabelList(): void
  getLabelList(): Array<Classification>
  setLabelList(value: Array<Classification>): TokenClassValue
  addLabel(value?: Classification, index?: number): Classification
  clearSpanList(): void
  getSpanList(): Array<Span>
  setSpanList(value: Array<Span>): TokenClassValue
  addSpan(value?: Span, index?: number): Span

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): TokenClassValue.AsObject
  static toObject(includeInstance: boolean, msg: TokenClassValue): TokenClassValue.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: TokenClassValue, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): TokenClassValue
  static deserializeBinaryFromReader(message: TokenClassValue, reader: jspb.BinaryReader): TokenClassValue
}

export namespace TokenClassValue {
  export type AsObject = {
    token: string
    labelList: Array<Classification.AsObject>
    spanList: Array<Span.AsObject>
  }
}

export class TokenClassSequence extends jspb.Message {
  clearResultsList(): void
  getResultsList(): Array<TokenClassValue>
  setResultsList(value: Array<TokenClassValue>): TokenClassSequence
  addResults(value?: TokenClassValue, index?: number): TokenClassValue

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): TokenClassSequence.AsObject
  static toObject(includeInstance: boolean, msg: TokenClassSequence): TokenClassSequence.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: TokenClassSequence, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): TokenClassSequence
  static deserializeBinaryFromReader(message: TokenClassSequence, reader: jspb.BinaryReader): TokenClassSequence
}

export namespace TokenClassSequence {
  export type AsObject = {
    resultsList: Array<TokenClassValue.AsObject>
  }
}

export class TokenClassResponse extends jspb.Message {
  clearResultsList(): void
  getResultsList(): Array<TokenClassSequence>
  setResultsList(value: Array<TokenClassSequence>): TokenClassResponse
  addResults(value?: TokenClassSequence, index?: number): TokenClassSequence

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): TokenClassResponse.AsObject
  static toObject(includeInstance: boolean, msg: TokenClassResponse): TokenClassResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: TokenClassResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): TokenClassResponse
  static deserializeBinaryFromReader(message: TokenClassResponse, reader: jspb.BinaryReader): TokenClassResponse
}

export namespace TokenClassResponse {
  export type AsObject = {
    resultsList: Array<TokenClassSequence.AsObject>
  }
}

export class AnalyzeIntentContext extends jspb.Message {
  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): AnalyzeIntentContext.AsObject
  static toObject(includeInstance: boolean, msg: AnalyzeIntentContext): AnalyzeIntentContext.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: AnalyzeIntentContext, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): AnalyzeIntentContext
  static deserializeBinaryFromReader(message: AnalyzeIntentContext, reader: jspb.BinaryReader): AnalyzeIntentContext
}

export namespace AnalyzeIntentContext {
  export type AsObject = {}
}

export class AnalyzeIntentOptions extends jspb.Message {
  hasPreviousIntent(): boolean
  clearPreviousIntent(): void
  getPreviousIntent(): string
  setPreviousIntent(value: string): AnalyzeIntentOptions

  hasVectors(): boolean
  clearVectors(): void
  getVectors(): AnalyzeIntentContext | undefined
  setVectors(value?: AnalyzeIntentContext): AnalyzeIntentOptions
  getDomain(): string
  setDomain(value: string): AnalyzeIntentOptions
  getLang(): string
  setLang(value: string): AnalyzeIntentOptions

  getContextCase(): AnalyzeIntentOptions.ContextCase

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): AnalyzeIntentOptions.AsObject
  static toObject(includeInstance: boolean, msg: AnalyzeIntentOptions): AnalyzeIntentOptions.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: AnalyzeIntentOptions, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): AnalyzeIntentOptions
  static deserializeBinaryFromReader(message: AnalyzeIntentOptions, reader: jspb.BinaryReader): AnalyzeIntentOptions
}

export namespace AnalyzeIntentOptions {
  export type AsObject = {
    previousIntent: string
    vectors?: AnalyzeIntentContext.AsObject
    domain: string
    lang: string
  }

  export enum ContextCase {
    CONTEXT_NOT_SET = 0,
    PREVIOUS_INTENT = 1,
    VECTORS = 2
  }
}

export class AnalyzeIntentRequest extends jspb.Message {
  getQuery(): string
  setQuery(value: string): AnalyzeIntentRequest

  hasOptions(): boolean
  clearOptions(): void
  getOptions(): AnalyzeIntentOptions | undefined
  setOptions(value?: AnalyzeIntentOptions): AnalyzeIntentRequest

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): AnalyzeIntentRequest.AsObject
  static toObject(includeInstance: boolean, msg: AnalyzeIntentRequest): AnalyzeIntentRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: AnalyzeIntentRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): AnalyzeIntentRequest
  static deserializeBinaryFromReader(message: AnalyzeIntentRequest, reader: jspb.BinaryReader): AnalyzeIntentRequest
}

export namespace AnalyzeIntentRequest {
  export type AsObject = {
    query: string
    options?: AnalyzeIntentOptions.AsObject
  }
}

export class AnalyzeIntentResponse extends jspb.Message {
  hasIntent(): boolean
  clearIntent(): void
  getIntent(): Classification | undefined
  setIntent(value?: Classification): AnalyzeIntentResponse
  clearSlotsList(): void
  getSlotsList(): Array<TokenClassValue>
  setSlotsList(value: Array<TokenClassValue>): AnalyzeIntentResponse
  addSlots(value?: TokenClassValue, index?: number): TokenClassValue
  getDomainStr(): string
  setDomainStr(value: string): AnalyzeIntentResponse

  hasDomain(): boolean
  clearDomain(): void
  getDomain(): Classification | undefined
  setDomain(value?: Classification): AnalyzeIntentResponse

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): AnalyzeIntentResponse.AsObject
  static toObject(includeInstance: boolean, msg: AnalyzeIntentResponse): AnalyzeIntentResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: AnalyzeIntentResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): AnalyzeIntentResponse
  static deserializeBinaryFromReader(message: AnalyzeIntentResponse, reader: jspb.BinaryReader): AnalyzeIntentResponse
}

export namespace AnalyzeIntentResponse {
  export type AsObject = {
    intent?: Classification.AsObject
    slotsList: Array<TokenClassValue.AsObject>
    domainStr: string
    domain?: Classification.AsObject
  }
}

export class AnalyzeEntitiesOptions extends jspb.Message {
  getLang(): string
  setLang(value: string): AnalyzeEntitiesOptions

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): AnalyzeEntitiesOptions.AsObject
  static toObject(includeInstance: boolean, msg: AnalyzeEntitiesOptions): AnalyzeEntitiesOptions.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: AnalyzeEntitiesOptions, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): AnalyzeEntitiesOptions
  static deserializeBinaryFromReader(message: AnalyzeEntitiesOptions, reader: jspb.BinaryReader): AnalyzeEntitiesOptions
}

export namespace AnalyzeEntitiesOptions {
  export type AsObject = {
    lang: string
  }
}

export class AnalyzeEntitiesRequest extends jspb.Message {
  getQuery(): string
  setQuery(value: string): AnalyzeEntitiesRequest

  hasOptions(): boolean
  clearOptions(): void
  getOptions(): AnalyzeEntitiesOptions | undefined
  setOptions(value?: AnalyzeEntitiesOptions): AnalyzeEntitiesRequest

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): AnalyzeEntitiesRequest.AsObject
  static toObject(includeInstance: boolean, msg: AnalyzeEntitiesRequest): AnalyzeEntitiesRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: AnalyzeEntitiesRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): AnalyzeEntitiesRequest
  static deserializeBinaryFromReader(message: AnalyzeEntitiesRequest, reader: jspb.BinaryReader): AnalyzeEntitiesRequest
}

export namespace AnalyzeEntitiesRequest {
  export type AsObject = {
    query: string
    options?: AnalyzeEntitiesOptions.AsObject
  }
}

export class NaturalQueryRequest extends jspb.Message {
  getQuery(): string
  setQuery(value: string): NaturalQueryRequest
  getTopN(): number
  setTopN(value: number): NaturalQueryRequest
  getContext(): string
  setContext(value: string): NaturalQueryRequest

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): NaturalQueryRequest.AsObject
  static toObject(includeInstance: boolean, msg: NaturalQueryRequest): NaturalQueryRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: NaturalQueryRequest, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): NaturalQueryRequest
  static deserializeBinaryFromReader(message: NaturalQueryRequest, reader: jspb.BinaryReader): NaturalQueryRequest
}

export namespace NaturalQueryRequest {
  export type AsObject = {
    query: string
    topN: number
    context: string
  }
}

export class NaturalQueryResult extends jspb.Message {
  getAnswer(): string
  setAnswer(value: string): NaturalQueryResult
  getScore(): number
  setScore(value: number): NaturalQueryResult

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): NaturalQueryResult.AsObject
  static toObject(includeInstance: boolean, msg: NaturalQueryResult): NaturalQueryResult.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: NaturalQueryResult, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): NaturalQueryResult
  static deserializeBinaryFromReader(message: NaturalQueryResult, reader: jspb.BinaryReader): NaturalQueryResult
}

export namespace NaturalQueryResult {
  export type AsObject = {
    answer: string
    score: number
  }
}

export class NaturalQueryResponse extends jspb.Message {
  clearResultsList(): void
  getResultsList(): Array<NaturalQueryResult>
  setResultsList(value: Array<NaturalQueryResult>): NaturalQueryResponse
  addResults(value?: NaturalQueryResult, index?: number): NaturalQueryResult

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): NaturalQueryResponse.AsObject
  static toObject(includeInstance: boolean, msg: NaturalQueryResponse): NaturalQueryResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> }
  static serializeBinaryToWriter(message: NaturalQueryResponse, writer: jspb.BinaryWriter): void
  static deserializeBinary(bytes: Uint8Array): NaturalQueryResponse
  static deserializeBinaryFromReader(message: NaturalQueryResponse, reader: jspb.BinaryReader): NaturalQueryResponse
}

export namespace NaturalQueryResponse {
  export type AsObject = {
    resultsList: Array<NaturalQueryResult.AsObject>
  }
}

// package: nvidia.riva.nlp
// file: riva_nlp.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from '@grpc/grpc-js'
import * as riva_nlp_pb from './riva_nlp_pb'

interface IRivaLanguageUnderstandingService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  classifyText: IRivaLanguageUnderstandingService_IClassifyText
  classifyTokens: IRivaLanguageUnderstandingService_IClassifyTokens
  transformText: IRivaLanguageUnderstandingService_ITransformText
  analyzeEntities: IRivaLanguageUnderstandingService_IAnalyzeEntities
  analyzeIntent: IRivaLanguageUnderstandingService_IAnalyzeIntent
  punctuateText: IRivaLanguageUnderstandingService_IPunctuateText
  naturalQuery: IRivaLanguageUnderstandingService_INaturalQuery
}

interface IRivaLanguageUnderstandingService_IClassifyText
  extends grpc.MethodDefinition<riva_nlp_pb.TextClassRequest, riva_nlp_pb.TextClassResponse> {
  path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/ClassifyText'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<riva_nlp_pb.TextClassRequest>
  requestDeserialize: grpc.deserialize<riva_nlp_pb.TextClassRequest>
  responseSerialize: grpc.serialize<riva_nlp_pb.TextClassResponse>
  responseDeserialize: grpc.deserialize<riva_nlp_pb.TextClassResponse>
}
interface IRivaLanguageUnderstandingService_IClassifyTokens
  extends grpc.MethodDefinition<riva_nlp_pb.TokenClassRequest, riva_nlp_pb.TokenClassResponse> {
  path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/ClassifyTokens'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<riva_nlp_pb.TokenClassRequest>
  requestDeserialize: grpc.deserialize<riva_nlp_pb.TokenClassRequest>
  responseSerialize: grpc.serialize<riva_nlp_pb.TokenClassResponse>
  responseDeserialize: grpc.deserialize<riva_nlp_pb.TokenClassResponse>
}
interface IRivaLanguageUnderstandingService_ITransformText
  extends grpc.MethodDefinition<riva_nlp_pb.TextTransformRequest, riva_nlp_pb.TextTransformResponse> {
  path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/TransformText'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<riva_nlp_pb.TextTransformRequest>
  requestDeserialize: grpc.deserialize<riva_nlp_pb.TextTransformRequest>
  responseSerialize: grpc.serialize<riva_nlp_pb.TextTransformResponse>
  responseDeserialize: grpc.deserialize<riva_nlp_pb.TextTransformResponse>
}
interface IRivaLanguageUnderstandingService_IAnalyzeEntities
  extends grpc.MethodDefinition<riva_nlp_pb.AnalyzeEntitiesRequest, riva_nlp_pb.TokenClassResponse> {
  path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/AnalyzeEntities'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<riva_nlp_pb.AnalyzeEntitiesRequest>
  requestDeserialize: grpc.deserialize<riva_nlp_pb.AnalyzeEntitiesRequest>
  responseSerialize: grpc.serialize<riva_nlp_pb.TokenClassResponse>
  responseDeserialize: grpc.deserialize<riva_nlp_pb.TokenClassResponse>
}
interface IRivaLanguageUnderstandingService_IAnalyzeIntent
  extends grpc.MethodDefinition<riva_nlp_pb.AnalyzeIntentRequest, riva_nlp_pb.AnalyzeIntentResponse> {
  path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/AnalyzeIntent'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<riva_nlp_pb.AnalyzeIntentRequest>
  requestDeserialize: grpc.deserialize<riva_nlp_pb.AnalyzeIntentRequest>
  responseSerialize: grpc.serialize<riva_nlp_pb.AnalyzeIntentResponse>
  responseDeserialize: grpc.deserialize<riva_nlp_pb.AnalyzeIntentResponse>
}
interface IRivaLanguageUnderstandingService_IPunctuateText
  extends grpc.MethodDefinition<riva_nlp_pb.TextTransformRequest, riva_nlp_pb.TextTransformResponse> {
  path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/PunctuateText'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<riva_nlp_pb.TextTransformRequest>
  requestDeserialize: grpc.deserialize<riva_nlp_pb.TextTransformRequest>
  responseSerialize: grpc.serialize<riva_nlp_pb.TextTransformResponse>
  responseDeserialize: grpc.deserialize<riva_nlp_pb.TextTransformResponse>
}
interface IRivaLanguageUnderstandingService_INaturalQuery
  extends grpc.MethodDefinition<riva_nlp_pb.NaturalQueryRequest, riva_nlp_pb.NaturalQueryResponse> {
  path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/NaturalQuery'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<riva_nlp_pb.NaturalQueryRequest>
  requestDeserialize: grpc.deserialize<riva_nlp_pb.NaturalQueryRequest>
  responseSerialize: grpc.serialize<riva_nlp_pb.NaturalQueryResponse>
  responseDeserialize: grpc.deserialize<riva_nlp_pb.NaturalQueryResponse>
}

export const RivaLanguageUnderstandingService: IRivaLanguageUnderstandingService

export interface IRivaLanguageUnderstandingServer {
  classifyText: grpc.handleUnaryCall<riva_nlp_pb.TextClassRequest, riva_nlp_pb.TextClassResponse>
  classifyTokens: grpc.handleUnaryCall<riva_nlp_pb.TokenClassRequest, riva_nlp_pb.TokenClassResponse>
  transformText: grpc.handleUnaryCall<riva_nlp_pb.TextTransformRequest, riva_nlp_pb.TextTransformResponse>
  analyzeEntities: grpc.handleUnaryCall<riva_nlp_pb.AnalyzeEntitiesRequest, riva_nlp_pb.TokenClassResponse>
  analyzeIntent: grpc.handleUnaryCall<riva_nlp_pb.AnalyzeIntentRequest, riva_nlp_pb.AnalyzeIntentResponse>
  punctuateText: grpc.handleUnaryCall<riva_nlp_pb.TextTransformRequest, riva_nlp_pb.TextTransformResponse>
  naturalQuery: grpc.handleUnaryCall<riva_nlp_pb.NaturalQueryRequest, riva_nlp_pb.NaturalQueryResponse>
}

export interface IRivaLanguageUnderstandingClient {
  classifyText(
    request: riva_nlp_pb.TextClassRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextClassResponse) => void
  ): grpc.ClientUnaryCall
  classifyText(
    request: riva_nlp_pb.TextClassRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextClassResponse) => void
  ): grpc.ClientUnaryCall
  classifyText(
    request: riva_nlp_pb.TextClassRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextClassResponse) => void
  ): grpc.ClientUnaryCall
  classifyTokens(
    request: riva_nlp_pb.TokenClassRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  classifyTokens(
    request: riva_nlp_pb.TokenClassRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  classifyTokens(
    request: riva_nlp_pb.TokenClassRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  transformText(
    request: riva_nlp_pb.TextTransformRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  transformText(
    request: riva_nlp_pb.TextTransformRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  transformText(
    request: riva_nlp_pb.TextTransformRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  analyzeEntities(
    request: riva_nlp_pb.AnalyzeEntitiesRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  analyzeEntities(
    request: riva_nlp_pb.AnalyzeEntitiesRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  analyzeEntities(
    request: riva_nlp_pb.AnalyzeEntitiesRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  analyzeIntent(
    request: riva_nlp_pb.AnalyzeIntentRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.AnalyzeIntentResponse) => void
  ): grpc.ClientUnaryCall
  analyzeIntent(
    request: riva_nlp_pb.AnalyzeIntentRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.AnalyzeIntentResponse) => void
  ): grpc.ClientUnaryCall
  analyzeIntent(
    request: riva_nlp_pb.AnalyzeIntentRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.AnalyzeIntentResponse) => void
  ): grpc.ClientUnaryCall
  punctuateText(
    request: riva_nlp_pb.TextTransformRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  punctuateText(
    request: riva_nlp_pb.TextTransformRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  punctuateText(
    request: riva_nlp_pb.TextTransformRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  naturalQuery(
    request: riva_nlp_pb.NaturalQueryRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.NaturalQueryResponse) => void
  ): grpc.ClientUnaryCall
  naturalQuery(
    request: riva_nlp_pb.NaturalQueryRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.NaturalQueryResponse) => void
  ): grpc.ClientUnaryCall
  naturalQuery(
    request: riva_nlp_pb.NaturalQueryRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.NaturalQueryResponse) => void
  ): grpc.ClientUnaryCall
}

export class RivaLanguageUnderstandingClient extends grpc.Client implements IRivaLanguageUnderstandingClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object)
  public classifyText(
    request: riva_nlp_pb.TextClassRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextClassResponse) => void
  ): grpc.ClientUnaryCall
  public classifyText(
    request: riva_nlp_pb.TextClassRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextClassResponse) => void
  ): grpc.ClientUnaryCall
  public classifyText(
    request: riva_nlp_pb.TextClassRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextClassResponse) => void
  ): grpc.ClientUnaryCall
  public classifyTokens(
    request: riva_nlp_pb.TokenClassRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  public classifyTokens(
    request: riva_nlp_pb.TokenClassRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  public classifyTokens(
    request: riva_nlp_pb.TokenClassRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  public transformText(
    request: riva_nlp_pb.TextTransformRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  public transformText(
    request: riva_nlp_pb.TextTransformRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  public transformText(
    request: riva_nlp_pb.TextTransformRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  public analyzeEntities(
    request: riva_nlp_pb.AnalyzeEntitiesRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  public analyzeEntities(
    request: riva_nlp_pb.AnalyzeEntitiesRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  public analyzeEntities(
    request: riva_nlp_pb.AnalyzeEntitiesRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TokenClassResponse) => void
  ): grpc.ClientUnaryCall
  public analyzeIntent(
    request: riva_nlp_pb.AnalyzeIntentRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.AnalyzeIntentResponse) => void
  ): grpc.ClientUnaryCall
  public analyzeIntent(
    request: riva_nlp_pb.AnalyzeIntentRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.AnalyzeIntentResponse) => void
  ): grpc.ClientUnaryCall
  public analyzeIntent(
    request: riva_nlp_pb.AnalyzeIntentRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.AnalyzeIntentResponse) => void
  ): grpc.ClientUnaryCall
  public punctuateText(
    request: riva_nlp_pb.TextTransformRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  public punctuateText(
    request: riva_nlp_pb.TextTransformRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  public punctuateText(
    request: riva_nlp_pb.TextTransformRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.TextTransformResponse) => void
  ): grpc.ClientUnaryCall
  public naturalQuery(
    request: riva_nlp_pb.NaturalQueryRequest,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.NaturalQueryResponse) => void
  ): grpc.ClientUnaryCall
  public naturalQuery(
    request: riva_nlp_pb.NaturalQueryRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.NaturalQueryResponse) => void
  ): grpc.ClientUnaryCall
  public naturalQuery(
    request: riva_nlp_pb.NaturalQueryRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_nlp_pb.NaturalQueryResponse) => void
  ): grpc.ClientUnaryCall
}

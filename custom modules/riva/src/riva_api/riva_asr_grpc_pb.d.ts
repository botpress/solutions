// package: nvidia.riva.asr
// file: riva_asr.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from '@grpc/grpc-js'
import * as riva_asr_pb from './riva_asr_pb'
import * as riva_audio_pb from './riva_audio_pb'

interface IRivaSpeechRecognitionService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  recognize: IRivaSpeechRecognitionService_IRecognize
  streamingRecognize: IRivaSpeechRecognitionService_IStreamingRecognize
}

interface IRivaSpeechRecognitionService_IRecognize
  extends grpc.MethodDefinition<riva_asr_pb.RecognizeRequest, riva_asr_pb.RecognizeResponse> {
  path: '/nvidia.riva.asr.RivaSpeechRecognition/Recognize'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<riva_asr_pb.RecognizeRequest>
  requestDeserialize: grpc.deserialize<riva_asr_pb.RecognizeRequest>
  responseSerialize: grpc.serialize<riva_asr_pb.RecognizeResponse>
  responseDeserialize: grpc.deserialize<riva_asr_pb.RecognizeResponse>
}
interface IRivaSpeechRecognitionService_IStreamingRecognize
  extends grpc.MethodDefinition<riva_asr_pb.StreamingRecognizeRequest, riva_asr_pb.StreamingRecognizeResponse> {
  path: '/nvidia.riva.asr.RivaSpeechRecognition/StreamingRecognize'
  requestStream: true
  responseStream: true
  requestSerialize: grpc.serialize<riva_asr_pb.StreamingRecognizeRequest>
  requestDeserialize: grpc.deserialize<riva_asr_pb.StreamingRecognizeRequest>
  responseSerialize: grpc.serialize<riva_asr_pb.StreamingRecognizeResponse>
  responseDeserialize: grpc.deserialize<riva_asr_pb.StreamingRecognizeResponse>
}

export const RivaSpeechRecognitionService: IRivaSpeechRecognitionService

export interface IRivaSpeechRecognitionServer {
  recognize: grpc.handleUnaryCall<riva_asr_pb.RecognizeRequest, riva_asr_pb.RecognizeResponse>
  streamingRecognize: grpc.handleBidiStreamingCall<
    riva_asr_pb.StreamingRecognizeRequest,
    riva_asr_pb.StreamingRecognizeResponse
  >
}

export interface IRivaSpeechRecognitionClient {
  recognize(
    request: riva_asr_pb.RecognizeRequest,
    callback: (error: grpc.ServiceError | null, response: riva_asr_pb.RecognizeResponse) => void
  ): grpc.ClientUnaryCall
  recognize(
    request: riva_asr_pb.RecognizeRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_asr_pb.RecognizeResponse) => void
  ): grpc.ClientUnaryCall
  recognize(
    request: riva_asr_pb.RecognizeRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_asr_pb.RecognizeResponse) => void
  ): grpc.ClientUnaryCall
  streamingRecognize(): grpc.ClientDuplexStream<
    riva_asr_pb.StreamingRecognizeRequest,
    riva_asr_pb.StreamingRecognizeResponse
  >
  streamingRecognize(
    options: Partial<grpc.CallOptions>
  ): grpc.ClientDuplexStream<riva_asr_pb.StreamingRecognizeRequest, riva_asr_pb.StreamingRecognizeResponse>
  streamingRecognize(
    metadata: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientDuplexStream<riva_asr_pb.StreamingRecognizeRequest, riva_asr_pb.StreamingRecognizeResponse>
}

export class RivaSpeechRecognitionClient extends grpc.Client implements IRivaSpeechRecognitionClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object)
  public recognize(
    request: riva_asr_pb.RecognizeRequest,
    callback: (error: grpc.ServiceError | null, response: riva_asr_pb.RecognizeResponse) => void
  ): grpc.ClientUnaryCall
  public recognize(
    request: riva_asr_pb.RecognizeRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_asr_pb.RecognizeResponse) => void
  ): grpc.ClientUnaryCall
  public recognize(
    request: riva_asr_pb.RecognizeRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_asr_pb.RecognizeResponse) => void
  ): grpc.ClientUnaryCall
  public streamingRecognize(
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientDuplexStream<riva_asr_pb.StreamingRecognizeRequest, riva_asr_pb.StreamingRecognizeResponse>
  public streamingRecognize(
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientDuplexStream<riva_asr_pb.StreamingRecognizeRequest, riva_asr_pb.StreamingRecognizeResponse>
}

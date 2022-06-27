// package: nvidia.riva.tts
// file: riva_tts.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from '@grpc/grpc-js'
import * as riva_tts_pb from './riva_tts_pb'
import * as riva_audio_pb from './riva_audio_pb'

interface IRivaSpeechSynthesisService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  synthesize: IRivaSpeechSynthesisService_ISynthesize
  synthesizeOnline: IRivaSpeechSynthesisService_ISynthesizeOnline
}

interface IRivaSpeechSynthesisService_ISynthesize
  extends grpc.MethodDefinition<riva_tts_pb.SynthesizeSpeechRequest, riva_tts_pb.SynthesizeSpeechResponse> {
  path: '/nvidia.riva.tts.RivaSpeechSynthesis/Synthesize'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<riva_tts_pb.SynthesizeSpeechRequest>
  requestDeserialize: grpc.deserialize<riva_tts_pb.SynthesizeSpeechRequest>
  responseSerialize: grpc.serialize<riva_tts_pb.SynthesizeSpeechResponse>
  responseDeserialize: grpc.deserialize<riva_tts_pb.SynthesizeSpeechResponse>
}
interface IRivaSpeechSynthesisService_ISynthesizeOnline
  extends grpc.MethodDefinition<riva_tts_pb.SynthesizeSpeechRequest, riva_tts_pb.SynthesizeSpeechResponse> {
  path: '/nvidia.riva.tts.RivaSpeechSynthesis/SynthesizeOnline'
  requestStream: false
  responseStream: true
  requestSerialize: grpc.serialize<riva_tts_pb.SynthesizeSpeechRequest>
  requestDeserialize: grpc.deserialize<riva_tts_pb.SynthesizeSpeechRequest>
  responseSerialize: grpc.serialize<riva_tts_pb.SynthesizeSpeechResponse>
  responseDeserialize: grpc.deserialize<riva_tts_pb.SynthesizeSpeechResponse>
}

export const RivaSpeechSynthesisService: IRivaSpeechSynthesisService

export interface IRivaSpeechSynthesisServer {
  synthesize: grpc.handleUnaryCall<riva_tts_pb.SynthesizeSpeechRequest, riva_tts_pb.SynthesizeSpeechResponse>
  synthesizeOnline: grpc.handleServerStreamingCall<
    riva_tts_pb.SynthesizeSpeechRequest,
    riva_tts_pb.SynthesizeSpeechResponse
  >
}

export interface IRivaSpeechSynthesisClient {
  synthesize(
    request: riva_tts_pb.SynthesizeSpeechRequest,
    callback: (error: grpc.ServiceError | null, response: riva_tts_pb.SynthesizeSpeechResponse) => void
  ): grpc.ClientUnaryCall
  synthesize(
    request: riva_tts_pb.SynthesizeSpeechRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_tts_pb.SynthesizeSpeechResponse) => void
  ): grpc.ClientUnaryCall
  synthesize(
    request: riva_tts_pb.SynthesizeSpeechRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_tts_pb.SynthesizeSpeechResponse) => void
  ): grpc.ClientUnaryCall
  synthesizeOnline(
    request: riva_tts_pb.SynthesizeSpeechRequest,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<riva_tts_pb.SynthesizeSpeechResponse>
  synthesizeOnline(
    request: riva_tts_pb.SynthesizeSpeechRequest,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<riva_tts_pb.SynthesizeSpeechResponse>
}

export class RivaSpeechSynthesisClient extends grpc.Client implements IRivaSpeechSynthesisClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object)
  public synthesize(
    request: riva_tts_pb.SynthesizeSpeechRequest,
    callback: (error: grpc.ServiceError | null, response: riva_tts_pb.SynthesizeSpeechResponse) => void
  ): grpc.ClientUnaryCall
  public synthesize(
    request: riva_tts_pb.SynthesizeSpeechRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: riva_tts_pb.SynthesizeSpeechResponse) => void
  ): grpc.ClientUnaryCall
  public synthesize(
    request: riva_tts_pb.SynthesizeSpeechRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: riva_tts_pb.SynthesizeSpeechResponse) => void
  ): grpc.ClientUnaryCall
  public synthesizeOnline(
    request: riva_tts_pb.SynthesizeSpeechRequest,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<riva_tts_pb.SynthesizeSpeechResponse>
  public synthesizeOnline(
    request: riva_tts_pb.SynthesizeSpeechRequest,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>
  ): grpc.ClientReadableStream<riva_tts_pb.SynthesizeSpeechResponse>
}

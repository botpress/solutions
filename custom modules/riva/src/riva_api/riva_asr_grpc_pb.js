// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2019 Google LLC.
// Copyright (c) 2021, NVIDIA CORPORATION. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
//
'use strict'
var grpc = require('@grpc/grpc-js')
var riva_asr_pb = require('./riva_asr_pb.js')
var riva_audio_pb = require('./riva_audio_pb.js')

function serialize_nvidia_riva_asr_RecognizeRequest(arg) {
  if (!(arg instanceof riva_asr_pb.RecognizeRequest)) {
    throw new Error('Expected argument of type nvidia.riva.asr.RecognizeRequest')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_nvidia_riva_asr_RecognizeRequest(buffer_arg) {
  return riva_asr_pb.RecognizeRequest.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_nvidia_riva_asr_RecognizeResponse(arg) {
  if (!(arg instanceof riva_asr_pb.RecognizeResponse)) {
    throw new Error('Expected argument of type nvidia.riva.asr.RecognizeResponse')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_nvidia_riva_asr_RecognizeResponse(buffer_arg) {
  return riva_asr_pb.RecognizeResponse.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_nvidia_riva_asr_StreamingRecognizeRequest(arg) {
  if (!(arg instanceof riva_asr_pb.StreamingRecognizeRequest)) {
    throw new Error('Expected argument of type nvidia.riva.asr.StreamingRecognizeRequest')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_nvidia_riva_asr_StreamingRecognizeRequest(buffer_arg) {
  return riva_asr_pb.StreamingRecognizeRequest.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_nvidia_riva_asr_StreamingRecognizeResponse(arg) {
  if (!(arg instanceof riva_asr_pb.StreamingRecognizeResponse)) {
    throw new Error('Expected argument of type nvidia.riva.asr.StreamingRecognizeResponse')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_nvidia_riva_asr_StreamingRecognizeResponse(buffer_arg) {
  return riva_asr_pb.StreamingRecognizeResponse.deserializeBinary(new Uint8Array(buffer_arg))
}

//
// The RivaSpeechRecognition service provides two mechanisms for converting speech to text.
var RivaSpeechRecognitionService = (exports.RivaSpeechRecognitionService = {
  // Recognize expects a RecognizeRequest and returns a RecognizeResponse. This request will block
  // until the audio is uploaded, processed, and a transcript is returned.
  recognize: {
    path: '/nvidia.riva.asr.RivaSpeechRecognition/Recognize',
    requestStream: false,
    responseStream: false,
    requestType: riva_asr_pb.RecognizeRequest,
    responseType: riva_asr_pb.RecognizeResponse,
    requestSerialize: serialize_nvidia_riva_asr_RecognizeRequest,
    requestDeserialize: deserialize_nvidia_riva_asr_RecognizeRequest,
    responseSerialize: serialize_nvidia_riva_asr_RecognizeResponse,
    responseDeserialize: deserialize_nvidia_riva_asr_RecognizeResponse
  },
  // StreamingRecognize is a non-blocking API call that allows audio data to be fed to the server in
  // chunks as it becomes available. Depending on the configuration in the StreamingRecognizeRequest,
  // intermediate results can be sent back to the client. Recognition ends when the stream is closed
  // by the client.
  streamingRecognize: {
    path: '/nvidia.riva.asr.RivaSpeechRecognition/StreamingRecognize',
    requestStream: true,
    responseStream: true,
    requestType: riva_asr_pb.StreamingRecognizeRequest,
    responseType: riva_asr_pb.StreamingRecognizeResponse,
    requestSerialize: serialize_nvidia_riva_asr_StreamingRecognizeRequest,
    requestDeserialize: deserialize_nvidia_riva_asr_StreamingRecognizeRequest,
    responseSerialize: serialize_nvidia_riva_asr_StreamingRecognizeResponse,
    responseDeserialize: deserialize_nvidia_riva_asr_StreamingRecognizeResponse
  }
})

exports.RivaSpeechRecognitionClient = grpc.makeGenericClientConstructor(RivaSpeechRecognitionService)

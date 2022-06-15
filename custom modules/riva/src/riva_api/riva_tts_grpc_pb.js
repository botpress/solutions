// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
//
// NVIDIA CORPORATION and its licensors retain all intellectual property
// and proprietary rights in and to this software, related documentation
// and any modifications thereto.  Any use, reproduction, disclosure or
// distribution of this software and related documentation without an express
// license agreement from NVIDIA CORPORATION is strictly prohibited.
//
'use strict';
var grpc = require('@grpc/grpc-js');
var riva_tts_pb = require('./riva_tts_pb.js');
var riva_audio_pb = require('./riva_audio_pb.js');

function serialize_nvidia_riva_tts_SynthesizeSpeechRequest(arg) {
  if (!(arg instanceof riva_tts_pb.SynthesizeSpeechRequest)) {
    throw new Error('Expected argument of type nvidia.riva.tts.SynthesizeSpeechRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_tts_SynthesizeSpeechRequest(buffer_arg) {
  return riva_tts_pb.SynthesizeSpeechRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nvidia_riva_tts_SynthesizeSpeechResponse(arg) {
  if (!(arg instanceof riva_tts_pb.SynthesizeSpeechResponse)) {
    throw new Error('Expected argument of type nvidia.riva.tts.SynthesizeSpeechResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_tts_SynthesizeSpeechResponse(buffer_arg) {
  return riva_tts_pb.SynthesizeSpeechResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RivaSpeechSynthesisService = exports.RivaSpeechSynthesisService = {
  // Used to request text-to-speech from the service. Submit a request containing the
// desired text and configuration, and receive audio bytes in the requested format.
synthesize: {
    path: '/nvidia.riva.tts.RivaSpeechSynthesis/Synthesize',
    requestStream: false,
    responseStream: false,
    requestType: riva_tts_pb.SynthesizeSpeechRequest,
    responseType: riva_tts_pb.SynthesizeSpeechResponse,
    requestSerialize: serialize_nvidia_riva_tts_SynthesizeSpeechRequest,
    requestDeserialize: deserialize_nvidia_riva_tts_SynthesizeSpeechRequest,
    responseSerialize: serialize_nvidia_riva_tts_SynthesizeSpeechResponse,
    responseDeserialize: deserialize_nvidia_riva_tts_SynthesizeSpeechResponse,
  },
  // Used to request text-to-speech returned via stream as it becomes available.
// Submit a SynthesizeSpeechRequest with desired text and configuration,
// and receive stream of bytes in the requested format.
synthesizeOnline: {
    path: '/nvidia.riva.tts.RivaSpeechSynthesis/SynthesizeOnline',
    requestStream: false,
    responseStream: true,
    requestType: riva_tts_pb.SynthesizeSpeechRequest,
    responseType: riva_tts_pb.SynthesizeSpeechResponse,
    requestSerialize: serialize_nvidia_riva_tts_SynthesizeSpeechRequest,
    requestDeserialize: deserialize_nvidia_riva_tts_SynthesizeSpeechRequest,
    responseSerialize: serialize_nvidia_riva_tts_SynthesizeSpeechResponse,
    responseDeserialize: deserialize_nvidia_riva_tts_SynthesizeSpeechResponse,
  },
};

exports.RivaSpeechSynthesisClient = grpc.makeGenericClientConstructor(RivaSpeechSynthesisService);

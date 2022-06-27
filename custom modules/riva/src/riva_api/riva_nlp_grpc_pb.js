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
var riva_nlp_pb = require('./riva_nlp_pb.js');

function serialize_nvidia_riva_nlp_AnalyzeEntitiesRequest(arg) {
  if (!(arg instanceof riva_nlp_pb.AnalyzeEntitiesRequest)) {
    throw new Error('Expected argument of type nvidia.riva.nlp.AnalyzeEntitiesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_nlp_AnalyzeEntitiesRequest(buffer_arg) {
  return riva_nlp_pb.AnalyzeEntitiesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nvidia_riva_nlp_AnalyzeIntentRequest(arg) {
  if (!(arg instanceof riva_nlp_pb.AnalyzeIntentRequest)) {
    throw new Error('Expected argument of type nvidia.riva.nlp.AnalyzeIntentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_nlp_AnalyzeIntentRequest(buffer_arg) {
  return riva_nlp_pb.AnalyzeIntentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nvidia_riva_nlp_AnalyzeIntentResponse(arg) {
  if (!(arg instanceof riva_nlp_pb.AnalyzeIntentResponse)) {
    throw new Error('Expected argument of type nvidia.riva.nlp.AnalyzeIntentResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_nlp_AnalyzeIntentResponse(buffer_arg) {
  return riva_nlp_pb.AnalyzeIntentResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nvidia_riva_nlp_NaturalQueryRequest(arg) {
  if (!(arg instanceof riva_nlp_pb.NaturalQueryRequest)) {
    throw new Error('Expected argument of type nvidia.riva.nlp.NaturalQueryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_nlp_NaturalQueryRequest(buffer_arg) {
  return riva_nlp_pb.NaturalQueryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nvidia_riva_nlp_NaturalQueryResponse(arg) {
  if (!(arg instanceof riva_nlp_pb.NaturalQueryResponse)) {
    throw new Error('Expected argument of type nvidia.riva.nlp.NaturalQueryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_nlp_NaturalQueryResponse(buffer_arg) {
  return riva_nlp_pb.NaturalQueryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nvidia_riva_nlp_TextClassRequest(arg) {
  if (!(arg instanceof riva_nlp_pb.TextClassRequest)) {
    throw new Error('Expected argument of type nvidia.riva.nlp.TextClassRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_nlp_TextClassRequest(buffer_arg) {
  return riva_nlp_pb.TextClassRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nvidia_riva_nlp_TextClassResponse(arg) {
  if (!(arg instanceof riva_nlp_pb.TextClassResponse)) {
    throw new Error('Expected argument of type nvidia.riva.nlp.TextClassResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_nlp_TextClassResponse(buffer_arg) {
  return riva_nlp_pb.TextClassResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nvidia_riva_nlp_TextTransformRequest(arg) {
  if (!(arg instanceof riva_nlp_pb.TextTransformRequest)) {
    throw new Error('Expected argument of type nvidia.riva.nlp.TextTransformRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_nlp_TextTransformRequest(buffer_arg) {
  return riva_nlp_pb.TextTransformRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nvidia_riva_nlp_TextTransformResponse(arg) {
  if (!(arg instanceof riva_nlp_pb.TextTransformResponse)) {
    throw new Error('Expected argument of type nvidia.riva.nlp.TextTransformResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_nlp_TextTransformResponse(buffer_arg) {
  return riva_nlp_pb.TextTransformResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nvidia_riva_nlp_TokenClassRequest(arg) {
  if (!(arg instanceof riva_nlp_pb.TokenClassRequest)) {
    throw new Error('Expected argument of type nvidia.riva.nlp.TokenClassRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_nlp_TokenClassRequest(buffer_arg) {
  return riva_nlp_pb.TokenClassRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_nvidia_riva_nlp_TokenClassResponse(arg) {
  if (!(arg instanceof riva_nlp_pb.TokenClassResponse)) {
    throw new Error('Expected argument of type nvidia.riva.nlp.TokenClassResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_nvidia_riva_nlp_TokenClassResponse(buffer_arg) {
  return riva_nlp_pb.TokenClassResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Riva Natural Language Services implement generic and task-specific APIs.
// The generic APIs allows users to design
// models for arbitrary use cases that conform simply with input and output types
// specified in the service. As an explicit example, the ClassifyText function
// could be used for sentiment classification, domain recognition, language
// identification, etc.
// The task-specific APIs can be used for popular NLP tasks such as
// intent recognition (as well as slot filling), and entity extraction.
//
var RivaLanguageUnderstandingService = exports.RivaLanguageUnderstandingService = {
  // ClassifyText takes as input an input/query string and parameters related
// to the requested model to use to evaluate the text. The service evaluates the
// text with the requested model, and returns one or more classifications.
classifyText: {
    path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/ClassifyText',
    requestStream: false,
    responseStream: false,
    requestType: riva_nlp_pb.TextClassRequest,
    responseType: riva_nlp_pb.TextClassResponse,
    requestSerialize: serialize_nvidia_riva_nlp_TextClassRequest,
    requestDeserialize: deserialize_nvidia_riva_nlp_TextClassRequest,
    responseSerialize: serialize_nvidia_riva_nlp_TextClassResponse,
    responseDeserialize: deserialize_nvidia_riva_nlp_TextClassResponse,
  },
  // ClassifyTokens takes as input either a string or list of tokens and parameters
// related to which model to use. The service evaluates the text with the requested
// model, performing additional tokenization if necessary, and returns one or more
// class labels per token.
classifyTokens: {
    path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/ClassifyTokens',
    requestStream: false,
    responseStream: false,
    requestType: riva_nlp_pb.TokenClassRequest,
    responseType: riva_nlp_pb.TokenClassResponse,
    requestSerialize: serialize_nvidia_riva_nlp_TokenClassRequest,
    requestDeserialize: deserialize_nvidia_riva_nlp_TokenClassRequest,
    responseSerialize: serialize_nvidia_riva_nlp_TokenClassResponse,
    responseDeserialize: deserialize_nvidia_riva_nlp_TokenClassResponse,
  },
  // TransformText takes an input/query string and parameters related to the
// requested model and returns another string. The behavior of the function
// is defined entirely by the underlying model and may be used for
// tasks like translation, adding punctuation, augment the input directly, etc.
transformText: {
    path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/TransformText',
    requestStream: false,
    responseStream: false,
    requestType: riva_nlp_pb.TextTransformRequest,
    responseType: riva_nlp_pb.TextTransformResponse,
    requestSerialize: serialize_nvidia_riva_nlp_TextTransformRequest,
    requestDeserialize: deserialize_nvidia_riva_nlp_TextTransformRequest,
    responseSerialize: serialize_nvidia_riva_nlp_TextTransformResponse,
    responseDeserialize: deserialize_nvidia_riva_nlp_TextTransformResponse,
  },
  // AnalyzeEntities accepts an input string and returns all named entities within
// the text, as well as a category and likelihood.
analyzeEntities: {
    path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/AnalyzeEntities',
    requestStream: false,
    responseStream: false,
    requestType: riva_nlp_pb.AnalyzeEntitiesRequest,
    responseType: riva_nlp_pb.TokenClassResponse,
    requestSerialize: serialize_nvidia_riva_nlp_AnalyzeEntitiesRequest,
    requestDeserialize: deserialize_nvidia_riva_nlp_AnalyzeEntitiesRequest,
    responseSerialize: serialize_nvidia_riva_nlp_TokenClassResponse,
    responseDeserialize: deserialize_nvidia_riva_nlp_TokenClassResponse,
  },
  // AnalyzeIntent accepts an input string and returns the most likely
// intent as well as slots relevant to that intent.
//
// The model requires that a valid "domain" be passed in, and optionally
// supports including a previous intent classification result to provide
// context for the model.
analyzeIntent: {
    path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/AnalyzeIntent',
    requestStream: false,
    responseStream: false,
    requestType: riva_nlp_pb.AnalyzeIntentRequest,
    responseType: riva_nlp_pb.AnalyzeIntentResponse,
    requestSerialize: serialize_nvidia_riva_nlp_AnalyzeIntentRequest,
    requestDeserialize: deserialize_nvidia_riva_nlp_AnalyzeIntentRequest,
    responseSerialize: serialize_nvidia_riva_nlp_AnalyzeIntentResponse,
    responseDeserialize: deserialize_nvidia_riva_nlp_AnalyzeIntentResponse,
  },
  // PunctuateText takes text with no- or limited- punctuation and returns
// the same text with corrected punctuation and capitalization.
punctuateText: {
    path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/PunctuateText',
    requestStream: false,
    responseStream: false,
    requestType: riva_nlp_pb.TextTransformRequest,
    responseType: riva_nlp_pb.TextTransformResponse,
    requestSerialize: serialize_nvidia_riva_nlp_TextTransformRequest,
    requestDeserialize: deserialize_nvidia_riva_nlp_TextTransformRequest,
    responseSerialize: serialize_nvidia_riva_nlp_TextTransformResponse,
    responseDeserialize: deserialize_nvidia_riva_nlp_TextTransformResponse,
  },
  // NaturalQuery is a search function that enables querying one or more documents
// or contexts with a query that is written in natural language.
naturalQuery: {
    path: '/nvidia.riva.nlp.RivaLanguageUnderstanding/NaturalQuery',
    requestStream: false,
    responseStream: false,
    requestType: riva_nlp_pb.NaturalQueryRequest,
    responseType: riva_nlp_pb.NaturalQueryResponse,
    requestSerialize: serialize_nvidia_riva_nlp_NaturalQueryRequest,
    requestDeserialize: deserialize_nvidia_riva_nlp_NaturalQueryRequest,
    responseSerialize: serialize_nvidia_riva_nlp_NaturalQueryResponse,
    responseDeserialize: deserialize_nvidia_riva_nlp_NaturalQueryResponse,
  },
};

exports.RivaLanguageUnderstandingClient = grpc.makeGenericClientConstructor(RivaLanguageUnderstandingService);

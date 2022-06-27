import * as grpc from '@grpc/grpc-js'
import fse from 'fs-extra'
import { Readable, Duplex } from 'stream'
import tmp from 'tmp'
import wav from 'wav'

import { Config } from '../config'
import rasrService from '../riva_api/riva_asr_grpc_pb'
import rasr from '../riva_api/riva_asr_pb'
import rivaAudioMessages from '../riva_api/riva_audio_pb'
import rttsService from '../riva_api/riva_tts_grpc_pb'
import rtts from '../riva_api/riva_tts_pb'
import { streamToBuffer } from './utils'

export class RivaService {
  private serverAddress: string

  constructor(config?: Config) {
    this.serverAddress = config.serverAddress
  }

  speechToText = async (audioFileBuffer: Buffer) => {
    const config = new rasr.RecognitionConfig()
    config.setEncoding(rivaAudioMessages.AudioEncoding.LINEAR_PCM)
    config.setMaxAlternatives(1)
    config.setLanguageCode('en-US')

    // @ts-ignore
    const stream = Readable.from(audioFileBuffer)

    // Must get the real sample rate, otherwise it is not recognized properly. The reader also inserts the header so the web can read it easily
    const reader = new wav.Reader()
    reader.on('format', format => {
      config.setSampleRateHertz(format.sampleRate)
    })
    stream.pipe(reader)

    const request = new rasr.RecognizeRequest()
    request.setConfig(config)
    request.setAudio(await streamToBuffer(reader))

    const client = new rasrService.RivaSpeechRecognitionClient(this.serverAddress, grpc.credentials.createInsecure())
    const response = await Promise.fromCallback<rasr.RecognizeResponse>(cb => client.recognize(request, cb))
    const results = response.getResultsList()
    if (results.length > 0) {
      return results[0].toObject().alternativesList[0]?.transcript || ''
    }
    return ''
  }

  /** The audio returned by Riva doesn't include the header, so we must add it */
  private fixWavHeader = async (audio: string | Uint8Array): Promise<Buffer> => {
    const tmpFile = tmp.tmpNameSync({ postfix: '.wav' })
    const writer = new wav.FileWriter(tmpFile, { sampleRate: 44100, channels: 1 })

    const stream = new Duplex()
    stream.push(audio)
    stream.push(null)
    stream.pipe(writer)

    await Promise.fromCallback(cb => writer.on('done', cb))

    return fse.readFile(tmpFile)
  }

  textToSpeech = async (text: string): Promise<Buffer | undefined> => {
    const request = new rtts.SynthesizeSpeechRequest()
    request.setText(text)
    request.setEncoding(rivaAudioMessages.AudioEncoding.LINEAR_PCM)
    request.setLanguageCode('en-US')
    request.setSampleRateHz(44100)

    const client = new rttsService.RivaSpeechSynthesisClient(this.serverAddress, grpc.credentials.createInsecure())
    const result = await Promise.fromCallback<rtts.SynthesizeSpeechResponse>(cb => client.synthesize(request, cb))

    return this.fixWavHeader(result.getAudio())
  }
}

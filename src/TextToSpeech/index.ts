import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import md5 from 'md5';
import {
	SpeechConfig,
	SpeechSynthesisResult,
	SpeechSynthesizer,
} from 'microsoft-cognitiveservices-speech-sdk';

const voices = {
	ptBRWoman: 'pt-BR-FranciscaNeural',
	ptBRMan: 'pt-BR-AntonioNeural',
	enUSWoman1: 'en-US-JennyNeural',
	enUSWoman2: 'en-US-AriaNeural',
} as const;

export const textToSpeech = async (
	text: string,
	voice: keyof typeof voices
): Promise<string> => {
// const "AKIARJEEXGTY3ODU42CH"="AKIARJEEXGTY3ODU42CH"
// const 'TiTXJa/9CrPtTOzji8wIk+15DZIIsASXXsonyaTa '='54+LfKMNb0yMeDAnsUuFDCcmDU22lh4DpdcH0rvT'
// const 'ddmaudios'='ddm-video-transcripts'
// const 'eu-central-1'='AWS_S3_REGION'
const AZURE_TTS_KEY='d956e438355546d3acccd6882f0a9949'
const AZURE_TTS_REGION='eastus2'
	const speechConfig = SpeechConfig.fromSubscription(
		AZURE_TTS_KEY  ,
		AZURE_TTS_REGION  
	);

	if (!voices[voice]) {
		throw new Error('Voice not found');
	}

	const fileName = `${md5(text)}.mp3`;

	const fileExists = await checkIfAudioHasAlreadyBeenSynthesized(fileName);

	if (fileExists) {
		return createS3Url(fileName);
	}

	const synthesizer = new SpeechSynthesizer(speechConfig);

	const ssml = `
                <speak version="1.0" xml:lang="en-US">
                    <voice name="${voices[voice]}">
                        <break time="100ms" /> ${text}
                    </voice>
                </speak>`;

	const result = await new Promise<SpeechSynthesisResult>(
		(resolve, reject) => {
			synthesizer.speakSsmlAsync(
				ssml,
				(res) => {
					resolve(res);
				},
				(error) => {
					reject(error);
					synthesizer.close();
				}
			);
		}
	);
	const {audioData} = result;

	synthesizer.close();

	await uploadTtsToS3(audioData, fileName);

	return createS3Url(fileName);
};

const checkIfAudioHasAlreadyBeenSynthesized = async (fileName: string) => {
	 
	const s3 = new S3Client({
		region: 'eu-central-1',
		credentials: {
			accessKeyId: "AKIARJEEXGTY3ODU42CH" ,
			secretAccessKey: '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'  ,
		},
	});

	try {
		return await s3.send(
			new GetObjectCommand({Bucket: 'ddmaudios', Key: fileName})
		);
	} catch {
		return false;
	}
};

const uploadTtsToS3 = async (audioData: ArrayBuffer, fileName: string) => {
	 
	const s3 = new S3Client({
		region: 'eu-central-1',
		credentials: {
			accessKeyId: "AKIARJEEXGTY3ODU42CH" ,
			secretAccessKey: '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' ,
		},
	});

	return s3.send(
		new PutObjectCommand({
			Bucket: 'ddmaudios',
			Key: fileName,
			Body: new Uint8Array(audioData),
		})
	);
};

const createS3Url = (filename: string) => { 
       const  bukName= 'ddmaudios'
	return `https://${bukName}.s3.amazonaws.com/${filename}`;
};

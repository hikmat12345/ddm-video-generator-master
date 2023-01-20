import {useCallback, useEffect, useState} from 'react';
import {
	Audio,
	continueRender,
	delayRender,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {textToSpeech} from '../TextToSpeech';

export const Title: React.FC<{
	titleText: string;
	titleColor: string;
	titleSize: number;
}> = ({titleText, titleColor, titleSize}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const text = titleText.split(' ').map((t) => ` ${t} `);

	const [handle] = useState(() => delayRender());
	const [audioUrl, setAudioUrl] = useState('');

	const fetchTts = useCallback(async () => {
		const fileName = await textToSpeech(titleText, 'enUSWoman1');

		setAudioUrl(fileName);
		console.log(fileName);

		continueRender(handle);
	}, [handle, titleText]);

	useEffect(() => {
		fetchTts();
	}, [fetchTts]);

	return (
		<>
			{audioUrl ? <Audio src={audioUrl} /> : <></>}
			<h1
				style={{
					fontFamily: 'SF Pro Text, Helvetica, Arial',
					fontWeight: 'bold',
					fontSize: titleSize ? titleSize : 100,
					textAlign: 'center',
					position: 'absolute',
					top: 460,
					width: '100%',
					lineHeight: 1.4,
					marginRight: 20,
					marginLeft: 20,
				}}
			>
				{text.map((t, i) => {
					return (
						<span
							key={t}
							style={{
								color: titleColor,
								marginLeft: 10,
								marginRight: 10,
								transform: `scale(${spring({
									fps: videoConfig.fps,
									frame: frame - i * 9,
									config: {
										damping: 50,
										stiffness: 200,
										mass: 0.5,
									},
								})})`,
								display: 'inline-block',
							}}
						>
							{t}
						</span>
					);
				})}
			</h1>
		</>
	);
};

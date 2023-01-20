import {useState} from 'react'
import {Composition, Still, getInputProps} from 'remotion';
import {HelloWorld} from './Scene';
import { thumbnail } from './thumbnail';
export const RemotionVideo: React.FC = () => {
	const[state, setstate] = useState(300)
	const { wordText, definitionText } = getInputProps();
	const titleLength= wordText.length
	const definitionLength= definitionText.length 
	const dynamicDef= Math.ceil((definitionLength)*3)
	return (
		<>
			<Composition
				id="CompId"
				component={HelloWorld}
				durationInFrames={150+dynamicDef}
				fps={30} 
				width={1920}
				height={1080}
				defaultProps={{ 
					 titleColor: 'white', 
					 wordText: 'What does ' + 'default word' + ' mean?',
					 definitionText: 'Running default definition text.',
					 bgColor: '#6c6868',
					 definitionTextSize:70  
					 }}
			    />    
		</>
	);
};

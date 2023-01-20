import {registerRoot} from 'remotion'; 
import {Video_Form} from './Video/Video-temp'
export const MarkupUI: React.FC<{}> = () => {
  
	return (
		<div style={{flex: 1, background:'white'}}>
			<div>
         <Video_Form />
			</div>
		</div>
	);
};



registerRoot(MarkupUI);
import {
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
	Audio,
	Config,
    AbsoluteFill,
    Img 
} from 'remotion'; 
import {Title} from './Scene/Title';
import './style.css'
export const thumbnail: React.FC<{
	 wordText: string;
     bgColor:string
}> = ({ wordText, bgColor}) => {

	return (
		<>
              <div style={{ backgroundColor:bgColor,
                       backgroundRepeat: 'no-repeat',backgroundSize: 'cover',
                       width: '100%' }}>
                         <div className="dictionary-logo"></div>
                            <div className="dictionary-text">
                            {"What does "+wordText+" mean?"}
                            </div> 
		            </div>
               </>
          );
      };

import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {getReadableColor} from '../readable-color';

export const Shade: React.FC<{
	color: string;
	background: string;
}> = ({color, background}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily:
					"--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
				fontWeight: 'bold',
				fontSize: 100,
				lineHeight: 1.1,
				backgroundColor: background,
				flex: 1,
				color,
			}}
		>
			<div
				style={{
					maxWidth: 1200,
					textAlign: 'center',
					transform: `scale(${progress})`,
				}}
			>
				Thanks for watching!
				<div
					style={{
						marginTop:30,
						maxWidth: 1200,
						fontSize: 50,
						textAlign: 'center',
						transform: `scale(${progress})`,
					}}
				>
					Learn more words and definitions at
					DefineDictionaryMeaning.com
				</div>

			</div>
		</div>
	);
};

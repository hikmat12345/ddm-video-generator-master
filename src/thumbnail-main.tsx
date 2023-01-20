import { getInputProps, Composition, continueRender, delayRender, Still } from 'remotion'; 
import { thumbnail } from './thumbnail';
import {useEffect, useState} from 'react';

export const Thumbnail_main: React.FC = () => {

	return (
		      <>
            <Still
              id="CompId"
              component={thumbnail}
              width={1200}
              height={627}
              defaultProps={{
                  wordText: `What does default word mean?`,
                  bgColor: `#3f3f3f`
              }} 
            />
        </>
    )
  }
/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */

 import {bundle} from '@remotion/bundler';
 import {
	 getCompositions,
	 renderFrames,
	 stitchFramesToVideo,
 } from '@remotion/renderer';
 import express from 'express';
 import fs from 'fs';
 import os from 'os';
 const path =require('path');
 const cors= require('cors')  
 const bodyParser = require('body-parser'); 
 const {exec} =require('child_process')
 const app = express();
 const url = require('url');
 const port = process.env.PORT || 8004;
 const compositionId = 'CompId';
  
 const cache = new Map<string, string>();
 //  import build version of react client
 const nodeEnv: any='developement'
if(nodeEnv=='developement'){
 app.use(express.static('client/build'))  
}
var publicDir = path.join(__dirname,'/public'); 
app.use(express.static(publicDir)); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
 app.get('/serverApi', async (req:any, res:any) => {
	     res.set('Access-Control-Allow-Origin', '*')
         try{ 
 
  	           if(req.query.formate=="image"){
					// const sendFile = (file: string) => {
					// 	fs.createReadStream(file)
					// 		.pipe(res)
					// 		.on('close', () => {
					// 			res.end();
					// 		});
					// 	};
					//     if (cache.get(JSON.stringify(req.query))) {
					// 		 sendFile(cache.get(JSON.stringify(req.query)) as string);
					// 		 return;
					//     	}
			        //    const thumb_bundled:any = await bundle(path.join(__dirname, './src/thumbnail-index.tsx'));
			        //    const thumb_comps = await getCompositions(thumb_bundled, {inputProps: req.query});
					//     const thumb_video = thumb_comps.find((c) => c.id === compositionId);
					// 	 if (!thumb_video) {
					// 		 throw new Error(`No thumb_video called ${compositionId}`);
					// 	 } 
					// 	 const thumb_tmpDir = await fs.promises.mkdtemp(
					// 		 path.join(`public/thumbnails/pic-${req.query.wordText}`)
					// 	 );
					//     const thumbFinalOutput = path.join(thumb_tmpDir, 'element-0.jpeg'); 
					// 		 await renderFrames({
					// 		 config: thumb_video,
					// 		 webpackBundle: thumb_bundled,
					// 		 onStart: () => console.log('Rendering frames...'),
					// 		 onFrameUpdate: (f) => {
					// 			 if (f % 10 === 0) {
					// 				 console.log(`Rendered frame ${f}`);
					// 			 }
					// 		 },
					// 		 parallelism: null,
					// 		 outputDir: thumb_tmpDir,
					// 		 inputProps: req.query,
					// 		 compositionId,
					// 		 imageFormat: 'jpeg',
					// 	 }); 
					// 	 cache.set(JSON.stringify(req.query), thumbFinalOutput); 
					// 	 sendFile(thumbFinalOutput); 
					// 	 let resFilePath = thumbFinalOutput.replace(/public/g, "");
					// 	 res.status(200).json({ video_url:`https://video.definedictionarymeaning.com/${resFilePath}`})
					// npx remotion still --props='{"custom": "data"}' src/index.tsx my-comp out.png 
					await fs.writeFile('./props.json', JSON.stringify(req.query), (erro)=>{
						if(erro){
							console.log(erro, 'error while creating file/update')
						}else{
							console.log('successfuly while creating file/update')
						} 
					  })
					await exec(`npx remotion still src/thumbnail-index.tsx CompId public/thumbnails/image.jpeg --props=./props.json`, async (errr:any, sterr:any, standerr:any)=>{
						if(errr){
							console.log(errr, 'errof')
									return
							}	
					 res.status(200).json({video_url:`https://video.definedictionarymeaning.com/thumbnails/image.jpeg`})
						   console.log(standerr, sterr, 'standerr, sterr')
					}) 
				
				}	
				else {
					await fs.writeFile('./props.json', JSON.stringify(req.query), (erro)=>{
						 if(erro){
							 console.log(erro, 'error while creating file/update')
						 }else{
							 console.log('successfuly while creating file/update')
						 } 
					   })
					 await exec(`npx remotion render src/index.tsx CompId public/video/dict-video.mp4 --props=./props.json`, async (errr:any, sterr:any, standerr:any)=>{
						 if(errr){
							 console.log(errr, 'errof')
									 return
							 }	
					  res.status(200).json({video_url:`https://video.definedictionarymeaning.com/video/dict-video.mp4`})
							console.log(standerr, sterr, 'standerr, sterr')
					 }) 
			        console.log('video renderd')
			     }  
			 } catch (err: any) { 
				 console.log(err, 'errr')
					res.status(403).json({
						error: err.message,
						res: err,
			   });
		     }	
		 })
  
		app.get('/ruff', async (req, res) => { 
			res.set('Access-Control-Allow-Origin', '*')
			res.json({ video_url: 1 });
			}) 
       app.listen(port);
 
 console.log(
	 [
		 `The server has started on http://localhost:${port}!`,
		 'You can render a video by passing props as URL parameters.',
		 '',
		 'If you are running Hello World, try this:',
		 '',
		 `http://localhost:${port}?titleText=Hello,+World!&titleColor=red`,
		 '',
	 ].join('\n')
 );




	
 

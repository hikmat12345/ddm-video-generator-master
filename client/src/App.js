




import React, {useEffect,useState} from 'react'
import "./Video.css" 
import { continueRender, delayRender } from "remotion";
import { JellyBounceLoader } from 'react-loaders-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const  App= ()=> { 
    const [word, setWord] = useState()
    const [definition, setDefinition] = useState()
    const [videoUrl, setVideoUrl] = useState()
    const [formatValue, setFormateValue] = useState('video');
    const [loading, setLoading] = useState(false);
    const [wcolor, setWordColor] = useState('#ffffff');
    const [dcolor, setDefColor] = useState('#202124');
    const [handle] = useState(() => delayRender());
    const loaderProps = {
      loading,
      size: 20,
      duration: 1
    }
    const checkHours = (hourValue ) => {
      if( hourValue === "image"){
       const formateValue  =hourValue
       setFormateValue(formateValue)
      } else if ( hourValue === "video"){
        const formateValue  =hourValue
        setFormateValue(formateValue)
      } 
      console.log(formatValue)
    };
     
    const submitForm=()=>{ 
       setLoading(true)
       console.log('submit') 
       var myHeaders = new Headers();
       myHeaders.append("Content-Type", "application/json");
       
       var requestOptions = {
         method: 'GET', 
         redirect: 'follow'
       };
      
      fetch(`https://video.definedictionarymeaning.com/serverApi/?titleColor=${wcolor.replace('#', '%23')}&wordText=${word}&definitionText=${definition}&bgColor=${dcolor.replace('#', '%23')}&formate=${formatValue}`, requestOptions)
        .then(response => response.json())
          .then((result ) => {  
                console.log(result, 'res')
                setVideoUrl(result.video_url)
                setLoading(false) 
                 toast.success('File downloaded successfuly!', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  }) 
        }).catch(error =>
            { console.log('error', error)
              setLoading(false)
              toast.error('Failed to download.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }); 
           }
        );
        continueRender(handle);
     } 
    const wordInput=(event )=>{
      setWord(event.target.value) 
    }
    const defInput=(event )=>{
      setDefinition(event.target.value) 
    }
    const wordColor=(event )=>{
      setWordColor(event.target.value) 
    }
    const definitionColor=(event )=>{
      setDefColor(event.target.value) 
    }
    console.log(wcolor, dcolor, word)
    useEffect(() => {
      setVideoUrl(videoUrl)  
    }  , [videoUrl])
   const downloadLinkTitle= word?.replace(/\s+/g, '-').toLowerCase();
    return (
      <>
      <div className='header'>Create Video for Define Dictionary </div>
        <div className="Video-form-container">
            <div className="input-form-box">
                <div className=" dt-checkbox">
                    <FormControl>
                       <FormLabel id="demo-row-radio-buttons-group-label">Format</FormLabel>
                         <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel value="video" control={<Radio onChange={()=>checkHours('video')} />} label="Video" />
                          <FormControlLabel value="image" control={<Radio onChange={()=>checkHours('image')} />} label="Thumbnail" />
                         </RadioGroup>
                      </FormControl> 
                     </div>
                    <div>
                     <label >Select word text color: </label> 
                     <input type="color" id="favcolor" name="wordColor" onChange ={wordColor} value={wcolor}/>
                    <br/> <br/><label >Select definition text color: </label>
                     <input type="color" id="favcolor" name="defColor"  onChange ={definitionColor} value={dcolor}/>
                   </div> 
                    <br/>
                  <div>
                   <input className='words' id="word"  onChange={wordInput}    value={word}  placeholder="Enter Word" />
                </div>
              <br/>
                <textarea placeholder="Enter Word Definition..." onChange={defInput} value={definition}/>  
             <div className="d-flex">  
               <button onClick={submitForm} className="video-form-apply-btn">{!loading ? "Generate" : <JellyBounceLoader {...loaderProps} />}</button>       
               {videoUrl &&  <a class="btn-download" variant="contained" color="error"   href={`${videoUrl}`} download={`${downloadLinkTitle}`}> Download </a>}
             </div>
             
           </div>
           <ToastContainer/>
        </div>
        <br/><br/>
        <div className='footer'></div>
        </>
        )
      }
   

export default App;

import React, {useEffect,useState} from 'react'
import "./Video.css"
import  {RemoVideoAPI} from "./api"; 
import { JellyBounceLoader } from 'react-loaders-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  Video_Form: React.FC <{
         yellowText ?:string; 
      }>=({
        yellowText, 
    }) => {
    const [word, setWord] = useState<any>()
    const [definition, setDefinition] = useState<any>()
    const [videoUrl, setVideoUrl] = useState()
    const [formatValue, setFormateValue] = useState('video');
    const [loading, setLoading] = useState(false);
    const [wcolor, setWordColor] = useState('#ffffff');
    const [dcolor, setDefColor] = useState('#2323a1');
    const loaderProps = {
      loading,
      size: 20,
      duration: 1
    }
    const checkHours = (hourValue ?:any) => {
      if( hourValue === "image"){
       const formateValue :string=hourValue
       setFormateValue(formateValue)
      } else if ( hourValue === "video"){
        const formateValue: string =hourValue
        setFormateValue(formateValue)
      } 
      console.log(formatValue)
    };
     
    const submitForm=()=>{
       setLoading(true)
       console.log('submit') 
        var requestOptions : any = {
          method: 'GET',
          redirect: 'follow'
        }; 
        fetch(`http://localhost:8000/?titleColor=${wcolor.replace('#', '%23')}&wordText=${word}&definitionText=${definition}&bgColor=${dcolor.replace('#', '%23')}&formate=${formatValue}`, requestOptions)
          .then(response => response.json())
          .then((result ?:any ) => {
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
    } 
    const wordInput=(event ?:any)=>{
      setWord(event.target.value) 
    }
    const defInput=(event ?: any)=>{
      setDefinition(event.target.value) 
    }
    const wordColor=(event ?: any)=>{
      setWordColor(event.target.value) 
    }
    const definitionColor=(event ?: any)=>{
      setDefColor(event.target.value) 
    }
    console.log(wcolor, dcolor)
    useEffect(() => {
      setVideoUrl(videoUrl) 
      console.log(videoUrl, 'url')
    }  , [videoUrl])

    
    const spaceKeyWord=(e ?:any)=>{
      if(e.keyCode == 32){ 
          setWord(word.concat(' '))
          console.log('just simple')
       }
     }
    const spaceKeyDef=(e ?:any)=>{
      if(e.keyCode == 32){ 
        setDefinition(definition.concat(' '))
          console.log('just simple')
       }
     }
     
    return (
        <div className="Video-form-container">
             <div className="input-form-box">
                <div className=" dt-checkbox">
                     <label>Thumbnail</label>
                        <input onChange={()=>checkHours('image')} name="formate" type='radio' /> 
                         <label>Video</label>
                       <input  onChange={()=>checkHours('video')} name="formate" type='radio'/>  
                     </div>
                    <div>
                     <label >Select word text color: </label>
                     <input type="color" id="favcolor" name="wordColor" onChange ={wordColor} value={wcolor}/>
                    <br/> <br/><label >Select definition text color: </label>
                     <input type="color" id="favcolor" name="defColor"  onChange ={definitionColor} value={dcolor}/>
                   </div> 
                    <br/>
                  <div>
                   <input className='words' id="word"  onChange={wordInput} onKeyUp={spaceKeyWord}   value={word}  placeholder="Enter Word" />
                </div>
              <br/>
                <textarea placeholder="Enter Word Definition..." onKeyUp={spaceKeyDef} onChange={defInput} value={definition}/>  
             <div className="d-flex">  
               <button onClick={submitForm} className="video-form-apply-btn">{!loading ? "Make Video" : <JellyBounceLoader {...loaderProps} />}</button>       
             </div>
           </div>
           <ToastContainer/>
        </div>
        )}

export  {Video_Form}


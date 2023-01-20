import React from 'react'
export  const  RemoVideoAPI= async (word ?: any, definition?: any)=>{
  try{
    var requestOptions: any = {
      method: 'GET',
    };
     const appEnd: any= fetch(`http://localhost:8000/?titleColor=white&wordText=${word}&definitionText=${definition}&bgColor=%232323a1&formate=video`, requestOptions)
     const res= await  appEnd.json()
     return res
  } catch(e){
      console.log('error in api')
      
  }
}
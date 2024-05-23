import { getDatabase, set,ref, update } from 'firebase/database';
import React, { useState } from 'react'
import { app } from '../firebase';
import { getDownloadURL, getStorage,ref as imgref, uploadBytes } from 'firebase/storage';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateWorkers = () => {

    const location = useLocation();

    const [name,setName]=useState(location.state[1].Name);
    const [id,setId]=useState(location.state[0]); 
    const [phone,setPhone]=useState(location.state[1].Phone);
    const [img,setImg]  = useState(null);
    const navigate = useNavigate();

    const imgHaldler =(event)=>{
        const file=event.target.files[0]
        setImg(file);
    }

    const subimtHadler =async (event)=>{
        event.preventDefault();
        const db = getDatabase(app)
        const st = getStorage(app)

       if(img){
        const reference = imgref(st,`photos/${id}`)
        await uploadBytes(reference,img)
        const imgUrl =await getDownloadURL(reference)

        const refe = ref(db,'workers'+location.state[0])
        update(refe,{
            Name:name,
            Phone:phone,
            ImgUrl:imgUrl
        })

        .then(() => {
            navigate('/showworkers')
        })
        .catch((err) => {
            alert("Error 404")
        })
       }
       else{
        const refe = ref(db,'workers'+location.state[0])
        update(refe,{
            Name:name,
            Phone:phone
        })
       }
    }

  return (
    <div>
        
        <h1>Worker List</h1>
       <form onSubmit={subimtHadler}>
       <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Workers name'></input>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} type='number' placeholder='Workers Phone '></input>
        <input value={id} onChange={(e) => setId(e.target.value)} type='text' placeholder='Workers Id ' disabled></input>
        <input onChange={imgHaldler} type='file'></input>
        <input type='submit'></input>
       </form>

    </div>
  )
}

export default UpdateWorkers
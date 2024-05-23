import { getDatabase, set,ref } from 'firebase/database';
import React, { useState } from 'react'
import { app } from '../firebase';
import { getDownloadURL, getStorage,ref as imgref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const AddWorkers = () => {

    const [name,setName]=useState('');
    const [id,setId]=useState(''); 
    const [phone,setPhone]=useState(null);
    const [img,setImg]  = useState();
    const navigate = useNavigate();

    const imgHaldler =(event)=>{
        const file=event.target.files[0]
        setImg(file);
    }

    const subimtHadler =async (event)=>{
        event.preventDefault();
        const db = getDatabase(app)
        const st = getStorage(app)

        const reference = imgref(st,`photos/${id}`)
        await uploadBytes(reference,img)
        const imgUrl =await getDownloadURL(reference)

        set(ref(db,`workers/${id}`),{
            Name:name,
            Phone:phone,
            ImgUrl:imgUrl
        })

        .then(() => {
            navigate('/Showworkers')
        })
        .catch((err) => {
            alert("Error 404")
        })
    }

  return (
    <div>
        
        <h1>Worker List</h1>
       <form onSubmit={subimtHadler}>
       <input onChange={(e) => setName(e.target.value)} type='text' placeholder='Workers name'></input>
        <input onChange={(e) => setPhone(e.target.value)} type='number' placeholder='Workers Phone '></input>
        <input onChange={(e) => setId(e.target.value)} type='text' placeholder='Workers Id '></input>
        <input onChange={imgHaldler} type='file'></input>
        <input type='submit'></input>
       </form>

    </div>
  )
}

export default AddWorkers
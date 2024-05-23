import  { getFirestore,updateDoc,doc}from 'firebase/firestore';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getStorage, ref as imgRef, getDownloadURL, uploadBytes } from 'firebase/storage'

import { app } from '../firebase';

export const UpdateFaculty = () => {

    const location=useLocation()
    const navigate = useNavigate(); 
    const [name,setName] = useState(location.state.Name);
    const [phone,setPhone] = useState(location.state.Phone);
    const [image, setImage] = useState(null)


    const handleImage = (event) => {
      const file = event.target.files[0]
      setImage(file)
  }

  const submitHandler =async (event) =>{
    console.log(name,phone)
    event.preventDefault();

   if(image)
    {
      const db = getFirestore(app);
      const storage = getStorage(app)
      const imgReference = imgRef(storage, `images/${phone}`)
      await uploadBytes(imgReference, image)
  
      const imgUrl = await getDownloadURL(imgReference)
  
     const docref = doc(db,'Faculty',location.state.id)
  
      try{
              await updateDoc(docref,{
                  Name:name,
                  Phone:phone,
                  imgUrl:image
              })
              navigate('/showfaculty')
      }catch(err)
      {
          console.log(err);
      }
    }
    else{
      const db = getFirestore(app);
      try{
        const docref = doc(db,'Faculty',location.state.id)
              await updateDoc(docref,{
                  Name:name,
                  Phone:phone,
              })
              navigate('/showfaculty')
      }catch(err)
      {
          console.log(err);
      }
    }

  }
  return (
    <div><h1>Add Faculty</h1>
    
    <form onSubmit={submitHandler}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name ' required />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type='number' placeholder='Phone Number'  required />
                <input onChange={handleImage} type='file' accept='image/*' />

                <input type='submit' value='Update' />
            </form>
    </div>
  )
}

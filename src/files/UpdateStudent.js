import React from 'react'
import { useState } from 'react'
import { getDatabase,ref,set, update } from 'firebase/database' 
import { getStorage, ref as imgRef, getDownloadURL, uploadBytes } from 'firebase/storage'
import { app } from '../firebase'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateStudent = () => {

    const navigate = useNavigate();    
    const location = useLocation();

    const [name,setName] = useState(location.state[1].Name)
    const [phone,setPhone] = useState(location.state[1].Phone)
    const [roll,setRoll] = useState(location.state[0])
    const [image, setImage] = useState(null)

    
    const handleImage = (event) => {
      const file = event.target.files[0]
      setImage(file)
  }



    console.log(name,phone,roll)
    const submitHandler = async(event) => 
    {
         event.preventDefault();
      if(image)
        {
          
    const db = getDatabase(app)
    const storage = getStorage(app)
    const imgReference = imgRef(storage, `images/${roll}`)
    await uploadBytes(imgReference, image)

    const imgUrl = await getDownloadURL(imgReference)

    const studentRef = ref(db,'Student/'+location.state[0] )//can pass roll accep this because roll holds its value which is a key 
    update(studentRef,{Name:name,Phone:phone,imageUrl: imgUrl})
    .then(res=>{
        navigate('/showstudent')
    })

    .catch(err=>{
       console.log('Failed')
    })
        }


    
    else{
    const db = getDatabase(app)


    const studentRef = ref(db,'Student/'+location.state[0] )//can pass roll accep this because roll holds its value which is a key 
    update(studentRef,{Name:name,Phone:phone})
    .then(res=>{
        navigate('/showstudent')
    })

    .catch(err=>{
       console.log('Failed')
    })
    }

    }

  return (
    <>
    <h1>Student LIst</h1>

    <form onSubmit={submitHandler}>
    <input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='Enter Name '></input>
    <input value={phone} onChange={(e)=>setPhone(e.target.value)} type='number' placeholder='Phone Number'></input>
    <input disabled value={roll} onChange={(e)=>setRoll(e.target.value)} type='number' placeholder='Roll Number'></input>
    <input onChange={handleImage} type='file' accept='image/*' />

    <input type='submit'></input>
    </form>
    
    </>
  )
}

export default UpdateStudent
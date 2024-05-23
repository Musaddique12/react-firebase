import  {collection,addDoc, getFirestore}from 'firebase/firestore';
import { getStorage, ref as imgRef, getDownloadURL, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';

export const Addfaculty = () => {

    const navigate = useNavigate(); 
    const [name,setName] = useState('');
    const [phone,setPhone] = useState(null);
    const [image, setImage] = useState(null)


    const handleImage = (event) => {
      const file = event.target.files[0]
      setImage(file)
  }


  const submitHandler =async (event) =>{
    console.log(name,phone)
    event.preventDefault();
    const db = getFirestore(app);
    const storage = getStorage(app)

    const imgReference = imgRef(storage, `images/${phone}`)
    await uploadBytes(imgReference, image)

    const imgUrl = await getDownloadURL(imgReference)

    const docRef = await addDoc(collection(db,'Faculty/'),{
        Name:name,
        Phone:phone,
        imageUrl: imgUrl

    })

    .then(res=>{
        navigate('/showfaculty')
    })

  }
  return (
    <div><h1>Add Faculty</h1>
    
    <form onSubmit={submitHandler}>
                <input onChange={(e) => setName(e.target.value)} placeholder='Enter Name ' required />
                <input onChange={(e) => setPhone(e.target.value)} type='number' placeholder='Phone Number' maxLength={10} required />
                <input onChange={handleImage} type='file' accept='image/*' required />

                <input type='submit' value='Submit' />
            </form>
    </div>
  )
}

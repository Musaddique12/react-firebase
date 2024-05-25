import { getDatabase, ref, set } from 'firebase/database';
import React, { useState } from 'react'
import { app } from '../firebase';
import { getDownloadURL, getStorage,ref as imgRefe, uploadBytes } from 'firebase/storage';

const AddFood = () => {

    const [foodName,setFoodName] = useState('');
    const [price,setPrice] = useState(null);
    const [category,setCategory] = useState('');
    const [foodPic,setFoodPic] = useState(null);

    const imgHandler =(event) =>{
        const file  = event.target.files[0]
        setFoodPic(file);
    }

    const submitHandler = async (event)=>{
        event.preventDefault()
        const db = getDatabase(app)
        const storage = getStorage(app)
        const imgref = imgRefe(storage,'canteen-food/'+category);

        await uploadBytes(imgref,foodPic)
        const imgurl = await getDownloadURL(imgref)

        set(ref(db,'food/'+category),{
            Food:foodName,
            Price:price,
            Img:imgurl
        })

        .then((res)=>{
            console.log('Succeful')
        })
        .catch((err)=>{
            console.log(err);
        })
        
    }

  return (
    <>
          <form onSubmit={submitHandler}>
              <input type='text' onChange={(e) => setFoodName(e.target.value)} placeholder='Food Name'></input>
              <input type='number' onChange={(e)=> setPrice(e.target.value+'$')} placeholder='Price'></input>
              <input  type='text' onChange={(e)=> setCategory(e.target.value)} placeholder='CAtegory'></input>
              <input type='file' onChange={imgHandler}></input>
              <input type='submit' value='Add Food'></input>
          </form>
    </>
  )
}

export default AddFood
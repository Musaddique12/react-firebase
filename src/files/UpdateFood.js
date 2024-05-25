import { getDatabase, ref, set, update } from 'firebase/database';
import React, { useState } from 'react'
import { app } from '../firebase';
import { getDownloadURL, getStorage,ref as imgRefe, uploadBytes } from 'firebase/storage';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateFood = () => {

    const navigate = useNavigate()
    const location = useLocation();
    console.log(location.state)

    const [foodName,setFoodName] = useState(location.state[1].Food);
    const [price,setPrice] = useState(location.state[1].Price);
    const [category,setCategory] = useState(location.state[0]);
    const [foodPic,setFoodPic] = useState(null);

    const imgHandler =(event) =>{
        const file  = event.target.files[0]
        setFoodPic(file);
    }

    const submitHandler = async (event)=>{
        event.preventDefault()
      
        if(foodPic)
       {
        const db = getDatabase(app)
        const storage = getStorage(app)
        const imgref = imgRefe(storage,'canteen-food/'+category);

        await uploadBytes(imgref,foodPic)
        const imgurl = await getDownloadURL(imgref)

        const foodRef = ref(db,'food/'+category)
        update(foodRef,{
            Name:foodName,
            Price:price,
            Ing:imgurl
        })
        .then((res)=>{
            navigate('/dashbord/canteen')
        })
        .catch((err)=>{
            console.log(err);
        })
    }else{
        const db = getDatabase(app)

        const foodRef = ref(db,'food/'+category)
        update(foodRef,{
            Name:foodName,
            Price:price,
        })
        .then((res)=>{
            navigate('/dashbord/canteen')
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    }

  return (
    <>
          <form onSubmit={submitHandler}>
              <input value={foodName} type='text' onChange={(e) => setFoodName(e.target.value)} ></input>
              <input value={price} type='text' onChange={(e)=> setPrice(e.target.value)} ></input>
              <input value={category} type='text' onChange={(e)=> setCategory(e.target.value)} disabled></input>
              <input type='file' onChange={imgHandler}></input>
              <input type='submit' value='Add Food'></input>
          </form>
    </>
  )
}

export default UpdateFood
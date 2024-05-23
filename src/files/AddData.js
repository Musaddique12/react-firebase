import { getDatabase, ref, set } from 'firebase/database'
import React from 'react'
import { app } from '../firebase'

export const AddData = () => {

    const addDemoData = (userID,name,phone)=>
    {
        console.log(userID,name,phone);

        const db = getDatabase(app)
        set(ref(db,'student/'+userID),{
            studentname:name,
            studentPhone:phone
        })
     }


  return (
    <div>
        <h1>click to add data in firebase</h1>
        <button onClick={()=>{addDemoData(153,'Musa',12345877789)}}>Click here</button>


    </div>
  )
}

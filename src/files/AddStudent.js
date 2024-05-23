import React, { useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database' 
import { getStorage, ref as imgRef, getDownloadURL, uploadBytes } from 'firebase/storage'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [roll, setRoll] = useState('')
    const [image, setImage] = useState(null)
    const navigate = useNavigate()

    const handleImage = (event) => {
        const file = event.target.files[0]
        setImage(file)
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        const db = getDatabase(app)
        const storage = getStorage(app)

        const imgReference = imgRef(storage, `images/${roll}`)
        await uploadBytes(imgReference, image)

        const imgUrl = await getDownloadURL(imgReference)

        set(ref(db, `Student/${roll}`), {
            Name: name,
            Phone: phone,
            imageUrl: imgUrl
        })
        .then(() => {
            navigate('/ShowStudent')
        })
        .catch((err) => {
            alert("Error 404")
            navigate('/AddStudent')
        })
    }

    return (
        <>
            <h1>Add Student</h1>
            <form onSubmit={submitHandler}>
                <input onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter Name ' required />
                <input onChange={(e) => setPhone(e.target.value)} type='tel' placeholder='Phone Number' required />
                <input onChange={(e) => setRoll(e.target.value)} type='number' placeholder='Roll Number' required />
                <input onChange={handleImage} type='file' accept='image/*' required />
                <input type='submit' value='Submit' />
            </form>
        </>
    )
}

export default AddStudent

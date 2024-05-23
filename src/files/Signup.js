import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../firebase'; // Ensure the correct path
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        setError(''); // Reset error message

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user);
                navigate('/login');
            })
            .catch((error) => {
                console.error(error);
                setError(error.message); // Set error message to display to the user
            });
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={submitHandler}>
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    type='email' 
                    placeholder='Enter Email' 
                    value={email}
                    required 
                />
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    type='password' 
                    placeholder='Enter Password' 
                    value={password}
                    required 
                />
                <input type='submit' value='Submit' />
                <button type='button' onClick={()=>{navigate('login')}}></button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        </div>
    );
};

export default Signup;

import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, RecaptchaVerifier, signInWithPhoneNumber,TwitterAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { app } from '../firebase'; // Ensure the correct path
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [phone,setPhone] = useState(null);
    const [isOtp,setIsOtp] = useState(false);
    const [code,setCode] = useState('');
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        setError(''); // Reset error message

        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user);
                navigate('/dashboard'); // Corrected redirection path
            })
            .catch((error) => {
                console.error('Error during email sign-in:', error);
                setError(error.message); // Set error message to display to the user
            });
    };

    const signInWithProvider = (provider) => {
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                navigate('/dashbord'); // Redirect after successful login
            })
            .catch((err) => {
                console.error(`Error during ${provider.providerId} sign-in:`, err);
                setError(err.message); // Set error message to display to the user
            });
    };

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithProvider(provider);
    };

    const loginWithTwitter = () => {
        const provider = new TwitterAuthProvider();
        signInWithProvider(provider);
    };

    const loginWithGitHub = () => {
        const provider = new GithubAuthProvider();
        signInWithProvider(provider);
    };

    const loginWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithProvider(provider);
    };

    const sendOtp =()=>{
        const auth = getAuth(app)
        const appVerifier = new RecaptchaVerifier(auth,'abc',{'size':'invisible'});
        signInWithPhoneNumber(auth,phone,appVerifier)
        .then(res=>{
            console.log(res)
            window.confirmationResult = res;
            console.log('Otp Sended')
            setIsOtp(true)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    const confirmOtp  = () =>{
        window.confirmationResult.confirm(code).then(res=>{
            console.log(res);
            navigate("/dashbord");
        }).catch(err=>{
            console.log(err);
        })
    }


    return (
        <div>
            <h1>Login</h1>
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


                <button type='button' onClick={loginWithGoogle}>Login With Google</button>
                <button type='button' onClick={loginWithTwitter}>Login With twitter</button>
                <button type='button' onClick={loginWithGitHub}>Login With Git Hub</button>
            <button type='button'onClick={loginWithFacebook}>Login With Facebook</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        
           {!isOtp?
            <div>  <br/><br/>
            <h3>Login with Otp with Rechapcha</h3>
            <input  onChange={(e) => {setPhone(e.target.value)}} placeholder="Enter Phone NUmber" ></input>
            <p id='abc'></p>
            <button type='button' onClick={sendOtp}>Send Otp</button>
            </div>
            :
            <div>
                <br/><br/>
                <input type='text' onChange={(e)=>{setCode(e.target.value)}}></input>
                <button onClick={confirmOtp} type='button'>Submit otpo</button>
            </div>
            }

            </form>
           

        </div>
    );
};

export default Login;

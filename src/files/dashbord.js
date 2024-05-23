import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { app } from '../firebase'

const Dashbord = () => {

  useEffect(()=>{
    const auth = getAuth(app)
    const CheckLogin = onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log('Yes Log in')
      }
      else{
        console.log('not not  login')
        navigate('/login')
      }
    })
    return()=> CheckLogin();
  })

  const navigate = useNavigate();
  const logout=()=>{
    const auth = getAuth(app)
    signOut(auth).then(res=>{
      navigate('/signup');
    })
  }

  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      
        <div style={{height:'94vh',width:'20%',padding:'20px',backgroundColor:'rosybrown'}}>
          <Link to='/dashbord/student' style={{display:'block',color:'white',marginBottom:'4px'}}>Add Studnet</Link>
          <Link to='/dashbord/ShowStudent' style={{display:'block',color:'white',marginTop:'4px'}}>Show Student</Link>
          <Link to='/dashbord/faculty' style={{display:'block',color:'white',marginTop:'4px'}}>Add Faculty</Link>
          <Link to='/dashbord/showfaculty'style={{display:'block',color:'white',marginTop:'4px'}} >Show Faculty</Link>
          <Link to='/dashbord/addworkers'style={{display:'block',color:'white',marginTop:'4px'}} >Add Worker</Link>
          <Link to='/dashbord/showworkers'style={{display:'block',color:'white',marginTop:'4px'}} >Show Worker</Link>
          <br/>
          <button type='button' onClick={logout}>Logout</button>
        </div>

        <div style={{height:'94vh',width:'80%',padding:'18px',border:'2px solid black'}}>
          <Outlet/> </div>
    </div>
  )
}

export default Dashbord
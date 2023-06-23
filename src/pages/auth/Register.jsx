import React, { useState } from 'react'
import styles from './auth.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../../assets/register.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase/config'
const Register = () => {
  const navigate =useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [loading, setLoading]= useState(false);
  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(email,password,cPassword)
    setLoading(true);
    if(password!==cPassword){
     toast.error("Incorrect Password") 
     setLoading(false);
    }
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    setLoading(false);
     navigate('/login')
  })
  .catch((error) => {
    toast.error(error.message)
  });
  }
  return (
    <>
    <ToastContainer/>
    {loading && (<p>Loading....</p>)}
    <section className={`container ${styles.auth}`}> 
    
    <div className={styles.form}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}required />
            <input type="password" placeholder='Confirm Password' value={cPassword} onChange={(e)=>setCPassword(e.target.value)} required />
            <button type='submit' className="--btn --btn-primary --btn-block">Register</button>
        </form>
        <span className={styles.register}>
            <p>Already have an Account?</p>
            <Link to='/login'>Login</Link>
        </span>
    </div>
    <div className={styles.img}>
        <img src={registerImg} alt="register" width='400' />
    </div>
    

    </section>
    </>
  )
}

export default Register
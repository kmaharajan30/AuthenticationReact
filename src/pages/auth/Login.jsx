import React, { useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
    const navigate =useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]= useState(false);
  const handleSubmit =(e)=>{
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => { 
    const user = userCredential.user;
    setLoading(false);
    toast.success("Login Successful!")
    
    navigate('/')
    // ...
  })
  .catch((error) => {
    setLoading(false);
    toast.error("Login Failed X")
    // ..
  });

  }
  return (
    
    
    <section className={`container ${styles.auth}`}> 
    {loading && (<p>loading...</p>)}
    <div className={styles.img}>
        <img src={loginImg} alt="login" width='400' />
    </div>
    <div className={styles.form}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} >
            <input type="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <button type='submit' className="--btn --btn-primary --btn-block">Login</button>
            <div className={styles.links}>
                <Link to='/reset'  >Forgot Password</Link>
            </div>

        </form>
        <span className={styles.register}>
            <p>Dont have an account?</p>
            <Link to='/register'>Register</Link>
        </span>
    </div>

    </section>
    
  )
}

export default Login
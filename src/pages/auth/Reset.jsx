import React, { useState } from 'react'
import styles from './auth.module.scss'
import resetImg from '../../assets/forgot.png'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
const Reset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading]= useState(false);
  const handleReset =(e)=>{
    e.preventDefault();
    setLoading(true);
sendPasswordResetEmail(auth, email)
  .then(() => {
    setLoading(false);
    toast.success("Link sent to mail")
  })
  .catch((error) => {
    setLoading(false);
    toast.error(error.message);
    // ..
  });
  }

  return (
    
    <section className={`container ${styles.auth}`}> 
    {loading && (<p>loading....</p>)}
    <div className={styles.img}>
        <img src={resetImg} alt="login" width='400' />
    </div>
    <div className={styles.form}>
        <h2>Reset Password</h2>
        <form onSubmit={handleReset} >
            <input type="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button type='submit'  className="--btn --btn-primary --btn-block">Reset Password</button>
            <div className={styles.links}>
              <p>
                <Link to='/login'>- Login</Link>
              </p>
              <p>
                <Link to='/register'>- Register</Link>
              </p>
            </div>

        </form>
    </div>

    </section>
  )
}

export default Reset
import React, { useEffect, useState } from 'react'
import styles from './header.module.scss'
import { Link, NavLink } from 'react-router-dom'
import {FaShoppingCart, FaUserCircle} from "react-icons/fa"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { removeActiveUser, setActiveUser } from '../../redux/slice/AuthSlice'
import ShowLoggedIn, { ShowLoggedOut } from '../hideLinks/HideLinks'

const logo =(
    <div className={styles.logo}>
            <Link to='/'>
                <h2>
                    e<span>Comm</span>.
                </h2>
            </Link>
        </div>
)
const cart =(
    <span className={styles.cart}>
                    <Link to='/cart'>Cart
                    <FaShoppingCart size={20}/>
                    <p>0</p>
                    </Link>
                </span>
)
const activeLink = ({isActive})=>(isActive ? `${styles.active}` : " ")
const Header = () => {
    const {isLoggedIn, email, userId} = useSelector((state)=>state.auth);
    const [uName, setUName] =useState('');
    const dispatch =useDispatch();
    const handleLogout =()=>{
        signOut(auth).then(() => {
            toast.success("Logout Successful")
          }).catch((error) => {
            // An error happened.
            toast.error(error.message);
          });
    }
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              setUName(user.email);
              dispatch(setActiveUser({
                email : user.email,
                userId : user.uid,
              }

              ))
            
            } else {
              setUName("");
              dispatch(removeActiveUser());
            }
          });

    },[dispatch]);
   
    
  return (
    <header>
        <div className={styles.header}>
            {logo}
            <nav>
                <ul>
                    <li><NavLink to='/' className={activeLink}>Home</NavLink></li>
                </ul>
                <ul>
                    <li><NavLink to='/contact' className={activeLink}>Contact Us</NavLink></li>
                </ul>
                <div className={styles["header-right"]}>
                    <span className={styles.links}>
                        <ShowLoggedIn>
                        <a href='#'>
                        <FaUserCircle size={16}/>
                         {uName} </a>
                         </ShowLoggedIn>
                         <ShowLoggedOut>
                        <NavLink to='/login' className={activeLink}>Login</NavLink>
                        </ShowLoggedOut>
                        <ShowLoggedOut>
                        <NavLink to='/register' className={activeLink}>Register</NavLink>
                        </ShowLoggedOut>
                        <ShowLoggedIn>
                        <NavLink to='/order-history' className={activeLink}>My Orders</NavLink>
                        </ShowLoggedIn>
                        <ShowLoggedIn>
                        <NavLink to='/' onClick={handleLogout}>Logout</NavLink>
                        </ShowLoggedIn>
                    </span>
                    {cart}
                     
                </div>
            </nav>
        </div>
    </header>
  )
}

export default Header

import { useSelector } from 'react-redux'

const ShowLoggedIn = ({children}) => {
    const isLoggedIn =useSelector((state)=>state.auth.isLoggedIn);
    if(isLoggedIn){
        return children;
    }
    return null
  
}
export const ShowLoggedOut = ({children})=>{
    const isLoggedIn =useSelector((state)=>state.auth.isLoggedIn);
    if(!isLoggedIn){
        return children;
    }
    return null;
}

export default ShowLoggedIn
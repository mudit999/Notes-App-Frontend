import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Header.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../../toastifyCustomStyles.css';

const Header = () => {
  
    const navigate = useNavigate();

    const loginInfo = window.localStorage.getItem('userLogin');
    // converting string data to json
    if(loginInfo){
      const userData = JSON.parse(loginInfo);
      // console.log(userData);
    }

    const logoutHandler = () => {
        // Delete userLogin from localstorage and then navigate to root 
        localStorage.removeItem("userLogin");

        toast.success("Logout Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000
        });

        navigate('/');
    }

    return(
      <div>
        <ul className='container-nav'>
          <li><Link to="/">Home</Link></li>
          {
            loginInfo ?
            (
            <>
            <li><Link to='/mynotes'>My Notes</Link></li>
            <li><Link to='' onClick={logoutHandler}>Logout</Link></li>
            </>
            )
            :
            <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
            </>
          }
        </ul>
      </div>
    )
}

export default Header;
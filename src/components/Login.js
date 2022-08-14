import React from 'react';
import { loginUrl } from './spotify';
import './styles/Login.css';

function Login() {
  return (
    <section className = 'login'>
        {/* spotify logo  */}
        <img src = 'https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
        alt = 'spotify logo'
        />
        {/* Login button  */}
        <a href = {loginUrl}>Login with spotify</a>
    </section>
  )
}

export default Login
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { endPoints } from '../../env/endPoints';
import { Message } from '../../constant/Message';
import Captcha  from '../../util/captcha/Captcha';
import  axios from 'axios';
import { useDispatch } from 'react-redux';
import { LogInActions } from '../../redux/LoginReduxSlice';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const loginUrl = endPoints.baseUrl + '/users/login';

const Image = {
    backgroundImage: "url(/loginBC.jpg)",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'
}

export const LogIn = () => {
    
    const [login, setLogin] = useState({email: '', password: '', captcha: ''});
    const [error, setError] = useState({email: '', password: '', captcha: ''});
    const captchaRef = useRef();
    const dispatch = useDispatch();
    const redirect = useNavigate();

    useEffect(() => {
        captchaRef.current.refreshCaptcha();
    }, []);

      let axiosConfig = {
     headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Expose-Headers": "token"
  }
}

  const loginUser = (event) => {
    event.preventDefault();
    setError({email: '', password: '', captcha: ''})
    const errors = validateForm();
    setError(errors);
    if(!hasError(errors)) {
        delete login.captcha;
        axios.post(loginUrl, login, axiosConfig)
        .then(response => {
            dispatch(LogInActions.setLogIn(true));
            localStorage.setItem('token', response.data);
            console.log(response);
            redirect('/home');
        }).catch(error => {
            captchaRef.current.refreshCaptcha();
            setLogin({...login, captcha: ''});
            if(error.response) {
                setError({serverError: error.response.data.message});
            } else {
                setError({serverError: Message.serverException})
            }
        })
    }
  }

  const hasError = (errors) => {
      let hasError = false;
      if(errors.email && errors.email.trim().length > 0) {
          hasError = true;
      } else if(errors.password && errors.password.trim().length > 0) {
          hasError = true;
      } else if(errors.captcha && errors.captcha.trim().length > 0) {
          hasError = true;
      }
      return hasError;
  }

  const validateForm = () => {
      const errors = {};
      if(!login.email || login.email.trim().length === 0) {
          errors.email = 'Username is required';
      }
      if(!login.password || login.password.trim().length === 0) {
        errors.password = 'Password is required';
    }
    if(!login.captcha || login.captcha.trim().length === 0) {
        errors.captcha = 'Text is madatory';
    } else if(login.captcha.trim().length < 6 || login.captcha !== captchaRef.current.captcha.replace(/\s+/g, '').trim()) {
        errors.captcha = 'Incorrect text entered';
    }
    return errors;
  }

    return (
        <div style={Image}>
        <div style={{textAlign: "center"}}>
      <div style={{fontSize: '40',color: "#4a54f1",whiteSpace: 'nowrap'}}> LogIn Form</div>
      <form noValidate onChange={event => setLogin({...login, [event.target.id]: event.target.value})}
        onSubmit={loginUser}>
            <label id='userLabelId' > userId </label><br/>
            <input type='text' id='email' name='email' value={login.email} required autoComplete='off' /><br/>

            <label id='password' name='password'>Password</label><br/>
            <input type='password' id='password' name='password' value={login.password} required autoComplete='off'/><br/>

            <label id='captchaId' name='captcha'>Captcha</label><br/>
            <input type='text' id='captcha' name='captcha' value={login.captcha} required
            autoComplete='off' /><br/><br/>

            <Captcha ref={captchaRef} />
            <br/><br/>
            <Button type='submit' variant="outlined" size="large">Login</Button>
            {/* <button type='submit'>Login</button> */}
      </form><br/><br/>
      <Link
      component="button"
      variant="body2"
      onClick={() => {
        redirect('/register')
      }}
    >
        <PersonAddAltIcon />
      Registration
    </Link><br/><br/>
      <Link
      component="button"
      variant="body2"
      onClick={() => {
        redirect('/forgotPassword')
      }}
    >
     <VpnKeyIcon /> Forgot Password
    </Link>
        </div>
        </div>
    )
}
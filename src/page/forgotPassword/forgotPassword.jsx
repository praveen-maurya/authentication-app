import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';
import validator from 'validator';
import AlertMessage from './alertMessage';
import { useNavigate } from 'react-router-dom';
import  axios from 'axios';
import { endPoints } from '../../env/endPoints';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingButton from '@mui/lab/LoadingButton';

const resetPassword = endPoints.baseUrl + '/users/resetPassword';

export const ForgotPassword = () => {
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState('')
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [severity, setSeverity] = React.useState('');
    const [rowData, setRowData] = React.useState();
    const redirect = useNavigate();

    const resetObj = {
        email: email
    }
    const reset = () => {
        if(email.length === 0) {
            setEmailError('Email is required!!')
        } else if (validator.isEmail(email)) {
           // console.log("mail is correct")
            axios.post(resetPassword, resetObj)
            .then(response => {
            setEmailError('');
            setSuccess(true);
            setSeverity("success");
            setMessage('Your Password is reset. Check your Email.');
            setRowData({success: true, message: 'Your Password is reset. Check your Email.'});
            redirect('/', { state: rowData });
            }).catch(error => {
                setMessage(error.response.data.message);
                setSeverity("error");
                console.log(error.response.data.message)
                setSuccess(true);
            })
          } else {
            setEmailError('Enter valid Email!')
            console.log("Enter valid Email!!")
          }
        
    }

    const onEmailChange = (e) => setEmail(e.target.value);

    const closeButton = (value) => {
        setSuccess(value);
    }

    return (
        <div>
           <LoadingButton style={{float: 'right'}}
        onClick={()=> redirect('/')}
        variant="outlined"
      >
        <ArrowBackIcon/>
      </LoadingButton> 
        { success && < AlertMessage close={closeButton} message={message} severity={severity} />}
        <div style={{textAlign: 'center'}}>
        <div>
        <LockIcon sx={{ fontSize: 200 }} >Lock</LockIcon>
        </div>
        <div>
            <h1>
                Forgot Password ??
            </h1>
            <h4>You can reset your password here.</h4>
        </div>
        <div>
        <TextField sx={{ width: '38ch' }} id="outlined-basic" label="Email" variant="outlined"  value={email} onChange={onEmailChange}/> <br/>
        {emailError.length > 1 && <span style={{color: 'red'}}>{emailError}<br/></span>}
        </div><br/>
        <Button onClick={reset} variant="outlined" size="large">Forgot Password</Button>
        </div>
        </div>
    )
}
import * as React from 'react';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import validator from 'validator'
import { endPoints } from '../../env/endPoints';
import { useNavigate } from 'react-router-dom';
import  axios from 'axios';
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const registrationUrl=endPoints.baseUrl + '/users';

export const Registration = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [emailError, setEmailError] = React.useState('')
    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const onFirstNameChange = (e) => setFirstName(e.target.value);
    const onLastNameChange = (e) => setLastName(e.target.value);
    const redirect = useNavigate();
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const onNewPasswordChange = (e) => setNewPassword(e.target.value);
  function handleClick() {
    if (validator.isEmail(email)) {
        console.log("mail is correct")
        setEmailError('');
      } else {
        setEmailError('Enter valid Email!')
        console.log("Enter valid Email!!")
      }
      firstName.length === 0 && setFirstNameError('First Name is required!!');
      lastName.length === 0 && setLastNameError('Last Name required!!');
      newPassword.length === 0 && setPasswordError('Password is required!!');
      email.length === 0 && setEmailError('Email is required!!');
    const registerForm = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: newPassword,
    }
    console.log(registerForm);
    axios.post(registrationUrl, registerForm)
        .then(response => {
            redirect('/');
        }).catch(error => {
          console.log(error);
        });
  }
    return (
      <div>
        <LoadingButton style={{float: 'right'}}
        onClick={()=> redirect('/')}
        variant="outlined"
      >
        <ArrowBackIcon/>
      </LoadingButton> 
        <div style={{textAlign: "center"}}>
            <div style={{fontWeight: 'bold', color: "#4a54f1",paddingTop: "40px"}}> Registration Form</div>
            <TextField id="standard-basic" required value={firstName} onChange={onFirstNameChange} label="First Name" variant="standard" /><br/>
            {firstNameError.length > 1 && <span style={{color: 'red'}}>{firstNameError}<br/></span>}
            <TextField id="standard-basic" required value={lastName} onChange={onLastNameChange} label="Last Name" variant="standard" /><br/>
            {lastNameError.length > 1 && <span style={{color: 'red'}}>{lastNameError}<br/></span>}
            <TextField id="standard-basic" required value={email} onChange={onEmailChange} label="Email" variant="standard" /><br/>
            {(emailError.length > 1 && email.length !== 0 ) && <span style={{color: 'red'}}>{emailError}<br/></span>}
            {(emailError.length > 1 && email.length === 0 ) && <span style={{color: 'red'}}>{emailError}<br/></span>}
            <TextField id="standard-basic" required value={newPassword} type={showPassword ? "text" : "password"} onChange={onNewPasswordChange} label="Password" variant="standard" 
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}/><br/>
            {(passwordError.length > 1 && newPassword.length === 0 ) && <span style={{color: 'red'}}>{passwordError}<br/></span>}
            <LoadingButton
        color="secondary"
        onClick={handleClick}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Register
      </LoadingButton>
        </div>
        </div>
    )
}
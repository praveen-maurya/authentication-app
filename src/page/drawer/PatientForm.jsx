import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@material-ui/core/AppBar';

import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import Grid from '@material-ui/core/Grid'
import MenuItem from "@material-ui/core/MenuItem";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Gender from '../utils/gender.json';
import problems from '../utils/dentalProblem.json';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    "& .MuiFilledInput-root": {
      background: "rgb(255, 255, 255)"
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

export const PatientForm = ({ handleClose }) => {
    const appointmentTypes = [{value: "Regular"}, {value: "Emergency"}];
    const classes = useStyles();
    const { handleSubmit, control } = useForm();
  
    const onSubmit = data => {
      console.log(data);
    };

    const [values, setValues] = React.useState({
        problem: null
      });

      const [value, setValue] = React.useState(null);
      const [gender, setGender] = React.useState(null);
      const [appointmentType, setAppointmentType] = React.useState(null);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
    
      const handleChangeProblem = name => event => {
        setValues({ ...values, [name]: event.target.value });
        console.log({[name]: event.target.value});
        console.log(values.problem);
      };

      const handleChangeGender = name => event => {
        setGender(event.target.value)
      };

      const handleChangeAppointmentType = (event) => {
        setAppointmentType(event.target.value);
      } 
      
  
    return(
        <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Patient Form
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
    <Grid container>
    <Grid item xs={4}> 
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="First Name"
            variant="filled"
            value={value}
            color='info'
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'First name required' }}
      />
      </Grid>
      <Grid item xs={4}> 
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Last Name"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Last name required' }}
      />
      </Grid>
      <Grid item xs={4}> 
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Email"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="email"
          />
        )}
        rules={{ required: 'Email required' }}
      />
      </Grid>
      <Grid item xs={4}> 
      <Controller
        name="mobileNo"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Mobile No."
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="number"
          />
        )}
        rules={{ required: 'Mobile No required' }}
      />
      </Grid>
      <Grid item xs={4}> 
      <Controller
        name="age"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Age"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type="number"
          />
        )}
        rules={{ required: 'Age No required' }}
      />
      </Grid>
      <Grid item xs={4}>
      <TextField
        id="standard-select-problem"
        select
        label="Select Your Problem"
        className={classes.textField}
        value={values.problem}
        onChange={handleChangeProblem("problem")}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          },
          renderValue: option => option.value
        }}
        helperText="Please select your problem"
        margin="normal"
      >
        {problems.map(option => (
          <MenuItem key={option.value} value={option}>
             {option.value}
          </MenuItem>
        ))}
      </TextField>
      </Grid>
      <Grid item xs={4}>
      <TextField
        id="standard-select-gender"
        select
        label="Select Your Gender"
        className={classes.textField}
        value={gender}
        onChange={handleChangeGender("gender")}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          },
          renderValue: option => option.value
        }}
        helperText="Please select your gender"
        margin="normal"
      >
        {Gender.map(option => (
          <MenuItem key={option.value} value={option}>
             {option.value}
          </MenuItem>
        ))}
      </TextField>
      </Grid>
      <Grid item xs={4}>
      <TextField
        id="standard-select-appointment"
        select
        label="Appointment Type"
        className={classes.textField}
        value={appointmentType}
        onChange={handleChangeAppointmentType}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          },
          renderValue: option => option.value
        }}
        helperText="Appointment Type"
        margin="normal"
      >
        {appointmentTypes.map(option => (
          <MenuItem key={option.value} value={option}>
             {option.value}
          </MenuItem>
        ))}
      </TextField>
      </Grid>
      <Grid item xs={4}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
          label="Date Appointment"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
      </Grid>
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
      </Grid>
    </form>
        </>
    )
}
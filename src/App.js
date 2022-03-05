import './App.css';
import { LogIn } from './page/login/login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Registration } from './page/registration/registration';
import { useDispatch, useSelector } from 'react-redux';
import { LogInActions } from './redux/LoginReduxSlice';
import { Logout } from './page/logout/logout';
import { endPoints } from './env/endPoints';
import { sblcInterceptor } from './config/SblcInterceptor';
import { ForgotPassword } from './page/forgotPassword/forgotPassword';
import Navbar from './page/navbar/Navbar';

const logoutUrl = endPoints.baseUrl + '/users/signout';
function App() {

  const dispatch = useDispatch();
  const loginInfo = useSelector(state => state.loginRedux);

  //, { headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} }
  const signOut = () => {
    sblcInterceptor.post(logoutUrl)
    .then(response => {
      dispatch(LogInActions.setLogIn(false));
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

  
  return (
    <Router>
     {/* {loginInfo.logIn && <Navbar /> } */}
      {/* <div style={{backgroundColor: 'grey'}}>
      <div style={{border: '1px', borderBlock: 'solid', padding: '30px', borderColor: 'grey'}}>
      <ul style={{listStyleType: 'none', textAlign: 'center', minWidth: '700px'}}>
          <li style={{display: 'inline', float: 'right', marginLeft: '5px', width: 'auto'}}>
            <Link to="/">Login</Link>
          </li>
          {!loginInfo.logIn &&  <li style={{display: 'inline', float: 'right', marginLeft: '5px', width: 'auto'}}>
            <Link to="/register">Registration</Link>
          </li>
}
          {loginInfo.logIn && <li style={{display: 'inline', marginLeft: '5px', float: 'right', width: 'auto'}}>
            <Link to="/logout" onClick={signOut}>Logout</Link>
          </li>
}
        </ul>
      </div>
        </div> */}


        {/* <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {!loginInfo.logIn &&<Button color="inherit">Login</Button>}
        </Toolbar>
      </AppBar>
    </Box> */}

        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route  path="/register" element={<Registration />} />
          <Route  path="/home" element={<Navbar />} />
          <Route  path="/logout" element={<Logout />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          {/* <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} /> */}
        </Routes>
        </Router>
  );
}

export default App;

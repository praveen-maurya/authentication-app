import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const redirect = useNavigate();

    return (
        <>
        <div>
        <LoadingButton style={{float: 'right'}}
        onClick={()=> redirect('/')}
        variant="outlined"
      >
        <ArrowBackIcon/>
      </LoadingButton> 
        </div>
        <div>Logout Success</div>
        </>
    )
}
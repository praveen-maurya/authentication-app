import { forwardRef, useImperativeHandle, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import { CaptchaStyle, CaptchaTextStyle} from './CaptchaStyle';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const Captcha = (props, ref) => {
    const [captcha, setCaptcha] = useState('');

    useImperativeHandle(ref, () => {
        return {
            refreshCaptcha,
            captcha
        };
    }, [captcha]);

    const refreshCaptcha = () => {
        const aplha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numeric = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let code = numeric[Math.floor(Math.random() * numeric.length)];
    for(let i=0; i<4; i++) {
        code = code + ' ' + aplha[Math.floor(Math.random() * aplha.length)];
    }
    code = code + ' '+numeric[Math.floor(Math.random() * numeric.length)];
    setCaptcha(code);
    };

    return(
        <>
         <CaptchaStyle>
             <CaptchaTextStyle style={{color: "red", fontSize: "20px"}}>{captcha}</CaptchaTextStyle>
             </CaptchaStyle>
             &nbsp;
             <Tooltip title='Refresh' placement='right'>
                <span onClick={refreshCaptcha} tabIndex='0'>
                    <AutorenewIcon />
                </span>
             </Tooltip>
        </>
    )
}
export default forwardRef(Captcha);
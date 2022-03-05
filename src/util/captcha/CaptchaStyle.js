import styled from 'styled-components';

export const CaptchaStyle = styled.button`
width: 180px;
background-color: 'blue';
padding: 5px 10px;
margin:4px 0;
border: 1px solid #ccc;
cursor: pointer;
color: 'red';
line-height: 42px;
margin-left: 20px;
`;

export const CaptchaTextStyle = styled.div`
font-size: '10px';
font-family: 'italic';
transform: rotate(-5deg);
color: 'blue';
`;

//background-color: ${props => props.theme.color.captcha.primary.background};
//color: ${props => props.theme.color.captcha.primary.text};
//font-size: ${props => props.theme.font.primary.captcha.fontSize};
//font-family: ${props => props.theme.font.primary.fontFamily};
import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function ColorAlerts(props) {

    const closeAlert = () => {
      props.close(false);
    }

  return (
    <Alert onClose={closeAlert} sx={{ width: '100%' }} style={{width:'25%'}} severity={props.severity}>{props.message}</Alert>
  );
}
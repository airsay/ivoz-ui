import { Typography } from '@mui/material';

export default function Footer(): JSX.Element {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      Axion Communications Platform &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

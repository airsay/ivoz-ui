import { Typography } from '@mui/material';

export default function Footer(): JSX.Element {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      NorthBay &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

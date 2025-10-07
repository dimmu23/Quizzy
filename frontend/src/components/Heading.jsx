import Typography from '@mui/material/Typography';

export const Heading = ({label})=>{
    return(
    <Typography variant='h4'sx={{ fontWeight: 'bold' }}>{label}</Typography>
    )
}
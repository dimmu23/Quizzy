import Button from '@mui/material/Button';

export const MyButton = ({label,change})=>{
    return (
        <>
        <Button variant='contained' sx={{bgcolor: "black"}} onClick={change}>{label}</Button>
        </>
    )
}

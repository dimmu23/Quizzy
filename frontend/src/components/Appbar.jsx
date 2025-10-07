import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const MyAppBar = () => {
  return (
    <AppBar position="static" sx={{bgcolor:"white"}}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight:'bold', fontFamily:"monospace", color:"black"}}>
          Quizzy
        </Typography>
        <Button color="inherit" href="/login" sx={{ fontFamily:"monospace", color:"black"}}>Login</Button>
        <Button color="inherit" href="/signup" sx={{ fontFamily:"monospace", color:"black"}}>Register</Button>
      </Toolbar>
    </AppBar>
  );
};

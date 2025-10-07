import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Password = ({ change }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      onChange={change}
      required
      label="Password"
      type={showPassword ? 'text' : 'password'}
      variant="outlined"
      sx={{
        width: '250px',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.6)', // Light white border
          },
          '&:hover fieldset': {
            borderColor: '#c084fc', // Purple glow on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#a855f7', // Deep purple when focused
          },
          color: 'white',
        },
        '& .MuiInputBase-input': {
          color: 'white', // White text
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.7)', // Light white label
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#c084fc', // Purple label when focused
        },
      }}
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleTogglePassword} edge="end" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
    />
  );
};




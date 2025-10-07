import * as React from 'react';
import TextField from '@mui/material/TextField';

export const Text = ({ label, change }) => {
  return (
    <div>
      <TextField
        onChange={change}
        required
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
        id="outlined-required"
        label={label}
        placeholder={label}
        variant="outlined"
      />
    </div>
  );
};


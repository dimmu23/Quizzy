import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";

// Custom styled radio button
const CustomRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.primary.main, // Use primary color for the radio button
  "&.Mui-checked": {
    color: theme.palette.primary.main, // Change color when checked
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // Subtle hover effect
    borderRadius: "50%",
  },
}));

export default function Dropdown({ value, arr, change }) {
  return (
    <FormControl component="fieldset" sx={{ width: "100%", maxWidth: "400px", mb: 1 }}>
      {/* Form Label with theme-based typography */}
      <FormLabel
        id="radio-buttons-group-label"
        sx={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "white",
          textAlign: "left",
        }}
      >
        {value}
      </FormLabel>

      {/* Radio Group with improved spacing and layout */}
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        onChange={change}
        name="radio-buttons-group"
        sx={{ display: "flex", flexDirection: "column" }} // Consistent spacing
      >
        {arr.map((val) => (
          <FormControlLabel
            key={val}
            value={val}
            control={<CustomRadio />}
            label={val}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "1rem",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "action.hover",
                borderRadius: "8px",
              },
              p: 0.75, // Padding for spacing
              borderRadius: "8px",
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}


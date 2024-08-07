import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="dropdown-label">Select Option</InputLabel>
      <Select
        labelId="dropdown-label"
        value={selectedValue}
        onChange={handleChange}
        label="Select Option"
      >
        <MenuItem value={10}>Option 1</MenuItem>
        <MenuItem value={20}>Option 2</MenuItem>
        <MenuItem value={30}>Option 3</MenuItem>
      </Select>
    </FormControl>
  );
};

export { Dropdown };

import { Box, MenuItem, TextField, Typography } from '@mui/material';

const SelectionMenu = (props) => {
  const { header, items, value, setValue } = props;

  const setItem = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box marginTop={4}>
      <Typography color="primary" style={{ fontWeight: 'bold' }}>
        {header}
      </Typography>
      <TextField
        fullWidth
        select
        value={value}
        onChange={setItem}
        variant="outlined"
        color="secondary"
        SelectProps={{
          MenuProps: {
            MenuListProps: { style: { width: '100%' } }
          }
        }}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default SelectionMenu;

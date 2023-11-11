import { MenuItem } from '@mui/material';

const SelectionItem = (props) => {
  const { handleClose, text } = props;
  return <MenuItem onClick={handleClose}>{text}</MenuItem>;
};

export default SelectionItem;

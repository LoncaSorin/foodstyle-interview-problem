import {Box, IconButton} from "@mui/material";
import CheckBoxField from "../CheckBoxField";
import CloseIcon from '@mui/icons-material/Close';

export default function TodoItem(props) {
  const { checked, label, handleChange, handleDelete } = props;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box maxWidth="350px">
        <CheckBoxField checked={checked} label={label} handleChange={handleChange} />
      </Box>

      <Box>
        <IconButton onClick={handleDelete}>
          <CloseIcon sx={{ fill: '#bfbfbf', fontSize: 'large' }} />
        </IconButton>
      </Box>
    </Box>
  )
}

import {Checkbox, FormControlLabel, Typography} from "@mui/material";
import {BpCheckedIcon, BpIcon} from "./index.styled";

export default function CheckBoxField(props) {
  const { checked, label, handleChange } = props;

  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            "&:hover": { bgcolor: "transparent" }
          }}
          disableRipple
          color="default"
          checkedIcon={<BpCheckedIcon />}
          icon={<BpIcon />}
          onChange={handleChange}
          checked={checked}
        />
      }
      label={<Typography variant="body1">{label}</Typography>}
    />
  )
}

import { Button } from "@mui/material";
import React from "react";
interface Props {
  label: string;
}
const PrimaryButton:React.FC<Props> = ({label}) => {
  return (
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
      {label}
    </Button>
  );
};

export default PrimaryButton;

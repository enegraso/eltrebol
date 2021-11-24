import React from "react";
import Button from '@mui/material/Button';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    margin: '3px, 0px, 2px',
  },
});

export const ButtonOne = ({ children, ...props }) => {
  const styles = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="success"
      className={styles.root}
      {...props}
    >
      {children}
    </Button>
  );
};

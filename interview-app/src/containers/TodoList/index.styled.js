import {Paper, styled, Typography} from "@mui/material";

export const StyledPaper = styled(Paper)(() => ({
  width: '440px',
  padding: '35px 30px',
  textAlign: 'initial',
  borderRadius: '5px',
  boxShadow: '0 2px 16px 0 rgba(0, 0, 0, 0.1)',
  color: '#1f2a4b',
}));

export const StyledTypography = styled(Typography)(({ isActive }) => ({
  color: isActive ? '#1f2a4b' : '#4a77e5',
  textDecoration: isActive ? 'none' : 'underline',
  cursor: isActive ? 'default' : 'pointer',
}));

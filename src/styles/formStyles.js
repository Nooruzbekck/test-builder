// src/styles/formStyles.js
import { styled } from "@mui/material/styles";
import { Container, Box, TextField, Button, Typography } from "@mui/material";

export const StyledContainer = styled(Container)({
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
});

export const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "20px",
});

export const QuestionBox = styled(Box)({
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
});

export const VariantText = styled(Typography)({
  marginLeft: "15px",
  color: "#555",
});

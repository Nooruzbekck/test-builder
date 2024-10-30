import { Button, FormControl, TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { email, password } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [authValue, setAuthValue] = useState({
    email: "",
    password: "",
  });

  const emailChangeHandler = (event) => {
    setAuthValue({
      ...authValue,
      email: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    setAuthValue({
      ...authValue,
      password: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === authValue.email && password && authValue.password) {
      navigate("/new-test");
    } else {
      navigate("/tests");
    }
  };

  return (
    <StyledForm component="form" onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <StyledTextField
          label="Email"
          value={authValue.email}
          onChange={emailChangeHandler}
        />
      </FormControl>
      <FormControl fullWidth>
        <StyledTextField
          label="Password"
          type="password"
          value={authValue.password}
          onChange={passwordChangeHandler}
        />
      </FormControl>
      <StyledButton variant="contained" type="submit">
        Login
      </StyledButton>
    </StyledForm>
  );
};

const StyledForm = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  margin: "200px auto",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-root:hover": {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  fontSize: "1.1rem",
  fontWeight: "bold",
  textTransform: "none",
  background: "linear-gradient(90deg, #ff8a00, #e52e71)",
  "&:hover": {
    background: "linear-gradient(90deg, #e52e71, #ff8a00)",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  },
}));

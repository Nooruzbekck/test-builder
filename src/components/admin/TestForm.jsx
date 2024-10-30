import { styled } from "@mui/material/styles";
import { Box, Button, TextField, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTest } from "../../redux/slices/testsSlice";
import QuestionForm from "./QuestionForm";
import { useNavigate } from "react-router-dom";
import { addNewTestThunk } from "../../redux/thunks/testThunks";

export const TestForm = () => {
  const { tests } = useSelector((state) => state.tests);
  console.log("tests: ", tests);
  const [showTest, setShowTest] = useState(false);
  const [title, setTitle] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // New success state
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation

  const showTestHandler = () => {
    setShowTest(!showTest);
  };

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }
    const newTest = {
      id: Date.now().toString(),
      name: title,
      questions: [],
    };
    dispatch(addNewTest(newTest));
    showTestHandler();
  };

  const handleSave = () => {
    setShowSuccess(true); // Show success message
    setTimeout(() => {
      setShowTest(false); // Reset form
      setTitle(""); // Clear title
      navigate("/tests"); // Redirect to summary page
    }, 1000); // Adjust time as needed
  };

  return (
    <div>
      {showTest ? (
        <>
          {tests.map((item) => (
            <QuestionForm key={item.id} {...item} />
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              paddingRight: "145px",
            }}
          >
            <StyledButton onClick={handleSave} style={{ marginRight: "47px" }}>
              Сохранить
            </StyledButton>
          </div>
        </>
      ) : (
        <FormWrapper component="form" onSubmit={handleSubmit}>
          <StyledInput
            label="Введите название теста"
            variant="outlined"
            value={title}
            onChange={titleChangeHandler}
          />
          <StyledButton type="submit">Создать</StyledButton>
        </FormWrapper>
      )}

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        message="Тест успешно сохранён!"
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

const FormWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  margin: "0 auto",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const StyledInput = styled(TextField)(({ theme }) => ({
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
  background: "linear-gradient(90deg, #4caf50, #81c784)",
  color: theme.palette.common.white,
  "&:hover": {
    background: "linear-gradient(90deg, #388e3c, #66bb6a)",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  },
}));

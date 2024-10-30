// src/components/QuestionForm.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewQuestion } from "../../redux/slices/testsSlice";
import { StyledContainer, StyledForm } from "../../styles/formStyles";
import { TextField, Button, Typography } from "@mui/material";
import QuestionItem from "./QuestionItem";
import { addNewQuestionThunk } from "../../redux/thunks/testThunks";

const QuestionForm = ({ id, name, questions }) => {
  const [questionValue, setQuestionValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionValue) {
      return;
    }
    const newQuestion = {
      mainId: id,
      id: Date.now().toString(),
      questionName: questionValue,
      variants: [],
    };
    dispatch(addNewQuestion(newQuestion));
    setQuestionValue("");
  };

  return (
    <StyledContainer>
      <Typography variant="h4">{name}</Typography>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          label="Введите вопрос"
          value={questionValue}
          onChange={(e) => setQuestionValue(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" type="submit">
          Добавить вопрос
        </Button>
      </StyledForm>
      {questions.map((item) => (
        <QuestionItem key={item.id} question={item} mainId={id} />
      ))}
    </StyledContainer>
  );
};

export default QuestionForm;

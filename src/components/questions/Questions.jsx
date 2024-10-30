import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  styled,
} from "@mui/material";
import { QuestionBox, VariantText } from "../../styles/formStyles";

export const Questions = () => {
  const { testId } = useParams();
  const { tests } = useSelector((state) => state.tests);

  const currentTest = tests.find((item) => item.id === testId);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectAnswer = (questionId, variantId, isCorrect) => {
    // Сохраняем выбранный вариант для каждого вопроса
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: { variantId, isCorrect },
    }));
  };

  const handleSubmit = () => {
    // Подсчитываем количество правильных ответов
    const totalScore = Object.values(selectedAnswers).reduce(
      (acc, answer) => (answer.isCorrect ? acc + 10 : acc),
      0
    );
    setScore(totalScore);
    setIsFinished(true);
  };

  if (!currentTest) {
    return <Typography>Тест не найден</Typography>;
  }

  const obj = {
    ["0"]: "a",
    ["1"]: "b",
    ["2"]: "c",
    ["3"]: "d",
  };

  return (
    <Container>
      {isFinished ? (
        <div
          style={{
            width: "700px",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "250px 0 0 130px",
            boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
            borderRadius: "10px ",
          }}
        >
          <VariantText variant="h4">Ваш итоговый балл: {score}</VariantText>
        </div>
      ) : (
        <ul>
          {currentTest.questions.map((question, i) => (
            <li
              key={question.id}
              style={{
                listStyle: "none",
                padding: "0 20px 0 40px",
              }}
            >
              <Typography variant="h6">
                <span style={{ fontSize: "14px" }}>
                  {i + 1 + "-" + "вопрос) "}{" "}
                </span>

                <b style={{ fontSize: "18px", fontWeight: "400" }}>
                  {question.questionName}
                </b>
              </Typography>
              <QuestionBox>
                <RadioGroup
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridTemplateRows: "repeat(2, 1fr)",
                    gridColumnGap: "15px",
                    gridRowGap: "15px",
                  }}
                  value={selectedAnswers[question.id]?.variantId || ""}
                  onChange={(e) =>
                    handleSelectAnswer(
                      question.id,
                      e.target.value,
                      question.variants.find(
                        (variant) => variant.variantId === e.target.value
                      ).selected
                    )
                  }
                >
                  {question.variants.map((variant, i) => (
                    <FormControlLabel
                      key={variant.variantId}
                      value={variant.variantId}
                      control={<Radio />}
                      label={obj[i] + ") " + variant.variantValue}
                    />
                  ))}
                </RadioGroup>
              </QuestionBox>
            </li>
          ))}
        </ul>
      )}
      {!isFinished && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "19px",
          }}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            style={{ textAlign: "end" }}
          >
            Сдать
          </Button>
        </div>
      )}
    </Container>
  );
};

const Container = styled("div")({
  width: "60%",

  margin: "50px auto",
});

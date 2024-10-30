import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import { Edit, Delete, Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  setSelectedVariant,
  editVariant,
  deleteVariant,
  deleteQuestion,
} from "../../redux/slices/testsSlice";
import VariantForm from "./VariantForm";
import { QuestionBox, VariantText } from "../../styles/formStyles";

const QuestionItem = ({ question, mainId }) => {
  const dispatch = useDispatch();
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [editingVariantId, setEditingVariantId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSelectVariant = (variantId) => {
    dispatch(
      setSelectedVariant({ mainId, questionId: question.id, variantId })
    );
  };

  const handleEditVariant = (variantId, currentValue) => {
    setEditingVariantId(variantId);
    setEditValue(currentValue);
  };

  const handleEditSubmit = (variantId) => {
    if (!editValue) {
      return;
    }
    dispatch(
      editVariant({
        mainId,
        questionId: question.id,
        variantId,
        newValue: editValue,
      })
    );
    setEditingVariantId(null);
    setEditValue("");
  };

  const deleteQuestionn = (mainId, questionId) => {
    dispatch(deleteQuestion({ mainId, questionId }));
  };

  const handleDeleteVariant = (variantId) => {
    dispatch(deleteVariant({ mainId, questionId: question.id, variantId }));
  };

  return (
    <QuestionBox sx={{ position: "relative" }}>
      <IconButton
        style={{ position: "absolute", right: "7px" }}
        aria-label="delete"
        size="small"
        sx={{ ml: 1 }}
        onClick={() => handleDeleteVariant(variant.variantId)}
      >
        <Close
          fontSize="medium"
          onClick={() => deleteQuestionn(mainId, question.id)}
        />
      </IconButton>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        {question.questionName}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gridColumnGap: "15px",
          gridRowGap: "15px",
        }}
      >
        {question.variants.map((variant, index) => (
          <Box
            key={variant.variantId}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Checkbox
              checked={variant.selected}
              onChange={() => handleSelectVariant(variant.variantId)}
            />
            {editingVariantId === variant.variantId ? (
              <TextField
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleEditSubmit(variant.variantId)}
                size="small"
                autoFocus
              />
            ) : (
              <VariantText>
                {index + 1}) {variant.variantValue}
              </VariantText>
            )}
            <IconButton
              aria-label="edit"
              size="small"
              sx={{ ml: 1 }}
              onClick={() =>
                handleEditVariant(variant.variantId, variant.variantValue)
              }
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              sx={{ ml: 1 }}
              onClick={() => handleDeleteVariant(variant.variantId)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
      {question.variants.length < 4 && (
        <div>
          {isAddingVariant ? (
            <VariantForm
              questionId={question.id}
              mainId={mainId}
              closeForm={() => setIsAddingVariant(false)}
            />
          ) : (
            <Button onClick={() => setIsAddingVariant(true)}>
              Добавить вариант
            </Button>
          )}
        </div>
      )}
    </QuestionBox>
  );
};

export default QuestionItem;

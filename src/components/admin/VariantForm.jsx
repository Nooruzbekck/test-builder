// src/components/VariantForm.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@mui/material";
import { StyledForm } from "../../styles/formStyles";
// import { addNewVariantThunk } from "../../redux/thunks/testThunks";
import { addNewVariant } from "../../redux/slices/testsSlice";

const VariantForm = ({ questionId, mainId, closeForm }) => {
  const [variantValue, setVariantValue] = useState("");
  const dispatch = useDispatch();

  const handleVariantSubmit = (e) => {
    e.preventDefault();
    if (!variantValue) {
      return;
    }
    const newVariant = {
      mainId,
      id: questionId,
      variantId: Date.now().toString(),
      variantValue,
      isCorrect: false,
    };
    dispatch(addNewVariant(newVariant));
    setVariantValue("");
    closeForm();
  };

  return (
    <StyledForm onSubmit={handleVariantSubmit}>
      <TextField
        label="Введите вариант"
        value={variantValue}
        onChange={(e) => setVariantValue(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained">
        Добавить
      </Button>
    </StyledForm>
  );
};

export default VariantForm;

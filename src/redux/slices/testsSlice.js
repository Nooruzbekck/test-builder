import { createSlice } from "@reduxjs/toolkit";
import { getAllTestThunk } from "../thunks/testThunks";

export const testsSlice = createSlice({
  name: "tests",
  initialState: { tests: [] },

  reducers: {
    addNewTest: (state, action) => {
      state.tests.push(action.payload);
    },
    addNewQuestion: (state, action) => {
      const test = state.tests.find(
        (item) => item.id === action.payload.mainId
      );
      if (test) test.questions.push(action.payload);
    },
    addNewVariant: (state, action) => {
      const test = state.tests.find(
        (item) => item.id === action.payload.mainId
      );
      const question = test?.questions.find((q) => q.id === action.payload.id);
      if (question)
        question.variants.push({ ...action.payload, selected: false });
    },
    setSelectedVariant: (state, action) => {
      const { mainId, questionId, variantId } = action.payload;
      const test = state.tests.find((item) => item.id === mainId);
      const question = test?.questions.find((q) => q.id === questionId);
      if (question) {
        question.variants.map((v) => (v.selected = v.variantId === variantId));
      }
    },
    editVariant: (state, action) => {
      const { mainId, questionId, variantId, newValue } = action.payload;

      const test = state.tests.find((item) => item.id === mainId);
      const question = test?.questions.find((q) => q.id === questionId);
      const variant = question?.variants.find((v) => v.variantId === variantId);
      if (variant) variant.variantValue = newValue;
    },

    deleteVariant: (state, action) => {
      const { mainId, questionId, variantId } = action.payload;
      const test = state.tests.find((item) => item.id === mainId);
      const question = test?.questions.find((q) => q.id === questionId);
      if (question) {
        question.variants = question.variants.filter(
          (v) => v.variantId !== variantId
        );
      }
    },
    deleteQuestion: (state, action) => {
      const { mainId, questionId } = action.payload;

      const question = state.tests.find((item) => item.id === mainId);
      if (question) {
       question.questions =  question.questions.filter((item) => item.id !== questionId);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllTestThunk.fulfilled, (state, action) => {
      state.tests = action.payload;
    });
  },
});

export const {
  addNewTest,
  addNewQuestion,
  addNewVariant,
  setSelectedVariant,
  editVariant,
  deleteVariant,
  deleteQuestion,
} = testsSlice.actions;
export default testsSlice.reducer;

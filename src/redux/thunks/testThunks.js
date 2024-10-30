import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTestThunk = createAsyncThunk(
  "test/getAllTestThunk",
  async () => {
    try {
      const { data } = await axios.get(
        "https://a06136fd10f0b00c.mokky.dev/tests"
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Add a new test
export const addNewTestThunk = createAsyncThunk(
  "test/addNewTestThunk",
  async (data, { dispatch }) => {
    try {
      await axios.post("https://a06136fd10f0b00c.mokky.dev/tests", data);
      dispatch(getAllTestThunk());
    } catch (error) {
      console.log(error);
    }
  }
);

// Add a new question to a specific test
export const addNewQuestionThunk = createAsyncThunk(
  "test/addNewQuestionThunk",
  async ({ mainId, question }, { dispatch }) => {
    try {
      await axios.post(
        `https://a06136fd10f0b00c.mokky.dev/tests/${mainId}/questions`,
        question
      );
      dispatch(getAllTestThunk());
    } catch (error) {
      console.log(error);
    }
  }
);

// Add a new variant to a specific question
export const addNewVariantThunk = createAsyncThunk(
  "test/addNewVariantThunk",
  async ({ mainId, questionId, variant }, { dispatch }) => {
    try {
      await axios.post(
        `https://a06136fd10f0b00c.mokky.dev/tests/${mainId}/questions/${questionId}/variants`,
        variant
      );
      dispatch(getAllTestThunk());
    } catch (error) {
      console.log(error);
    }
  }
);

// Set a selected variant as true (single-choice answer)
export const setSelectedVariantThunk = createAsyncThunk(
  "test/setSelectedVariantThunk",
  async ({ mainId, questionId, variantId }, { dispatch }) => {
    try {
      await axios.patch(
        `https://a06136fd10f0b00c.mokky.dev/tests/${mainId}/questions/${questionId}/variants/${variantId}`,
        { selected: true }
      );
      dispatch(getAllTestThunk());
    } catch (error) {
      console.log(error);
    }
  }
);

// Edit an existing variant
export const editVariantThunk = createAsyncThunk(
  "test/editVariantThunk",
  async ({ mainId, questionId, variantId, newValue }, { dispatch }) => {
    try {
      await axios.put(
        `https://a06136fd10f0b00c.mokky.dev/tests/${mainId}/questions/${questionId}/variants/${variantId}`,
        { variantValue: newValue }
      );
      dispatch(getAllTestThunk());
    } catch (error) {
      console.log(error);
    }
  }
);

// Delete a specific variant
export const deleteVariantThunk = createAsyncThunk(
  "test/deleteVariantThunk",
  async ({ mainId, questionId, variantId }, { dispatch }) => {
    try {
      await axios.delete(
        `https://a06136fd10f0b00c.mokky.dev/tests/${mainId}/questions/${questionId}/variants/${variantId}`
      );
      dispatch(getAllTestThunk());
    } catch (error) {
      console.log(error);
    }
  }
);

import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllTestThunk } from "../../redux/thunks/testThunks";

export const TestsList = () => {
  const tests = useSelector((state) => state.tests.tests);
  console.log("tests: ", tests);
  const navigate = useNavigate();

  return (
    <List>
      {tests.map((test) => (
        <Box
          key={test.id}
          sx={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "10px",
            "&:hover": {
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            },
          }}
          onClick={() => console.log(`Test ID: ${test.id}`)} // You can replace this with a navigation or other function
        >
          <ListItem onClick={() => navigate(`/tests/${test.id}`)}>
            <ListItemText
              primary={<Typography variant="h6">{test.name}</Typography>}
              secondary={`Вопросов: ${test.questions.length}`}
            />
          </ListItem>
        </Box>
      ))}
    </List>
  );
};

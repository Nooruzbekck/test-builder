export const TestItem = ({ id, name, questions = [] }) => {
  return (
    <li>
      <h1>{name}</h1>
      <p>Вопросы: {questions.length}</p>
      <button onClick={() => navigate("/questions/" + id)}>Пройти тест</button>
    </li>
  );
};

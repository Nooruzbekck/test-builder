import { TestItem } from "./TestItem";

export const TestsList = ({ tests = [] }) => {
  return (
    <ul>
      {tests.map((item) => (
        <TestItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

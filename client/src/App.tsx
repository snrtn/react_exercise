import * as React from "react";
// styles
import { Container } from "./app.styles";

// components
// import Index from "./components/not_typescript/useReducer/codingAddict";
import TodoApp from "./components/not_typescript/useReducer/Fernando/todoApp";

const App: React.FC = () => {
  return (
    <Container>
      {/* <Index /> */}
      <TodoApp />
    </Container>
  );
};

export default App;

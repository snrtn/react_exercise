import * as React from "react";
// styles
import { Container } from "./app.styles";

// components
import Index from "./components/not_typescript/useReducer/codingAddict";

const App: React.FC = () => {
  return (
    <Container>
      <Index />
    </Container>
  );
};

export default App;

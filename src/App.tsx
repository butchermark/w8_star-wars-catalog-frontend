import { StarWarsProvider } from "./context/StarWarsContext";
import PageRouter from "./router/PageRouter";

function App() {
  return (
    <div className="app">
      <StarWarsProvider>
        <PageRouter />
      </StarWarsProvider>
    </div>
  );
}

export default App;

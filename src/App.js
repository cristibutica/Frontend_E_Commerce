import Register from "./register/Register";
import { RegisterProvider } from "./context/RegisterContext";

function App() {
  return (
    <main className="App">
      <RegisterProvider>
        <Register />
      </RegisterProvider>
    </main>
  );
}

export default App;

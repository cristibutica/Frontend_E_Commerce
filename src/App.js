import Register from "./register/Register";
import { RegisterProvider } from "./context/RegisterContext";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainPage from "./main/MainPage";

import { LoginProvider } from "./context/LoginContext";
import Login from "./login/Login";
import {AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <main className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/register' element={<RegisterProvider><Register /></RegisterProvider>} />
            <Route path='/login' element={<LoginProvider><Login /></LoginProvider>} />
            <Route path='/' element={<MainPage></MainPage>} />
          </Routes>
        </Router>
      </AuthProvider>
    </main>
  );
}

export default App;

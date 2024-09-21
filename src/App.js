import Register from "./register/Register";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from "./header/Header";
import MainPage from "./main/MainPage";
import Login from "./login/Login";
import { GlobalProvider } from "./context/GlobalContext";
import UserField from "./register/UserField";
import UserInfo from "./header/UserInfo";
import AuthGuard from "./context/AuthGuard";

function App() {
  return (
    <main className="App">

      <Router>
        <GlobalProvider>
          <Header />
          <Routes>
            <Route path='/register' element={<GlobalProvider><Register /></GlobalProvider>} />
            <Route path='/login' element={<GlobalProvider><Login /></GlobalProvider>} />
            <Route path='/' element={<MainPage />} />
            <Route path='/user/myaccount' element={<AuthGuard><UserInfo /></AuthGuard>} />
          </Routes>
        </GlobalProvider>
      </Router>

    </main>
  );
}

export default App;

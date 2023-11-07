
import './App.css';
import NavbarTodo from './Components/NavbarTodo';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';


function App() {
  return (
    <Router>
      <NavbarTodo />
      <Routes>
      <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup"  element={<SignUpForm/>} />
      </Routes>
    </Router>
  );
}

export default App;

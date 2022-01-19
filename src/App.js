import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import ReadOrDelete from './containers/crud/ReadOrDelete';
import Create from './containers/crud/Create';
import Update from './containers/crud/Update';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ReadOrDelete />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
          <Route path="*" element={<Navigate replace to="/register" />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

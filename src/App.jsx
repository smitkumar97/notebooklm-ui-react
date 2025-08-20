import FileUpload from './components/FileUpload';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/register" element={<Register />} />
        <Route path="/document/:id" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
import FileUpload from './components/FileUpload';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './components/PageNotFound';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PrivateRoutes from './components/PrivateRoutes';
import { AuthProvider } from './context/AuthProvider';

function App() {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='561871726702-5nq88se22hpgdqie9qb40lf9daq7d7a2.apps.googleusercontent.com'>
        <Login />
      </GoogleOAuthProvider>
    )
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GoogleAuthWrapper />} />
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoutes />} >
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/document/:id" element={<Layout />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
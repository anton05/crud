import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import SignIn from './pages/SignIn/SignIn';
import Main from './pages/Main/Main';
import SignUp from './pages/SignUp/SignUp';
import PrivateRoute from './utils/PrivateRoute/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext/AuthContext';

function App() {
  return (
    <div className={styles.container}>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
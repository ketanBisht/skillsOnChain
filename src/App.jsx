import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import IssuerPanel from './pages/IssuerPanel';
import Verification from './pages/Verification';
import AdminPanel from './pages/AdminPanel';
import MainLayout from './components/Layout/MainLayout';
import { useWallet } from './context/WalletContext';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentAccount, role } = useWallet();

  if (!currentAccount) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { currentAccount } = useWallet();

  return (
    <Router>
      <Routes>
        <Route path="/" element={currentAccount ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Public Route but using Layout or not? 
            Req says: Verification Page is public. It might look better with Layout if we want nav, 
            but if public user has no role/wallet, Nav might look empty. 
            Let's keep it simple: Standalone or MainLayout with restricted Nav? 
            Navbar handles role-based showing. If no role, it shows nothing? 
            Let's use MainLayout for consistency, as Navbar shows "Verify" for everyone based on logic.
            But we need to ensure Navbar doesn't crash if no wallet connected.
            Navbar uses `role` from context which defaults to 'student'. 
            Wait, if not connected, role might still be 'student'. 
            We should handle "not connected" in Navbar. 
        */}
        <Route path="/verify" element={
          <MainLayout>
            <Verification />
          </MainLayout>
        } />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <StudentDashboard />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/issuer" element={
          <ProtectedRoute allowedRoles={['issuer', 'admin']}>
            <MainLayout>
              <IssuerPanel />
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MainLayout>
              <AdminPanel />
            </MainLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

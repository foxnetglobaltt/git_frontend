import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import ProtectedRoute
import ProtectedRoute from './Components/ProtectedRoute';

// Import UserPanel, AdminPanel, and other components
import UserPanel from './Components/Loginpages/Userpanel';
import AdminPanel from './Components/Loginpages/Adminpanel';
import Dashboard from './Components/UserPanel/Dashboard/Dashboard';
import CreateTicket from './Components/UserPanel/Createticket/Createticket';
import Open from './Components/UserPanel/Open/Open';
import Close from './Components/UserPanel/Close/Close';
import Dashboardadmin from './Components/AdminPanel/Dashboardadmin';
import Operator from "./Components/AdminPanel/Operator/Operator";
import Home from './Components/UserPanel/Home/Home';
import ProfileForm from './Components/UserPanel/Profileform/Profileform';
import OpenticketAdmin from './Components/AdminPanel/OpenticketAdmin/OpenticketAdmin';
import CloseticketAdmin from './Components/AdminPanel/CloseticketAdmin/CloseticketAdmin';
import Reports from './Components/UserPanel/Reports/Reports';
import PPMStatus from './Components/UserPanel/PPM/PPMStatus';
import MonthlyHealthCheck from './Components/UserPanel/PPM/MonthlyHealthCheck';
import InventoryInfo from './Components/UserPanel/PPM/InventoryInfo';
import IssueCategoryDetails from './Components/AdminPanel/IssueCategory/IssueCategoryDetails';
import Engineers from './Components/AdminPanel/Engineers/Engineers';
import Company from './Components/AdminPanel/Company/Company';
import AddEmailsPage from './Components/UserPanel/Dashboard/Navbar/AddEmailsPage';
import PpmForm from './Components/AdminPanel/Company/PpmForm';
import HealthCheckForm from './Components/AdminPanel/Company/HealthCheckForm';
import PeriodicReport from './Components/AdminPanel/Sidebar/PeriodicReport';
import PromptManager from './Components/AdminPanel/Sidebar/PromptManager';
import PrivacyPolicyPage from './Components/Footer/PrivacyPolicyPage';
import TermsOfService from './Components/Footer/TermsOfService';
import SecurityPolicyPage from './Components/Footer/SecurityPolicyPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex">
          <div className="flex-1">
            <div className="flex flex-col min-h-screen">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<UserPanel />} />
                <Route path="/admin-login" element={<AdminPanel />} />

                {/* Protected Dashboard Routes with Wildcard */}
                <Route 
                  path="/dashboard/*" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                >
                  {/* Nested Dashboard Routes */}
                  <Route path="create-ticket" element={<CreateTicket />} />
                  <Route path="open" element={<Open />} />
                  <Route path="close" element={<Close />} />
                  <Route path="home" element={<Home />} />
                  <Route path="Profileform" element={<ProfileForm />} />
                  <Route path="report" element={<Reports />} />
                  <Route path="ppm-status" element={<PPMStatus />} />
                  <Route path="monthly-healthcheck" element={<MonthlyHealthCheck />} />
                  <Route path="spare-inventory" element={<InventoryInfo />} />
                  <Route path="add-emails" element={<AddEmailsPage />} />
                  <Route path='PrivacyPolicyPage' element={<PrivacyPolicyPage />} />
                  <Route path='TermsOfService' element={<TermsOfService />} />
                  <Route path='security-policy' element={<SecurityPolicyPage />} />
                </Route>

                {/* Protected Admin Dashboard Routes */}
                <Route 
                  path="/dashboardadmin/*" 
                  element={
                    <ProtectedRoute>
                      <Dashboardadmin />
                    </ProtectedRoute>
                  }
                >
                  <Route path="operator" element={<Operator />} />
                  <Route path="openticketadmin" element={<OpenticketAdmin />} />
                  <Route path="closeticketadmin" element={<CloseticketAdmin />} />
                  <Route path="issue-category" element={<IssueCategoryDetails />} />
                  <Route path="engineer" element={<Engineers />} />
                  <Route path="company" element={<Company />} />
                  <Route path="ppm" element={<PpmForm />} />
                  <Route path="healthcheck" element={<HealthCheckForm />} />
                  <Route path="periodicreport" element={<PeriodicReport />} />
                  <Route path="promptmanager" element={<PromptManager />} />
                </Route>

                {/* Catch-all Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
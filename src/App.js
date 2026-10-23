import { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import GlowCursor from "./components/GlowCursor";
import "bootstrap/dist/css/bootstrap.min.css";
const Home = lazy(() => import("./pages/Home"));
const Timeline = lazy(() => import("./pages/Timeline"));
const TimelineYear = lazy(() => import("./pages/TimelineYear"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Reports = lazy(() => import("./pages/Reports"));
const ProjectSection = lazy(() => import("./pages/ProjectSection"));
const Contact = lazy(() => import("./pages/Contacts"));
const Team = lazy(() => import("./features/members/pages/Team"));
const OpenHouse = lazy(() => import("./pages/OpenHouse"));
const Inventory = lazy(() => import("./pages/Inventory"));
const ESummit = lazy(() => import("./pages/ESummit"));
const Transfinitte = lazy(() => import("./pages/Transfinitte"));
const OpenDay = lazy(() => import("./pages/OpenDay"));
const Spider2024 = lazy(() => import("./components/ProjectList/Spider/Spider2024"));
const Spider2023 = lazy(() => import("./components/ProjectList/Spider/Spider2023"));
const Spider2022 = lazy(() => import("./components/ProjectList/Spider/Spider2022"));
const Psi2023 = lazy(() => import("./components/ProjectList/onefiles/Psi2023"));
const Fhl2023 = lazy(() => import("./components/ProjectList/onefiles/Fhl2023"));
const DB2023 = lazy(() => import("./components/ProjectList/onefiles/DB2023"));
const RMI2023 = lazy(() => import("./components/ProjectList/RMI/RMI2023"));
const RMI2022 = lazy(() => import("./components/ProjectList/RMI/RMI2022"));
const RMI2021 = lazy(() => import("./components/ProjectList/RMI/RMI2021"));
const RMI2020 = lazy(() => import("./components/ProjectList/RMI/RMI2020"));
const ThreD2023 = lazy(() => import("./components/ProjectList/onefiles/ThreD2023"));
const Delta2024 = lazy(() => import("./components/ProjectList/DeltaClub/Delta2024"));
const Delta2023 = lazy(() => import("./components/ProjectList/DeltaClub/Delta2023"));
const Delta2022 = lazy(() => import("./components/ProjectList/DeltaClub/Delta2022"));
const Delta2021 = lazy(() => import("./components/ProjectList/DeltaClub/Delta2021"));
const Ecell2023 = lazy(() => import("./components/ProjectList/onefiles/Ecell2023"));
const DC2024 = lazy(() => import("./components/ProjectList/DC/DC2024"));
const DC2023 = lazy(() => import("./components/ProjectList/DC/DC2023"));
const DC2022 = lazy(() => import("./components/ProjectList/DC/DC2022"));
const One802023 = lazy(() => import("./components/ProjectList/onefiles/One802023"));
const EVER2023 = lazy(() => import("./components/ProjectList/onefiles/Ever2023"));
const Graphique = lazy(() => import("./components/ProjectList/onefiles/graphique"));
const Sigma = lazy(() => import("./components/ProjectList/onefiles/sigma"));
const Maximus = lazy(() => import("./components/ProjectList/onefiles/Maximus"));
const Profnitt = lazy(() => import("./components/ProjectList/onefiles/profnitt"));
const Naksha = lazy(() => import("./components/ProjectList/onefiles/Naksha"));
const Annualday = lazy(() => import("./pages/Annualday"));
const ClubsPage = lazy(() => import("./pages/ClubsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage"));
const Inventive = lazy(() => import("./features/inventive/pages/Inventive"));
const InventivePage = lazy(() => import("./features/inventive/pages/InventivePage"));
const Contrive = lazy(() => import("./features/contrive/pages/Contrive"));
const ContrivePage = lazy(() => import("./features/contrive/pages/ContrivePage"));
const OpenhousePage = lazy(() => import("./features/openhouse/pages/openhousepage"));
const FC_coming_soon = lazy(() => import("./features/faculty-connect/ComingSoon"));

import { AuthProvider } from './features/admin/context/AuthContext';
import ProtectedRoute from './features/admin/components/ProtectedRoute';
const AdminLogin = lazy(() => import('./features/admin/pages/AdminLogin'));
const ForgotPassword = lazy(() => import('./features/admin/pages/ForgotPassword'));
const TeamDashboard = lazy(() => import('./features/admin/pages/TeamDashboard'));
const TeamMemberForm = lazy(() => import('./features/admin/pages/TeamMemberForm'));
const NewTeamYear = lazy(() => import('./features/admin/pages/NewTeamYear'));
const ProjectDashboard = lazy(() => import('./features/admin/pages/ProjectDashboard'));
const ProjectForm = lazy(() => import('./features/admin/pages/ProjectForm'));
const SettingsDashboard = lazy(() => import('./features/admin/pages/SettingsDashboard'));
const MessagesDashboard = lazy(() => import('./features/admin/pages/MessagesDashboard'));
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Each page is its own code chunk (lazy imports above); this fills the screen
// while a page's chunk downloads
const PageLoading = () => <div style={{ minHeight: '100vh', background: '#000' }} />;

// Renders the Navbar once so it persists (and animates) across page changes;
// the Suspense inside keeps it on screen while the next page loads
const SiteLayout = () => (
  <>
    <Navbar />
    <Suspense fallback={<PageLoading />}>
      <Outlet />
    </Suspense>
    <GlowCursor
      className="glow-cursor--overlay"
      followWindow
      enabled={!prefersReducedMotion}
      color="#fbc419"
      secondaryColor="#ffffff"
      trailLength={8}
      trailWidth={2}
      trailTaper={0.18}
      followSpeed={0.44}
      glowIntensity={2.6}
      glowSpread={1.2}
      hotspot={0.65}
      brightness={1.85}
      opacity={1}
      pulseSpeed={0.5}
      noiseStrength={0.01}
      idleFade
      idleTimeout={50}
      fadeDuration={900}
      blendMode="screen"
    />
  </>
);

const App = () => {
  return (
    <AuthProvider>
      <>
        <ToastContainer theme="dark" />
        <Suspense fallback={<PageLoading />}>
        <Routes>
        {/* Pages that share the persistent site Navbar */}
        <Route element={<SiteLayout />}>

        {/* Club Listing  */}
        <Route path="/clubs"  element={<ClubsPage />} />

        {/* Club Projects Listing   */}
        <Route path="/clubs/:name/projects"  element={<ProjectsPage />} />

        {/* Individual Project Page   */}
        <Route path="/clubs/:name/projects/:projectId" element={<ProjectDetailsPage />} />

        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/timeline/:year" element={<TimelineYear />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/project" element={<ProjectSection />} />
        <Route path="/inventive" element={<Inventive />} />
        <Route path="/inventiveForm" element={<InventivePage/>} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/contrive" element={<Contrive/>}/>
        <Route path="/contriveForm" element={<ContrivePage/>}/>
        <Route path="/openhouse" element={<OpenhousePage/>}/>
        <Route path="/team" element={<Team/>} />
        <Route path="/Team" element={<Team/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faculty-connect" element={<FC_coming_soon />} />
        </Route>

        <Route path="/open-house" element={<OpenHouse />} />
        <Route path="/e-summit" element={<ESummit />} />
        <Route path="/annual-day" element={<Annualday />} />
        <Route path="/transfinitte" element={<Transfinitte />} />
        <Route path="/open-day" element={<OpenDay />} />
        <Route path="/Spider2024" element={<Spider2024 />} />
        <Route path="/Spider2023" element={<Spider2023 />} />
        <Route path="/Spider2022" element={<Spider2022 />} />
        <Route path="/Psi2023" element={<Psi2023 />} />
        <Route path="/Fhl2023" element={<Fhl2023 />} />
        <Route path="/DB2023" element={<DB2023 />} />
        <Route path="/RMI2023" element={<RMI2023 />} />
        <Route path="/RMI2022" element={<RMI2022 />} />
        <Route path="/RMI2021" element={<RMI2021 />} />
        <Route path="/RMI2020" element={<RMI2020 />} />
        <Route path="/3D2023" element={<ThreD2023 />} />
        <Route path="/Delta2024" element={<Delta2024 />} />
        <Route path="/Delta2023" element={<Delta2023 />} />
        <Route path="/Delta2022" element={<Delta2022 />} />
        <Route path="/Delta2021" element={<Delta2021 />} />
        <Route path="/Ecell2023" element={<Ecell2023 />} />
        <Route path="/DC2024" element={<DC2024 />} />
        <Route path="/DC2023" element={<DC2023 />} />
        <Route path="/DC2022" element={<DC2022 />} />
        <Route path="/One802023" element={<One802023 />} />
        <Route path="/EVER2023" element={<EVER2023 />} />
        <Route path="/GRAPHIQUE/2023" element={
         < Graphique/>
        }/>
         <Route path="/SIGMA2023" element={
         < Sigma/>
        }/>
        <Route path="/MAXIMUS/2023" element={
         < Maximus/>
        }/>
        <Route path="/NAKSHA/2023" element={
         < Naksha/>
        }/>
        <Route path="/PROFNITT/2023" element={
         < Profnitt/>
        }/>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/team" element={<ProtectedRoute><TeamDashboard /></ProtectedRoute>} />
        <Route path="/admin/team/new" element={<ProtectedRoute><TeamMemberForm /></ProtectedRoute>} />
        <Route path="/admin/team/new-year" element={<ProtectedRoute><NewTeamYear /></ProtectedRoute>} />
        <Route path="/admin/team/edit/:id" element={<ProtectedRoute><TeamMemberForm /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><ProjectDashboard /></ProtectedRoute>} />
        <Route path="/admin/projects/new" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
        <Route path="/admin/projects/edit/:id" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><SettingsDashboard /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><MessagesDashboard /></ProtectedRoute>} />

      </Routes>
        </Suspense>
    </>
    </AuthProvider>
  );
};


export default App;
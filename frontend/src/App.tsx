import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initTheme } from './utils/theme';
import Layout from './components/Layout';
import IncidentList from './pages/IncidentList';
import CreateIncident from './pages/CreateIncident';
import EditIncident from './pages/EditIncident';
import IncidentDetail from './pages/IncidentDetail';
import { AIChat } from './pages/AIChat';
import './App.css';

function App() {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<IncidentList />} />
          <Route path="/create" element={<CreateIncident />} />
          <Route path="/incidents/:id" element={<IncidentDetail />} />
          <Route path="/incidents/:id/edit" element={<EditIncident />} />
          <Route path="/ai-chat" element={<AIChat />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;


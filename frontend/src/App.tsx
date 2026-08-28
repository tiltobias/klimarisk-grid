import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useDataStore from './hooks/useDataStore'
import Dashboard from './pages/Dashboard';
// import ReportPage from './pages/ReportPage';
import useLanguageStore, { t } from './hooks/useLanguageStore';

function App() {

  const {
    fetchDataModel,
  } = useDataStore();

  const { l, language } = useLanguageStore();

  // Fetch data on mount, only once
  useEffect(() => {
    fetchDataModel();
  }, [fetchDataModel]);

  useEffect(() => {
    document.title = l(t.header.title) ?? "Klimarisk";
    document.documentElement.lang = language === "no" ? "nb" : "en";
  }, [l, language]);


  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/report" element={<ReportPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

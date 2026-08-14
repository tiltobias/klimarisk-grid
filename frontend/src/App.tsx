import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useDataStore from './hooks/useDataStore'
import Dashboard from './pages/Dashboard';
// import ReportPage from './pages/ReportPage';

function App() {

  const {
    fetchDataModel,
    fetchData,
    selectedFylke,
  } = useDataStore();

  // Fetch data on mount, only once
  useEffect(() => {
    fetchDataModel();
    if (selectedFylke) {
      fetchData(selectedFylke);
    }
  }, [fetchData, fetchDataModel, selectedFylke]);


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

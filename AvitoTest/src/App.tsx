import './App.css'
import MainPage from './components/mainPage/mainPage.tsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import ItemPage from './components/ItemPage/ItemPage.tsx'
import StatsPage from './components/StatsPage/StatsPage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list" replace />} />
      <Route path="/list" element={<MainPage />} />
      <Route path="/item/:id" element={<ItemPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  )
}

export default App

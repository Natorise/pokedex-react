import './App.css'
import { Routes, Route } from 'react-router-dom';
import PokemonDex from './pages/PokemonDex'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dex/:id" element={<PokemonDex />} />
    </Routes>
  )
}

export default App

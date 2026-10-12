import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Bubbles from './components/Bubbles'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import Hub from './pages/Hub'
import Piece from './pages/Piece'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Bubbles />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/piece/:id" element={<Piece />} />
      </Routes>
      <SiteFooter />
    </BrowserRouter>
  )
}

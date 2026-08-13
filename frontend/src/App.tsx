import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { ServicesPage } from './pages/ServicesPage'
import { Realisations } from './pages/Realisations'
import { ContactPage } from './pages/ContactPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

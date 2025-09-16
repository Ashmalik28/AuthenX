
import './App.css'

import { Navbar , HeroSection, Stats, Features, FAQ, Footer } from './components'
import HowItWorks from './components/HowItWorks'
import Support from './components/Support'

function App() {

  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Stats/>
    <Features />
    <HowItWorks />
    <Support />
    <FAQ />
    <Footer />
    </>
  )
}

export default App

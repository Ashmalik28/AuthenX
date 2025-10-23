
import { Navbar , HeroSection, Stats, Features, FAQ, Footer , How , Support} from '../components/index.js'


function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Stats/>
    <Features />
    <How />
    <div id="support">
        <Support />
      </div>
    <FAQ />
    <Footer />
    </>
  )
}

export default Home;

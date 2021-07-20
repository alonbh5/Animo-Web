import { useState, useEffect } from 'react'
import { Navigation } from './components/Navigation'
import { Header } from './components/Header'
import { Features } from './components/Features'
import { About } from './components/About'
import { Services } from './components/Services'
import { Gallery } from './components/Gallery'
import { Testimonials } from './components/Testimonials'
import { Team } from './components/Team'
import { Contact } from './components/Contact'
import JsonData from './data/data.json'
import SmoothScroll from 'smooth-scroll'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})

const App = () => {
  const [landingPageData, setLandingPageData] = useState(JsonData)
  useEffect(() => {
    setLandingPageData(JsonData)
  }, []);

  return (
    <div>
      <h2>Welcome to React Router Tutorial</h2>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <li><Link to={'/'} className="nav-link"> Home </Link></li>
        <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
        <li><Link to={'/about'} className="nav-link">About</Link></li>
      </ul>
      </nav>
      <hr />

    </div>
  <Router>

    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
    <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/contact' component={Contact} />
          <Route path='/about' component={About} />
      </Switch>
    </Router>


  )
}

export default App
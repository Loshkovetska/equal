import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/common/ScrollToTop'
import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import routes from './routes'
import './styles/index.scss'
import Header from './components/common/Header'

const App = observer(() => {
  const headerContent = useRef(null)

  useEffect(() => {
    document.querySelector('video') &&
      Array.from(document.querySelectorAll('video')).forEach((v) => {
        v.disablePictureInPicture = true
      })
  }, [])
  return (
    <Router>
      <div ref={headerContent}></div>
      <ScrollToTop headerContent={headerContent} />
      <Header classlist="showup" />
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.component} />
        ))}
      </Routes>
    </Router>
  )
})

export default App

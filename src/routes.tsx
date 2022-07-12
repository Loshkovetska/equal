import CasePage from './pages/CasePage'
import CasesPage from './pages/CasesPage'
import ContactPage from './pages/ContactPage'
import MainPage from './pages/MainPage'
import ThanksPage from './pages/ThanksPage'
import BlogsPage from './pages/BlogsPage'
import BlogArticlePage from './pages/BlogArticlePage'

export type RouteType = {
  path: string
  component: any
}

const routes: Array<RouteType> = [
  { path: '/', component: <MainPage /> },
  { path: '/cases', component: <CasesPage /> },
  { path: '/cases/:type', component: <CasesPage /> },
  { path: '/case/:name', component: <CasePage /> },
  { path: '/text-us', component: <ContactPage /> },
  { path: '/thanks', component: <ThanksPage /> },
  { path: '/blogs', component: <BlogsPage /> },
  { path: '/blogs/:name', component: <BlogArticlePage /> },
]

export default routes

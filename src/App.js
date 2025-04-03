import './App.css';
import UserLayout from './component/User/UserLayout';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import { AuthContextWrapper } from './component/Context/AuthContext';
import { useEffect } from 'react';
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]);

  return null;
}
function App() {
  return (
    <AuthContextWrapper>
      <Router>
        <div className="App">
          <ScrollToTop />
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = UserLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }
              const Page = route.component
              return <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            })}
          </Routes>
        </div>
      </Router>
    </AuthContextWrapper>
  );
}

export default App;

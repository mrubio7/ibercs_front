import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import Context, { ContextProvider }  from "../context";
import Index from "./index";
import Ladder from "./ladder";
import Forum from "./forum";
import Login from "./login";
import Register from "./register";
import { auth } from "../utils/firebase";
import { useContext, useEffect } from "react";
import Profile from "./profile";


const styles = {
  app: {
    width: '100ww',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
  },
}

function App() {
 
  useEffect(() => {
    
  }, []);

  return (
    <div style={styles.app}>
      <ContextProvider>
          <Router>
            <Layout>
              <Routes>
                  <Route path="/*" element={ <Index/> } />
                  <Route path="/profile" element={ <Profile/> } />
                  <Route path="/login" element={ <Login/> } />
                  <Route path="/register" element={ <Register /> } />
                  <Route path="/forum/*" element={ <Forum/> } />
                  <Route path="/ladder/*" element={ <Ladder/> } />
              </Routes>
            </Layout>
          </Router>
      </ContextProvider>
    </div>
  );
}

export default App;

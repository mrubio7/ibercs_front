import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import { ContextProvider } from "../context";
import Index from "./index";
import Match from "../components/match";

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

  return (
    <div style={styles.app}>
      <ContextProvider>
          <Router>
            <Layout>
              <Routes>
                  <Route path="/*" element={ <Index/> } />
              </Routes>
            </Layout>
          </Router>
      </ContextProvider>
    </div>
  );
}

export default App;

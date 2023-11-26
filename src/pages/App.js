import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/layout";
import Context  from "../context";
import Index from "./index";
import Ladder from "./ladder";
import Forum from "./forum";
import Login from "./login";
import Register from "./register";
import { auth } from "../utils/firebase";
import { useContext, useEffect } from "react";
import Profile from "./profile";
import Api from "../api";


const styles = {
  app: {
    width: '100ww',
    minHeight: '100vh',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
  },
}

function App() {
  const obj = useContext(Context);
  let intervalId = null;

  const getUser = async () => {
    if (!obj.User?.ID && auth.currentUser && auth.currentUser.email) {
      const user = await Api.User.getUserByEmail(auth.currentUser.email);
      if (user) {
        obj.setUser(user.data.success);
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    }
  }

  useEffect(() => {
    intervalId = setInterval(getUser, 1000); 
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [auth.currentUser?.email, obj.User]);

  return (
    <div style={styles.app}>
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
    </div>
  );
}

export default App;

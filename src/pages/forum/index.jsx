import { Route, Routes, useNavigate } from "react-router-dom";
import ThreadList from "../../components/thread-list/threadList";
import NewThread from "./new";
import ThreadPage from "./thread";
import { useContext, useEffect } from "react";
import Context from "../../context";
import { texts } from "../../utils/translate";
import { auth } from "../../utils/firebase";

const Forum = () => {
    const obj = useContext(Context);
    const navigate = useNavigate();
    document.title = texts[obj.Lang].TITLE_FORUM;

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login');
        }
    }, [auth.currentUser]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<ThreadList />} />
                <Route path="/new" element={<NewThread />} />
                <Route path="/:threadId" element={<ThreadPage />} />
            </Routes>
            
        </div>
    );
}

export default Forum;
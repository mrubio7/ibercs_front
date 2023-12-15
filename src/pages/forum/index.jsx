import { Route, Routes } from "react-router-dom";
import ThreadList from "../../components/thread-list/threadList";
import NewThread from "./new";
import ThreadPage from "./thread";
import { useContext } from "react";
import Context from "../../context";
import { texts } from "../../utils/translate";

const Forum = () => {
    const obj = useContext(Context);
    document.title = texts[obj.Lang].TITLE_FORUM;
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
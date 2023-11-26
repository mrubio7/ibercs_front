import { Route, Routes } from "react-router-dom";
import ThreadList from "../../components/thread-list/threadList";
import NewThread from "./new";
import ThreadPage from "./thread";

const Forum = () => {
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
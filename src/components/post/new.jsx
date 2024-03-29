import { useNavigate } from "react-router-dom";
import Api from "../../api";
import { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import ReactQuill from "react-quill";
import Context from "../../context";
import { texts } from "../../utils/translate";
import { th } from "date-fns/locale";
import NewThread from "../../pages/forum/new";
import { auth } from "../../utils/firebase";

const NewPostForm = ({title, threadId, isANewThread}) => {
    const obj = useContext(Context);
    const [quill, setQuill] = useState('');
    const navigate = useNavigate();

    const handleSaveThread = async () => {
        const thread = await Api.Thread.new(obj.Lang, title, auth.currentUser?.email, quill);
        navigate(`/forum/${thread.data.result.ID}`);
    }

    const handleSavePost = async () => {
        const post = await Api.Post.new(obj.Lang, quill, obj.User.ID, threadId);
        navigate(`/forum/${post.data.result.Thread_id}`);
        window.location.reload();
    }

    useEffect(() => {
        
    } , [auth?.currentUser])

    return (
        <>
            <ReactQuill style={{ height: 400 }} theme="snow" value={quill} onChange={setQuill}/>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginBottom: 4}}>
                {
                    isANewThread ? 
                        (<Button onClick={() => handleSaveThread()} variant="contained" sx={{marginTop: 8}}>{texts[obj.Lang].FORUM_NewThread_Submit}</Button>) 
                        : 
                        (<Button onClick={() => handleSavePost()} variant="contained" sx={{marginTop: 8}}>{texts[obj.Lang].FORUM_NewPost_Submit}</Button>)
                }
                
            </Box>
        </>
    )
}

export default NewPostForm;
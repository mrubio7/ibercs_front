import { Box, Button, Link, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../context";
import { texts } from "../../utils/translate";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Api from "../../api";
import { useNavigate } from "react-router-dom";
import NewPostForm from "../../components/post/new";
import { auth } from "../../utils/firebase";

const NewThread = () => {
    const obj = useContext(Context);
    const [title, setTitle] = useState('');
    const [quill, setQuill] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        
    }, [auth?.currentUser])

    useEffect(() => {
        if (auth.currentUser == null) {
            navigate('/login');
        }
    }, [])

    return (
        <div>
            <h3>{texts[obj.Lang].FORUM_NewThread}</h3>
            <Box>
                <TextField value={title} onChange={(e) => setTitle(e.target.value)} sx={{width: '100%', marginBottom: 2}} label={texts[obj.Lang].FORUM_NewThread_Title} variant="outlined" />
                <NewPostForm title={title} isANewThread={true} />
            </Box>
        </div>
    )
}

export default NewThread;
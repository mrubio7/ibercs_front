import { Box, Button, Link, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Context from "../../context";
import { texts } from "../../utils/translate";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Api from "../../api";
import { useNavigate } from "react-router-dom";
import NewPostForm from "../../components/post/new";

const NewThread = () => {
    const obj = useContext(Context);
    const [title, setTitle] = useState('');
    const [quill, setQuill] = useState('');
    const navigate = useNavigate();

    const handleSaveThread = async () => {
        const thread = await Api.Thread.new(obj.Lang, title, obj.User.ID, quill);

        navigate(`/forum/${thread.data.result.ID}`);
    }

    return (
        <div>
            <Link to="/forum">
                <Button variant="outlined">{texts[obj.Lang].RETURN}</Button>
            </Link>
            <h3>{texts[obj.Lang].FORUM_NewThread}</h3>
            <Box>
                <TextField value={title} onChange={(e) => setTitle(e.target.value)} sx={{width: '100%', marginBottom: 2}} label={texts[obj.Lang].FORUM_NewThread_Title} variant="outlined" />
                <NewPostForm title={title} />
            </Box>
        </div>
    )
}

export default NewThread;
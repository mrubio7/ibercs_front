import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../api';
import Context from '../../context';
import { AddBox } from '@mui/icons-material';
import { Box } from '@mui/material';
import Post from '../../components/post';
import NewPostForm from '../../components/post/new';

const ThreadPage = () => {
    const obj = useContext(Context);
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);

    useEffect(() => {
        const getThread = async () => {
            const response = await Api.Thread.get(threadId);
            setThread(response.data.result);
        }

        getThread();
    }, [threadId]);

    return (
        <div>
            <Box sx={{marginTop: 6}}>
                {obj.Lang == "ES" ? (
                    <h2>{thread?.title_es}</h2>
                ) : (
                    <h2>{thread?.title_pt}</h2>
                )}
                {
                    thread?.Posts.map((post, index) => {
                        return (
                            <Post key={index} post={post} />
                        )
                    })
                }
                <NewPostForm threadId={threadId} />
            </Box>
        </div>
    )
}

export default ThreadPage
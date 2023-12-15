import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../api';
import Context from '../../context';
import { Box, Button } from '@mui/material';
import Post from '../../components/post';
import NewPostForm from '../../components/post/new';

const ThreadPage = () => {
    const obj = useContext(Context);
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [match, setMatch] = useState(null);

    useEffect(() => {
        const getThread = async () => {
            const response = await Api.Thread.get(threadId);
            setThread(response.data.result);
        }
    
        getThread();
    }, [threadId]);

    useEffect(() => {
        const getMatch = async () => {
            const response = await Api.Matches.getMatchByThreadId(threadId);
            setMatch(response.data.result);
            console.log(response.data.result);
        }
    
        if (thread?.user == "MATCH") {
            getMatch();
        }
    }, [thread]);


    if (thread?.user == "MATCH" && match) {
        return (
            <Box sx={{marginTop: 6}}>
                {obj.Lang == "ES" ? (
                    <h3>{thread?.title_es}</h3>
                ) : (
                    <h3>{thread?.title_pt}</h3>
                )}
                <h4 style={{textAlign: 'center', paddingTop: 10}}>{match.tournament_name}</h4>
                <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: 4}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <img style={{borderRadius: 7}} src={match.avatar_team_a} width={150}/>
                        <h2>{match.team_name_a}</h2>
                    </Box>
                    <Button variant='outlined' href={match.url.replace('{lang}', obj.Lang.toLowerCase())} sx={{height: 40, marginTop: '-60px', alignSelf: 'center'}}>Link al partido</Button>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <img style={{borderRadius: 7}} src={match.avatar_team_b} width={150}/>
                        <h2>{match.team_name_b}</h2>
                    </Box>
                </Box>
                {
                    thread?.Posts?.map((post, index) => {
                        return (
                            <Post key={index} post={post} />
                        )
                    })
                }
                <NewPostForm threadId={threadId} />
            </Box>
        )
    }

    return (
        <div>
            <Box sx={{marginTop: 6}}>
                {obj.Lang == "ES" ? (
                    <h2>{thread?.title_es}</h2>
                ) : (
                    <h2>{thread?.title_pt}</h2>
                )}
                {
                    thread?.Posts?.map((post, index) => {
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
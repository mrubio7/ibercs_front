import { useContext, useEffect, useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import Api from '../../api';
import Context from '../../context';
import { Box, Button, TextField } from '@mui/material';
import Post from '../../components/post';
import NewPostForm from '../../components/post/new';
import { auth } from "../../utils/firebase";

const ThreadPage = () => {
    const obj = useContext(Context);
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [match, setMatch] = useState(null);
    const [user, setUser] = useState(null);

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
        }
    
        if (thread?.user == "MATCH") {
            getMatch();
        }
    }, [thread]);

    useEffect(() => {
        const getUser = async () => {
            const response = await Api.User.getUserByEmail(auth.currentUser?.email);
            setUser(response.data.success);
        }
    
        if (auth.currentUser?.email) {
            getUser();
        }
    }, [auth.currentUser?.email]);
    
    if (thread?.user == "MATCH" && match) {
        return (
            <>
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
                        <Box sx={{height: 40, height:'100%', alignSelf: 'center', display:'flex', flexDirection:'column'}}>
                            <Button variant='outlined' href={match.url.replace('{lang}', obj.Lang.toLowerCase())} >Link al partido</Button>
                            {
                                match.tv != "" ? (
                                    <iframe
                                        src={`https://player.twitch.tv/?channel=${match.tv}&parent=https://www.ibercs.com&muted=true`}
                                        height="160"
                                        width="320"
                                        allowFullScreen
                                        style={{borderRadius: 7, marginTop: 10}}
                                    />) : <></>
                            }
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <img style={{borderRadius: 7}} src={match.avatar_team_b} width={150}/>
                            <h2>{match.team_name_b}</h2>
                        </Box>
                    </Box>

                    {
                        user?.permission_level == 1 ? (
                            <Box sx={{display:'flex', justifyContent:'end', marginBottom: 3, marginTop: -2}}>
                                <TextField label='Stream' size='small' variant='outlined' sx={{width: 200, marginRight: 2}} />
                                <Button variant='contained'>+ TV</Button>
                            </Box>
                        ) : <></>
                    }
                    {
                        thread?.Posts?.map((post, index) => {
                            return (
                                <Post key={index} post={post} />
                            )
                        })
                    }
                    {
                        auth.currentUser != null ? (
                            <NewPostForm threadId={threadId} />
                        ) : (
                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                <Button variant='outlined' onClick={() => redirect('/login')} sx={{height: 40, alignSelf: 'center'}}>Iniciar sesión para comentar</Button>
                            </Box>
                        )
                    }
                </Box>
            </>
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
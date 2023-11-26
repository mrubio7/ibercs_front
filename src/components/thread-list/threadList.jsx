import { Pagination, TextField, InputAdornment, Box, Skeleton, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useEffect, useState } from 'react'
import Context from '../../context';
import { texts } from '../../utils/translate';
import Thread from '../thread';
import Api from '../../api';
import { Link } from 'react-router-dom';


const ThreadList = () => {
    const obj = useContext(Context);
    const [threadList, setThreadList] = useState([]);

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const getLatestThreads = async () => {
            const threads = await Api.Thread.getLatest();
            setThreadList(threads.data.result);
        }

        getLatestThreads();
    }, []);

    return (
        <div>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
                <h3>{texts[obj.Lang].FORUM_Title}</h3>
                <Box sx={{display: 'flex', alignItems:'center'}}>
                    <Link to="/forum/new"><Button variant='outlined' sx={{height: 40, marginRight: 2}}>{texts[obj.Lang].FORUM_NewThread}</Button></Link>
                    <TextField
                        label={texts[obj.Lang].FORUM_Search}
                        size='small'
                        id="forum-search"
                        sx={{ m: 1, width: '30ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                        }}
                    />
                </Box>
            </div>
            {
                threadList.length == 0 ? 
                    Array.from({length: 10}).map((_, index) => { return(
                        <Skeleton key={index} variant="rectangular" height={60} sx={{margin: '10px 0px'}} />)
                    })
                :
                    <RenderThreads page={page} threads={threadList} />
            }
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Pagination count={10} page={page} onChange={handleChange} size='large' />
            </Box>
        </div>
    )
}

const RenderThreads = ({page, threads}) => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    const threadsForPage = threads.slice(startIndex, endIndex);

    return (
        <>
            {
                threadsForPage.map((t, index) => {
                    return (
                        <Thread key={index} desc_ES={t.Posts[0].Desc_ES} desc_PT={t.Posts[0].Desc_PT} title_ES={t.title_es} title_PT={t.title_pt} username={t.user} posts_nb={t.posts_number} id={t.ID} />
                    )
                })
            }
        </>
    )
}

export default ThreadList
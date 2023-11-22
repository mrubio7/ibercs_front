import { Pagination, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useState } from 'react'
import Context from '../../context';
import { texts } from '../../utils/translate';
import Thread from '../thread';


const ThreadList = () => {
    const obj = useContext(Context);

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
                <h3>{texts[obj.Lang].FORUM_Title}</h3>
                <TextField
                    label={texts[obj.Lang].FORUM_Search}
                    size='small'
                    id="forum-search"
                    sx={{ m: 1, width: '30ch' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    }}
                />
            </div>
            {/* <RenderThreads page={page} threads={threads} /> */}
            <Pagination count={10} page={page} onChange={handleChange} size='large' />
        </div>
    )
}

const RenderThreads = ({page, threads}) => {
    return (
        <>
            {
                // threads.map((thread, index) => {
                //     return (
                //         <Thread key={index} thread={thread} />
                //     )
                // })
            }
        </>
    )
}

export default ThreadList
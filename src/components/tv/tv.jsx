import { Box } from "@mui/material";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { TWITCH_get_token, basic_get } from "../../utils/axios";

const styles = {
    tv: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid rgba(229, 135, 22, 0.08)',
        borderRadius: '5px',
        padding: '5px 20px',
        margin: '5px 0',
        fontSize: '0.875rem',
        transition: 'background-color 0.2s',
        '&:hover': {
            cursor: 'pointer',
            color: 'primary.main'
        }
    },
    tvHover: {
        cursor: 'pointer',
        backgroundColor: 'rgba(229, 135, 22, 0.08);',
        transition: 'background-color 0.2s',
    }
}

function getChannelName(channelUrl) {
    const noProtocolUrl = channelUrl.replace(/(^\w+:|^)\/\//, '').replace('www.', '');
    const parts = noProtocolUrl.split('/');
    return parts[parts.length - 1];
}

const Tv = ({tv, nickname}) => {
    const [online, setOnline] = React.useState(false);
    const [viewers, setViewers] = React.useState(0);

    useEffect(() => {
        const checkStream = async (channelName) => {
            let finalChannelName = getChannelName(channelName);
            let token = await TWITCH_get_token();
    
            if (token) {
                const result = await fetch(`https://api.twitch.tv/helix/streams?user_login=${finalChannelName}`, {
                    headers: {
                        'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                const json = await result.json();
                setOnline(json.data[0] != null);
                setViewers(json.data[0] != null ? json.data[0].viewer_count : 0);
            } else {
                console.error("Failed to get token");
            }
        }
    
        checkStream(tv);
    }, [tv]);

    return (
        
            online? 
                <a href={'https://'+tv}>
                    <Box style={styles.tv} sx={{':hover': styles.tvHover}}>
                        <Box sx={{width: '10%', marginLeft: '-10px', marginTop: '-1px'}}>
                            {online ? '🔴' : '⚫️'}
                        </Box>
                        <Box sx={{width: '60%'}}>
                            {nickname}
                        </Box>
                        <Box sx={{fontSize: '0.7rem', width: '30%'}}>
                            {viewers} viewers
                        </Box>
                    </Box>
                </a>
            :
                <></>
        
    )
}

export default Tv;
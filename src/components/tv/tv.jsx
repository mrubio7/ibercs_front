import { Box } from "@mui/material";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { basic_get } from "../../utils/axios";

const styles = {
    tv: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0px 20px',
        '&:hover': {
            cursor: 'pointer',
            color: 'primary.main'
        }
    },
    tvHover: {
        cursor: 'pointer',
        color: 'primary.main'
    }
}

function getChannelName(channelUrl) {
    const noProtocolUrl = channelUrl.replace(/(^\w+:|^)\/\//, '').replace('www.', '');
    const parts = noProtocolUrl.split('/');
    return parts[parts.length - 1];
}

const Tv = ({tv, nickname}) => {
    const [online, setOnline] = React.useState(false);

    useEffect(() => {
        const checkStream = async (channelName) => {
            let url = `https://twitchtracker.com/${getChannelName(channelName)}`

            const result = await fetch(url);

            console.log(result)
            if ((await result.text()).includes('live-indicator'))
                setOnline(true);
            else
                setOnline(false);
            }

        checkStream(tv);
    }, []);

    return (
        <a href={'https://'+tv}>
            <Box style={styles.tv} sx={{':hover': styles.tvHover}}>
                <Box>
                    {online ? '🔴' : '⚫️'}
                </Box>
                <Box>
                    {nickname}
                </Box>
            </Box>
        </a>
    )
}

export default Tv;
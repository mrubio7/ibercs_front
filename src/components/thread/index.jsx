import React, { useContext } from 'react';
import Context from '../../context';
import { Card, Typography, Box, Chip, CardMedia, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import { texts } from '../../utils/translate';

const styles = {
    thread: {
        width: '100%',
        height: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '10px 0px',
        // add hover effect
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#ffe0e0 !important',
        },
    },
    threadContent: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
    },
    threadTitle: {
        marginLeft: '15px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    threadInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: '10px',
    },
}

const Thread = ({title_ES, title_PT, username, posts_nb, id, match}) => {
    const obj = useContext(Context);
    
    return (
        <>
            <Link to={`/forum/${id}`}>
            <Card style={styles.thread} variant="outlined" sx={{':hover': { backgroundColor: '#A4351D', transition: '0.1s ease' }, transition: '0.1s ease'}}>
                <div style={styles.threadContent}>
                    {
                        match ? 
                        <CardMedia
                            sx={{height: '100%', width: '70px'}}
                            component="img" 
                            image={"/images/vs.jpg"} 
                        /> : 
                        null
                    }
                    
                    <div style={styles.threadTitle}>
                        {
                            obj.Lang === 'ES' ? <b>{title_ES}</b> : <b>{title_PT}</b>
                        }
                    </div>
                    <div style={styles.threadInfo}>
                        <Chip color="primary" sx={{margin: '0px 5px'}} label={posts_nb} size='small' />
                        <Chip color="secondary" sx={{margin: '0px 5px'}} label={username} size='small' />
                    </div>
                </div>
            </Card>
            </Link>
        </>
    )
}

export default Thread
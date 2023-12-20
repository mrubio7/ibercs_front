import React, { useContext, useEffect } from 'react';
import Context from '../../context';
import { Card, Typography, Box, Chip, CardMedia, CardHeader } from '@mui/material';
import { Link, redirect } from 'react-router-dom';
import { texts } from '../../utils/translate';

const styles = {
    thread: {
        width: '100%',
        height: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '10px 0px',
        border: '1px solid #222',
    },
    threadContent: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
    },
    threadTitle: {
        margin: '5px 0px 0px 15px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        WebkitLineClamp: '1',
        WebkitBoxOrient: 'vertical',
    },
    threadDesc: {
        marginLeft: '15px',
        marginBottom: '5px',
        color: '#555', 
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.8rem',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: '1',
        WebkitBoxOrient: 'vertical',
    },
    threadInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: '10px',
    },
}

const Thread = ({title_ES, title_PT, desc_ES, desc_PT, username, posts_nb, id, match}) => {
    const obj = useContext(Context);

    return (
        <>
            <Link to={`/forum/${id}`}>
            <Card style={styles.thread} variant="outlined" sx={{':hover': { backgroundColor: 'rgba(255,255,255,0.02)', transition: '0.1s ease' }, transition: '0.1s ease'}}>
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
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                        <div style={styles.threadTitle}>
                            {
                                obj.Lang === 'ES' ? <b>{title_ES}</b> : <b>{title_PT}</b>
                            }
                        </div>
                        <div style={styles.threadDesc}>
                            {
                                obj.Lang === 'ES' ? <span>{desc_ES}</span> : <span>{desc_PT}</span>
                            }
                        </div>
                    </div>
                    <div style={styles.threadInfo}>
                        <Chip color="primary" sx={{margin: '0px 5px'}} label={posts_nb - 1} size='small' />
                        <Chip color="secondary" sx={{margin: '0px 5px'}} label={username} size='small' />
                    </div>
                </div>
            </Card>
            </Link>
        </>
    )
}

export default Thread
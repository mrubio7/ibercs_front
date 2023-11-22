import { Box, Card, CardMedia } from '@mui/material';
import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react';

const styles = {
    match: {
        width: 'min(100%, 170px)',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: '0.1s ease',
        border: '1px solid #CCC',
        margin: '0px 5px',
    },
    matchHover: {
        scale: '1.05',
        transition: '0.1s ease',
        cursor: 'pointer',
        border: '1px solid #d32f2f !important'
    },
    textNames: {
        position: 'absolute', 
        display:'flex', 
        justifyContent: 'space-between', 
        width: '100%',
        height: '100%',
        bottom:'0', 
        background: 'linear-gradient(0deg, #000, transparent)',
        zIndex: '2',
    }
}

const Match = ({teamImageA, teamImageB, teamNameA, teamNameB, map}) => {

    return (
        <Card style={styles.match} sx={{':hover': styles.matchHover}}>
            <Box sx={{position: 'relative'}}>
                <Box sx={{position: 'relative'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <CardMedia
                            sx={{ height: 85, width: '50%', zIndex: '1' }}
                            image={teamImageA}
                        />
                        <CardMedia
                            sx={{ height: 85, width: '50%', zIndex: '1' }}
                            image={teamImageB}
                        />
                    </Box>
                    <CardMedia
                        sx={{ 
                            height: '80px', 
                            zIndex: '2', 
                            position: 'absolute', 
                            top: 0,
                            scale: '0.5',
                            left: '25%', 
                            width: '50%',
                        }}
                        image={"https://upload.wikimedia.org/wikipedia/commons/7/70/Street_Fighter_VS_logo.png"}
                    />
                </Box>
                <Box sx={styles.textNames}>
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <span>{teamNameA}</span>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <span>{teamNameB}</span>
                    </Box>
                </Box>
            </Box>
            <Box sx={{display: 'flex'}}>
            {
                map.map((item, index) => {
                    return (
                        <CardMedia
                            key={index}
                            style={{width: `${100/map.length}%`}}
                            sx={{ height: '80px' }}
                            image={`/images/maps/${item}.webp`}
                        />
                    );
                })
            }
            </Box>
        </Card>
    );
}

export default Match;
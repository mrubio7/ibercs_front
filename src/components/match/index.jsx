import { Box, Card, CardMedia, Avatar } from '@mui/material';
import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    match: {
        width: '100%',
        height: '40px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        transition: '0.1s ease',
        border: '1px solid rgba(229, 135, 22, 0.08)',
        margin: '5px 0px',
    },
    matchHover: {
        transition: '0.1s ease',
        cursor: 'pointer',
        border: '1px solid rgba(229, 135, 22, 0.28) !important'
    },
    textNames: {
        display:'flex', 
        justifyContent: 'space-between', 
        fontSize: '0.8rem',
        width: '100%',
        height: '100%',
        zIndex: '2',
    }
}

const Match = ({match}) => {

    return (
        <Link to={`/forum/${match.thread_id}`}>
            <Card style={styles.match} sx={{':hover': styles.matchHover}}>
                <Box sx={{width: 'auto'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%'}}>
                        <Avatar
                            sx={{height:'30px', width: '30px', zIndex: '1', margin: '0px 5px 0px 10px', border: match.team_id_a ?  '1px solid #e58716' : 'none'}}
                            src={match.avatar_team_a}
                        />
                        <Avatar
                            sx={{ height:'30px', width: '30px', zIndex: '1', margin: '0px 5px' , border: match.team_id_b ? '1px solid #e58716' : 'none'}}
                            src={match.avatar_team_b}
                        />
                    </Box>
                </Box>
                <Box sx={{width: '20%'}}>
                    <Box sx={styles.textNames}>
                        <Box sx={{display: 'flex', alignItems: 'center', padding: '0px 5px'}}>
                        <span style={{color: new Date(match.date).setMinutes(new Date(match.date).getMinutes() + 45 * match.map_matches.length) < new Date() ? 'gray' : new Date(match.date) < new Date() ? 'red' : 'orange'}}>
                            {
                                new Date(match.date).setMinutes(new Date(match.date).getMinutes() + 45 * match.map_matches.length) < new Date() 
                                ? 'Ended - ' + new Date(match.date).toLocaleString()
                                : new Date(match.date) < new Date() 
                                    ? '🔴 NOW' 
                                    : "📅 "+new Date(match.date).toLocaleString()
                            }
                            </span>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{width: '60%'}}>
                    <Box sx={styles.textNames}>
                        <Box sx={{display:'flex', justifyContent: 'space-between', width:'100%'}}>
                            <Box sx={{display: 'flex', alignItems: 'center', padding: '0px 5px'}}>
                                <span>{match.team_name_a}</span>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', padding: '0px 5px'}}>
                                <span>VS</span>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', padding: '0px 20px 0px 5px'}}>
                                <span>{match.team_name_b}</span>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{width: '30%'}} >
                    <Box sx={styles.textNames}>
                        <Box sx={{display: 'flex', alignItems: 'center', padding: '0px 20px'}}>
                            <span>{match.tournament_name}</span>
                        </Box>
                    </Box>
                </Box>
                {/* <Box sx={{width: '20%'}}>
                    <Box>
                    {
                        match.map.length == 0 ?
                            <>
                                <CardMedia
                                    style={{width: `${100/map.length}%`}}
                                    sx={{ height: '80px' }}
                                    image={`/images/maps/any.webp`}
                                />
                            </>
                            :
                            <Box sx={{display: 'flex'}}>
                            {
                                match.map.map((item, index) => {
                                    return (
                                        <CardMedia
                                            key={index}
                                            style={{width: `${100/match.map.length}%`}}
                                            sx={{ height: '80px' }}
                                            image={`/images/maps/${item}.webp`}
                                        />
                                    );
                                })
                            }
                            </Box>
                    }
                    </Box>
                </Box> */}
            </Card>
        </Link>
    );
}

export default Match;

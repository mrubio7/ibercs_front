import { Box, InputAdornment, TextField } from '@mui/material';
import Match from "../match";
import { useContext, useEffect, useState } from 'react';
import Api from '../../api';
import Context from '../../context';
import { texts } from '../../utils/translate';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

const MatchList = ({isIndex}) => {
    const obj = useContext(Context)
    const [matches, setMatches] = useState([]);
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [ongoingMatches, setOngoingMatches] = useState([]);
    const [endedMatches, setEndedMatches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    
    
    const getUpcomingMatches = () => {
        const now = new Date();
        return matches.filter(match => new Date(match.date) > now);
    }

    const getStartedMatches = () => {
        const now = new Date();
        return matches.filter(match => new Date(match.date) <= now);
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredMatches = matches.filter(match =>
        match.team_name_a.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.team_name_b.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.tournament_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const getMatches = async () => {
            const matches = await Api.Matches.getAllMatches();
            setMatches(matches.data.result)
            setLoading(false);
        }
    
        getMatches();
    }, []);

    useEffect(() => {
        setUpcomingMatches(getUpcomingMatches())
        const startedM = getStartedMatches()
        const ongoingM = [];
        const endedM = [];
    
        const now = new Date();
    
        startedM.forEach(match => {
            const matchTime = new Date(match.date);
            matchTime.setMinutes(matchTime.getMinutes() + 45 * match.map_matches.length);
            if (matchTime < now) {
                endedM.push(match);
            } else {
                ongoingM.push(match);
            }
        });
    
        setOngoingMatches(ongoingM);
        setEndedMatches(endedM);
    }, [matches]);


    if (loading) return (
        <Box sx={{display: 'flex', justifyContent:'center'}}>
            <CircularProgress />
        </Box>
    );

    return (
        <>
            <Box sx={{marginBottom: 1, display: 'flex', flexDirection: 'column'}}>
                {isIndex ? <></> : 
                    <TextField
                        label={texts[obj.Lang].FORUM_Search}
                        size='small'
                        id="forum-search"
                        sx={{ m: 1, width: '100%' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                        }}
                        onChange={handleSearchChange}
                        value={searchTerm}
                    />
                }

            {
                filteredMatches.length != matches.length ?
                    filteredMatches.map((match, index) => (
                        <Match key={index} match={match} />
                    ))
                    :
                        isIndex ?
                            matches.map((match, index) => (
                                index < 5 ? <Match key={index} match={match} /> : <Box key={index}></Box>
                            ))
                        :
                            <>
                                <h3>{texts[obj.Lang].MATCHES_Ongoing}</h3>
                                {
                                    ongoingMatches.length > 0 ?
                                    ongoingMatches.map((match, index) => (
                                            <Match key={index} match={match} />
                                        ))
                                    :
                                        <>0 {texts[obj.Lang].MATCHES_Ongoing}</>
                                }
            
                                <h3>{texts[obj.Lang].MATCHES_Upcoming}</h3>
                                {
                                    upcomingMatches.length > 0 ?
                                        upcomingMatches.map((match, index) => (
                                            <Match key={index} match={match} />
                                        ))
                                    :
                                        <>0 {texts[obj.Lang].MATCHES_Upcoming}</>
                                }
            
                                <h3>{texts[obj.Lang].MATCHES_Ended}</h3>
                                {
                                    endedMatches.length > 0 ?
                                    endedMatches.slice(0, 10).map((match, index) => (
                                            <Match key={index} match={match} />
                                        ))
                                    :
                                        <>0 {texts[obj.Lang].MATCHES_Ended}</>
                                }
                            </>
            }
            </Box>
        </>
    );
}

export default MatchList;
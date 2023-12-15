import React, { useContext, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LadderPlayers from "../../components/ladder/ladderPlayers";
import { texts } from "../../utils/translate";
import Context from "../../context";
import LadderTeams from "../../components/ladder/ladderTeams";
import { auth } from "../../utils/firebase";

const Ladder = () => {
    const obj = useContext(Context);
    const navigate = useNavigate();
    document.title = texts[obj.Lang].TITLE_LADDER;

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login');
        }
    }, [auth.currentUser]);

    return (
        <>
            <Box sx={{display: 'flex', marginBottom: 2}}>
                <Link to="/ladder/players"><Button variant="outlined" sx={{margin: '0px 5px'}}>{texts[obj.Lang].LADDER_BUTTON_players}</Button></Link>
                <Link to="/ladder/teams"><Button variant="outlined" sx={{margin: '0px 5px'}}>{texts[obj.Lang].LADDER_BUTTON_teams}</Button></Link>
            </Box>
            <Routes>
                <Route path="/" element={<h1>Ladder</h1>} />
                <Route path="/players" element={<LadderPlayers />} />
                <Route path="/teams" element={<LadderTeams />} />
            </Routes>
        </>
    );
};

export default Ladder;
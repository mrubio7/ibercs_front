import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import LadderPlayers from "../../components/ladder/ladderPlayers";
import { texts } from "../../utils/translate";
import Context from "../../context";

const Ladder = () => {
    const obj = useContext(Context);

    return (
        <>
            <Box sx={{display: 'flex', marginBottom: 2}}>
                <Link to="/ladder/players"><Button variant="outlined" sx={{margin: '0px 5px'}}>{texts[obj.Lang].LADDER_BUTTON_players}</Button></Link>
                <Link to="/ladder/teams"><Button variant="outlined" sx={{margin: '0px 5px'}}>{texts[obj.Lang].LADDER_BUTTON_teams}</Button></Link>
            </Box>
            <Routes>
                <Route path="/" element={<h1>Ladder</h1>} />
                <Route path="/players" element={<LadderPlayers />} />
                
            </Routes>
        </>
    );
};

export default Ladder;
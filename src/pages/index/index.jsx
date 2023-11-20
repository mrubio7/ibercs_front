import React, {useContext} from "react";
import { Box } from "@mui/material";
import { texts } from "../../utils/translate";
import Context from "../../context";
import Match from "../../components/match";
import MatchList from "../../components/match-list";
import ThreadList from "../../components/thread-list";

const styles = {
    divider: {
        border: "1px solid red",
        display: "flex",
        justifyContent: "space-between",
    },
    forum: {
        fontSize: "1rem",
        display: "flex",
        flexDirection: "column",
        width: "75%",
        marginTop: "0px 5px"
    },
    addons: {

        fontSize: "1rem",
        display: "flex",
        width: "25%",
        margin: "0px 5px"
    }
}

const Index = () => {
    const obj = useContext(Context);

    return (
        <Box>
            <MatchList />
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <section style={styles.forum}>
                    <h3>{texts[obj.Lang].FORUM_Title}</h3>
                    <ThreadList />
                </section>
                <section style={styles.addons}>
                    <h3>{texts[obj.Lang].ADDONS_Title}</h3>
                </section>
            </Box>
        </Box>
    );
}

export default Index;
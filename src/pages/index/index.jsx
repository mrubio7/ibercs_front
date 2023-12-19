import React, {useContext} from "react";
import { Box } from "@mui/material";
import { texts } from "../../utils/translate";
import Context from "../../context";
import Match from "../../components/match";
import MatchList from "../../components/match-list";
import ThreadList_Latest from "../../components/thread-list/threadList_Latest";
import TvList from "../../components/tv/tvList";

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
        flexDirection: "column",
        width: "25%",
        margin: "0px 5px"
    }
}

const Index = () => {
    const obj = useContext(Context);

    return (
        <Box>
            <MatchList isIndex={true} />
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                {/* <section style={styles.forum}>
                    <h3>{texts[obj.Lang].FORUM_Title}</h3>
                    <ThreadList_Latest />
                </section> */}
                <section style={styles.addons}>
                    <h3>{texts[obj.Lang].ADDONS_Title}</h3>
                    <TvList />
                </section>
            </Box>
        </Box>
    );
}

export default Index;
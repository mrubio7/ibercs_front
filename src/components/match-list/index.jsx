import { Box } from '@mui/material';
import Match from "../match";

const MatchList = () => {
    const matches = [
        {
            teamImageA: "https://pbs.twimg.com/profile_images/1348531337259601921/PolahjSr_400x400.jpg",
            teamImageB: "https://img-cdn.hltv.org/teamlogo/9vOlYp2U_z0vXPb9aLK-4r.png?invert=true&ixlib=java-2.1.0&sat=-100&w=100&s=2d03495bd133b22f6944c1c11e0531cd",
            teamNameA: "X6tence",
            teamNameB: "sAw",
            map: ["de_nuke", "de_mirage", "de_anubis"]
        },
    ];

    return (
        <Box sx={{marginBottom: 1, display: 'flex'}}>
            {matches.map((match, index) => (
                <Match
                    key={index}
                    teamImageA={match.teamImageA}
                    teamImageB={match.teamImageB}
                    teamNameA={match.teamNameA}
                    teamNameB={match.teamNameB}
                    map={match.map}
                />
            ))}
        </Box>
    );
}

export default MatchList;
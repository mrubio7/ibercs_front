import { useEffect, useState } from "react";
import Api from "../../api";
import Tv from "./tv";


const TvList = () => {
    const [players, setPlayers] = useState([]);
  
    useEffect(() => {
      const getPlayers = async () => {
        const players = await Api.Players.getPlayersOrderedByElo();
        setPlayers(players.data.result);
      }
  
      getPlayers();
    }, []);

    

    return (
        <div>
            <div>
                {players.map((player, index) => {
                    if (player.tv === "") return null;
                    return (
                        <Tv key={index} tv={player.tv} nickname={player.faceit_nickname} />
                    )
                })}
            </div>
        </div>
    )
}

export default TvList;
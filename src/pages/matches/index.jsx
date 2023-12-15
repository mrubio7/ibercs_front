import { useContext } from "react";
import MatchList from "../../components/match-list";
import Context from "../../context";
import { texts } from "../../utils/translate";

const Matches = () => {
    const obj = useContext(Context);
    document.title = texts[obj.Lang].TITLE_MATCHES;

    return (
        <>
            <MatchList isIndex={false}/>
        </>
    );
}

export default Matches;
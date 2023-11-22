import React, { useContext } from "react";
import { Select, MenuItem } from "@mui/material";
import Context from "../../context";

const SwitchLang = ({lang, setLang}) => {
    const obj = useContext(Context);

    const ChangeLang = (data) => {
        setLang(data)
    };

    return (
        <section style={{}}>
            <Select
                sx={{}}
                labelId="lang"
                id="change-lang"
                value={obj.Lang}
                onChange={(e) => ChangeLang(e.target.value)}
            >
                { obj.Lang === "ES" ? <MenuItem value={"ES"} selected>Español</MenuItem> : <MenuItem value={"ES"}>Español</MenuItem> }
                { obj.Lang === "PT" ? <MenuItem value={"PT"} selected>Português</MenuItem> : <MenuItem value={"PT"}>Português</MenuItem> }
            </Select>
        </section>
    );
};

export default SwitchLang;
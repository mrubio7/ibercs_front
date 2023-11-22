import React from "react";
import { useContext, useEffect } from "react";
import Context from "../../context";
import { Button, useTheme } from "@mui/material";

const SwitchTheme = () => {
    const [t, setT] = React.useState("light");
    const obj = useContext(Context);

    useEffect(() => {
        if (obj.Theme === "dark") {
            
        }
    }, [obj.Theme, t]);

    return (
        <div>
            {
                (obj.Theme === "light") ? 
                    <Button onClick={() => setT("dark")}>Dark</Button>
                :
                    <Button onClick={() => setT("light")}>Light</Button>
            }
        </div>
    );
}

export default SwitchTheme;
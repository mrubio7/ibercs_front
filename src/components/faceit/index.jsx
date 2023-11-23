import { Button } from "@mui/material";
import Api from "../../api";
import { useEffect } from "react";

const Faceit = ({player}) => {
    
    useEffect(() => {

    }, [player]);

    return (
        <div>
            Faceit
                <a href="https://ibercs.onrender.com/api/v1/faceit/login?guid=8e06f536-cc86-4922-b475-f31021954198">
                    <Button variant="contained">
                        Go
                    </Button>
                </a>
        </div>
    )
}

export default Faceit;
import { Button } from "@mui/material";
import Api from "../../api";


const Faceit = () => {
    
    const handleFaceitLogin = async () => {
        await Api.Faceit.login();
    }

    return (
        <div>
            Faceit
            <Button variant="contained">
                <a href="https://ibercs.onrender.com/api/v1/faceit/login">
                    Go
                </a>
            </Button>
        </div>
    )
}

export default Faceit;
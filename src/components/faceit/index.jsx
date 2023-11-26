import { Box, Button } from "@mui/material";
import Context from "../../context";
import { useContext, useEffect } from "react";
import { texts } from "../../utils/translate";

const Faceit = ({player, guid}) => {
    const obj = useContext(Context);

	if (player?.guid != "") { 
		return (
			<>
				<Box sx={{display:'flex'}}>
					<Button variant="contained" disabled>
						{texts[obj.Lang].FACEIT_Connected}
					</Button>
				</Box>
			</>
		)
	}

    return (
        <Box sx={{display:'flex'}}>
			<a href={`https://ibercs.onrender.com/api/v1/faceit/login?guid=${guid}`}>
				<Button sx={{}} variant="contained">
					{texts[obj.Lang].FACEIT_Connect}
                </Button>
			</a>
        </Box>
    )
}

export default Faceit;
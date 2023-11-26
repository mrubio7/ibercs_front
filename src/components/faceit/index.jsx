import { Box, Button } from "@mui/material";
import Context from "../../context";
import { useContext, useEffect } from "react";
import { texts } from "../../utils/translate";

const Faceit = ({player}) => {
    const obj = useContext(Context);

	if (player?.guid != null) { 
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
			<a href="https://ibercs.onrender.com/api/v1/faceit/login?guid=8e06f536-cc86-4922-b475-f31021954198">
				<Button sx={{}} variant="contained">
					{texts[obj.Lang].FACEIT_Connect}
                </Button>
			</a>
        </Box>
    )
}

export default Faceit;
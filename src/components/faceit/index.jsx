import { Box, Button } from "@mui/material";
import Api from "../../api";
import { useEffect } from "react";

const Faceit = ({player}) => {
    
    useEffect(() => {

    }, [player]);

	if (player.nickname == null) { 
		return (
			<Box sx={{display:'flex'}}>
				<Button sx={{backgroundColor: '#ff5722'}} variant="contained" disabled>
					Conectado con Faceit
				</Button>
			</Box>
		
		)
	}

    return (
        <Box sx={{display:'flex'}}>
			<a href="https://ibercs.onrender.com/api/v1/faceit/login?guid=8e06f536-cc86-4922-b475-f31021954198">
				<Button sx={{border: '1px solid #ff5722', backgroundColor:'#202225', width: '300px', height: '70px'}} variant="contained">
					Conectar con&nbsp;&nbsp; <img src="https://cdn-frontend.faceit-cdn.net/developer-portal/static/media/RGB-FACEIT-Logo-Bright.6cabd457.png" width={100}/>
				</Button>
			</a>
        </Box>
    )
}

export default Faceit;
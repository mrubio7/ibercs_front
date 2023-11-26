import { useContext, useEffect, useState } from "react";
import Context from "../../context";
import { texts } from "../../utils/translate";
import { Box, TextField } from "@mui/material";
import ImageUploader from "../../components/image-uploader";
import Api from "../../api";
import { auth } from "../../utils/firebase";
import Faceit from "../../components/faceit";

const Profile = () => {
    const obj = useContext(Context);
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
	const [player, setPlayer] = useState(null);

    useEffect(() => {
        const getImage = async () => {
          if (!auth.currentUser?.email) return;
          const data = await Api.User.getImageByEmail(auth.currentUser?.email);
          setImage(data.data.success);
        }
        const getUser = async () => {
            if (!auth.currentUser?.email) return;
            const data = await Api.User.getUserByEmail(auth.currentUser?.email);
            setUsername(data.data.success.username);
            setEmail(data.data.success.email);
			setPlayer(data.data.success.Player);
        }

        getUser();
        getImage();
    }, []);

    useEffect(() => {
        
    }, [image, username, email]);

    return (
        <div>
            <h3>{texts[obj.Lang].NAVBAR_USERMENU_Profile}</h3>
            <Box sx={{display: 'flex'}}>
                <ImageUploader setImageBytes={setImage} src={`data:image/jpeg;base64,${image}`}/>
                <Box  sx={{width: '100%', marginLeft: 2}}>
                    <TextField sx={{marginBottom: 2}} size="small" fullWidth label="Email" disabled variant="outlined" value={email} />
                    <TextField fullWidth size="small" label="Nickname" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Box>
            </Box>
            <Box>
                <Faceit player={player} guid={player.guid} />
            </Box>
        </div>
    )
}

export default Profile;

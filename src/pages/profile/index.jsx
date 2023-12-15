import { useContext, useEffect, useState } from "react";
import Context from "../../context";
import { texts } from "../../utils/translate";
import { Box, Button, TextField } from "@mui/material";
import ImageUploader from "../../components/image-uploader";
import Api from "../../api";
import { auth } from "../../utils/firebase";
import Faceit from "../../components/faceit";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';


const Profile = () => {
    const obj = useContext(Context);
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
	const [player, setPlayer] = useState(null);
    const [guid, setGuid] = useState("");
    const [invitations, setInvitations] = useState([]);
    document.title = texts[obj.Lang].TITLE_PROFILE;

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
            setGuid(data.data.success.guid);
            setInvitations(data.data.success.invitations);
        }

        getUser();
        getImage();
    }, []);

    useEffect(() => {
    }, [image, username, email]);

    return (
        <Box sx={{display:'flex', flexDirection: 'column'}}>
            <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                <Box>
                    <h3>{texts[obj.Lang].NAVBAR_USERMENU_Profile}</h3>
                </Box>
                <Box>
                    <Faceit player={player} guid={guid} />
                </Box>
            </Box>
            <Box sx={{width: '100%', margin: '10px 0px', display: 'flex'}}>
                <ImageUploader setImageBytes={setImage} src={`data:image/jpeg;base64,${image}`}/>
                <Box  sx={{width: '100%', marginLeft: 2}}>
                    <TextField sx={{marginBottom: 2}} size="small" fullWidth label="Email" disabled variant="outlined" value={email} />
                    <TextField fullWidth size="small" label="Nickname" variant="outlined" value={username} disabled onChange={(e) => setUsername(e.target.value)} />
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button sx={{marginTop: 2, marginLeft: 2}} variant="contained">{texts[obj.Lang].SAVE}</Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{overflow: 'auto', maxHeight: 520, marginTop: 4}}>
                <h3>{texts[obj.Lang].PROFILE_Invitations}</h3>
                <List>
                    {invitations?.map((invitation, i) => (
                        <ListItem key={invitation.ID}>
                            <Box sx={{width: '4%'}}>{i + 1}</Box>
                            <TextField size="small" fullWidth readOnly value={invitation.Code} />
                            <IconButton onClick={() => navigator.clipboard.writeText(invitation.Code)}>
                                <FileCopyIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    )
}

export default Profile;

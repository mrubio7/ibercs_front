import React, { useContext, useState, useEffect } from "react";
import { TextField, Avatar, Paper, Box, Button, IconButton, Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { texts } from "../../utils/translate";
import Context from "../../context";
import ImageUploader from "../../components/image-uploader";
import Api from "../../api";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const styles = {
    boxContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    box: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: 350,
        height: 550,
        marginTop: 20,
        borderRadius: 10,
        padding: 20,
    },
};

const Register = () => {
    const obj = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [image, setImage] = useState("");
    const [invitation, setInvitation] = useState("");
    const navigate = useNavigate();

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessageInfo, setSnackBarMessageInfo] = useState(undefined);

    document.title = texts[obj.Lang].TITLE_REGISTER;

    const handleRegister = async () => {
        const isInvitationValid = await Api.Account.isInvitationValid(invitation);
        if (!isInvitationValid.data.result) {
            setSnackBarMessageInfo({message: texts[obj.Lang].REGISTER_InvitationNotValid, severity: "error"});
            setSnackBarOpen(true);
            return;
        }

        const isFreeUser = await Api.Account.isFreeUsername(displayName);
        console.log(isFreeUser);
        if (!isFreeUser.data.result) {
            setSnackBarMessageInfo({message: texts[obj.Lang].REGISTER_UserAlreadyExists, severity: "error"});
            setSnackBarOpen(true);
            return;
        }

        const register = await Api.Account.new(email, displayName, password, invitation, image);
        if (register.data.result == "User created") {
            setSnackBarMessageInfo({message: texts[obj.Lang].REGISTER_Success, severity: "success"});
            setSnackBarOpen(true);
            navigate("/login");
        } else {
            setSnackBarMessageInfo({message: texts[obj.Lang].REGISTER_Error, severity: "error"});
            setSnackBarOpen(true);
        }
    }

    const handleExited = () => {
        setSnackBarMessageInfo(undefined);
      };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };

    return (
        <div style={styles.boxContainer}>

            <Snackbar
                key={snackBarMessageInfo ? snackBarMessageInfo.key : undefined}
                open={snackBarOpen}
                autoHideDuration={5000}
                onClose={handleClose}
                TransitionProps={{ onExited: handleExited }}
                message={snackBarMessageInfo ? snackBarMessageInfo.message : undefined}
            />

            <Paper elevation={3} style={styles.box}>
                <Box sx={{width: '100% !important', display: 'flex', justifyContent: 'space-between'}}>
                    <Link to="/login" >
                        <IconButton variant="contained" ><ChevronLeftIcon/></IconButton>
                    </Link>
                </Box>
                
                <Box>
                    <ImageUploader setImageBytes={setImage} />
                    <TextField required sx={{width: '100%', marginBottom: 2}} label="Nickname" variant="outlined" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                    <TextField sx={{width: '100%', marginBottom: 2}} label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField sx={{width: '100%', marginBottom: 2}} label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField required sx={{width: '100%'}} label="Invitation" variant="outlined" value={invitation} onChange={(e) => setInvitation(e.target.value)} />
                </Box>
                <Box sx={{marginTop: 2, width: '100%'}}>
                    <Button size="large" sx={{width: '100%'}} variant="contained" onClick={ handleRegister } disabled={!displayName || !invitation}>
                        {texts[obj.Lang].REGISTER_Button}
                    </Button>
                </Box>
            </Paper >
        </div>
    )
}

export default Register
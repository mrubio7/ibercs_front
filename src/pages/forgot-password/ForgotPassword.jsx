
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../context";
import { texts } from "../../utils/translate";
import { Firebase_ResetPassword, auth } from "../../utils/firebase";
import { Avatar, Box, Button, Paper, Snackbar, TextField } from "@mui/material";

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
        width: 300,
        height: 250,
        marginTop: 20,
        borderRadius: 10,
        padding: 20,
    },
};

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const obj = useContext(Context);
    const navigate = useNavigate();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessageInfo, setSnackBarMessageInfo] = useState(undefined);

    document.title = texts[obj.Lang].TITLE_FORGOTPASSWORD;

    const handleForgotPassword = async () => {
        try {
            await Firebase_ResetPassword(email);
            setSnackBarMessageInfo("Password reset email sent");
            setSnackBarOpen(true);
        } catch (error) {
            setSnackBarMessageInfo("Error sending password reset email");
            setSnackBarOpen(true);
        }
    };

    const handleExited = () => {
        setSnackBarMessageInfo(undefined);
      };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };

    return(
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
                <Avatar alt="logo" src="/images/ibercs.png" sx={{ width: 120, height: 120, marginTop: -2 }} />
                <Box sx={{width: '100%'}}>
                    <TextField sx={{width: '100%', marginBottom: 2}} label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Box>
                <Box sx={{marginTop: 2, width: '100%'}}>
                    <Button sx={{width: '100%'}} variant="contained" onClick={handleForgotPassword}>{texts[obj.Lang].SEND}</Button>
                </Box>
            </Paper>
        </div>
    )
                

}

export default ForgotPassword;
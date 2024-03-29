import { TextField, Avatar, Paper, Box, Button, Snackbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useFirebaseLogin } from "../../hooks/useFirebaseLogin";
import { useFirebaseLogout } from "../../hooks/useFirebaseLogout";
import Context from "../../context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { texts } from "../../utils/translate";

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
        height: 370,
        marginTop: 20,
        borderRadius: 10,
        padding: 20,
    },
};

const Login = () => {
    const obj = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useFirebaseLogin();
    const logout = useFirebaseLogout();
    const navigate = useNavigate();

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessageInfo, setSnackBarMessageInfo] = useState(undefined);

    document.title = texts[obj.Lang].TITLE_LOGIN;
    
    const handleLogin = async () => {
        const auth = await login(email, password);
        console.log(auth);
    
        if (auth != null) {
            setSnackBarMessageInfo({message: texts[obj.Lang].LOGGED, severity: "success"});
            setSnackBarOpen(true);
            navigate("/");
        } else {
            setSnackBarMessageInfo({message: texts[obj.Lang].NOTLOGGED, severity: "error"});
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
                <Avatar alt="logo" src="/images/ibercs.png" sx={{ width: 120, height: 120, marginTop: -2 }} />
                <Box>
                    <TextField sx={{width: '100%', marginBottom: 2}} label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField sx={{width: '100%'}} label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box sx={{marginTop: 2, width: '100%'}}>
                    <Button size="large" sx={{width: '100%'}} variant="contained" onClick={ handleLogin }>
                        {texts[obj.Lang].LOGIN_Button}
                    </Button>
                    <Link to="/register">
                        <Button sx={{width: '100%', marginTop: 2}} variant="outlined">
                            {texts[obj.Lang].REGISTER_Button}
                        </Button>
                    </Link>
                    <Link to="/forgot-password" style={{ textDecoration: 'none', textAlign: 'center', display: 'block', marginTop: '10px' }}>
                        {texts[obj.Lang].LOGIN_ForgotPassword}
                    </Link>
                </Box>
            </Paper >
        </div>
    );
}

export default Login;
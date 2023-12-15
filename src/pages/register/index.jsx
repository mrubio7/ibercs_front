import React, { useContext, useState, useEffect } from "react";
import { TextField, Avatar, Paper, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { texts } from "../../utils/translate";
import Context from "../../context";
import ImageUploader from "../../components/image-uploader";
import Api from "../../api";

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
    document.title = texts[obj.Lang].TITLE_REGISTER;

    const handleRegister = async () => {
        const register = await Api.Account.new(email, displayName, password, invitation, image);
        navigate("/login");
    }

    return (
        <div style={styles.boxContainer}>
            <Paper elevation={3} style={styles.box}>
                <Box sx={{width: '100% !important', display: 'flex', justifyContent: 'space-between'}}>
                    <Link to="/login" >
                        <Button variant="contained">{texts[obj.Lang].RETURN}</Button>
                    </Link>
                    <Avatar alt="logo" src="/images/ibercs.png" sx={{ width: 60, height: 60, marginTop: -2 }} />
                </Box>
                
                <Box >
                    <ImageUploader setImageBytes={setImage} />
                    <TextField sx={{width: '100%', marginBottom: 2}} label="Nickname" variant="outlined" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                    <TextField sx={{width: '100%', marginBottom: 2}} label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField sx={{width: '100%', marginBottom: 2}} label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField sx={{width: '100%'}} label="Invitation" variant="outlined" value={invitation} onChange={(e) => setInvitation(e.target.value)} />
                </Box>
                <Box sx={{marginTop: 2, width: '100%'}}>
                    <Button size="large" sx={{width: '100%'}} variant="contained" onClick={ handleRegister }>
                        {texts[obj.Lang].REGISTER_Button}
                    </Button>
                </Box>
            </Paper >
        </div>
    )
}

export default Register
import { useContext } from "react"
import Context from "../../context"
import { Avatar, Box, Card, CardActions, CardHeader, IconButton, Typography } from "@mui/material";
import { format } from 'date-fns';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import WarningIcon from '@mui/icons-material/Warning';

const Post = ({ post }) => {
    const obj = useContext(Context);

    return (
        <Card sx={post.Post_Number == 1 ? {backgroundImage: 'none !important', boxShadow: 'none', borderRadius: 2, margin: '20px 0px 50px 0px' } : { borderRadius: 2, margin: '30px 0px'}}>
            <CardHeader
                avatar={
                    <Avatar src={`data:image/jpeg;base64,${post?.User?.image}`} style={{width: 32, height: 32, borderRadius: '50%'}} />
                }
                title={post?.User?.username}
                subheader={post?.CreatedAt ? format(new Date(post.CreatedAt), 'HH:mm dd-MM-yyyy') : ''}
                action={
                    <Box sx={{color: 'primary.main', fontWeight: '400', fontSize: '0.875rem !important', marginRight: 2, textAlign: 'right'}}>
                        <Typography>{post?.User?.Player?.Nickname}</Typography>
                        <Typography>{post?.User?.Player?.faceit_elo}</Typography>
                    </Box>
                }
            />
            <Box sx={{padding: '8px 16px'}}>
                {obj.Lang == "ES" ? (
                    <div dangerouslySetInnerHTML={{ __html: post?.Desc_ES }} />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: post?.Desc_PT }} />
                )}
            </Box>
            {/* <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton >
                    <PlusOneIcon />
                </IconButton>
                <IconButton >
                    <WarningIcon />
                </IconButton>
            </CardActions> */}
        </Card>
    )
}

export default Post
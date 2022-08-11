import React from 'react'
import herokuApi from '../../Service';
import { NotifyBtn, NotifyIcon, NotifyIconAfter } from './Styled'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link } from "react-router-dom";

const NotifyButton = () => {

    const [produtosSemvideo, setProdutosSemVideo] = React.useState([]);
    const [isProdutoSemVideo, setIsProdutoSemVideo] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [timer, setTimer] = React.useState(0);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getProdutosSemVideo = async () => {
        const { data } = await herokuApi.get("produtos/verificar/video");
        setProdutosSemVideo(data)
        if (produtosSemvideo === true) {
            setIsProdutoSemVideo(true);
        } else{
            setIsProdutoSemVideo(false);
        }
    }

    const handleVerify = () =>{
        setTimeout(() => {
            setTimer((timer + 1));
        }, 100);
    }

    React.useMemo(() => {
        handleVerify()
        getProdutosSemVideo();
    }, [timer]);


    return (
        <div>
            <NotifyBtn
                onClick={handleClick}
            >
                {isProdutoSemVideo ? <NotifyIconAfter /> : <NotifyIcon />}
            </NotifyBtn>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {isProdutoSemVideo === true ?
                    <div>
                        <h3 style={{ marginLeft: '25px' }}>Notificações</h3>
                        <MenuItem onClick={handleClose}>
                                <Link style={{ textDecoration:"none", color: "inherit"}} to='/'>Existem produtos sem vídeo</Link>
                        </MenuItem>
                    </div>
                    :
                    <MenuItem onClick={handleClose} disabled={true}>Nenhuma notificação</MenuItem>
                }
            </Menu>
        </div>
    )
}

export default NotifyButton;
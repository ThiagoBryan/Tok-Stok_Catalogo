import { IconButton } from "@mui/material";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import NotificationsIcon from '@mui/icons-material/Notifications';
import styled from "styled-components";

export const NotifyBtn = styled(IconButton)`
    &&{
        background: #0A775A;
    }
    &&:hover{
        background: #0A77;
    }
`;

export const NotifyIcon = styled(NotificationsIcon)`
    &&{
        color: #FFFF;
    }
`;

export const NotifyIconAfter = styled(NotificationImportantIcon)`
    &&{
        animation: 1s linear infinite alternate;
        animation-name: notify;
        color: yellow;
    }

    @keyframes notify{
        from {
            width: 25px;
            height: 25px;
            color: #FFA81E;
        }
        to {
            width: 25px;
            height: 25px;
            color: yellow;
        }
    }

`;





import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { IframeMessageProxy } from 'iframe-message-proxy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Typography } from '@mui/material';

function Home() {
    const navigate = useNavigate();
    const handleLoading = () => {
        console.error('handleLoading');
        IframeMessageProxy.sendMessage({
            action: 'startLoading',
        });
        setTimeout(() => {
            IframeMessageProxy.sendMessage({ action: 'stopLoading' });
        }, 1000);
    }


    return <div>
        <Stack direction="row" spacing={2} alignItems={'flex-start'}>
            <IconButton aria-label="ticket" color="secondary" onClick={() => navigate("/current-ticket")}>
                <Tooltip title="Ticket Atual" placement="top">
                    <ConfirmationNumberIcon fontSize='large' />
                </Tooltip>
            </IconButton>
            <Tooltip title="Envio de Comandos" placement="top">
                <IconButton aria-label="SendCommand" title="SendCommand" color="success" onClick={() => navigate("/send-command")}>
                    <SendTimeExtensionIcon fontSize='large' />
                </IconButton>
            </Tooltip>
        </Stack>
        <Stack direction="row" spacing={2} alignItems={'flex-start'}>
            <Tooltip title="Toast">
                <IconButton aria-label="Toast" sx={{ color: pink[500] }} title='Toast' onClick={() => navigate("/toast")}>
                    <LocalFireDepartmentIcon fontSize='large' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Loading">
                <IconButton aria-label="Loading" title='Loading' color="primary" onClick={handleLoading} >
                    <RefreshIcon fontSize='large' />
                </IconButton>
            </Tooltip>
        </Stack>
    </div>
}

export default Home;
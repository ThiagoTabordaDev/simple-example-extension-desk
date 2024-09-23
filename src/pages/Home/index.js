import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SendTimeExtensionSharpIcon from '@mui/icons-material/SendTimeExtensionSharp';
import { IframeMessageProxy } from 'iframe-message-proxy';
import RefreshIcon from '@mui/icons-material/Refresh';
import AirplaneTickeIcon from '@mui/icons-material/AirplaneTicket';
import SendIcon from '@mui/icons-material/Send';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Divider, Tooltip, Typography } from '@mui/material';

function Home() {
    const navigate = useNavigate();
    const handleLoading = () => {
        IframeMessageProxy.sendMessage({
            action: 'startLoading',
        });
        setTimeout(() => {
            IframeMessageProxy.sendMessage({ action: 'stopLoading' });
        }, 1000);
    }
    const openModalClosedTicket = () => {
        IframeMessageProxy.sendMessage({
            action: 'ticketClosure',
        });
    }


    return <>
        <Typography variant='h5'>Exemplo para extensões no Blip Desk</Typography>
        <Divider orientation="horizontal" flexItem />
        <div className='body'>
            <div>
                <Stack direction="row" spacing={{ xs: 1, sm: 2 }} useFlexGap flexWrap="wrap" divider={<Divider orientation="vertical" flexItem />}>
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
                    <Tooltip title="Encerramento de Ticket">
                        <IconButton aria-label="Encerramento de Ticket" title='Encerramento de Ticket' color="primary" onClick={openModalClosedTicket} >
                            <AirplaneTickeIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Enviar mensagem para o contato">
                        <IconButton aria-label="Enviar Mensagem" title='Enviar Menssagem' color="primary" onClick={() => navigate("/send-text-message")} >
                            <SendIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Enviar mensagem quick replay para o contato">
                        <IconButton aria-label="Enviar Mensagem" title='Enviar Menssagem' color="primary" onClick={() => navigate("/send-custom-content-message")} >
                            <SendTimeExtensionSharpIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </div>
        </div>
    </>
}

export default Home;
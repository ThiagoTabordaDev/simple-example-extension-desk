import React, { useState } from 'react';
import { Divider, IconButton, TextField, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { IframeMessageProxy } from 'iframe-message-proxy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';

function SendTextMessage() {
    const command =  "teste"

    const [result, setResult] = useState('');
    const handleIframeProxy =  () => {
        try {
            const { response } = IframeMessageProxy.sendMessage({
                action: 'sendTextMessage',
                content: { message: content }
            });
            const item = response;
            setResult(item);
        } catch (error) {
            setResult('');
        }
    }

    const navigate = useNavigate();
    const [content, setContent] = useState(command);
    return <>
        <Typography variant="h5" mb={1}>Envio de Mensagem</Typography>
        <Divider orientation="horizontal" flexItem />
        <div className='body'>
            <TextField
                id="standard-multiline-static"
                label="Mensagem"
                multiline
                style={{ width: '100%' }}
                fullWidth="true"
                rows={8}
                defaultValue={content}
                variant="standard"
                onChange={(e) => setContent(e.target.value)}
            />
            {result &&
                <div className='w-100'>
                    <IconButton aria-label="Limpar" color='primary' title='Limpar' fontsize="small" onClick={() => { setResult('') }}>
                        <DeleteForeverIcon />
                        <Typography variant='button'> Limpar </Typography>
                    </IconButton>
                    <TextField
                        id="standard-multiline-static"
                        label="Response"
                        multiline
                        style={{ width: '100%' }}
                        fullWidth="true"
                        disabled
                        rows={8}
                        defaultValue={result}
                        variant="standard"
                        onChange={(e) => setResult(e.target.value)}
                    />
                </div>}
        </div>
        <div className='footer'>
            <Divider orientation="horizontal" flexItem />
            <IconButton aria-label="Home" color='Primary' title='Home' fontsize="small" onClick={() => navigate("/")}>
                <HomeIcon />
                <Typography variant='button'> Voltar </Typography>
            </IconButton>
            <IconButton aria-label="Envio de Mensagem" title='Envio de Mensagem' color="success" onClick={handleIframeProxy} fontsize="small">
                <SendTimeExtensionIcon />
                <Typography variant='button'> Enviar menssagem </Typography>
            </IconButton>
        </div>
    </>;
}

export default SendTextMessage;
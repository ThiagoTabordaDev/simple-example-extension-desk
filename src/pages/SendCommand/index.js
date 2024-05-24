import React, { useState } from 'react';
import { Divider, IconButton, TextField, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { IframeMessageProxy } from 'iframe-message-proxy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';

function SendCommand() {
    const command =
    {
        "method": "get",
        "to": "postmaster@desk.msging.net",
        "uri": "/agents/owners",
        "id": "bf689cc6-8d25-4bc6-bbad-8333ab80c5c2",
        "metadata": {
            "server.shouldStore": "true"
        }
    }
    const [result, setResult] = useState('');
    const handleIframeProxy = async () => {
        try {
            const { response } = await IframeMessageProxy.sendMessage({
                action: 'sendCommand',
                content: { command: JSON.parse(content.replaceAll(',\n', ',')) }
            });
            const item = response;
            setResult(JSON.stringify(item).replaceAll(',', ',\n'));
        } catch (error) {
            setResult('');
        }
    }

    const navigate = useNavigate();
    const [content, setContent] = useState(JSON.stringify(command).replaceAll(',', ',\n'));
    return <>
        <Typography variant="h5" mb={1}>Envio de comando</Typography>
        <Divider orientation="horizontal" flexItem />
        <div className='body'>
            <TextField
                id="standard-multiline-static"
                label="Comando"
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
            <IconButton aria-label="Comando" title='Comando' color="success" onClick={handleIframeProxy} fontsize="small">
                <SendTimeExtensionIcon />
                <Typography variant='button'> Enviar Commando </Typography>
            </IconButton>
        </div>
    </>;
}

export default SendCommand;
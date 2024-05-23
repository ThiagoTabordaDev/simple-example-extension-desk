import React, { useState } from 'react';
import { Divider, IconButton, TextField } from '@mui/material';
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
        console.error('handleIframeProxy');
        try {
            const { response } = await IframeMessageProxy.sendMessage({
                action: 'sendCommand',
                content: { command: command }
            });
            const item = response;
            setResult(JSON.stringify(item).replaceAll(',', ',\n'));
        } catch (error) {
            setResult('');
        } 
    }

    const navigate = useNavigate();
    const [content, setContent] = useState(JSON.stringify(command).replaceAll(',', ',\n'));
    return <div style={{ width: '80%' }}>
        <h3>SendCommand</h3>
        <TextField
            id="standard-multiline-static"
            label="Comando"
            multiline
            style={{ width: '100%' }}
            fullWidth="true"
            rows={10}
            defaultValue={content}
            variant="standard"
            onChange={(e) => setContent(e.target.value)}
        />
        {result &&
            <div>
                <IconButton aria-label="Limpar" color='Primary' title='Limpar' fontsize="small" onClick={()=>{setResult('')}}>
                    <DeleteForeverIcon /> Limpar
                </IconButton>
                <div>
                    {`Resposta: ${result}`}
                </div>
            </div>}
        <Divider />
        <div >
            <Divider />
            <IconButton aria-label="Home" color='Primary' title='Home' fontsize="small" onClick={() => navigate("/")}>
                <HomeIcon /> Voltar
            </IconButton>
            <IconButton aria-label="Comando" title='Comando' onClick={handleIframeProxy} fontsize="small">
                <SendTimeExtensionIcon />
                Enviar Commando
            </IconButton>
        </div>
    </div>;
}

export default SendCommand;
import React, { useState } from 'react';
import { Divider, IconButton, TextField, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { IframeMessageProxy } from 'iframe-message-proxy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';

function SendCustomContentMessage() {
    const command = {
        recipient_type: "individual",
        type: "interactive",
        interactive: {
          type: "button",
          header: {
            type: "video",
            text: "Promoção Take Blip",
            video: {
              link:
                "https://s3-sa-east-1.amazonaws.com/i.imgtake.takenet.com.br/vcpntwt3z6/vcpntwt3z6.mp4",
            },
          },
          body: {
            text: "Contato Inteligente no WhatsApp",
          },
          footer: {
            text: "Converse com seus clientes através do WhatsApp.",
          },
          action: {
            buttons: [
              {
                type: "reply",
                reply: {
                  id: "1",
                  title: "Botão 1",
                },
              },
              {
                type: "reply",
                reply: {
                  id: "2",
                  title: "Botão 2",
                },
              },
              {
                type: "reply",
                reply: {
                  id: "3",
                  title: "Botão 3",
                },
              },
            ],
          },
        },
      };

    const [result, setResult] = useState('');
    const handleIframeProxy =  () => {
        try {
            const { response } = IframeMessageProxy.sendMessage({
                action: 'sendCustomContentMessage',
                content: JSON.parse(content)
            });
            const item = response;
            setResult(item);
        } catch (error) {
            setResult('');
        }
    }

    const navigate = useNavigate();
    const [content, setContent] = useState(JSON.stringify(command));
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

export default SendCustomContentMessage;
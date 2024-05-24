import React, { useEffect, useState } from 'react';
import { IframeMessageProxy } from 'iframe-message-proxy';
import { Divider, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export interface CurrentTicketResponse {
  ownerIdentity: string;
  sequentialId: string;
  customerIdentity: string;
  agentIdentity: string
  messages: Message[];
}

interface Message {
  id: string;
  content: string;
  date: string;
}

function CurrentTicket() {
  const navigate = useNavigate();
  const [result, setResult] = useState<CurrentTicketResponse>({} as any);
  useEffect(() => {
    handleIframeProxy();
  }, []);

  const handleIframeProxy = async () => {
    try {
      const { response } = await IframeMessageProxy.sendMessage({
        action: 'currentTicket',
      });
      const { item } = response;
      setResult(item as CurrentTicketResponse);
    } catch (error) {
      setResult({} as CurrentTicketResponse);
    }
  }
  return (
    <>
      <Typography variant="h5" mb={1}>Ticket Atual</Typography>
      <Divider orientation="horizontal" flexItem />
      <div className='body'>
        {result.sequentialId ? (
          <div className='w-100 items-start'>
            <Typography className='alignLeft' variant='h6'>Ticket Selecionado</Typography>
            <Divider orientation="horizontal" flexItem />
            <Typography align="left" mt={1}>{`Id Sequencial: ${result.sequentialId}`}</Typography>
            <Typography align="left">{`Bot: ${result.ownerIdentity}`}</Typography>
            <Typography align="left" >{`Cliente: ${result.customerIdentity}`}</Typography>
            <Typography>{`Atendente: ${result.agentIdentity}`}</Typography>
            <Typography align="left" variant='h6' mt={3}>Mensagens</Typography>
            <Divider  orientation="horizontal" flexItem />
            {result.messages.map((message) => (
              <div key={message.id} className='items-start'>
                <Typography align="left">{`${message.content}`}</Typography>
              </div>
            ))}
          </div>
        ) : (
          <Typography variant='h6' mb={1}>Não há ticket selecionado...</Typography>
        )}
      </div>
      <div className='w-100'>
        <Divider  orientation="horizontal" flexItem />
        <IconButton aria-label="Home" title='Home' onClick={() => navigate("/")}>
          <HomeIcon />
          <Typography variant='button'> Voltar </Typography>
        </IconButton>
      </div>
    </>
  );
}

export default CurrentTicket;
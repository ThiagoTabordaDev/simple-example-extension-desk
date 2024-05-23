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
      setResult(item as CurrentTicketResponse );
    } catch (error) {
      setResult({} as CurrentTicketResponse);
    }
  }
  return (
    <div>
      {result.sequentialId ? (
        <div className='items-start'>
          <Typography variant='h5' mb={1}>Ticket Selecionado</Typography>
          <Divider />
          <Typography >{`Id Sequencial: ${result.sequentialId}`}</Typography>
          <Typography>{`Bot: ${result.ownerIdentity}`}</Typography>
          <Typography>{`Cliente: ${result.customerIdentity}`}</Typography>
          <Typography>{`Atendente: ${result.agentIdentity}`}</Typography>
          <Typography variant='h5' mb={1} mt={3}>Mensagens</Typography>
          <Divider color='primary'/>
          {result.messages.map((message) => (
            <div key={message.id} className='items-start'>
              <Typography>{`${message.content}`}</Typography>
            </div>
          ))}
        </div>
      ) : (
        <div>Não há ticket selecionado...</div>
      )}
      <Divider />
      <div>
        <IconButton aria-label="Home" title='Home' onClick={() => navigate("/")}>
          <HomeIcon />
          <Typography variant='button'> Voltar </Typography>
        </IconButton>
      </div>
    </div>
  );
}

export default CurrentTicket;
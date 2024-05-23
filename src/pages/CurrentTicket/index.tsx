import React, { useEffect, useState } from 'react';
import { IframeMessageProxy } from 'iframe-message-proxy';
import { Divider, IconButton } from '@mui/material';
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
  const styled = { display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }
  return (
    <div>
      {result.sequentialId ? (
        <div style={styled as React.CSSProperties}>
          <h3>Ticket Selecionado</h3>
          <Divider />
          <p>{`Id Sequencial: ${result.sequentialId}`}</p>
          <p>{`Bot: ${result.ownerIdentity}`}</p>
          <p>{`Cliente: ${result.customerIdentity}`}</p>
          <p>{`Atendente: ${result.agentIdentity}`}</p>
          <h4>Mensagens</h4>
          <Divider />
          {result.messages.map((message) => (
            <div key={message.id} style={styled as React.CSSProperties}>
              <p>{`${message.content}`}</p>
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
          Voltar
        </IconButton>
      </div>
    </div>
  );
}

export default CurrentTicket;
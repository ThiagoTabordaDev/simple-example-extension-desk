import React, { useEffect } from 'react';
import { IframeMessageProxy } from 'iframe-message-proxy';
import { Divider, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

function TicketClosure() {
  const navigate = useNavigate();
  useEffect(() => {
    handleIframeProxy();
  }, []);

  const handleIframeProxy = () => {
    try {
      IframeMessageProxy.sendMessage({
        action: 'ticketClosure',
      });
    } catch (error) {
      console.error('error', error)
    }
  }
  return (
    <>
      <Typography variant="h5" mb={1}>Ticket Atual</Typography>
      <Divider orientation="horizontal" flexItem />
      <div className='body'>
      </div>
      <div className='footer'>
        <Divider  orientation="horizontal" flexItem />
        <IconButton aria-label="Home" title='Home' onClick={() => navigate("/")}>
          <HomeIcon />
          <Typography variant='button'> Voltar </Typography>
        </IconButton>
      </div>
    </>
  );
}

export default TicketClosure;
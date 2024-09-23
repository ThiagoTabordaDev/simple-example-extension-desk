import React, { useEffect } from 'react';
import { IframeMessageProxy } from 'iframe-message-proxy';
import './App.css';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import Home from './pages/Home';
import SendCommand from './pages/SendCommand';
import Toast from './pages/Toast';
import Loading from './pages/Loading';
import CurrentTicket from './pages/CurrentTicket';
import ClosureTicket from './pages/TicketClosure';
import SendTextMessage from './pages/SendTextMessage';
import SendCustomContentMessage from './pages/SendCustomContentMessage';

function App() {
  useEffect(() => {
    IframeMessageProxy.listen();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <ReactRoutes>
            <Route path='/' element={<Home />} />
            <Route path='/current-ticket' element={<CurrentTicket />} />
            <Route path='/send-command' element={<SendCommand />} />
            <Route path='/toast' element={<Toast />} />
            <Route path='/loading' element={<Loading />} />
            <Route path='/closure-ticket' element={<ClosureTicket />} />
            <Route path='/send-text-message' element={<SendTextMessage />} />
            <Route path='/send-custom-content-message' element={<SendCustomContentMessage />} />
            <Route path='/' element={<ClosureTicket />} />
          </ReactRoutes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;

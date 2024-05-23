import React from 'react';
import { IframeMessageProxy } from 'iframe-message-proxy';
import { Divider, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
// import { Container } from './styles';

function Toast() {
    const [type, setType] = React.useState('success');
    const [icon, setIcon] = React.useState('like');
    const [message, setMessage] = React.useState('Olá Blip!');
    const showToast = () => IframeMessageProxy.sendMessage({ action: 'toast', content: { type: type, icon: icon, message: message, buttontext: 'ok', duration: 5, position: 'top-right' } });
    const navigate = useNavigate();
    return <div className='w-100'>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="type" color='success'>Tipo</InputLabel>
            <Select
                labelId="type"
                id="demo-select-small"
                value={type}
                label="Age"
                onChange={(e) => setType(e.target.value)}
            >
                <MenuItem value="success">Sucesso</MenuItem>
                <MenuItem value="warning">Alerta</MenuItem>
                <MenuItem value="system">Sistema</MenuItem>
                <MenuItem value="notification">Notificação</MenuItem>
                <MenuItem value="error">Error</MenuItem>
            </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="icon" color='success'>Icon</InputLabel>
            <Select
                labelId="icon"
                id="icon-select-small"
                value={icon}
                label="Age"
                onChange={(e) => setIcon(e.target.value)}
            >
                <MenuItem value="bell">Sino</MenuItem>
                <MenuItem value="info">Alerta</MenuItem>
                <MenuItem value="like">Gostei</MenuItem>
                <MenuItem value="deslike">Não Gostei</MenuItem>
            </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <TextField
                id="standard-error-helper-text"
                label="Mensagem"
                defaultValue={message}
                variant="standard"
                onChange={(e) => setMessage(e.target.value)}
            />
        </FormControl>
        <div>
            <Divider/>
            <IconButton aria-label="Toast" color='Primary' title='Toast' fontsize="small" onClick={() =>  navigate("/")}>
            <HomeIcon />
            <Typography variant='button'>Voltar</Typography>
            </IconButton>
            <IconButton aria-label="Toast" sx={{ color: pink[500] }} title='Toast' onClick={showToast} fontsize="small">
                <LocalFireDepartmentIcon />
                <Typography variant='button'> Enviar Toast </Typography>
            </IconButton>
        </div>
    </div>;
}

export default Toast;

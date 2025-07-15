import { useState } from 'react'
import mqtt from 'mqtt';
// Material UI
import { Container,Stack,TextField,Button,Divider,Typography,CircularProgress,Collapse,Alert,IconButton, Box } from '@mui/material';
import Results from './Client'
import './App.css'


function App() {

  const brokerPort = 8884;
  const topic = "sensor_data";

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [brokerAddress, setBrokerAddress] = useState('');
  const [password, setPassword] = useState('');

  const [result, setResult] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);

  const [client, setClient] = useState(null);

  const [pb, setPb] = useState(9)

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangeSurname = (e) => {
    setSurname(e.target.value)
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangeBrokerAddress = (e) => {
    setBrokerAddress(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onKeyDown = (e) => {
    if(e.key === 'Enter' && username && email && brokerAddress && password && name && surname) onSubmit();
  }

  const onSubmit = () => {
    
    setError(null);
    setIsLoading(true);

    const client = mqtt.connect(`wss://${brokerAddress}.s1.eu.hivemq.cloud:${brokerPort}/mqtt`, {username: username, password: password});

  setClient(client);

  const errorHandler = (error) => {
    console.error('MQTT Connection Error:', error);
    setIsLoading(false);
    setError('MQTT Connection Error');
    setPb(17);
    console.log("nooo");
    client.removeListener('error', errorHandler); // Hata alındıktan sonra olay dinleyicisi kaldırılır
  };

  client.on('connect', () => {

    console.log('Connected to MQTT broker');
    client.subscribe(topic);
    setIsLoading(false);
    console.log("yesss");
    setResult(true);

    client.publish("email_data", email);
  });

  client.on('error', errorHandler);
   
  }

  return (
    <div id="root" style={{height: '100vh', maxWidth: 'md' }}>

      {
        !!result ? 
      <Results setResult={setResult} setUsername={setUsername} setEmail={setEmail} setBrokerAddress={setBrokerAddress} setPassword={setPassword}
      setName={setName} setSurname={setSurname} setClient={setClient} setPb={setPb} client={client} name={name} surname={surname} email={email}/>
      :
      <Stack display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Stack width='40%' minHeight='40vh' spacing={3} sx={{ backgroundColor: "white", display: 'flex', flexDirection: 'column' }} borderRadius={2} p={4} boxShadow={5}>
        <Typography variant='h5' sx={{color: "rgb(73, 85, 121)"}} fontWeight='bold' textAlign='center'>
          RaspGuard
        </Typography>
        <Divider variant='fullWidth'/>
        
        <Stack direction="row" display="flex" justifyContent="space-between">
        <TextField label='Name' placeholder='Enter your name...' onChange={onChangeName} onKeyDown={onKeyDown} sx={{width: '45%'}} />
        <TextField label='Surname' placeholder='Enter your Surname...' onChange={onChangeSurname} onKeyDown={onKeyDown} sx={{width: '45%'}} />
        </Stack>
        
        <TextField label='Username' placeholder='Enter your username...' onChange={onChangeUsername} onKeyDown={onKeyDown} />
        <TextField label='Email' placeholder='Enter your email...' onChange={onChangeEmail} onKeyDown={onKeyDown} />
        <TextField label='BrokerAddres' placeholder='Enter your broker addres...' onChange={onChangeBrokerAddress} onKeyDown={onKeyDown} />
        <TextField label='Password' type="password" placeholder='Enter your password...' onChange={onChangePassword} onKeyDown={onKeyDown} />
        <Button
        variant='contained'
        startIcon={isLoading && <CircularProgress size={20} />}
        disabled={!name || !surname || !username || !email || !brokerAddress || !password || isLoading}
        onClick={onSubmit}
        size='large'
        sx={{
          textTransform: 'none',
          py: '12px',
          borderRadius: 5,
          backgroundColor: "#42375A",
          '&:hover': { backgroundColor: "#8A7FA4" },
          '& .connectText': {
            color: 'rgb(255, 251, 235)',
            fontSize: '15px', 
            fontFamily: ' sans-serif',
            fontWeight:600,
          
          },
        }}
        >
  {isLoading ? 'Connecting...' : <span className="connectText">Connect your device</span>}
</Button>

        <Collapse in={!!error}>
        <Alert severity="error" action={
    <IconButton color="inherit" size="small" onClick={() => {setError(null), setPb(9)}}>
      Close
    </IconButton>
  }>{error}</Alert>
        </Collapse>
        
      </Stack>
      </Stack>
      }
      
    </div>
  )
}

export default App

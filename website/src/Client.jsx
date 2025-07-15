import { Stack,IconButton,Typography,Divider, Button, Container, Box } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import Dashboard from './Components/Dashboard';
import Mapping from './Components/Mapping';
import TurtleBot from './Components/TurtleBot';
import './Client.css';

const Client = ({setResult, setUsername, setEmail, setBrokerAddress, setPassword, setName, setSurname, client, setPb, setClient, name, surname, email}) => {

   //6b2940d26ac4451d9c0425e9456e9692

  console.log(email);

  const [mq811Value, setMq811Value] = useState("Loading...");
  const [mq7Value, setMq7Value] = useState("Loading...");
  const [mq8Value, setMq8Value] = useState("Loading...");
  const [mq2Value, setMq2Value] = useState("Loading...");
  const [mq6Value, setMq6Value] = useState("Loading...");
  const [mq5Value, setMq5Value] = useState("Loading...");

  const [Smoke, setSmoke] = useState("Loading...");
  const [LPG, setLPG] = useState("Loading...");
  const [CO, setCO] = useState("Loading...");
  const [H2, setH2] = useState("Loading...");
  const [CH4, setCH4] = useState("Loading...");

  const [mq2_digiValue, setMq2DigiValue] = useState(false);
  const [mq8_digiValue, setMq8DigiValue] = useState(false);
  const [mq6_digiValue, setMq6DigiValue] = useState(false);
  
  const [temp, setTemp] = useState("Loading...");  
  const [hum, setHum] = useState("Loading...");

  const [page, setPage] = useState(1);
    
    const onBack = () => {
    setResult(null);
    setUsername(null);
    setBrokerAddress(null);
    setEmail(null);
    setPassword(null);
    setName(null);
    setSurname(null);
    setClient(null);
    setPb(9);
    }  

    const changePage = (page_num) => {
      setPage(page_num);
      }  

    client.on('message', (topic, message) => {
        const payload = message.toString();
        const parts = payload.split("|");
    
        if (parts.length === 10) {
          let mq2Data = parts[0].trim().split(":");
          let mq2_key = mq2Data[0].trim();
          let mq2_value = parseInt(mq2Data[1].trim());
          
          if (mq2_value === 1) {
              setMq2DigiValue(false);
          } else if (mq2_value === 0) {
              setMq2DigiValue(true);
          }
      
          let smokeData = parts[1].trim().split(":");
          let smoke_key = smokeData[0].trim();
          let smoke_value = parseInt(smokeData[1].trim());
          setSmoke(smoke_value);
      
          let lpgData = parts[2].trim().split(":");
          let lpg_key = lpgData[0].trim();
          let lpg_value = parseInt(lpgData[1].trim());
          setLPG(lpg_value);
      
          let coData = parts[3].trim().split(":");
          let co_key = coData[0].trim();
          let co_value = parseInt(coData[1].trim());
          setCO(co_value);

          let mq8Data = parts[4].trim().split(":");
          let mq8_key = mq8Data[0].trim();
          let mq8_value = parseInt(mq8Data[1].trim());
          
          if (mq8_value === 1) {
              setMq8DigiValue(false);
          } else if (mq8_value === 0) {
              setMq8DigiValue(true);
          }

          let h2Data = parts[5].trim().split(":");
          let h2_key = h2Data[0].trim();
          let h2_value = parseInt(h2Data[1].trim());
          setH2(h2_value);

          let mq6Data = parts[6].trim().split(":");
          let mq6_key = mq6Data[0].trim();
          let mq6_value = parseInt(mq6Data[1].trim());
          
          if (mq6_value === 1) {
              setMq6DigiValue(false);
          } else if (mq6_value === 0) {
              setMq6DigiValue(true);
          }

          let ch4Data = parts[7].trim().split(":");
          let ch4_key = ch4Data[0].trim();
          let ch4_value = parseInt(ch4Data[1].trim());
          setCH4(ch4_value);

          let temp = parts[8].trim().split(":");
          let temp_key = temp[0].trim();
          let temp_value = parseInt(temp[1].trim());
          setTemp(temp_value);

          let hum = parts[9].trim().split(":");
          let hum_key = hum[0].trim();
          let hum_value = parseInt(hum[1].trim());
          setHum(hum_value);
      }
      
      
    });

      return (
        <Stack direction='row' spacing={5}>
          <Stack className="clientSidebar">
            <Stack height='5%'>
            </Stack>
    
            <Stack className="profileInfo" display='flex' alignItems='center'>
              <AccountCircleIcon style={{ width: '80px', height: '80px' }}></AccountCircleIcon>
              <Typography style={{ color: 'rgb(94, 79, 169)', fontWeight: 'bold', fontFamily:'system-ui', textTransform: 'uppercase' }}>
              {name} {surname}
              </Typography>
            </Stack>
    
          <Stack direction='column' height='100%' pt={3}>
  <Stack height='90%' spacing={3} display='flex' alignItems='center'>
    <Button
      variant='contained'
      onClick={() => changePage(1)}
      startIcon={"Sensor Values"}
      sx={{
        textTransform: 'none',
        height: '7%',
        borderRadius: 5,
        backgroundColor: "rgb(66, 59, 102)",
        '&:hover': { backgroundColor: "#818FB4" },
        width: '90%', // Set width for the first button
        marginLeft:'120px',
      }}
    >
    </Button>

    <Button
      variant='contained'
      onClick={() => changePage(2)}
      startIcon={"Mapping"}
      sx={{
        textTransform: 'none',
        height: '7%',
        borderRadius: 5,
        backgroundColor: "rgb(66, 59, 102)",
        '&:hover': { backgroundColor: "#818FB4" },
        width: '90%', // Set width for the second button
      }}
    >
    </Button>

    <Button
      variant='contained'
      onClick={() => changePage(3)}
      startIcon={"Analysis"}
      sx={{
        textTransform: 'none',
        height: '7%',
        borderRadius: 5,
        backgroundColor: "rgb(66, 59, 102)",
        '&:hover': { backgroundColor: "#818FB4" },
        width: '90%', // Set width for the third button
      }}
    >
    </Button>
  </Stack>
    
  <Stack height='10%' spacing={3} display='flex' alignItems='center'>
  <Button
    variant='contained'
    onClick={onBack}
    startIcon={"Logout"}
    sx={{
      textTransform: 'none',
      height: '70%',
      borderRadius: 5,
      backgroundColor: "rgb(66, 59, 102)",
        '&:hover': { backgroundColor: "#818FB4" },
      width: '90%', // Set width for the logout button
    }}
  >
  </Button>  
  </Stack>

</Stack>

        
 
        </Stack>
    
          <Stack direction='column' height='100vh' width='100%' pr={5}>
            <Stack height='10%'>
              <Typography variant='h5' className="clientDashboardTitle" style={{ color: '#435585', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '28px' }}>
                RASPGUARD DASHBOARD
              </Typography>
              <Typography className="clientDashboardText" style={{ color: '#818FB4', fontFamily: 'system-ui', fontSize: '20px', fontWeight: 'bold', }}>
                Welcome to your dashboard
              </Typography>
            </Stack>
    
            {page === 1 ? (<Dashboard mq811Value={mq811Value} mq7Value={mq7Value} mq8Value={mq8Value} mq2Value={mq2Value}
             mq2_digiValue={mq2_digiValue} mq6_digiValue={mq6_digiValue} mq8_digiValue={mq8_digiValue} mq6Value={mq6Value} mq5Value={mq5Value} Smoke={Smoke} LPG={LPG} CO={CO} H2={H2} CH4={CH4} temp={temp} hum={hum} />)
              : page === 2 ? (<Mapping />)
              : (<TurtleBot />)}
          </Stack>
        </Stack>
      )
    }
    
export default Client;
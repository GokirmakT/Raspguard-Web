import { Stack, IconButton, Typography, Divider, Button, Container, Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { getFilesInFolder} from './googleAPI.js'
import { getTextsInSheet } from './detected_anomaliesAPI.js';

const TurtleBot = () => {
    const [num, setNum] = useState(0);  

    const folderId = '1k9UF036NwQlzAriQvT3FHwbIDOT1_x7W';
    const apiKey = 'AIzaSyD_sT4Oheulx8LzP7gtY4cn3GMSHSZhn4Y';
    const spreadsheetId = '1rdNt--vz9606-Dd84FxFmXcaidEu0ofvffF0_D9_flE';
    
    const [thumbnailLinks, setThumbnailLinks] = useState([]);

    const [smokeData, setSmokeData] = useState([]);
    const [lpgData, setLpgData] = useState([]);
    const [coData, setcoData] = useState([]);
    const [h2Data, seth2Data] = useState([]);
    const [tempData, settempData] = useState([]);
    const [humData, sethumData] = useState([]);
    const [ch4Data, setch4Data] = useState([]);

    useEffect(() => {
    
      getFilesInFolder(folderId, apiKey)
        .then((data) => setThumbnailLinks(data))
      }, []);

    useEffect(() => {
        getTextsInSheet(spreadsheetId, apiKey)
          .then((data) => {

            setSmokeData([]);
            setLpgData([]);
            setcoData([]);
            seth2Data([]);
            settempData([]);
            sethumData([]);

            data.forEach(item => {
              const parts = item.split(' ');
              const gasType = parts[3];

              if (gasType.includes('Smoke')) {
                  setSmokeData(prevData => [...prevData, item]);
              } else if (gasType.includes('Lpg')) {
                  setLpgData(prevData => [...prevData, item]);
              } else if (gasType.includes('Co')) {
                  setcoData(prevData => [...prevData, item]);
              } else if (gasType.includes('H2')) {
                  seth2Data(prevData => [...prevData, item]);
              } else if (gasType.includes('Temperature')) {
                  settempData(prevData => [...prevData, item]);
              } else if (gasType.includes('Humidity')) {
                  sethumData(prevData => [...prevData, item]);
              }
            });
          });
    }, [thumbnailLinks]); 

    const goForward = () => {
        setNum((prevNum) => (prevNum + 1) % thumbnailLinks.length);
        console.log(thumbnailLinks[num]);
        console.log(smokeData);   
    };

    const goBack = () => {
        setNum((prevNum) => (prevNum - 1 + thumbnailLinks.length) % thumbnailLinks.length);
        console.log(thumbnailLinks[num]);
    };

    let dataToDisplay = [];
    if (num === 0) {
        dataToDisplay = humData;
    } else if (num === 1) {
        dataToDisplay = tempData;
    } else if (num === 2) {
        dataToDisplay = ch4Data;
    } else if (num === 3) {
        dataToDisplay = h2Data;
    } else if (num === 4) {
        dataToDisplay = coData;
    } else if (num === 5) {
        dataToDisplay = lpgData;
    }else if (num === 6) {
        dataToDisplay = smokeData;
    }

    return (

        <Stack direction="column">
        <Stack height='100%' justifyContent="center" alignItems="center" direction="row">
            <IconButton color='primary' onClick={goBack}>
                <ArrowBackIosNewIcon sx={{ fontSize: 60 }} />
            </IconButton>

            <img src={thumbnailLinks[num]} alt={`Thumbnail ${num}`} style={{ height: '90%', width: '80%', objectFit: 'contain' }} />

            <IconButton size='large' color='primary' onClick={goForward}>
                <ArrowForwardIosIcon sx={{ fontSize: 60 }} />
            </IconButton>
        </Stack>

        <Stack justifyContent="center" alignItems="center">

            <Stack direction="column" height='300px' width='72.5%' alignItems="center" bgcolor='white' spacing={2} overflow='auto' borderRadius={5}>
            <Stack spacing={2} overflow='auto' width='100%' paddingTop={2} paddingBottom={2}>
            {dataToDisplay.map((veri, index) => (
                    <Stack key={index} alignItems='center'>
                        <Typography align="center" style={{ color: '#818FB4', fontFamily: 'system-ui', fontWeight: 'bold'}}>{veri}</Typography>
                        {index < dataToDisplay.length - 1 && <Divider sx={{ borderBottomWidth: 1, width: '90%', borderColor: 'rgb(47, 42, 68)' }} />
}
                    </Stack>
                ))}     

            </Stack>    
            </Stack>

        </Stack>
        
        </Stack>

    );
}

export default TurtleBot;

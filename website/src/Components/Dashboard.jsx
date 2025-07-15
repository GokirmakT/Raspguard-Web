import { Stack,IconButton,Typography,Divider, Button, Container, Box } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useEffect } from 'react';
import './Dashboard.css';
import {Chart as ChartJS} from "chart.js/auto";
import {Bar, Doughnut, Line} from "react-chartjs-2";

const Dashboard = ({ mq811Value, mq7Value, mq8Value, mq2Value, mq2_digiValue, mq8_digiValue, mq6_digiValue, mq6Value, mq5Value, Smoke, LPG, CO, H2, CH4,  temp, hum}) => {

  console.log(mq2_digiValue);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
        { label: "Smoke", data: [] },
        { label: "LPG", data: [] },
        { label: "CO", data: [] },
        { label: "H2", data: [] },
        { label: "CH4", data: [] }
    ]
});

useEffect(() => {
    const intervalId = setInterval(() => {
        const now = new Date();
        const nowString = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        
        // Rastgele değerler yerine gerçek değerleri kullanın
        const newSmokeData = Smoke; 
        const newLPGData = LPG;
        const newCOData = CO;
        const newH2Data = H2;
        const newCH4Data = CH4;

        setChartData(prevData => {
          const newData = {
              labels: [...prevData.labels, nowString],
              datasets: [
                  { label: "Smoke", data: [...prevData.datasets[0].data, newSmokeData] },
                  { label: "LPG", data: [...prevData.datasets[1].data, newLPGData] },
                  { label: "CO", data: [...prevData.datasets[2].data, newCOData] },
                  { label: "H2", data: [...prevData.datasets[3].data, newH2Data] },
                  { label: "Ch4", data: [...prevData.datasets[4].data, newCH4Data] }
              ]
          };

          // Eğer veri sayısı belirli bir sınırı aşıyorsa, en eski verileri sil
          if (newData.labels.length > 60) {
              newData.labels.shift();
              newData.datasets.forEach(dataset => {
                  dataset.data.shift();
              });
          }

          return newData;
      });
  }, 1000); // Her saniye çalışır

    return () => clearInterval(intervalId);
}, [Smoke, LPG, CO]); // Değişen değerlerin bağımlılık listesine ekleniyor

  
    return(

        <Box className="dashboard-container" display="grid" gridTemplateColumns="repeat(12, 1fr)" alignContent="space-around" gridAutoRows="120px" columnGap="20px" height="90%" minWidth="150vh">
         <Box className="dashboard-box" gridColumn="span 3" bgcolor={mq2_digiValue ? '#7D0A0A' : '#f7f2e8'}>
          <Stack width="265px" direction="column" spacing={3}>
            <Stack direction="row" spacing={9} display="flex" justifyContent='space-between' >

              <Stack>
              <div className="gas-text">Smoke</div>
              </Stack>

              <Stack>
              <div className="sensor-text">MQ-2</div>
              </Stack>
              
              </Stack>

              <Stack display="flex" alignItems="center" style={{ color: '#435585', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '20' }}>
                {Smoke} ppm
                </Stack>  

              <Stack display="flex" alignItems="center">
                <Typography style={{ fontSize: '11px', color: '#f7f2e8'  }}>
                {mq2_digiValue ? 'ANOMALY DETECTED' : 'optimal degerler 123 - 123 pmm araligindadir.'}
                </Typography>
                </Stack>    
    
          </Stack>
          
        </Box>


        <Box className="dashboard-box" gridColumn="span 3" bgcolor={mq2_digiValue ? '#7D0A0A' : '#f7f2e8'}>
        <Stack width="265px" direction="column" spacing={3}>
            <Stack direction="row" spacing={9} display="flex" justifyContent='space-between' >

              <Stack>
              <div className="gas-text">LPG</div>
              </Stack>

              <Stack>
              <div className="sensor-text">MQ-2</div>

              </Stack>
              
              </Stack>

              <Stack display="flex" alignItems="center" style={{ color: '#435585', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '20' }}>
                {LPG} ppm
                </Stack>  

              <Stack display="flex" alignItems="center">
                <Typography style={{ fontSize: '11px', color: '#f7f2e8'  }}>
                {mq2_digiValue ? 'ANOMALY DETECTED' : 'optimal degerler 123 - 123 pmm araligindadir.'}
                </Typography>
                </Stack>    
    
          </Stack>
          
        </Box>

        <Box className="dashboard-box" gridColumn="span 3"  bgcolor={mq2_digiValue ? '#7D0A0A' : '#f7f2e8'}>
          <Stack width="265px" direction="column" spacing={3}>
            <Stack direction="row" spacing={9} display="flex" justifyContent='space-between' >

              <Stack>
              <div className="gas-text">CO</div>
              </Stack>

              <Stack>
              <div className="sensor-text">MQ-2</div>
              </Stack>
              
              </Stack>

              <Stack display="flex" alignItems="center" style={{ color: '#435585', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '20' }}>
                {CO} ppm
                </Stack>  

              <Stack display="flex" alignItems="center" >
                <Typography style={{ fontSize: '11px', color: '#f7f2e8'  }}>
                {mq2_digiValue ? 'ANOMALY DETECTED' : 'optimal degerler 123 - 123 pmm araligindadir.'}
                </Typography>
                </Stack>    
    
          </Stack>
          
        </Box>

        <Box className="dashboard-box" gridColumn="span 3" bgcolor={mq8_digiValue ? '#7D0A0A' : '#f7f2e8'} >
          <Stack width="265px" direction="column" spacing={3}>
            <Stack direction="row" spacing={9} display="flex" justifyContent='space-between' >

              <Stack>
              <div className="gas-text">H2</div>

              </Stack>

              <Stack>
              <div className="sensor-text">MQ-8</div>
              </Stack>
              
              </Stack>

              <Stack display="flex" alignItems="center" style={{ color: '#435585', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '20' }}>
                {H2} ppm
                </Stack>  

              <Stack display="flex" alignItems="center">
                <Typography style={{ fontSize: '11px', color: '#f7f2e8'  }}>
                {mq8_digiValue ? 'ANOMALY DETECTED' : 'optimal degerler 123 - 123 pmm araligindadir.'}
                </Typography>
                </Stack>    
    
          </Stack>
          
        </Box>

        
        <Box className="dashboard-box" gridColumn="span 3">
          <Stack width="265px" direction="column" spacing={3}>
            <Stack direction="row" spacing={9} display="flex" justifyContent='space-between' >

              <Stack>
              <div className="gas-text">CH4</div>
              </Stack>

              <Stack>
              <div className="sensor-text">MQ-6</div>
              </Stack>
              
              </Stack>

              <Stack display="flex" alignItems="center" style={{ color: '#435585', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '20' }}>
                {CH4} ppm
                </Stack>  

              <Stack display="flex" alignItems="center">
                <Typography style={{ fontSize: '11px', color: '#f7f2e8'  }}>
                {124 > 123 ? 'optimal degerler 123 - 123 pmm araligindadir.' : 'UYARI'}
                </Typography>
                </Stack>    
    
          </Stack>
          
        </Box>

        <Box className="dashboard-box" gridColumn="span 3">
          <Stack width="265px" direction="column" spacing={3}>
            <Stack direction="row" spacing={9} display="flex" justifyContent='space-between' >

              <Stack>
              <div className="gas-text">Temperature</div>

              </Stack>

              <Stack>
              <div className="sensor-text">dht22</div>
              </Stack>
              
              </Stack>

              <Stack display="flex" alignItems="center" style={{ color: '#435585', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '20' }}>
              {temp}°C
                </Stack>  

              <Stack display="flex" alignItems="center">
                <Typography style={{ fontSize: '11px', color: '#f7f2e8'  }}>
                {124 > 123 ? 'optimal degerler 123 - 123 pmm araligindadir.' : 'UYARI'}
                </Typography>
                </Stack>    
    
          </Stack>
          
        </Box>

        <Box className="dashboard-box" gridColumn="span 3">
          <Stack width="265px" direction="column" spacing={3}>
            <Stack direction="row" spacing={9} display="flex" justifyContent='space-between' >

              <Stack>
              <div className="gas-text">Humidity</div>

              </Stack>

              <Stack>
              <div className="sensor-text">dht22</div>
              </Stack>
              
              </Stack>

              <Stack display="flex" alignItems="center" style={{ color: '#435585', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '20' }}>
              {hum}%
                </Stack>  

              <Stack display="flex" alignItems="center">
                <Typography style={{ fontSize: '11px', color: '#f7f2e8' }}>
                {124 > 123 ? 'optimal degerler 123 - 123 pmm araligindadir.' : 'UYARI'}
                </Typography>
                </Stack>    
    
          </Stack>
          
        </Box>

      
        
        
        <Box display="grid" gridTemplateColumns="0.5fr 4fr 0.5fr" gridColumn="span 12" gridRow="span 2" bgcolor="#f7f2e8">

            <div style={{backgroundColor: 'rgb(47, 42, 68)', height: '100%' }}>
              {/* İlk yığın */}
            </div>

            <div style={{ height: '100%' }}>
              {/* İkinci yığın ve buraya Line bileşenini yerleştireceğiz */}
              <Box height="100%" display="flex" justifyContent="center" alignItems="center">
                <Line
                  data={chartData}
                  options={{ maintainAspectRatio: false }}
                />
              </Box>
            </div>

            <div style={{backgroundColor: 'rgb(47, 42, 68)', height: '100%' }}>
              {/* Üçüncü yığın */}
            </div>

          </Box>

      </Box>

    )
}

export default Dashboard;
//import './App.css';
import {React, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Collapsible,
  Grommet,
  Heading,
  Layer,
  Notification,
  ResponsiveContext,
  Text
} from 'grommet';
import { FormClose} from 'grommet-icons';
import { Labelled } from './components/meter_value';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '20px',
      height: '20px',
    },
    colors: {
         brand: '#228BE6',
         'accent-1': '#f27538',
    },
  },
};

//put this in its own file later
const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

function App() {

  const[lastping, setLastPing]=useState('');
  const[cpu_usage, setCpuUsage]=useState(0);
  const[ram_usage, setRamUsage]=useState(0);
  const[disk_usage, setDiskUsage]=useState(0);
  const[showSidebar, setShowSidebar] = useState(false);

  useEffect(
    function getMetrics() {
      fetch('/update')
        .then(response => response.json())
        .then(data => {
          //should probably just put allo of these in a dict
          setLastPing(data.lastping);
          setCpuUsage(data.cpu_usage);
          setRamUsage(data.ram_usage);
          setDiskUsage(data.disk_usage);
        })
        .catch((error) => console.log("Error contacting server: %s", error));
      setTimeout(getMetrics, 1000);
  }, []);

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <AppBar>
              <Heading level='3' margin='none'>PiMetrics</Heading>
              <Button 
                icon={<Notification title='Menu'/>}
                onClick={()=>{setShowSidebar(!showSidebar)}}
              />
            </AppBar>
            < Box direction='row' flex overflow={{ horizontal: 'hidden'}}>
              <Box flex align='center' justify='center'>
                <Box flex direction='row' >
                  <Labelled theme={theme} value={cpu_usage}  size='medium' title="CPU usage"/>
                  <Labelled theme={theme} value={ram_usage}  size='medium' title="RAM usage"/>
                  <Labelled theme={theme} value={disk_usage}  size='medium' title="Disk usage"/>
                </Box>
                <Text size='xlarge'>
                  Last time the Raspberry Pi communicated with the server: {lastping}
                </Text>
              </Box>
              {(!showSidebar || size !== 'small') ? (
                <Collapsible direction="horizontal" open={showSidebar}>
                  <Box
                    width='medium'
                    background='light-2'
                    elevation='small'
                    aligh='center'
                    justify='center'
                    >
                      Sidebar stuff
                  </Box>
                </Collapsible>
                ) : (
                <Layer>
                  <Box
                    background='light-2'
                    tag='header'
                    justify='end'
                    align='center'
                    direction='row'
                    >
                      <Button
                        icon={<FormClose />}
                        onClick={() => setShowSidebar(false)}
                      />
                    </Box>
                  <Box
                    fill
                    background='light-2'
                    align='center'
                    justify='center'
                    >
                      Pop-up menu
                    </Box>

                </Layer>
              )}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;

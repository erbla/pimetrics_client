//import './App.css';
import {React, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  Notification,
  ResponsiveContext,
} from 'grommet';
import { FormClose} from 'grommet-icons';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '20px',
      height: '20px',
    },
    colors: {
         brand: '#228BE6',
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
  const[showSidebar, setShowSidebar] = useState(false);

  useEffect(
    function getMetrics() {
      fetch('/time')
        .then(response => response.json())
        .then(data => setLastPing(data.lastping))
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
                <p>
                  Last time the Raspberry Pi communicated with the server: {lastping}
                </p>
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

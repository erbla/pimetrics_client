import React from 'react';
import PropTypes from 'prop-types';

import { Box, Grommet, Meter, Stack, Text } from 'grommet';

export const Labelled = (props) => {
  const meterValue = props.value;
  const size = props.size;
  const title = props.title;

  return (
    <Grommet theme={props.theme}>
        <Box flex direction='column' align="center" pad='large' height='large'>
            <Stack anchor="center">
                <Meter
                type="circle"
                background="light-2"
                values={[{ value: meterValue }]}
                size={size}
                thickness="medium"
                />
                <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
                <Text size="xlarge" weight="bold">
                    {meterValue}
                </Text>
                <Text size="small">%</Text>
                </Box>
            </Stack>
            <Text size="large">{title}</Text>
        </Box>
    </Grommet>
  );
};

Labelled.propTypes = {
    value: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
    size: PropTypes.string,
    title: PropTypes.string,
}

export default {
  title: 'Visualizations/Meter/Labelled',
};
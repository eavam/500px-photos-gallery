import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';

const Indicator = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin-bottom: 30px;
`;

const Loader = () => (
  <Indicator>
    <ActivityIndicator size="large" />
  </Indicator>
);

export default Loader;

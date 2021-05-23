import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import styled from 'styled-components/native';

import Home from './screens/Home';
import {AppProvider} from './store/AppContext';
import {COLORS} from './constants/colors';

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProvider>
      <StyledSafeAreaView>
        <StatusBar
          translucent
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={COLORS.TOMATO}
        />
        <Home />
      </StyledSafeAreaView>
    </AppProvider>
  );
};

export default App;

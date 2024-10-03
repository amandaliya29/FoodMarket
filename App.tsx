import React from 'react';
import TabNavigation from './src/components/navigation/TabNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigation from './src/components/navigation/StackNavigation';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StackNavigation />
    </GestureHandlerRootView>
  );
};

export default App;

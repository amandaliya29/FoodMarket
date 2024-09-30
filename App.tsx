import React from 'react';
import TabNavigation from './src/components/navigation/TabNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <TabNavigation />
    </GestureHandlerRootView>
  );
};

export default App;

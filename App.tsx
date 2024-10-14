import React from 'react';
import TabNavigation from './src/components/navigation/TabNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigation from './src/components/navigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/components/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <StackNavigation />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

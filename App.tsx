import React, {useState, useEffect} from 'react';
import TabNavigation from './src/components/navigation/TabNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigation from './src/components/navigation/StackNavigation';
import {Provider} from 'react-redux';
import {store} from './src/components/redux/store';
import NetInfo, {addEventListener} from '@react-native-community/netinfo';
import {Text, View, StyleSheet} from 'react-native';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showMessage, setShowMessage] = useState('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected !== null ? state.isConnected : false);

      if (state.isConnected) {
        if (showMessage !== 'Back to online') {
          setShowMessage('Back to online');
          setTimeout(() => setShowMessage(''), 3000);
        }
      } else {
        if (showMessage !== 'Device is offline') {
          setShowMessage('Device is offline');
          setTimeout(() => setShowMessage(''), 3000);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        {showMessage && (
          <View style={styles.messageContainer}>
            <Text
              style={{
                color: 'white',
                backgroundColor: isConnected ? 'green' : 'red',
                textAlign: 'center', // Center the text horizontally
                padding: 10,
              }}>
              {showMessage}
            </Text>
          </View>
        )}
        <StackNavigation />
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    position: 'absolute',
    bottom: 0, // Position the message at the bottom of the screen
    left: 0,
    right: 0,
    paddingBottom: 0,
    zIndex: 1, // Make sure the message appears on top of other components
  },
});

export default App;

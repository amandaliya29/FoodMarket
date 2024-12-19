import React, {useState, useEffect, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {Text, View, StyleSheet} from 'react-native';
import StackNavigation from './src/components/navigation/StackNavigation';
import {store} from './src/components/redux/store';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showMessage, setShowMessage] = useState('');
  const hasBeenOffline = useRef(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected !== null ? state.isConnected : false;

      if (!connected && !hasBeenOffline.current) {
        setIsConnected(false);
        setShowMessage('Device is offline');
        hasBeenOffline.current = true;
      } else if (connected && hasBeenOffline.current) {
        setIsConnected(true);
        setShowMessage('Back to online');
        hasBeenOffline.current = true;
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (showMessage) {
      const timeout = setTimeout(() => setShowMessage(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showMessage]);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        {showMessage && (
          <View style={styles.messageContainer}>
            <Text
              style={{
                color: 'white',
                backgroundColor: isConnected ? 'green' : 'red',
                textAlign: 'center',
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
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default App;

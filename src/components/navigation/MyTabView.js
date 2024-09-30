import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import NewTaste from '../foodTab/NewTaste';
import Popular from '../foodTab/Popular';
import Recommended from '../foodTab/Recommended';

const MyTabView = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'newTaste', title: 'New Taste'},
    {key: 'popular', title: 'Popular'},
    {key: 'recommended', title: 'Recommended'},
  ]);

  const renderScene = SceneMap({
    newTaste: NewTaste,
    popular: Popular,
    recommended: Recommended,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: styles.fullWidth}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: '#F54B64', height: 3}}
          style={{backgroundColor: 'white'}}
          labelStyle={{color: 'black', fontSize: 12, fontWeight: '500'}}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    flex: 1,
  },
});

export default MyTabView;

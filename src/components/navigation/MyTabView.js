import React, {useState, useRef} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Text,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import NewTaster from '../foodTab/NewTaste';
import Popular from '../foodTab/Popular';
import Recommended from '../foodTab/Recommended';

const MyTabView = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'newTaster', title: 'New Tester'},
    {key: 'popular', title: 'Popular'},
    {key: 'recommended', title: 'Recommended'},
  ]);
  const tabTitleWidths = useRef([]);
  const fixedIndicatorWidth = 40;

  const handleTextLayout = (event, i) => {
    const {width} = event.nativeEvent.layout;
    tabTitleWidths.current[i] = width;
  };

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((_, i) => i);
    const tabWidth = layout.width / props.navigationState.routes.length;

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          const color = index === i ? '#020202' : '#8D92A3';
          const fontWeight = index === i ? 700 : 400;
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={[{opacity}, {color}, {fontWeight}, {fontSize: 13}]}
                onLayout={event => handleTextLayout(event, i)}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}

        <Animated.View
          style={[
            styles.indicator,
            {
              width: fixedIndicatorWidth,
              transform: [
                {
                  translateX: props.position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => {
                      const offsetX = (tabWidth - fixedIndicatorWidth) / 2;
                      return i * tabWidth + offsetX;
                    }),
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    );
  };

  const renderScene = SceneMap({
    newTaster: NewTaster,
    popular: Popular,
    recommended: Recommended,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default MyTabView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 0,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomColor: '#F2F2F2',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    backgroundColor: '#020202',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

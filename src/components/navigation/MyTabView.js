import React, {useState} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import NewTaster from '../foodTab/NewTaste';
import Popular from '../foodTab/Popular';
import Recommended from '../foodTab/Recommended';

const MyTabView = () => {
  const layout = useWindowDimensions(); // Get screen width to calculate tab width
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'newTaster', title: 'NewTester'},
    {key: 'popular', title: 'Popular'},
    {key: 'recommended', title: 'Recommended'},
  ]);

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((_, i) => i);
    const tabWidth = layout.width / props.navigationState.routes.length; // Calculate tab width based on the screen width

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          const color = index === i ? '#EB0029' : '#8D92A3'; // Active tab text color

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text style={[{opacity}, {color}]}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}

        {/* Tab Indicator */}
        <Animated.View
          style={[
            styles.indicator,
            {
              width: tabWidth, // Set indicator width to tab width
              transform: [
                {
                  translateX: props.position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(i => i * tabWidth), // Translate the indicator based on the tab width
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
      initialLayout={{width: layout.width}} // Set the initial layout width
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
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 4, // Indicator thickness
    backgroundColor: '#EB0029', // Active tab indicator color
  },
});

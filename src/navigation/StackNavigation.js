import React from 'react';
import {IconButton} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import News from '../screens/News';
import Movie from '../screens/Movie';
import Popular from '../screens/Popular';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

export default function StackNavigation(props) {
  const {navigation} = props;

  const buttonLeft = screen => {
    switch (screen) {
      case 'Search':
      case 'Movie':
        return (
          <IconButton
            icon={'arrow-left'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        );

      default:
        return (
          <IconButton
            icon={'menu'}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        );
    }
  };

  buttonRight = () => {
    return (
      <IconButton
        icon={'magnify'}
        onPress={() => {
          navigation.navigate('Search');
        }}
      />
    );
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'TheMovieApp',
          headerLeft: () => buttonLeft('Home'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{
          title: 'Nuevas Películas',
          headerLeft: () => buttonLeft('News'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="Movie"
        component={Movie}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => buttonLeft('Movie'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="Popular"
        component={Popular}
        options={{
          title: 'Películas Populares',
          headerLeft: () => buttonLeft('Popular'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => buttonLeft('Search'),
        }}
      />
    </Stack.Navigator>
  );
}

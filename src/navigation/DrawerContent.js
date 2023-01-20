import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';

export default function DrawerContent(props) {
  const {navigation} = props;
  const [active, setActive] = useState('Home');
  const {theme, toggleTheme} = usePreferences();

  const onChangeScreen = screen => {
    setActive(screen);
    navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={active === 'Home'}
          onPress={() => {
            onChangeScreen('Home');
          }}
        />
        <Drawer.Item
          label="Películas Populares"
          active={active === 'Popular'}
          onPress={() => {
            onChangeScreen('Popular');
          }}
        />
        <Drawer.Item
          label="Nuevas Películas"
          active={active === 'News'}
          onPress={() => {
            onChangeScreen('News');
          }}
        />
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preferences}>
            <Text>Tema Oscuro</Text>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preferences: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
});

import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.3);

export default function CarouselMulti(props) {
  const {data, navigation} = props;

  return (
    <Carousel
      layout="default"
      data={data}
      renderItem={item => {
        <RenderItem data={item} navigation={navigation} />;
      }}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );
}

function RenderItem() {
  return (
    <View>
      <Title>Hola</Title>
    </View>
  );
}

const styles = StyleSheet.create({});

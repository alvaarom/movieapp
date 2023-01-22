import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarouselVertical(props) {
  const {data} = props;
  return (
    <Carousel
      layout="default"
      data={data}
      renderItem={item => <RenderItem data={item} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );
}

function RenderItem(props) {
  const {} = props;

  return (
    <View>
      <Text>Película</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

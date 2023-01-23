import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import {searchMoviesApi} from '../api/movies';
import {size, map} from 'lodash';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');

export default function Search(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (size(search) > 2) {
      searchMoviesApi(search).then(res => {
        setMovies(res.results);
      });
    }
  }, [search]);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Busca tu película"
        iconColor={'transparent'}
        style={styles.input}
        onChangeText={e => {
          setSearch(e);
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          {map(movies, (movie, index) => (
            <Movie key={index} movies={movie} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie(props) {
  const {movies, navigation} = props;
  const {id, title, poster_path} = movies;

  const goMovie = () => {
    navigation.navigate('Movie', {id: id});
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        goMovie();
      }}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
          />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#15212b',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

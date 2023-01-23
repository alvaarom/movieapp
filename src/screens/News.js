import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Text} from 'react-native-paper';
import {getNewsMoviesApi} from '../api/movies';
import {map} from 'lodash';
import {BASE_PATH_IMG} from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import {style} from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

const {width} = Dimensions.get('window');

export default function News(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtnMore, setShowBtnMore] = useState(true);
  const {theme} = usePreferences();

  useEffect(() => {
    getNewsMoviesApi(page).then(res => {
      const totalPages = res.total_pages;
      if (page < totalPages) {
        if (!movies) {
          setMovies(res.results);
        } else {
          setMovies([...movies, ...res.results]);
        }
      } else {
        setShowBtnMore(false);
      }
    });
  }, [page]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {map(movies, (movie, index) => (
          <Movie key={index} movie={movie} navigation={navigation} />
        ))}
      </View>
      {showBtnMore && (
        <Button
          mode="contained"
          contentStyle={styles.loadMoreContainer}
          style={styles.loadMore}
          labelStyle={{color: theme === 'dark' ? '#fff' : '#000'}}
          onPress={() => {
            setPage(page + 1);
          }}>
          Cargar mas...
        </Button>
      )}
    </ScrollView>
  );
}

function Movie(props) {
  const {movie, navigation} = props;
  const {id, poster_path, title} = movie;

  const goMovie = () => {
    navigation.navigate('Movie', {id: id});
  };
  return (
    <TouchableWithoutFeedback onPress={() => goMovie()}>
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
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});

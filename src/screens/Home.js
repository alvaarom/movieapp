import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  getNewsMoviesApi,
  getAllGenresApi,
  getGenreMoviesApi,
} from '../api/movies';
import {Title, Text} from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';
import {map} from 'lodash';

export default function Home(props) {
  const {navigation} = props;
  const [newMovies, setNewMovies] = useState(null);
  const [genreList, setgenreList] = useState([]);
  const [genreSelected, setGenreSelected] = useState(28);
  const [genreMovies, setGenreMovies] = useState(null);

  useEffect(() => {
    getNewsMoviesApi().then(res => {
      setNewMovies(res.results);
    });
  }, []);

  useEffect(() => {
    getAllGenresApi().then(res => {
      setgenreList(res.genres);
    });
  }, []);

  useEffect(() => {
    getGenreMoviesApi(genreSelected).then(res => {
      setGenreMovies(res.results);
    });
  }, [genreSelected]);

  const onChangeGenre = newGenreId => {
    setGenreSelected(newGenreId);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas películas</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Películas por genero</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreList}>
          {map(genreList, genre => {
            return (
              <Text
                key={genre.id}
                style={[
                  styles.genre,
                  {color: genre.id !== genreSelected ? '#8697a5' : '#fff'},
                ]}
                onPress={() => onChangeGenre(genre.id)}>
                {genre.name}
              </Text>
            );
          })}
        </ScrollView>
        {genreMovies && (
          <CarouselMulti data={genreMovies} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genreList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});

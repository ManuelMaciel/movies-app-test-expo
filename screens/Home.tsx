import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Title } from "react-native-paper";
import { map } from "lodash";

import usePreferences from "../hooks/usePreferences";
import { getNewMovies, getAllGenres, getGenreMovies } from "../api/";
import { CarouselVertical } from "../components/CarouselVertical";
import { CarouselMulti } from "../components/Carousel";

export const Home = ({ navigation }: any) => {
  const [newMovies, setNewMovies]: any = useState(null);
  const [genreList, setGenreList]: any = useState([]);
  const [genreSelected, setGenreSelected]: any = useState(28);
  const [genreMovies, setGenreMovies]: any = useState(null);
  const { theme } = usePreferences();

  useEffect(() => {
    (async () => {
      const data = await getNewMovies();

      setNewMovies(data.results);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getAllGenres();

      setGenreList(data.genres);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getGenreMovies(genreSelected);

      setGenreMovies(data.results);
    })();
  }, [genreSelected]);

  const onChangeGenre = (newGenreID: any) => {
    setGenreSelected(newGenreID);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>New Movies</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Movies by Genre</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList}>
          {map(genreList, (genre) => (
            <Text
              key={genre.id}
              style={[
                styles.genre,
                {
                  color:
                    theme === "dark"
                      ? genre.id !== genreSelected
                        ? "#8697a5"
                        : "#fff"
                      : genre.id !== genreSelected
                      ? "#8697a5"
                      : "#000",
                },
              ]}
              onPress={() => onChangeGenre(genre.id)}
            >
              {genre.name}
            </Text>
          ))}
        </ScrollView>
        {genreMovies && <CarouselMulti data={genreMovies} navigation={navigation} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: "bold",
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

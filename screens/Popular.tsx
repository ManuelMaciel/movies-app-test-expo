import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Image, TouchableWithoutFeedback, Text } from "react-native";
import { Title, Button } from "react-native-paper";
import { map } from "lodash";
import { Rating } from "react-native-ratings";

import { IMGPATH } from '../utils/constants';
import star from "../assets/images/star.png";
import usePreferences from "../hooks/usePreferences";
import noImage from "../assets/images/default-img.png";
import { getPopularMovies } from "../api";

export const Popular = ({ navigation }: any) => {
  const [movies, setMovies]: any = useState(null);
  const [showButtonMore, setShowButtonMore]: any = useState(true);
  const [page, setPage]: any = useState(1);
  const { theme } = usePreferences();

  useEffect(() => {
    (async () => {
      const data = await getPopularMovies(page);
      const totalPages = data.total_pages;

      if (page < totalPages) {
        if (!movies) {
          setMovies(data.results);
        } else {
          setMovies([...movies, ...data.results]);
        }
      } else {
        setShowButtonMore(false);
      }
    })();
  }, [page]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {map(movies, (movie, index) => (
        <Movie key={index} movie={movie} navigation={navigation} theme={theme} />
      ))}
      {showButtonMore && (
        <Button
          contentStyle={styles.loadMoreContainer}
          labelStyle={{ color: theme === "dark" ? "#fff" : "#000" }}
          mode="contained"
          style={styles.loadMore}
          onPress={() => setPage(page + 1)}
        >
          Show More...
        </Button>
      )}
    </ScrollView>
  );
};

function Movie({
  navigation,
  theme,
  movie: { poster_path, title, release_date, vote_count, vote_average, id },
}: any) {
  const goMovie = () => {
    navigation.navigate("movie", { id });
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        <View style={styles.left}>
          <Image
            source={poster_path ? { uri: `${IMGPATH}/w500${poster_path}` } : {uri: noImage}}
            style={styles.image}
          />
        </View>
        <View style={styles.right}>
          <Title>{title}</Title>
          <Text>{release_date}</Text>
          <MovieRating theme={theme} voteAverage={vote_average} voteCount={vote_count} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function MovieRating({ theme, voteAverage, voteCount }: any) {
  const average = voteAverage / 2;

  return (
    <View style={styles.viewRating}>
      <Rating
        imageSize={20}
        ratingBackgroundColor={theme === "dark" ? "#192734" : "#f0f0f0"}
        ratingColor="#ffc205"
        ratingImage={star}
        startingValue={average}
        style={{ marginRight: 15 }}
        type="custom"
      />
      <Text style={{ fontSize: 12, marginTop: 5, color: "#8697a5" }}>{voteCount} votes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  movie: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    marginRight: 20,
  },
  right: {
    marginLeft: 20,
  },
  image: {
    width: 100,
    height: 150,
  },
  viewRating: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: "transparent",
  },
});

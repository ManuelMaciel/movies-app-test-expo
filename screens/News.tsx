import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Text
} from "react-native";
import { Button } from "react-native-paper";
import { map } from "lodash";

import { IMGPATH } from '../utils/constants'
import usePreferences from "../hooks/usePreferences";
import { getNewMovies } from "../api";

const { width } = Dimensions.get("window");

export const News = ({ navigation }: any) => {
  const [movies, setMovies]: any = useState(null);
  const [page, setPage]: any = useState(1);
  const [showButtonMore, setShowButtonMore]: any = useState(true);

  const { theme } = usePreferences();

  useEffect(() => {
    (async () => {
      const data = await getNewMovies(page);
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
      <View style={styles.container}>
        {map(movies, (movie, index) => (
          <Movie key={index} movie={movie} navigation={navigation} />
        ))}
      </View>
      {showButtonMore && (
        <Button
          contentStyle={styles.loadMoreContainer}
          labelStyle={{ color: theme === "dark" ? "#fff" : "#000" }}
          style={styles.loadMore}
          onPress={() => setPage(page + 1)}
        >
          Show More...
        </Button>
      )}
    </ScrollView>
  );
};

function Movie({ movie: { id, title, poster_path }, navigation }: any) {
  const goMovie = () => {
    navigation.navigate("movie", { id });
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image source={{ uri: `${IMGPATH}/w500${poster_path}` }} style={styles.image} />
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
    flexDirection: "row",
    flexWrap: "wrap",
  },
  movie: {
    width: width / 3,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: "transparent",
  },
});

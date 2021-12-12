import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Dimensions, Text, TouchableWithoutFeedback } from "react-native";
import { Title } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import { map, size } from "lodash";

import { getGenreMovie } from "../api/movies";
import { BASE_PATH_IMG } from "../utils/constants";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = Math.round(width * 0.7);

export const CarouselVertical = ({ data, navigation }: any) => {
  return (
    <Carousel
      data={data}
      itemWidth={ITEM_WIDTH}
      layout={"default"}
      renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={width}
    />
  );
}

function RenderItem({
  data: {
    item: { id, title, poster_path, genre_ids },
  },
  navigation,
}: any) {
  const [genres, setGenres] = useState(null);
  const imageURL = `${BASE_PATH_IMG}/w500${poster_path}`;

  useEffect(() => {
    (async () => {
      const result = await getGenreMovie(genre_ids);

      setGenres(result);
    })();
  }, []);

  const onNavigation = () => {
    navigation.navigate("movie", { id });
  };

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <Image source={{ uri: imageURL }} style={styles.image} />
        <Title style={styles.title}>{title}</Title>
        <View style={styles.genres}>
          {genres &&
            map(genres, (genre: any, index: any) => (
              <Text key={index} style={styles.genre}>
                {genre}
                {index !== size(genres) - 1 && ", "}
              </Text>
            ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  image: {
    width: "100%",
    height: 450,
    borderRadius: 20,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  genres: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  genre: {
    fontSize: 12,
    color: "#954fce",
  },
});

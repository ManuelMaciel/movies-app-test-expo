import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import { Drawer as DrawerPaper, Switch, TouchableRipple } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

import usePreference from "../hooks/usePreferences";
import { Home, Search, Popular, News, Movie } from '../screens'

export const DrawerContent = ({ navigation }: any) => {
  const [active, setActive] = useState("home");
  const { theme, toggleTheme } = usePreference();

  const onChangeScreen = (screen: any) => {
    setActive(screen);
    navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView>
      <DrawerPaper.Section>
        <DrawerPaper.Item
          active={active === "home"}
          label="Home"
          onPress={() => onChangeScreen("home")}
        />
        <DrawerPaper.Item
          active={active === "popular"}
          label="Popular Movies"
          onPress={() => onChangeScreen("popular")}
        />
        <DrawerPaper.Item
          active={active === "news"}
          label="New Movies"
          onPress={() => onChangeScreen("news")}
        />
      </DrawerPaper.Section>
      <DrawerPaper.Section title="Theme">
        <TouchableRipple>
          <View style={styles.preferences}>
            <Text>Dark Theme</Text>
            <Switch value={theme === "dark"} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </DrawerPaper.Section>
    </DrawerContentScrollView>
  );
};

const Stack = createStackNavigator();

export const StackNavigation = ({ navigation }: any) => {
  const buttonLeft = (screen: any) => {
    switch (screen) {
      case "search":
      case "movie":
        return <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />;
      default:
        return <IconButton icon="menu" onPress={() => navigation.openDrawer()} />;
    }
  };

  const buttonRight = () => {
    return (
      <IconButton
        icon="magnify"
        onPress={() => {
          navigation.navigate("search");
        }}
      />
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name="home"
        options={{
          title: "Movie App Test",
          headerLeft: () => buttonLeft("home"),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        component={Movie}
        name="movie"
        options={{
          title: "",
          headerTransparent: true,
          headerLeft: () => buttonLeft("movie"),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        component={News}
        name="news"
        options={{
          title: "Peliculas Nuevas",
          headerLeft: () => buttonLeft("news"),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        component={Popular}
        name="popular"
        options={{
          title: "Peliculas Populares",
          headerLeft: () => buttonLeft("popular"),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        component={Search}
        name="search"
        options={{ title: "", headerTransparent: true, headerLeft: () => buttonLeft("search") }}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export const Navigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <DrawerContent {...props} />}
      initialRouteName="app"
    >
      <Drawer.Screen component={StackNavigation} name="app" />
    </Drawer.Navigator>
  );
};


const styles = StyleSheet.create({
  preferences: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

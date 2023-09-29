import { Stack, Tabs } from "expo-router";
import { TTab } from "@/types/Tab.Type";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

const setStyle = (color: string) => {
  const styles = StyleSheet.create({
    home: {
      width: 45,
      height: 45,
      top: 5,
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadow: 6,
      backgroundColor: color === colors.secondary ? colors.secondary : colors.white,
      borderColor: colors.secondary,
      borderWidth: 1
    }
  });

  return styles.home;

};

const TabsLayout = () => {

  const routes: TTab[] = [
    {
      name: "feed",
      options: {
        href: "/feed",
        title: "feed",
        tabBarShowLabel: true,
        tabBarLabel: "Feed",
        tabBarIcon: ({ color, size }: { color: string, size: number }) => (
          <MaterialCommunityIcons
            name={color === colors.secondary ? "movie-open" : "movie-open-outline"}
            color={colors.secondary}
            size={size}
          />
        )
      }
    },
    {
      name: "new",
      options: {
        href: "/new",
        title: "new",
        tabBarShowLabel: true,
        tabBarLabel: "",
        tabBarIcon: ({ color, size }: { color: string, size: number }) => (
          <View
            style={setStyle(color)}
          >
            <FontAwesome
              name="plus"
              color={color === colors.secondary ? colors.white : colors.secondary}
              size={size}
            />
          </View>
        )
      }
    },
    {
      name: "forum",
      options: {
        href: "/forum",
        title: "forum",
        tabBarShowLabel: true,
        tabBarLabel: "Foro",
        tabBarIcon: ({ color, size }: { color: string, size: number }) => (
          <MaterialCommunityIcons
            name={color === colors.secondary ? "forum" : "forum-outline"}
            color={colors.secondary}
            size={size}
          />
        )
      }
    }
  ]

  return (
    <>
      <Stack.Screen options={{ headerShown: false, animation: "fade" }} />
      <Tabs
        initialRouteName={routes[0].name}
        screenOptions={{
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.gray3,
          tabBarInactiveBackgroundColor: colors.white,
          tabBarActiveBackgroundColor: colors.white,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: '7%',
          }
        }}
      >
        {routes
          .map(({ name, options }, index) => (
            <Tabs.Screen
              key={index}
              name={name}
              options={options}
            />
          ))}
      </Tabs>
    </>
  );
};

export default TabsLayout;
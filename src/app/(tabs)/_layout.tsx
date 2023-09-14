import { Tabs } from "expo-router";
import { TTab } from "@/types/Tab.Type";

const TabsLayout = () => {

  const routes: TTab[] = [
    {
      name: "feed",
      options: {
        href: "/feed",
        title: "feed",
      }
    }
  ]

  return (
    <Tabs
      initialRouteName={routes[0].name}
      screenOptions={{
        headerShown: false
      }}
    >
      {routes.map(({ name, options }, index) => (
        <Tabs.Screen
          key={index}
          name={name}
          options={options}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Add from "./Add";
import Edit from "./Edit";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                // Shared header style for the Add and Edit screens
                screenOptions={{
                    headerStyle: { backgroundColor: "#FFFAF7" },
                    headerTintColor: "#B96B85",
                    headerTitleStyle: { fontWeight: "bold" },
                    headerShadowVisible: false,
                }}
            >
                {/* Home has its own custom header, so the native one is hidden */}
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Add" component={Add} options={{ title: "Add Flower" }} />
                <Stack.Screen name="Edit" component={Edit} options={{ title: "Edit Flower" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

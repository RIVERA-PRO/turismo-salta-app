import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, image, style, Platform } from 'react-native';
import Home from '../screens/Home'
import Detail from '../screens/Detail'
import DetailGastronomia from '../screens/DetailGastronomia'
import AllPublicacionesScreen from '../screens/AllPublicacionesScreen'
import Map from '../screens/Map'
import SearchScreen from '../screens/SearchScreen'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

function BottomTabsNavigation() {




    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottonm: 25,
                    left: 20,
                    right: 20,

                    borderRadius: 15,
                    height: 56,


                },
                labelStyle: {
                    fontSize: 11,
                    marginBottom: 3,
                },
                activeTintColor: '#F80050',
                inactiveTintColor: 'rgba(0, 0, 0, 0.3)',


            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    // tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',
                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#fff',
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />



            <Tab.Screen
                name="AllPublicacionesScreen"
                component={AllPublicacionesScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View
                            style={{
                                top: Platform.OS === "ios" ? -20 : -20,
                                width: Platform.OS === "ios" ? 45 : 55,
                                height: Platform.OS === "ios" ? 45 : 55,
                                borderRadius: Platform.OS === "ios" ? 25 : 30,
                                position: 'absolute',
                                bottom: 10,
                                backgroundColor: '#F80050',
                                alignItems: 'center',
                                justifyContent: 'center',
                                shadowColor: '#000',
                                shadowOffset: { width: 10, height: 20 },
                                shadowOpacity: 10.25,
                                shadowRadius: 300,
                                elevation: 7,

                            }}
                        >
                            <Feather name="plus" size={30} color="#fff" />
                        </View>
                    ),
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',

                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    // tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="map-marker" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Detail"
                component={Detail}
                options={{
                    tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'Detail',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'SearchScreen',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="DetailGastronomia"
                component={DetailGastronomia}
                options={{
                    tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        height: 53,
                        elevation: 0,
                        position: 'absolute',




                    },
                    activeTintColor: '#F80050',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'DetailGastronomia',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator >


    );
}

export default BottomTabsNavigation;

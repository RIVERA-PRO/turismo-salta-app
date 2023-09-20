import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image, TouchableOpacity, ImageBackground, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import LoadingGastronomia from './LoadingGastronomia'; // Cambiado el nombre del componente

export default function AllGastronomia() { // Cambiado el nombre de la función
    const [loading, setLoading] = useState(true);
    const [gastronomia, setGastronomia] = useState([]); // Cambiado el nombre del estado
    const navigation = useNavigation();
    const [noGastronomia, setNoGastronomia] = useState(false); // Cambiado el nombre del estado

    const fetchGastronomia = async () => { // Cambiado el nombre de la función
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.get('https://turismo-salta.onrender.com/gastronomia', { headers }); // Cambiado el nombre de la URL

            if (response.status === 200) {
                const reversedGastronomia = response.data.gastronomias.reverse(); // Cambiado el nombre del array
                setGastronomia(reversedGastronomia); // Cambiado el nombre del estado
                setLoading(false);
                setNoGastronomia(reversedGastronomia.length === 0); // Verifica si no hay publicaciones
                console.log(reversedGastronomia.length);
            } else {
                console.error('Error fetching gastronomia:', response.status);
                showErrorAlert();
            }
        } catch (error) {
            console.error('Error fetching gastronomia:', error);
            setLoading(false);
            // showErrorAlert();
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchGastronomia();
        });

        return () => {
            unsubscribe();
        };
    }, [navigation]);



    const showErrorAlert = () => {
        Alert.alert(
            '¡Ops!',
            'Ha ocurrido un error en la petición',
            [
                {
                    text: 'Aceptar',
                    onPress: () => console.log('Error alert closed'),
                },
            ],
            { cancelable: false }
        );
    };

    const navigateToDetailScreen = (gastronomiaId) => {
        navigation.navigate('DetailGastronomia', { _id: gastronomiaId });
        console.log(gastronomiaId);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <LoadingGastronomia /> // Cambiado el nombre del componente
            ) : (
                <>
                    <ScrollView horizontal={true} style={styles.ScrollView}>
                        {gastronomia?.length === 0 ? (
                            <Text style={styles.textName}></Text>
                        ) : (
                            gastronomia.slice(0, 6).map((gastronomias, index) => ( // Cambiado el nombre del array y las variables
                                <>
                                    <View key={index} style={styles.gastronomiaCard}>
                                        {gastronomias.cover_photo ? (
                                            <TouchableOpacity style={styles.cardGastronomia} onPress={() => navigateToDetailScreen(gastronomias._id)}>
                                                <ImageBackground source={{ uri: gastronomias.cover_photo }} style={styles.contenedorBg}>
                                                    <Text style={styles.textTitle}>{gastronomias.title}</Text>
                                                    <Text style={styles.textDescription}>{gastronomias.description.slice(0, 20)}..</Text>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                </>
                            ))
                        )}
                    </ScrollView>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    contenedorBg: {
        height: 140,
        justifyContent: 'flex-end',
        padding: 10,
    },
    gastronomiaCard: {
        height: 140,
        width: 114,
        marginRight: 10,
        overflow: 'hidden',
        borderRadius: 8,
    },
    textDescription: {
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    textTitle: {
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
});

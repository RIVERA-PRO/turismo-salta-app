import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image, TouchableOpacity, ImageBackground, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import LoadingPublicaciones from './LoadingPublicacines'; // Cambiado el nombre del componente

export default function AllPublicaciones() { // Cambiado el nombre de la función
    const [loading, setLoading] = useState(true);
    const [publicacion, setPublicacion] = useState([]); // Cambiado el nombre del estado
    const navigation = useNavigation();
    const [noPublicaciones, setNoPublicaciones] = useState(false); // Cambiado el nombre del estado

    const fetchPublicaciones = async () => { // Cambiado el nombre de la función
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.get('https://turismo-salta.onrender.com/publicacion', { headers }); // Cambiado el nombre de la URL

            if (response.status === 200) {
                const reversedPublicaciones = response.data.publicaciones.reverse(); // Cambiado el nombre del array
                setPublicacion(reversedPublicaciones); // Cambiado el nombre del estado
                setLoading(false);
                setNoPublicaciones(reversedPublicaciones.length === 0); // Verifica si no hay publicaciones
                console.log(reversedPublicaciones.length);
            } else {
                console.error('Error fetching publicaciones:', response.status);
                showErrorAlert();
            }
        } catch (error) {
            console.error('Error fetching publicaciones:', error);
            setLoading(false);
            // showErrorAlert();
        }
    };


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchPublicaciones();
        });

        return () => {
            unsubscribe();
        };
    }, [navigation]);

    const navigateToPerfilScreen = (user_id) => {
        navigation.navigate('PerfilScreen', { user_id });
    };

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

    const navigateToDetailScreen = (publicacionId) => {
        navigation.navigate('Detail', { _id: publicacionId });
        console.log(publicacionId)
    };



    return (
        <View style={styles.container}>
            {loading ? (

                <LoadingPublicaciones /> // Cambiado el nombre del componente
            ) : (

                <>

                    <ScrollView horizontal={true} style={styles.ScrollView}>
                        {publicacion?.length === 0 ? (
                            <Text style={styles.textName}></Text>
                        ) : (publicacion.slice(0, 6).map((publicaciones, index) => ( // Cambiado el nombre del array y las variables
                            <>

                                <View key={index} style={styles.publicacionCard}>
                                    {publicaciones.cover_photo ? (
                                        <TouchableOpacity style={styles.cardPublicacion} onPress={() => navigateToDetailScreen(publicaciones._id)}>
                                            <ImageBackground source={{ uri: publicaciones.cover_photo }} style={styles.contenedorBg}>
                                                <Text style={styles.textTitle}>{publicaciones.title}</Text>
                                                <Text style={styles.textDescription}>{publicaciones.description.slice(0, 20)}..</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    ) : null}
                                </View></>
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
        marginBottom: 10,

        borderRadius: 10,

    },


    contenedorBg: {
        height: 100,


        justifyContent: 'flex-end',
        padding: 10


    },
    publicacionCard: {
        height: 100,
        width: 240,
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

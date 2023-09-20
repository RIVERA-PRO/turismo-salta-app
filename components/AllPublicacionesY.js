import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, Image, TouchableOpacity, ImageBackground, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';


import LoadingPublicacionesY from './LoadingPublicacionesY'; // Cambiado el nombre del componente

export default function AllPublicacionesY() { // Cambiado el nombre de la función
    const [loading, setLoading] = useState(true);
    const [publicacion, setPublicacion] = useState([]); // Cambiado el nombre del estado
    const navigation = useNavigation();
    const [noPublicaciones, setNoPublicaciones] = useState(false); // Cambiado el nombre del estado
    const [searchTitle, setSearchTitle] = useState('');
    const [filteredPublicacion, setFilteredPublicacion] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Todas'); // Estado para la categoría seleccionada


    const categories = ['Todas', 'Cultura', 'Gastronomia', 'Deporte', 'Naturaleza', 'Infancia', 'Tiendas Y Ferias']; // Lista de categorías


    const fetchPublicaciones = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(
                'https://turismo-salta.onrender.com/publicacion',
                { headers }
            );

            if (response.status === 200) {
                const reversedPublicaciones = response.data.publicaciones.reverse();
                setPublicacion(reversedPublicaciones);
                setLoading(false);
                setNoPublicaciones(reversedPublicaciones.length === 0);
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

    const filterPublicacionesByTitle = () => {
        const filtered = publicacion.filter((publicacion) =>
            publicacion.title.toLowerCase().includes(searchTitle.toLowerCase())
        );
        setFilteredPublicacion(filtered);
    };

    useEffect(() => {
        filterPublicacionesByTitle();
    }, [searchTitle, publicacion]);
    const filterPublicacionesByCategory = () => {
        const filtered =
            selectedCategory === 'Todas'
                ? publicacion
                : publicacion.filter((publicacion) => publicacion.categoria === selectedCategory);
        setFilteredPublicacion(filtered);
    };

    useEffect(() => {
        filterPublicacionesByTitle();
        filterPublicacionesByCategory();
    }, [searchTitle, publicacion, selectedCategory]);

    const filterPublicaciones = () => {
        const filtered =
            selectedCategory === 'Todas'
                ? publicacion
                : publicacion.filter((publicacion) => publicacion.categoria === selectedCategory);
        return filtered.filter((publicacion) =>
            publicacion.title.toLowerCase().includes(searchTitle.toLowerCase())
        );
    };

    useEffect(() => {
        filterPublicacionesByTitle();
        const filtered = filterPublicaciones();
        setFilteredPublicacion(filtered);
    }, [searchTitle, publicacion, selectedCategory]);
    return (
        <View style={styles.container}>

            {loading ? (

                <LoadingPublicacionesY /> // Cambiado el nombre del componente
            ) : (

                <>

                    <ScrollView style={styles.publicacionContainer}>
                        <View style={styles.searchInputFlex}>
                            <AntDesign name="search1" size={18} color='rgba(0, 0, 0, 0.4)' />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Buscar por título"
                                onChangeText={(text) => setSearchTitle(text)}
                                value={searchTitle}
                            />
                        </View>

                        {/* Componente Picker para seleccionar categoría */}
                        <View style={styles.pickerContainer}>

                            <Picker
                                style={styles.picker}
                                selectedValue={selectedCategory}
                                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                            >
                                {categories.map((category, index) => (
                                    <Picker.Item key={index} label={category} value={category} />
                                ))}
                            </Picker>
                        </View>
                        {filteredPublicacion.length === 0 ? (
                            <Text style={styles.textName}>No se encontraron publicaciones.</Text>
                        ) : (
                            filteredPublicacion.map((publicaciones, index) => (
                                <View key={index} style={styles.publicacionCard}>
                                    {publicaciones.cover_photo ? (
                                        <TouchableOpacity
                                            style={styles.cardPublicacion}
                                            onPress={() => navigateToDetailScreen(publicaciones._id)}
                                        >
                                            <ImageBackground
                                                source={{ uri: publicaciones.cover_photo }}
                                                style={styles.contenedorBg}
                                            >
                                                <Text style={styles.textTitle}>{publicaciones.title}</Text>
                                                <Text style={styles.textDescription}>
                                                    {publicaciones.description.slice(0, 20)}..
                                                </Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    ) : null}
                                </View>
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



        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
        borderRadius: 10,
        marginTop: 100,
        padding: 20,


    },
    publicacionContainer: {
        flexDirection: 'column',
        gap: 10,

        width: '100%'
    },

    contenedorBg: {
        height: 120,
        justifyContent: 'flex-end',
        padding: 10
    },
    publicacionCard: {
        height: 120,
        overflow: 'hidden',
        borderRadius: 10,
        marginTop: 20
    },
    textDescription: {
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        fontSize: 16
    },
    textTitle: {
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        fontSize: 20
    },
    searchInput: {
        paddingHorizontal: 10,

        width: '100%'
    },
    searchInputFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
    },
    pickerContainer: {
        backgroundColor: '#f2f2f2',
        borderRadius: 15,

        marginBottom: 10,
    }

});

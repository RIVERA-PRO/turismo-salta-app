import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Text, TouchableOpacity, Image, Dimensions, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/HeaderBlanco';
import { Animated, Easing } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';
import { FontAwesome } from '@expo/vector-icons';
import LoadingDetail from '../components/LoadingDetail';

export default function Detail() {
    const isFocused = useIsFocused();
    const [activeSlide, setActiveSlide] = useState(0);

    const [animationValue] = useState(new Animated.Value(0));
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const startAnimation = () => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    useFocusEffect(
        React.useCallback(() => {
            startAnimation();
            return () => {
                animationValue.setValue(0);
            };
        }, [])
    );

    const translateY = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0],
    });

    const route = useRoute();
    const { _id } = route.params;
    const [gastronomia, setGastronomia] = useState(null);

    // Supongamos que tienes una función para cargar los detalles de la gastronomía con el _id
    const cargarDetalleGastronomia = async (_id) => {
        try {
            // Llama a la API o realiza la consulta para obtener los detalles de la gastronomía
            const response = await fetch(`https://turismo-salta.onrender.com/gastronomia/${_id}`);
            const data = await response.json();
            setGastronomia(data.gastronomia);
        } catch (error) {
            console.error('Error al cargar el detalle de la gastronomía:', error);
        }
    };

    useEffect(() => {
        cargarDetalleGastronomia(_id);
    }, []);

    useEffect(() => {
        // Verificar si el _id se encuentra en los params de la ruta
        if (route.params && route.params._id) {
            // Si se encuentra, cargar los detalles de la gastronomía
            cargarDetalleGastronomia(route.params._id);
        }
    }, [route.params]);

    const handleImagePress = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    };

    const openImageModal = (imageURL) => {
        setSelectedImage(imageURL);
        setModalVisible(true);
    };

    const closeImageModal = () => {
        setSelectedImage('');
        setModalVisible(false);
    };

    return (
        <View contentContainerStyle={styles.scrollContainer2}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Animated.View style={[{ transform: [{ translateY }] }]}>
                    {gastronomia ? (
                        <>
                            <Carousel
                                data={gastronomia ? [
                                    { uri: gastronomia.cover_photo },
                                    { uri: gastronomia.cover_photo1 },
                                    { uri: gastronomia.cover_photo2 },
                                    { uri: gastronomia.cover_photo3 },
                                ].filter(item => item.uri && item.uri.trim() !== '') : []}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => openImageModal(item.uri)}>
                                        <Image source={{ uri: item.uri }} style={styles.coverImage} />
                                    </TouchableOpacity>
                                )}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={Dimensions.get('window').width}
                                onSnapToItem={(index) => setActiveSlide(index)}
                            />

                            {gastronomia && (
                                <Pagination
                                    dotsLength={
                                        [gastronomia.cover_photo, gastronomia.cover_photo1, gastronomia.cover_photo2, gastronomia.cover_photo3]
                                            .filter(uri => uri && uri.trim() !== '')
                                            .length
                                    }
                                    activeDotIndex={activeSlide}
                                    containerStyle={styles.paginationContainer}
                                    dotStyle={styles.paginationDot}
                                    inactiveDotStyle={styles.paginationInactiveDot}
                                />
                            )}

                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{gastronomia.title}</Text>

                                <Text style={styles.description}>{gastronomia.description}</Text>
                                <View style={styles.ubicacionFlex}>
                                    <FontAwesome name="map-marker" size={20} color="#F80050" />
                                    <Text style={styles.ubicacion}> {gastronomia.ubicacion}</Text>
                                </View>
                            </View>
                        </>
                    ) : (
                        <LoadingDetail />
                    )}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(false);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                            <ImageViewer
                                imageUrls={[{ url: selectedImage }]}
                                enableSwipeDown={true}
                                onSwipeDown={closeImageModal}
                                style={styles.modalImage}
                            />
                        </View>
                    </Modal>
                </Animated.View>
                <View style={styles.espacio}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#ffff',
        marginTop: 100,
    },
    espacio: {
        height: 150
    },
    coverImage: {
        height: 200,
        width: '100%',
        objectFit: 'cover'
    },
    modalContainer: {
        backgroundColor: '#000',
        height: '100%',
        justifyContent: 'center'
    },
    modalImage: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },
    closeButtonText: {
        color: '#fff',
        padding: 10,
        fontWeight: 'bold'
    },
    closeButton: {
        width: '100%',
        left: '90%',
    },
    textContainer: {
        padding: 10,
        flexDirection: 'column',
        gap: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    ubicacionFlex: {
        flexDirection: 'row',
        gap: 5
    }
});

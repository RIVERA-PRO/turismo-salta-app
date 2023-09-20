import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imagen from '../assets/gastronomia.png';
import imagen2 from '../assets/Cloud.png';
import { AntDesign } from '@expo/vector-icons';

export default function Empieza() {
    const [selectedImage, setSelectedImage] = useState(imagen); // Inicia con la primera imagen
    const navigation = useNavigation();


    const handleImagePress = () => {
        navigation.navigate('AllPublicacionesScreen');
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleImagePress}>

            <ImageBackground source={imagen} style={styles.image} />
            <View style={styles.deColumnText}>
                <Text style={styles.Title}>CONOCE NUESTRA GRASTRONOMIA</Text>

                <View style={styles.deFlex}>
                    <Text style={styles.text}>SALTA CAPITAL SIEMPRE</Text>
                    <AntDesign name="right" size={15} color="#fff" />
                </View>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 10,
        height: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: '#F80050',
        marginHorizontal: 10,


    },
    image: {
        width: 70,
        height: 70,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 8,
        overflow: 'hidden',

    },
    deColumnText: {
        padding: 10,
        paddingRight: 0,
        gap: 5
    },
    text: {
        color: '#fff',

    },
    Title: {
        color: '#fff',
        fontWeight: 'bold'
    },
    deFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'space-between'
    }
});

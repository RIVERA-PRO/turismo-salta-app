import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imagen from '../assets/gastronomia.png';
import imagen2 from '../assets/Cloud.png';
import { AntDesign } from '@expo/vector-icons';

export default function Empieza() {
    const [selectedImage, setSelectedImage] = useState(imagen); // Inicia con la primera imagen
    const navigation = useNavigation();


    const handleScreen = () => {
        navigation.navigate('SearchScreen');
    };

    return (
        <TouchableOpacity style={styles.searchInputFlex} onPress={handleScreen}>


            <AntDesign name="search1" size={18} color='#fff' style={styles.icon} />
            <Text style={styles.Text}>Buscar</Text>


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    searchInputFlex: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 10,
        height: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        padding: 5,
        gap: 20,
        marginBottom: 10,
        borderColor: '#000',
        borderWidth: 0.2,
        marginTop: 10


    },
    icon: {
        backgroundColor: '#F80050',
        padding: 10,
        borderRadius: 8,
    },
    Text: {
        color: 'rgba(0, 0, 0, 0.5)',
    }


});

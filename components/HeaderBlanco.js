import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import image from '../assets/Cloud.png'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import logo from '../assets/logo.png';
import Modal from 'react-native-modal';

export default function Header() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const navigation = useNavigation();

    const goToHome = () => {
        navigation.navigate('Home');
        setModalVisible(false);
    };




    const openLinkedInProfile = () => {
        const linkedInURL = 'https://www.linkedin.com/in/juan-rivera-9ba866215/'; // Reemplaza con tu URL de LinkedIn
        Linking.openURL(linkedInURL);
    };

    const openWebsite = () => {
        const websiteURL = 'https://www.juan-rivera-developer.net'; // Reemplaza con tu URL del sitio web
        Linking.openURL(websiteURL);
    };

    const openWhatsAppChat = () => {
        const phoneNumber = '1234567890'; // Reemplaza con tu número de teléfono
        const whatsappURL = `https://wa.me/qr/AHQDYWM7EKATH1`;
        Linking.openURL(whatsappURL);
    };

    const handleRemoveName = async () => {
        try {
            await AsyncStorage.removeItem('Actividades');
            console.log('Name removed successfully');
            setName('');
        } catch (error) {
            console.error('Error removing name:', error);
        }
    };
    useEffect(() => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();

        if (currentHour >= 6 && currentHour < 13) {
            setGreeting('Buenos días');
        } else if (currentHour >= 13 && currentHour < 19) {
            setGreeting('Buenas tardes');
        } else {
            setGreeting('Buenas noches');
        }
    }, []);
    return (
        <LinearGradient colors={['#F80050', '#F80050',]} style={styles.container} start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>


            <View >


                <View style={styles.logoContainer} >
                    <TouchableOpacity onPress={goToHome} style={styles.logoContainer} >
                        <Image source={logo} style={styles.logo} />
                        <Text style={styles.logoText}>Turismo Salta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal}>
                        <EvilIcons name="navicon" size={24} color="#ffff" />
                    </TouchableOpacity>
                </View>





                <Modal
                    isVisible={isModalVisible}
                    animationIn="slideInLeft"
                    animationOut="slideOutLeft"
                    swipeDirection="left"
                    onSwipeComplete={toggleModal}
                    onBackdropPress={toggleModal}
                    style={styles.modal}
                >


                    <View style={styles.modalContent} >

                        <Image source={image} style={styles.img} />
                        <View style={styles.navBtns}>
                            <TouchableOpacity onPress={goToHome} style={styles.btnNav}>
                                <FontAwesome name="home" size={20} color='#F80050' />
                                <Text style={styles.buttonText}>Home</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={toggleModal} style={styles.btnNav}>
                                <MaterialIcons name="logout" size={20} color="#F80050" />
                                <Text style={styles.buttonText}>Cerrar</Text>
                            </TouchableOpacity>
                            <Text style={styles.logoDate}>{greeting}</Text>
                            <Text style={styles.text}>Contacto del desarrollador</Text>
                            <View style={styles.social}>
                                <TouchableOpacity onPress={openLinkedInProfile} style={styles.btnNav}>
                                    <FontAwesome name="linkedin" size={20} color="#F80050" />

                                </TouchableOpacity>
                                <TouchableOpacity onPress={openWebsite} style={styles.btnNav}>
                                    <FontAwesome name="globe" size={20} color="#F80050" />

                                </TouchableOpacity>
                                <TouchableOpacity onPress={openWhatsAppChat} style={styles.btnNav}>
                                    <FontAwesome name="whatsapp" size={20} color="#F80050" />

                                </TouchableOpacity>

                            </View>
                        </View>


                    </View>

                </Modal>
            </View>
        </LinearGradient>
    );
}

const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};

const styles = StyleSheet.create({
    container: {

        paddingHorizontal: 10,
        flexDirection: 'column',
        padding: 20,
        height: 100,
        paddingTop: 60,
        justifyContent: 'center',

        width: '100%',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1,


    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
        padding: 2,
    },
    logo: {
        width: 20,
        height: 20,


    },
    logoText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    logoDate: {
        color: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        fontSize: 17,
        fontWeight: 'bold',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 5,

    },
    buttonText: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontWeight: 'bold',

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',

    },
    modalContent: {
        backgroundColor: '#fff',

        overflow: 'hidden',
        width: '80%',
        height: '100%',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10

    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    img: {
        width: '100%',
        height: 160,
        objectFit: 'cover'
    },
    navBtns: {
        marginTop: 30
    },

    btnNav: {
        flexDirection: 'row',
        gap: 10,
        borderRadius: 8,
        padding: 10,
        margin: 9,
        borderBottomWidth: 0.3,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    social: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',

    },
    text: {
        textAlign: 'center',
        marginTop: 160
    },
    modal: {
        margin: 0,

    }
});

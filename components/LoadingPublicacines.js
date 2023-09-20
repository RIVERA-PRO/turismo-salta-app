import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, Modal, ScrollView } from 'react-native';


export default function LoadingPublicacines() {

    return (
        <ScrollView horizontal={true}>
            <View style={styles.card}>
                <View>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                </View>
            </View>
            <View style={styles.card}>
                <View>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                </View>
            </View>
            <View style={styles.card}>
                <View>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                </View>
            </View>
            <View style={styles.card}>
                <View>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                </View>
            </View>
            <View style={styles.card}>
                <View>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                </View>
            </View>
            <View style={styles.card}>
                <View>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text2}></Text>
                </View>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({



    card: {
        backgroundColor: '#000',

        flexDirection: 'column',
        gap: 20,
        paddingVertical: 10,
        padding: 10,

        borderRadius: 10,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        height: 100,
        flex: 1,
        justifyContent: 'flex-end',
        marginRight: 10,
        width: 240,
    },

    text: {
        height: 20,
        width: 200,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        borderRadius: 6,
        margin: 2
    },
    text2: {
        height: 10,
        width: 160,
        backgroundColor: 'rgba(36, 116, 225,0.1)',
        borderRadius: 6,
        margin: 2

    },



})

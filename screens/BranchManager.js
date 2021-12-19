import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function BranchManager() {

    function navigateToScanner() {
        navigation.navigate('Scanner')
    }
    return (
        <View>
            <TouchableOpacity style={styles.Button} onPress={navigateToScanner}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Log In</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Button:{
        width: '90%',
        color: '#000',
        height: 52,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

})


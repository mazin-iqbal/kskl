import React, {useState} from 'react'
import { TouchableOpacity,View, Text, Button, Image, TextInput, StyleSheet, KeyboardAvoidingView  } from 'react-native'
import { collection, addDoc } from "firebase/firestore"; 
import { auth } from "../firebase.js"
import { db } from "../firebase.js"
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp( {navigation} ) {

    function navigate() {
        navigation.navigate('Login');
    }
    const [isSignedIn, setIsSignedIn] = useState(false)
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
          
         async function RegisterUser () {
          await createUserWithEmailAndPassword(auth, email, password)
           .then((userCredential) => {

               const user = userCredential.user;
               const uid = user.uid

            try {
                const docRef = addDoc(collection(db, "users"), {
                  uid: uid,
                  userType: "user",
                  email: email
                });

                console.log("Document written with ID: ", docRef.id);
              }
               catch (e) {
                console.error("Error adding document: ", e);
              }
               setIsSignedIn(true);
               navigate()
            console.log(userCredential)
     })
         .catch(error => alert(error.message))
       }
        return (
        <View style={styles.mainView}>
            <View style={styles.TopView}>
                 {/* <Image style={styles.ImageStyle} source={require('../images/4672500.png')} />  */}
            </View>

            <View style={styles.BottomView}>
                <Text style={styles.Heading}>
                    Welcome
                    
                </Text>
           <View style={styles.FormView}>
                <TextInput placeholder={'Email address'} style={styles.TextInput} onChangeText={text=>{setEmail(text)}}/>
                <TextInput placeholder={'Password'} secureTextEntry={true} style={styles.TextInput} onChangeText={text=>{setPassword(text)}}/>
                    <TouchableOpacity style={styles.Button} onPress={RegisterUser}>
                        <Text  style={{fontWeight: 'bold', fontSize:18}}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={{marginTop:15}}>Already have an account?</Text>
                    <TouchableOpacity style={styles.Button1} onPress={navigate}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Log In</Text>
                    </TouchableOpacity>
           </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
        marginTop:30,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TopView:{
        width: '100%',
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BottomView:{
        width: '100%',
        height: '100%',
        backgroundColor: '#32CD32',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    ImageStyle:{
        width: '10%',
        resizeMode: 'contain'
    },
    Heading:{
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 20,
    },
    FormView:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20
    },
    TextInput:{
        width: '90%',
        borderWidth: 1,
        borderColor: "#fff",
        height: 52,
        borderRadius: 10,
        paddingLeft: 15,
        marginTop: 14,
        color: "black"
    },
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
    Button1:{
        width: '90%',
        height: 52,
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: 7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

})

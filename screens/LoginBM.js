import React, {useState, useEffect} from 'react';
import { TouchableOpacity,View, Text, Button, Image, TextInput, StyleSheet, ScrollView} from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, query } from "../firebase"
import { db } from "../firebase.js"
import { where } from '../firebase.js'
import { getDocs, collection } from '../firebase.js'



export default function LoginBM( {navigation} ) {

    // useEffect(() => {
    //     onAuthStateChanged(auth, async (user) => {
    //         if (user) {

    //         }
    //     })
    // })

    function navigate() {
        navigation.navigate('SignUp');
    }

    function navigateToBranchManager() {
        navigation.navigate('BranchManager')
    }
    
    function navigateToDashboard() {
        navigation.navigate('Dashboard');
    }
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function LoginUser(){
        await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
      
                navigateToBranchManager();
           // }
            // else {
            //     navigateToBranch();
            // }
           //     });
        // console.log(user);
      })
    //   .then(() => {
    //     onAuthStateChanged(auth, async (user) => {
    //       if (user) {
    //         const uid = user.uid;
    //         const q = query(
    //           collection(db, "users"),
    //           where("users", "==", uid)
    //         );
    //         const querySnapshot = await getDocs(q);
    //         // console.log("query console", querySnapshot);

    //         querySnapshot.forEach((doc) => {
    //           // console.log(doc.id, " => ", doc.data());
    //           getUserData(doc.data());
    //           if (doc.data().userType === "user") {
                
    //             navigateToDashboard();
    //             // console.log("true condition matched");
    //           } else if (doc.data().userType === "BranchManager") {
    //           navigateToBranch();
    //           }
    //         });
    //       } else {
    //         // User is signed out
    //         // ...
    //       }
    //     });
    //   })
    //    await signInWithEmailAndPassword(auth, email, password)
    //    .then((userCredential)=> {
    //        const user = userCredential.user;
    //        console.log(user)
    //        navigateToDashboard();
        //    onAuthStateChanged(auth, async (user) => {
        //     if (user) {
        //       // User is signed in, see docs for a list of available properties
        //       // https://firebase.google.com/docs/reference/js/firebase.User
        //       const uid = user.uid;
        //       const q = query(collection(db, "users"), where("uid", "==", uid));

        //         const querySnapshot = await getDocs(q);
        //         querySnapshot.forEach((doc) => {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //         });

        //       // ...
        //     } else {
        //       // User is signed out
        //       // ...
        //     }
        //   });

     //  })
        // .then(() => {

        
            // onAuthStateChanged(auth, async (user) => {
            //     if (user) {
            //        // navigateToDashboard();
            //        // const uid = user.uid;
            //         // const querySnapshot = await getDocs(collection(db, "users"),where("uid", "=", uid));
            //         //         querySnapshot.forEach((doc) => {
            //         //         console.log(`${doc.id} => ${doc.data()}`);
            //         //         });

            //         // const user = userCredential.user;
            //         const uid = user.uid;
            //         const q = query(
            //            collection(db, "users"),
            //           where("uid", "=", uid)
            //              );
                    
            //         const querySnapshot = await getDocs(q);

            //      querySnapshot.forEach((doc) => {
            //             if (doc.data().userType === "user") {
            //                  navigateToDashboard();

            //              } else {
            //                 navigateToBranch();

            //            }
                      
            //          });

            //         // ...
            //     } else {
            //        // User is signed out
            //        // ...
            //         console.log("ELSE");
            //     }
            //     });
        
           
            // setIsSignedIn(true);
            
           
//   })
      .catch(error => alert(error.message))
    }


       
        return (
            // <ScrollView>
        <View style={styles.mainView}>
            <View style={styles.TopView}>
                 <Image style={styles.ImageStyle} source={require('../assets/LogoKhanaSabkliye-01.png')} /> 
            </View>

            <View style={styles.BottomView}>
                <Text style={styles.Heading}>
                    Welcome{'\n'}
                    back
                </Text>
           <View style={styles.FormView}>
                <TextInput placeholder={'Email address'} style={styles.TextInput} onChangeText={text=>{setEmail(text)}}/>
                <TextInput placeholder={'Password'} secureTextEntry={true} style={styles.TextInput} onChangeText={text=>{setPassword(text)}}/>
                    <TouchableOpacity style={styles.Button}  onPress={LoginUser}>
                        <Text  style={{fontWeight: 'bold', fontSize:18}}>Sign In</Text>
                    </TouchableOpacity>

                    <Text style={{marginTop:15}}>Don't have an account?</Text>

                    <TouchableOpacity style={styles.Button1} onPress={navigate}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Button1} onPress={navigateToLoginBM}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Sign Up</Text>
                    </TouchableOpacity>

                    
                  
                  
           </View>
            </View>
        </View>
        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TopView:{
        width: '100%',
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BottomView:{
        width: '100%',
        height: '80%',
        backgroundColor: '#32CD32',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    ImageStyle:{
        width: '40%',
        resizeMode: 'contain'
    },
    Heading:{
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 60,
    },
    FormView:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40
    },
    TextInput:{
        width: '90%',
        borderWidth: 1,
        borderColor: "black",
        height: 52,
        borderRadius: 10,
        paddingLeft: 15,
        marginTop: 20,
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

import React,{useState} from 'react'
import { View, Text, TouchableOpacity,StyleSheet,TextInput,Image } from 'react-native';
import {addDoc, collection, db} from '../firebase'


export default function Form({route, navigation}) {

    const { location } = route.params;
    const { userInfo } = route.params;
    console.log("userINfo in Form",userInfo);
    console.log("UID in Form",userInfo.uid);
    const uid = userInfo.uid
    console.log("UID ONCE AGAIN: ", uid)

    const [name, setName] = useState('');
    const [fname, setFname] = useState('');
    const [cnic, setCnic] = useState('');
    const [fm, setfm] = useState('');
    const [ncome, setIncome] = useState('');
    const [userId, setUserId] = useState('');

    



    
    function Submit (){
        const docRef = addDoc(collection(db, "form"), {
         name: name,
         fname: fname,
         cnic: cnic,
         fm: fm,
         ncome: ncome,
         uid: uid
        });
    navigation.navigate('QrCode')
}
    return (
        <View style={styles.mainView}>
        {/* <View style={styles.TopView}>
             <Image style={styles.ImageStyle} source={require('../assets/LogoKhanaSabkliye-01.png')} /> 
        </View> */}

        <View style={styles.BottomView}>
            <Text style={styles.Heading}>
              APPLICATION FORM
            </Text>
            <Text style={styles.locText}>Your closest branch is: {location}</Text>
            {/* <Text style={styles.locText}>UserInfo: {userInfo}</Text> */}

       <View style={styles.FormView}>
            <TextInput placeholder={'name'} style={styles.TextInput} onChangeText={text=>{setName(text)}}/>
            <TextInput placeholder={'Fathers name'} style={styles.TextInput} onChangeText={text=>{setFname(text)}}/>
            <TextInput placeholder={'Cnic'} style={styles.TextInput} onChangeText={text=>{setCnic(text)}}/>
            <TextInput placeholder={'No. of family members'} style={styles.TextInput} onChangeText={text=>{setfm(text)}}/>
            <TextInput placeholder={'Monthly Income'} style={styles.TextInput} onChangeText={text=>{setIncome(text)}}/>
            <TouchableOpacity style={styles.Button1} onPress={Submit}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Submit</Text>
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
    height: '0%',
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
locText: {
    fontSize: 25,
    textAlign: 'center'
},
// Button:{
//     width: '90%',
//     color: '#000',
//     height: 52,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginTop: 20,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center'
// },
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

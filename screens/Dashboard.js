import * as React from 'react';
import { useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Dimensions  } from 'react-native'
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js"
import * as Location from 'expo-location';
import { getDistance, getPreciseDistance } from 'geolib';
import { connectStorageEmulator } from 'firebase/storage';





export default function Dashboard({route, navigation}) {
  const { userInfo } = route.params;
  console.log("userRecieved on Dash: ", userInfo)

 
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [locationName, setLocationName] = useState(null)

  const foodBank =  [
      {
          "branch_name": "Aliabad",
          "latitude": 24.9200172,
          "longitude": 67.0612345
      },
      {
          "branch_name": "Numaish chowrangi",
          "latitude": 24.8732834,
          "longitude": 67.0337457
      },
      {
          "branch_name": "Saylani house phase 2",
          "latitude": 24.8278999,
          "longitude": 67.0688257
      },
      {
          "branch_name": "Touheed commercial",
          "latitude": 24.8073692,
          "longitude": 67.0357446
      },
      {
          "branch_name": "Sehar Commercial",
          "latitude": 24.8138924,
          "longitude": 67.0677652
      },
      {
          "branch_name": "Jinnah avenue",
          "latitude": 24.8949528,
          "longitude": 67.1767206
      },
      {
          "branch_name": "Johar chowrangi",
          "latitude": 24.9132328,
          "longitude": 67.1246195
      },
      {
          "branch_name": "Johar chowrangi 2",
          "latitude": 24.9100704,
          "longitude": 67.1208811
      },
      {
          "branch_name": "Hill park",
          "latitude": 24.8673515,
          "longitude": 67.0724497
      }
  ]
    




    useEffect(() => {
      (async () => {
        setTimeout(() => {
          setIsLoading(true);
         }, 6000);
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log('location: ', location)
        var distanceArray = []
        foodBank.map((loc, index) => {
          const bankLatitude = loc.latitude;
          const bankLongitude = loc.longitude;
          // console.log("Bank Latitude: ", bankLatitude);
          // console.log("Bank Longitude: ", bankLongitude);
          var dis = getDistance(
            { latitude: location.coords.latitude, longitude: location.coords.longitude },
            { latitude: bankLatitude, longitude: bankLongitude }
          );
          const distanceObject = {placeName: loc.branch_name,
              distance: dis
          };
          distanceArray.push(distanceObject)
          console.log("distanceArray: ", distanceArray)
          console.log("distance: ", dis);
          console.log("index: ", index)
      })
      var lowest = Number.POSITIVE_INFINITY;
        for (var i=distanceArray.length-1; i>=0; i--) {
            var checkDis = distanceArray[i].distance;
            console.log("checkDis: ", checkDis)
            if (checkDis < lowest){
            var lowest = checkDis;
            setLocationName(distanceArray[i].placeName);
            

          }
        }
        console.log("lowest distance is: ", lowest);
        console.log("closest spot is", locationName)
        setIsLoading(false);

      })();
    }, []);
  
    let gotLocation = "";
    if (locationName) {
      gotLocation = locationName
    }

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
  
    }

    
    // const calculateDistance = () => {
     
    // }
    function navigateToLogin() {
      navigation.navigate('Login');
  }

      const SignOut =() => {
        signOut(auth)
        .then(()=>
        {
            navigateToLogin();
  })
      .catch(error => alert(error.message))
    }

     function navigateToForm() {
   navigation.navigate('Form', {location: gotLocation, userInfo: userInfo})
   }
return isLoading ? (
  <View>
      <MapView style={styles.map2}
      initialRegion={{
        latitude:location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.322,
        longitudeDelta: 0.0521,
      }}
      >
       <Marker coordinate={{ latitude : location.coords.latitude , longitude : location.coords.longitude }} /> 
       {foodBank.map((marker, index) => (
    <Marker
      key={index}
      coordinate={{ latitude : marker.latitude , longitude : marker.longitude }}
      image={require('../assets/saylani-welfare-international-trust-logo.png')}
     title={marker.branch_name}
   />
   
  ))}
         </MapView> 
         <Text style={styles.locateText}>Closest Branch of Saylani to you is {gotLocation}</Text>

        <View style={styles.Bottom}>

      <TouchableOpacity style={styles.Button} onPress={SignOut}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Sign Out</Text>
       </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={navigateToForm}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Proceed To Form</Text>
       </TouchableOpacity>
       </View>

       </View>
    ) : (<View style={styles.container}>
       <MapView style={styles.map}/>
       <Text style={styles.locateText}>Fetching Closest Branch.. </Text>

       <View style={styles.Bottom}>
       <TouchableOpacity style={styles.Button} onPress={SignOut}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Sign Out</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.Button} onPress={navigateToForm} disabled={true} >
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Proceed to Form</Text>
       </TouchableOpacity>
       </View>
   {/* <Text style={styles.paragraph}>{text}</Text>  */}
</View>)





  //   if (Location.length === 0) {
  //     return (
  //       <View>LOADING</View>
  //     )
      
  //     }
    
  // else{
  //   return (
  //     <View style={styles.container}>
  //         <MapView style={styles.map} />

  //        {/* <Text style={styles.paragraph}>{text}</Text>  */}
  //     </View>
  //   );
  // }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: "85%",
      alignItems: "flex-start"
    },
    map2: {
      width: Dimensions.get('window').width,
      height: "80%",
      alignItems: "flex-start"
    },
    lottie: {
      width: 100,
      height: 100
    },
    Button:{
              width: '45%',
              color: '#000',
              height: 52,
              backgroundColor: 'black',
              borderRadius: 10,
              marginTop: 20,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center'
          },
      Bottom:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around'
      },
      locateText: {
        color: 'white', 
        textAlign: 'center',
        fontSize: 25,
        marginTop: 10,
        marginLeft: 6,
        marginRight: 6,
      }
  });



  //   const [location, setLocation] = useState(null);
  //   const [errorMsg, setErrorMsg] = useState(null);
    

  //   useEffect(() => {
  //       (async () => {
  //         let { status } = await Location.requestForegroundPermissionsAsync();
  //         if (status !== 'granted') {
  //           setErrorMsg('Permission to access location was denied');
  //           return;
  //         }
    
  //         let location = await Location.getCurrentPositionAsync({});
  //         setLocation(location);
  //       //   setLocationCoords(location.coords)
  //       //   console.log("location-coords: ", location.coords)
  //       //   console.log("location-coords-latitute: ", location.coords.latitude)
  //       //   console.log("location-coords-longitude: ", location.coords.longitude)
  //       })();
  //     }, []);
    
  //     let text = 'Waiting..';
  //     if (errorMsg) {
  //       text = errorMsg;
  //     } else if (location) {
  //       //   console.log("location: ", location)
  //       text = JSON.stringify(location);
  //       // console.log("text: ", text)
  //       // console.log("text-coord: ", JSON.parse(text))

  //     }

  //   function navigateToLogin() {
  //       navigation.navigate('Login')

  //   }
  //   function navigateToForm() {
  //       navigation.navigate('Form')
  //   }

  //   const SignOut =() => {
  //       signOut(auth)
  //       .then(()=>
  //       {
  //           navigateToLogin();
  // })
  //     .catch(error => alert(error.message))
  //   }
  //   return (
  //       <View style={styles.container}>
  //         <MapView style={styles.map}/>
  //              {/* <Marker
  //                           coordinate={{ latitude : int(locationCoords.latitude) , longitude : int(locationCoords.longitude)}}/> */}
            
  //           {/* <TouchableOpacity style={styles.Button1} onPress={navigateToForm}>
  //                       <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Form</Text>
  //                   </TouchableOpacity>
  //       <TouchableOpacity style={styles.Button} onPress={SignOut}>
  //        <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Sign Out</Text>
  //          </TouchableOpacity> */}
  //     </View>
        // <ScrollView>
    //     <View style={styles.mainView}>
    //     <View style={styles.TopView}>
    //          <Image style={styles.ImageStyle} source={require('../assets/LogoKhanaSabkliye-01.png')} /> 
    //     </View>

    //     <View style={styles.BottomView}>
    //         <Text style={styles.Heading}>
    //            DASHBOARD
    //         </Text>
    //    <View style={styles.FormView}>
    //    <Text style={styles.paragraph}>{text}</Text>

    //         <TextInput placeholder={'Email address'} style={styles.TextInput}/>
    //         <TextInput placeholder={'Password'} secureTextEntry={true} style={styles.TextInput} />
    //             {/* <TouchableOpacity style={styles.Button}>
    //                 <Text  style={{fontWeight: 'bold', fontSize:18}}>Sign In</Text>
    //             </TouchableOpacity>
    //             <Text style={{marginTop:15}}>Don't have an account?</Text>
    //             <TouchableOpacity style={styles.Button1} >
    //                 <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Sign Up</Text>
    //             </TouchableOpacity> */}
              
    //    </View>
    //     </View>
    //     <View>
    //         <TouchableOpacity style={styles.Button} onPress={SignOut}>
    //                     <Text style={{color: '#fff', fontWeight: 'bold', fontSize:18}}>Sign Out</Text>
    //         </TouchableOpacity>
    //     </View>

    // </View>
    //</ScrollView> 
        
  //  )
    
     
//}

// const styles = StyleSheet.create({
//     Button:{
//         width: '90%',
//         color: '#000',
//         height: 52,
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         marginTop: 20,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     mainView:{
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     TopView:{
//         width: '100%',
//         height: '20%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     BottomView:{
//         width: '100%',
//         height: '80%',
//         backgroundColor: '#32CD32',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30
//     },
//     ImageStyle:{
//         width: '40%',
//         resizeMode: 'contain'
//     },
//     Heading:{
//         color: 'black',
//         fontSize: 40,
//         fontWeight: 'bold',
//         marginLeft: 30,
//         marginTop: 60,
//     },
//     FormView:{
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginTop: 40
//     },
//     TextInput:{
//         width: '90%',
//         borderWidth: 1,
//         borderColor: "black",
//         height: 52,
//         borderRadius: 10,
//         paddingLeft: 15,
//         marginTop: 20,
//         color: "black"
//     },
//     Button1:{
//         width: '90%',
//         height: 52,
//         backgroundColor: 'black',
//         borderRadius: 10,
//         marginTop: 7,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     }

// })
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as React from 'react';
import { useState } from 'react/cjs/react.development';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';



export function enterDetails() {

    const navigation = useNavigation();
    const [address, setAddress] = useState('http://open.mapquestapi.com/geocoding/v1/address?key=saD6wA8skX1MAzw7nKIyqh9LhoxZ0a46&location=24849+NE+2nd+CT,Sammamish,Washington,98074')
    const [lat, setLat] = useState("null")
    const [long, setLong] = useState("null")
    const [energy, setEnergy] = useState("0")
    const [PR, setPR] = useState("0.75")
    const [H, setH] = useState("0")
    const [Area, setArea] = useState("106")
    const [r, setr] = useState("18")
    const [street, setStreet] = useState("null")
    const [city, setCity] = useState("null")
    const [state, setState] = useState("null")
    const [postal, setPostal] = useState("null")
    const [currentCost, setCurrentCost] = useState("null")
    const [currentUsage, setCurrentUsage] = useState("null")
    const costPerK = 0
    const map = new Map()
    map.set("AL",13706)
    map.set("AK",13454)
    map.set("AZ",13680)
    map.set("AR",14713)
    map.set("CA",15240)
    map.set("CO",17100)
    map.set("CT",15540)
    map.set("DE",15300)
    map.set("DC",15720)
    map.set("FL",13920)
    map.set("GA",15840)
    map.set("HI",19560)
    map.set("ID",17100)
    map.set("IL",16740)
    map.set("IN",15300)
    map.set("IA",14160)
    map.set("KS",13353)
    map.set("KY",13101)
    map.set("LA",15660)
    map.set("ME",16073)
    map.set("MD",15540)
    map.set("MA",16440)
    map.set("MI",16020)
    map.set("MN",17280)
    map.set("MS",14763)
    map.set("MO",14461)
    map.set("MT",16560)
    map.set("NE",15820)
    map.set("NV",14760)
    map.set("NH",17460)
    map.set("NJ",14520)
    map.set("NM",16680)
    map.set("NY",15900)
    map.set("NC",14040)
    map.set("ND",13555)
    map.set("OH",14400)
    map.set("OK",14667)
    map.set("OR",15060)
    map.set("PA",15420)
    map.set("RI",16200)
    map.set("SC",16500)
    map.set("SD",13535)
    map.set("TN",13909)
    map.set("TX",14820)
    map.set("UT",15420)
    map.set("VT",16620)
    map.set("VA",15780)
    map.set("WA",14040)
    map.set("WV",14763)
    map.set("WI",17580)
    map.set("WY",14360)

    
    function getDNI() {
        getcoords()
        var axios = require("axios").default;
        var options = {
          method: 'GET',
          url: 'https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=0mnx2OSLok4UiEoaajb0fh4j2YoFOznGfGHZS78j&lat=' +lat + '&lon=' + long,
          
        };
    
        axios.request(options).then(function (response) {
            
          setH(response.data.outputs.avg_dni.annual)
          
    
    
        }).catch(function (error) {
          console.error(error);
        });
    }
    
    function getcoords() {
        
        setAddress('http://open.mapquestapi.com/geocoding/v1/address?key=saD6wA8skX1MAzw7nKIyqh9LhoxZ0a46&location='+ street +',' + city + ',' + state + ',' + postal)
        var axios = require("axios").default;
        var options = {
          method: 'GET',
          url: address,
          
        };
    
        axios.request(options).then(function (response) {
            console.log(response)
            setLat(response.data.results[0].locations[0].latLng.lat);
            setLong(response.data.results[0].locations[0].latLng.lng);
            
    
    
        }).catch(function (error) {
          console.error(error);
        });
    }
    
    function calculateEnergy() {
    
        getDNI()
        
        setEnergy(Area*r*H*PR)
        
    
    }
    function nextScreen() {
        
        calculateEnergy()
        console.log(energy)
        navigation.navigate("Return On Investment",{
            state: map.get(state),
            energy: energy/12,
            usage: currentUsage,
            cost: currentCost,
        })

    }
    
    return(
        <View style={styles.container}>
      
            <Text> Address </Text>    
            <TextInput style={styles.input} 

                onChangeText={(val) => setStreet(val)}
            />
            <Text> City </Text>    
            <TextInput style={styles.input} 

                onChangeText={(val) => setCity(val)}
            />
            <Text> State </Text>    
            <TextInput style={styles.input} 

                onChangeText={(val) => setState(val)}
            />
            <Text> Postal Code </Text>    
            <TextInput style={styles.input} 

                onChangeText={(val) => setPostal(val)}
            />
            <Text> Current Electricity Cost Per Month </Text>    
            <TextInput style={styles.input} 

                onChangeText={(val) => setCurrentCost(val)}
            />
            <Text> Current Electricity Usage Per Month KwH </Text>    
            <TextInput style={styles.input} 

                onChangeText={(val) => setCurrentUsage(val)}
            />
            <Button title='Submit' onPress={() => nextScreen()} />
            
      

        </View>
    )

    

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin: 10,
      width: 200,
  
    }
  });
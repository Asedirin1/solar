import * as React from 'react';
import MapView, { Heatmap } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
//import { points } from '../points';
import { useState } from 'react/cjs/react.development';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function heatMap({route}) {
  const [sstate, setState] = useState(route.params.name)
  var lat = 47.751076
  var lng = -120.740135
  var DNI = 4
  getcoords()
  
  var points = [
    
    
    { latitude: 47.751076, longitude: -120.740135, weight: 0.02 }
  
  ];
  lats = lat - 2
  lngs = lng  -2
  for (var i = lat; i > lats; i-=0.2) {
    for (var l = lng; l > lngs; l-=0.2) {
      getDNI()
      console.log(DNI)
      var Obj = {};
      Obj['latitude'] = i;
      Obj['longitude'] = l;
      
      Obj['weight'] = DNI/100;
      
      points.push(Obj)
    }
  }
  
  console.log(points)

  
  
  
  const state = {
    initialPosition: {
      latitude: 37.0902,
      longitude: -95.7129,
      latitudeDelta: 57,
      longitudeDelta: 57
    }
  }
  
  
  
    return (
      <View style={styles.container}>

        <MapView
          provider="google"
          
          style={styles.map}
          initialRegion={state.initialPosition}>
          <Heatmap
            points={points}
            radius={40}
            opacity={1}
            gradient={{
              colors: ["black", "purple", "red", "orange", "white"],
              startPoints: Platform.OS === 'ios' ? [0.01, 0.1, 0.2, 0.3, 0.4] :
                [0.1, 0.25, 0.5, 0.75, 1],
              colorMapSize: 2000
            }}
          >
          </Heatmap>
        </MapView>
      </View>
    );
    function getDNI() {
        
      var options = {
        method: 'GET',
        url: 'https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=0mnx2OSLok4UiEoaajb0fh4j2YoFOznGfGHZS78j&lat=' +lat + '&lon=' + lng,
        
      };
      console.log(options.url)
      axios.request(options).then(function (response) {
        
        if (response.data.outputs.avg_dni.annual <= 0) {
          getDNI()
        }
        else {
          DNI = response.data.outputs.avg_dni.annual
        }
        
  
  
      }).catch(function (error) {
        console.log(error)
      });
      
  }
    function getcoords() {
        
  
  
      var options = {
        method: 'GET',
        url: 'http://open.mapquestapi.com/geocoding/v1/address?key=saD6wA8skX1MAzw7nKIyqh9LhoxZ0a46&location=' + sstate,
        
      };
    
      axios.request(options).then(function (response) {
          console.log(response.data.results[0].locations[0].latLng.lat)
          lat = response.data.results[0].locations[0].latLng.lat
          lng = response.data.results[0].locations[0].latLng.lng
    
    
      }).catch(function (error) {
        console.error(error);
      });
    }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
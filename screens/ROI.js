import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as React from 'react';
import { useState } from 'react/cjs/react.development';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { atan } from 'react-native-reanimated';


export function Roi({route}) {
    
    
    const name = route.params.name
    const navigation = useNavigation()
    
    const newBill = (route.params.usage-route.params.energy)*(route.params.cost/route.params.usage)
    console.log((route.params.cost-newBill)*12)
    
    return(
        <View style = {styles.container}>
            <Text>
                Estimated Cost of Solar Panels 
            </Text>
            <Text style = {styles.input}>
                ${route.params.state}
            </Text>
            <View style = {styles.white}></View>
            <Text>
                Estimated Cost of Solar Panels After Incentive
            </Text>
            <Text style = {styles.input}>
                ${route.params.state*0.74}
            </Text>
            <View style = {styles.white}></View>
            <Text>
                Estimated Electricity Bill Per Month
            </Text>
            <Text style = {styles.input}>
                ${newBill}
            </Text>
            <View style = {styles.white}></View>
            <Text>
                How Long Till The Panels Pay For Themselves
            </Text>
            <Text style = {styles.input}>
                {(route.params.state*0.74)/(((route.params.cost)-newBill)*12)} Years
            </Text>
            <Button title='Heatmap' onPress={() => navigation.navigate('Heatmap',name)} />
        </View>                        
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      
    },
    input: {
      borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin: 10,
      width: 200,
  
    },
    white: {
        height: 50
    }
    

  });
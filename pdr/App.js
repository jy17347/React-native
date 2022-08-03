import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Constants, Accelerometer } from 'expo-sensors';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';



const modelJSON = 'https://raw.githubusercontent.com/jy17347/PDR_Pose_Estimate/develop/models_js/_model_tfjs_/model.json';

class App extends React.Component {
    state = {
        isTfReady: false,
        model: false,
    }

    async componentDidMount() {
        await tf.ready()
        this.setState({ isTfReady: true })
        
        const model = await tf.loadLayersModel(modelJSON);
        model.summary();
        this.setState({ model })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            }}>
               <Text>
                TF: {this.state.isTfReady ? "Ready" : "Waiting"}
                </Text> 
                <Text>
                MODEL: {this.state.model ? "Ready" : "Waiting"}
                </Text>
            </View>
        )
    }
}



export default App
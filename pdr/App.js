import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Constants, Accelerometer, Gyroscope } from 'expo-sensors';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { input, model, step } from '@tensorflow/tfjs';


const modelJSON = 'https://raw.githubusercontent.com/jy17347/PDR_Pose_Estimate/develop/models_js/_model_tfjs_/model.json'


class App extends React.Component {
    state = {
        isTfReady: false,
        accelerometerData: { x: 0, y: 0, z: 0 },
        gyroscopeData: { x: 0, y: 0, z: 0 },
        result : false,
        seq : [],
        
        // screenorientationData: { x: 0, y: 0, z: 0}
    }

    //tensorflowjs
    async componentDidMount() {

        await tf.ready()
        this.setState({ isTfReady: true })
        this._subscribeToAccelerometer();
        this._subscribeToGyroscope();

        // this._subscribeToSeq();
       // this._subscribeToScreenOrientation();


        const list = ['a', 'b', 'c', 'd', 'e']
        const model = await tf.loadLayersModel(modelJSON);
        model.summary();
        this.setState({ model })


        this.setState({seq : [this.state.accelerometerData.x.toFixed(2),
          this.state.accelerometerData.y.toFixed(2),
          this.state.accelerometerData.z.toFixed(2),
                this.state.gyroscopeData.x.toFixed(2),
                this.state.gyroscopeData.y.toFixed(2),
                this.state.gyroscopeData.z.toFixed(2)]})


        const seq_ten = tf.tensor2d([this.state.seq], [1,6], 'float32')      
  
        const input = tf.concat([seq_ten, seq_ten,seq_ten, seq_ten,seq_ten, seq_ten,seq_ten, seq_ten,seq_ten, seq_ten,seq_ten,
           seq_ten,seq_ten, seq_ten,seq_ten, seq_ten,seq_ten, seq_ten,seq_ten, seq_ten])
        const input_real = input.reshape([1, 20, 6])

        const prediction = this.state.model.predict(input_real);
        prediction.print();
        

        this.setState({result:(await prediction.argMax(-1).array())[0]})


    }

    // _subscribeToSeq = () => {
    //     this._seqSubscription = Seq.addListener(
    //       seq => this.setState({ seq })
    //     );
    // };
    
    // _unsubscribeFromSeq = () => {
    //     //this._seqSubscription && this._seqSubscription.remove();
    //     //this._seqSubscription = null;
    // };


    _subscribeToAccelerometer = () => {
        this._accelerometerSubscription = Accelerometer.addListener(
          accelerometerData => this.setState({ accelerometerData })
        );
    };
    
      _unsubscribeFromAccelerometer = () => {
        //this._accelerometerSubscription && this._acceleroMeterSubscription.remove();
        //this._accelerometerSubscription = null;
    };

    _subscribeToGyroscope = () => {
        this._gyroscopeSubscription = Gyroscope.addListener(
          gyroscopeData => this.setState({ gyroscopeData })
        );
    };
    _unsubscribeFromGyroscope = () => {
        //this._gyroscopeSubscription && this._gyroscopeSubscription.remove();
        //this._gyroscopeSubscription = null;
    };

    // _subscribeToScreenOrientation = () => {
    //     this._screenorientationSubscription = ScreenOrientation.addOrientationChangeListener(
    //         screenorientationData => this.setState({ screenorientationData })
    //     );
    // };
    // _unsubscribeFromScreenOrientation = () => {
    //     //this._screenorientationSubscription && this.__screenorientationSubscription.remove();
    //     //this._screenorientationSubscription = null;
    // };

   
    render() {
        
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            }}>
                <Text style={styles.paragraph}>
                    { this.state.seq }
                </Text>

                <Text style={styles.paragraph}>
                    { this.state.result }
                </Text>


               
                <Text style={styles.paragraph}>
                a_x = {this.state.accelerometerData.x.toFixed(2)}
                {', '}a_y = {this.state.accelerometerData.y.toFixed(2)}
                {', '}a_z = {this.state.accelerometerData.z.toFixed(2)}
                </Text>

                <Text style={styles.paragraph}>
                g_x = {this.state.gyroscopeData.x.toFixed(2)}
                {', '}g_y = {this.state.gyroscopeData.y.toFixed(2)}
                {', '}g_z = {this.state.gyroscopeData.z.toFixed(2)}
                </Text>

                {/* <Text style={styles.paragraph}>
                o_x = {this.state.screenorientationData.x.toFixed(2)}
                {', '}o_y = {this.state.screenorientationData.y.toFixed(2)}
                {', '}o_z = {this.state.screenorientationData.z.toFixed(2)}
                </Text> */}
                
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 10,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
    textContainer: {
      position: 'absolute',
      top: 40,
    },
  });

export default App
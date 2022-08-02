import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import { Constants, ScreenOrientation } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  componentDidMount() {
    Dimensions.addEventListener("change", (window, screen) => {
      //alert(`Received Window: ${JSON.stringify(window)}`);
      alert(`Received Screen: ${JSON.stringify(screen)} \n Received Window: ${JSON.stringify(window)}`);
    });
  }

  pressFn= async () => {
    if (this.orientation === 'portrait'){
      this.orientation = 'landscape';
      await ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
      alert("LANDSCAPE");
    } else {
      this.orientation = 'portrait';
      await ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_DOWN);
      alert("PORTRAIT_DOWN");
    }
    
  }

  orientation = 'portrait';
  render() {
    const dim = Dimensions.get("screen");
    alert(`Got dim: ${JSON.stringify(dim)}`);
    console.log("sdfsdf");
    return (
      <View style={styles.container}>
      <Button
        title="Hello"
        onPress={this.pressFn}
      />
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone! Save to get a shareable url.
        </Text>
        <Card>
          <AssetExample />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

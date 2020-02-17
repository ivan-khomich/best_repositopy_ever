import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as InAppPurchases from 'expo-in-app-purchases';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default class App extends Component {

	constructor(){
	    super();
	    this.state = {
	    	textValue: "Да, давай, я буду экономить"
	    }
	}

  	async componentDidMount() {
	    console.log("DID MOUNT!");
	    const history = await InAppPurchases.connectAsync();
	    console.log(history);
	    console.log("1");
	    if(history.results.length > 0) {
	    	this.setState({
		        textValue: "Так ты уже медитируешь!"
		    })
	    }
	    // if (history.responseCode === IAPResponseCode.OK) {
	    //   console.log("2");
	    //     history.results.forEach(result => {
	    //         console.log("hist", result);
	    //         // Restore history if needed
	    //     });
	    // }
	    console.log("3");
	    const items = Platform.select({
	        // ios: ['premium1'],
	        android: ['premium1'],
	    });
	    console.log("4");
	    const { responseCode, results } = await InAppPurchases.getProductsAsync(items);
	    if (responseCode === IAPResponseCode.OK) {
	      console.log("5");
	      console.log('results', results);
	        // this.setState({ items: results });
	    }
	    console.log("6");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Подписаться на медитацию?</Text>
        <Button
          title={this.state.textValue}
          onPress={() => InAppPurchases.purchaseItemAsync('premium1')}
        />
      </View>
    );
  }
}
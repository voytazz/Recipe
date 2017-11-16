import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Linking, Alert} from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            result: null,
            ingredient: "",
            text: 'Useless Placeholder'

        }
    }

    getApi() {

        const apiURL = "http://www.recipepuppy.com/api/?q="+this.state.ingredient+"&p=1";
        return fetch(apiURL)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    result: responseJson
                })

            })
            .catch((error) => {
                console.log(error);
            });
    }

  render() {


        let dishArr = [];

        if (this.state.result) {

            for(let i=0; i < this.state.result.results.length; i++) {
                dishArr.push( <View style={{flex:3}}>

                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 100, height: 100}} >
                            <Image
                            style={{width: 100, height: 100}}
                            source={{uri: this.state.result.results[i].thumbnail}}
                        /></View>
                        <View style={{width: 260, height: 100, backgroundColor: 'orange', alignItems: "center", padding: 5, }} >
                            <Text style={{fontSize: 15,color: "white"}} onPress={ () => Linking.openURL(this.state.result.results[i].href)}>{this.state.result ? this.state.result.results[i].title : null} </Text>
                            <Text style={{color: "white", fontSize: 10}} >{this.state.result ? this.state.result.results[i].ingredients : null}</Text>
                        </View>

                    </View>

            </View>
                     )




            }

        }
      dishArr.sort();

    return (

      <View style={styles.container}>

          <View style={styles.searcher}>

              <TextInput
              style={styles.searcherInput} placeholder="Nazwa składnika" value={this.state.ingredient} onChangeText={(text) => this.setState({ingredient:text})}/>

              <Button onPress={() => { this.getApi() }} title="Pokaż przepisy" color="gray" />

          </View>

          <View style={styles.Background}>

            {dishArr}

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: '#3867B1',
  },
    searcher: {
        flex: 2.5, backgroundColor: '#232D52',alignItems: "center", justifyContent: "center",
    },
    searcherInput: {
        width: 250, fontSize: 30, color: "#fff", margin: 10, paddingBottom: 10, textAlign: "center"
    }, Background: {
        flex: 7, backgroundColor: "#3867B1"

    },


});


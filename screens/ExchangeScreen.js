import React, { Component } from 'react';
import { ScrollView, TextInput, Picker, StyleSheet, Text, Image, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

const Item = Picker.Item;

export default class ExchangeScreen extends Component {
	
	static navigationOptions = {
    	title: 
    	<Image
        	source={require('../images/logo.png')}
			style={{resizeMode: 'contain', width:100,height:50, marginTop:5}}		        
      	/>,
	};

	state = {
		selected1: 'key1',
		selected2: 'key1',
		selected3: 'key1',
		color: 'red',
		mode: Picker.MODE_DIALOG,
		text: "",
	};	

	changeMode () {
		const newMode = this.state.mode === Picker.MODE_DIALOG
		? Picker.MODE_DROPDOWN
		: Picker.MODE_DIALOG;
		this.setState({mode: newMode});
	}

	onValueChange (key: string, value: string) {
		const newState = {};
		newState[key] = value;
		this.setState(newState);
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={{flex: 2, alignItems: 'center', flexDirection: 'row'}}>
					<View style={styles.box}>
						<TouchableOpacity>
							<Image
							source={require('../images/request-button.png')}	
							style={{flex:1, height: 100, width: 120, resizeMode: 'contain'}}
							/>
						</TouchableOpacity>	
					</View>
					<View style={styles.box}>
						<TouchableOpacity>
							<Image
							source={require('../images/offer-button.png')}
							style={{flex:1, height: 100, width: 120, resizeMode: 'contain'}}
							/>
						</TouchableOpacity>	
					</View>
				</View>
				<View style={{flex: 2, alignItems:'center'}}>
					<Text>THE FRIEND?</Text>
					<Picker
						style={styles.picker}
						selectedValue={this.state.selected2}
						onValueChange={this.onValueChange.bind(this, 'selected2')}
						mode="dropdown"
					>
						<Item label="hello" value="key0"/>
						<Item label="world" value="key1"/>
					</Picker>
				</View>
				<View style={{flex: 2, alignItems:'center'}}>
					<TextInput
						placeholder="What's da favor??"
						style={styles.textField}
						onChangeText={(text) => this.setState({text})}
						value={this.state.text}
					/>
				</View>
			</ScrollView>
			);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: 'lightgreen',
	},
	box: {
		flex: 1,
		paddingTop: 20,
		marginTop: 15,
		marginBottom: 15,
		alignItems: 'center',
	},
	picker: {
		width: 250,
	},
	textField: {
		height: 40,
		width: 250,
		borderColor: 'gray',
		borderWidth: 1,
		backgroundColor: '#fff'
	},
});



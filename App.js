/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
	Alert,
	Dimensions,
	SafeAreaView,
	ScrollView,
	View,
	Text,
	TextInput,
	TouchableHighlight,
  StatusBar,
} from 'react-native';

import AppConfig from './AppConfig'

import { configureFontAwesomePro } from "react-native-fontawesome-pro";
configureFontAwesomePro();

import Icon from "react-native-fontawesome-pro";

const RESET_FULL = 1;
const RESET_SMALL = 2;

const icon5 = (name, size, color = 'black', sourceSpecial) =>
	<Icon name={name} type={sourceSpecial} size={size} color={color} brand/>

// Allow/disallow font-scaling in app
// Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling  // WRONG!
Text.allowFontScaling = AppConfig.allowTextFontScaling  // Working!

const words = require('./words_dictionary.json'); //with path

const Box = (props) => {
  const {
	lv,
	stt = 100,
	pressLetter
  } = props;

  console.log(JSON.stringify(props))

  return (
    <TouchableHighlight onPress={(lv != null) ? () => pressLetter(lv) : null}>
      <View style={{justifyContent: 'center', alignItems: 'center', height: stt.sz, width: stt.sz, marginRight: stt.sz, borderWidth: (lv != null) ? 1:0}}>
        {(lv != null) && <Text style={{fontWeight: 'bold'}}>{stt.ourLetters[lv]}</Text> }
     </View> 
     </TouchableHighlight>
  )
}

const numOfLines = 26;

//const App: () => React$Node = () => {
  class App extends Component {
    
    constructor(props) {
	  super(props)
	  
		this.state = {
			height: 0,
			width: 0,
			sz: 0,
			mz: 0,
			inputWord: [],
			message: '',
			wordList: [],
			ourLetters: [],
			ourLettersWord: '',
			gameOn: false
		}
    }

	restartFull = () => {
		this.restartSmall();
		this.startState();
	}

    startState = () => {
      this.setState({ourLetters: [], ourLettersWord: '', gameOn: false})
    }

    restartSmall = () => {
      this.setState({
        inputWord: [],
        message: '',
        wordList: []
      })
    }

    showAWord = (word) => {
      return (word.slice(0,1) + word.slice(1).toLowerCase())
    }

    pressLetter = (letter) => {
      let newWord = [...this.state.inputWord, this.state.ourLetters[ letter ]];
      this.setState({inputWord: newWord})
    }

	deleteChar = () => {
		let newWord = [...this.state.inputWord];
		if (newWord.length > 0) {
			this.setState({inputWord: newWord.slice(0, newWord.length - 1)})
		}
	}

    addToList = () => {
      let newList = [...this.state.wordList];
      let aWord = this.state.inputWord.join("")
      newList.push(aWord);
      newList.sort();
     
      this.setState({wordList: newList})
    }

    testWord = () => {
      let testWord = this.state.inputWord.join("").toLowerCase();
      return (words[testWord] == 1);
    }

    processWord = () => {
      let message;
      if (this.state.inputWord.length == 0)
        message = 'Ready';
      else if (this.state.inputWord.indexOf(this.state.ourLetters[0]) == -1)
        message = 'You did not use the center letter'
      else if (this.state.inputWord.length < 3)
		message = 'Words must be at least 3 characters long'
	  else if (this.state.wordList.indexOf(this.state.inputWord.join("")) > -1)
	 	message = `Sorry... Word ${this.showAWord(this.state.inputWord.join(""))} already found!`
      else {
        let result = this.testWord()
        if (result) {
          message = `Great!!! Word ${this.showAWord(this.state.inputWord.join(""))} is acceptable!!!`
          this.addToList();
          this.setState({inputWord: ''})
        } else {
          message = `Sorry... Word ${this.showAWord(this.state.inputWord.join(""))} is not found.`
        }

      }

      this.setState({message: message})

    }

    deleteWord = () => {
      this.setState({inputWord: []})
    }

    showWords = () => {
      let nA = [];
      this.state.wordList.forEach((word, index) => {
        nA.push(          
            <View key={index}>
              <Text style={{fontWeight: 'bold', fontSize: 20, marginRight: 5}}>{this.showAWord(word)}</Text>
            </View>
        )
      })

      return [...nA]
    }

    updateStart = (text) => {

		if (this.state.ourLetters.indexOf(text.toUpperCase()) > -1)
			alert(`Sorry the letter ${text.toUpperCase()} has already been used!`)
		else {
			let newWord = this.state.ourLettersWord + text.toUpperCase();
			newWord = newWord.slice(0,7);

			this.setState({
			ourLettersWord: newWord, 
			ourLetters: newWord.toUpperCase().split(""),
			gameOn: (newWord.length > 6)
			})
		}
	}

	show_box_grid = () => {

		return (

			<View style={{height: this.state.sz * 6, width: this.state.width, justifyContent: 'center', borderWidth: 0, borderColor: 'green', alignItems: 'center', marginBottom: this.state.mz}}>
				<View style={{flexDirection: 'row'}}>
					<Box stt={this.state}/><Box pressLetter={this.pressLetter}  stt={this.state} lv={1}/><Box stt={this.state} />
				</View>
				<View style={{flexDirection: 'row'}}>
					<Box pressLetter={this.pressLetter}  stt={this.state} lv={2}/><Box  stt={this.state}/><Box pressLetter={this.pressLetter}  stt={this.state} lv={3}/>
				</View>
				<View style={{flexDirection: 'row'}}>
					<Box  stt={this.state}/><Box pressLetter={this.pressLetter}  stt={this.state} lv={0}/><Box  stt={this.state}/>
				</View>
				<View style={{flexDirection: 'row'}}>
					<Box pressLetter={this.pressLetter}  stt={this.state} lv={4}/><Box stt={this.state}/><Box pressLetter={this.pressLetter}  stt={this.state} lv={5} />
				</View>
				<View style={{flexDirection: 'row'}}>
					<Box stt={this.state} /><Box pressLetter={this.pressLetter}  stt={this.state} lv={6}/><Box stt={this.state} />
				</View>
			</View>
		)
	}

	title = () => {
		return (
			<View style={{
				justifyContent: 'center', 
				alignItems: 'center', 
				marginLeft: this.state.mz, 
				marginRight: this.state.mz, 
				height: this.state.sz * 4, 
				width: this.state.width - (2 * this.state.mz), borderWidth: 0}}>
				<View style={{marginBottom: this.state.mz}}>
					<Text style={{fontSize: 20, fontWeight: 'bold'}}>Welcome to Spell2</Text></View>
				<View>
					<Text style={{fontSize: 15, fontWeight: 'bold'}}>- Use the center letter and other letters</Text></View>
				<View>
					<Text style={{fontSize: 15, fontWeight: 'bold'}}>- Three letters minimum per word</Text></View>
			</View>
		)

	}

	gameIsOn = () => {
		return (
			<View style={{justifyContent: 'center', alignItems: 'center'}}>
				{ this.title() }

				<View style={{height: this.state.sz * 8, width: this.state.width, flexDirection: 'row'}}>

						<View style={{height: this.state.sz * 8, width: Math.floor((this.state.width*.60) - this.state.mz), marginLeft: this.state.mz}}>
							<ScrollView
								style={{
									height: this.state.sz * 8, 
									borderWidth: 0, 
									borderColor: 'red', 
									marginBottom: this.state.mz,
								}}
								horizontal={false}
								showsVerticalScrollIndicator={true}
							>
								<View style ={{flex: 1, flexGrow: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
									{this.showWords() }
								</View>
							</ScrollView>
						</View>
				
						<View style={{
							height: this.state.sz * 8, 
							width: Math.floor((this.state.width*.40) - this.state.mz), 
							marginLeft: this.state.mz,
							}}>
								<View style={{
									height: this.state.sz * 2, 
									width: Math.floor((this.state.width*.40) - this.state.mz), 
									marginLeft: this.state.mz,
									justifyContent: 'center',
									alignItems: 'center'
								}}>
									<Text># Found</Text>
									<Text>{this.state.wordList.length}</Text>
								</View>
						</View>
				
				</View>	

				<View style={{flexDirection: 'row', height: this.state.sz * 2, width: this.state.width, marginLeft: this.state.mz}}>

					<TouchableHighlight onPress={this.deleteWord}>
						<View style={{height: this.state.sz * 2, width: this.state.sz * 2, justifyContent: 'center', alignItems: 'center'}}>
							{ icon5('trash-alt', this.state.sz, 'blue')}
						</View>
					</TouchableHighlight>
					<TouchableHighlight onPress={this.processWord}>
						<View style={{
							height: this.state.sz * 2, 
							width: this.state.width - (this.state.sz * 4), 
							justifyContent: 'center', alignItems: 'center', 
							borderWidth: 3, 
							borderColor: 'blue', 
							marginBottom: this.state.mz
							}}>
							<Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.inputWord}</Text>
						</View>
					</TouchableHighlight>

					<TouchableHighlight onPress={this.deleteChar}>
						<View style={{height: this.state.sz * 2, width: this.state.sz * 2, justifyContent: 'center', alignItems: 'center'}}>
							{ icon5('backspace', this.state.sz, 'blue')}
						</View>
					</TouchableHighlight>
				</View>

				{ this.show_box_grid() }

				<View style={{height: this.state.sz * 2, width: this.state.width, marginLeft: this.state.sz, justifyContent: 'center', alignItems: 'center', borderWidth: 0, marginBottom: this.state.mz}}>
					<Text style={{fontWeight: 'bold', fontSize: 15}}>{this.state.message}</Text>
				</View>

				<View style={{flexDirection: 'row', height: this.state.sz * 1.5, width: this.state.width}}>
					<TouchableHighlight onPress={() => this.testRestart(RESET_SMALL, 'Restart with these letters?')}>
						<View style={{height: this.state.sz * 1.5, width: this.state.width * .35, marginLeft: this.state.width * .1,  justifyContent: 'center', alignItems: 'center', borderWidth: 1}}>
							<Text style={{ fontSize: 15}}>Restart</Text>
						</View>
					</TouchableHighlight>

					<TouchableHighlight onPress={() => this.testRestart(RESET_FULL, 'Pick new letters and start over?')}>
						<View style={{height: this.state.sz * 1.5, width: this.state.width * .35, marginLeft: this.state.width * .1, justifyContent: 'center', alignItems: 'center', borderWidth: 1}}>
							<Text style={{fontSize: 15}}>New Letters</Text>
						</View>
					</TouchableHighlight>

				</View>

			</View>
		)
	}

	testRestart = (type, message) => {
		// Works on both iOS and Android
		Alert.alert(
			message,
			'Press OK to reset',
			[
			{text: message, onPress: () => console.log('Ask me later pressed')},
			{
				text: 'Cancel',
				onPress: () => null,
				style: 'cancel',
			},
			{text: 'OK', onPress: (type == RESET_FULL) ? () => this.restartFull() : () => this.restartSmall()},
			],
			{cancelable: false},
		);
	}

	gameIsOff = () => {
		return (
			<View style={{height: this.state.height, justifyContent: 'center', width: this.state.width, marginBottom: this.state.mz}}>
				
				{ this.title() }

				<View style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: this.state.sz, width: this.state.width, borderWidth: 0, marginBottom: this.state.mz}}>
					
					<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
						<View><Text>Enter the {(this.state.ourLettersWord.length == 0) ? 'CENTER' : 'another'} Letter: </Text></View>
						<View style={{height: this.state.sz, width: this.state.sz}}>
							<TextInput
								style={{
									height: this.state.sz,
									width: this.state.sz,
									borderWidth: 2,
									padding: 5,
								fontSize: 15, 
								}}
								value={''}
								defaultValue={''}
								autoFocus={true}
								flex={1}
								selectTextOnFocus={true}
								onChangeText={(text) => { this.updateStart(text)}} />
						</View>
					</View>
					<View style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
						
						
					</View>
				</View>
				
				{ this.show_box_grid() }

			</View>
		)
	}

	onLayout(nativeEvent) {
		if (this.state.height == 0) {
			let {height, width} = Dimensions.get("window");
			this.setState({height: height, width: width, sz: Math.floor(height / numOfLines), mz: Math.floor((height / numOfLines) / 2)})
		}
	}

    render = () => {

		return (
			<>
				<StatusBar barStyle="dark-content" />

				<SafeAreaView onLayout={(nativeEvent) => this.onLayout(nativeEvent)} style={{ justifyContent: 'center', alignItems: 'center'}}>
					{ (this.state.height > 0 && this.state.gameOn) && this.gameIsOn() }
					{ (this.state.height > 0 && !this.state.gameOn) && this.gameIsOff() }
				</SafeAreaView>
			</>
			)
	}
}

export default App;

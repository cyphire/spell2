/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const words = require('./words_dictionary.json'); //with path


const sz = 30;
const mz = sz/2;

const Box = (props) => {
  const {
    lv,
    pressLetter
  } = props;

  return (
    <TouchableHighlight onPress={(lv != null) ? () => pressLetter(lv) : null}>
      <View style={{justifyContent: 'center', alignItems: 'center', height: sz, width: sz, marginLeft: sz, borderWidth: (lv != null) ? 1:0}}>
        {(lv != null) && <Text style={{fontWeight: 'bold'}}>{this.state.ourLetters[lv]}</Text> }
     </View> 
     </TouchableHighlight>
  )
}

//const App: () => React$Node = () => {
  class App extends Component {
    
    constructor(props) {
      super(props)
  
      this.state = {
          inputWord: [],
          message: '',
          wordList: [],
          ourLetters: [],
          ourLettersWord: ''
      }
    }

    startState = () => {
      this.setState({ourLetters: [], ourLettersWord: ''})
    }

    initState = () => {
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

      return nA
    }

    updateStart = (text) => {
        this.setState({
          ourLettersWord: text.toUpperCase(), 
          ourLetters: text.toUpperCase().split("")
        })
    }

    render = () => {
      return (
      <>
        <StatusBar barStyle="dark-content" />

        <SafeAreaView style={{flex: 0, justifyContent: 'center', alignItems: 'center', marginTop: mz}}>

              { (this.state.ourLetters.length == 7) ?

                <View>
                  <ScrollView 
                    style={{height: sz * 2, width: 300, borderWidth: 1, borderColor: 'red', marginBottom: mz}}
                    contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
                    >
                      { this.showWords() }

                  </ScrollView>

                  <TouchableHighlight onPress={this.processWord}>
                    <View style={{height: sz * 2, width: 300, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'purple', marginBottom: mz}}>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.inputWord}</Text>
                    </View>
                  </TouchableHighlight>

                  <View style={{height: sz * 8, width: 300, justifyContent: 'center', borderWidth: 1, borderColor: 'green', alignItems: 'center', marginBottom: mz}}>
                      <View style={{flexDirection: 'row'}}>
                        <Box /><Box pressLetter={this.pressLetter}  lv={1}/><Box />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Box pressLetter={this.pressLetter} lv={2}/><Box /><Box pressLetter={this.pressLetter} lv={3}/>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Box /><Box pressLetter={this.pressLetter} lv={0}/><Box />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Box pressLetter={this.pressLetter} lv={4}/><Box /><Box pressLetter={this.pressLetter} lv={5} />
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Box /><Box pressLetter={this.pressLetter} lv={6}/><Box />
                      </View>
                  </View>
    
                  <TouchableHighlight onPress={this.deleteWord}>
                    <View style={{height: sz * 1.5, width: 100, marginLeft: sz, justifyContent: 'center', alignItems: 'center', borderWidth: 1}}>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>DELETE</Text>
                    </View>
                  </TouchableHighlight>

                  <View style={{height: sz * 2, width: 300, marginLeft: sz, justifyContent: 'center', alignItems: 'center', borderWidth: 0, marginBottom: mz}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>{this.state.message}</Text>
                  </View>
                </View>
                :
                <View style={{height: sz * 2, width: 300, borderWidth: 1, borderColor: 'red', marginBottom: mz}}>
                <TextInput
                      style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                        paddingTop: 0,
                        paddingBottom: 0,
                        borderColor: 'grey', 
                        fontSize: 15, 
                        alignSelf: 'stretch',
                        borderWidth: 1, borderRadius: 0			
                      }}
                      value={this.state.ourLettersWord}
                      defaultValue={''}
                      placeholder={'Enter 7 unique letters, first being center box'}
                      autoFocus={true}
                      flex={1}
                      selectTextOnFocus={true}
                      onChangeText={(text) => { this.updateStart(text)}} />
                </View>
              }

        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

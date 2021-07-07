import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Avatar from "./Avatar";

const ProfileEdit = () => {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [avatar, setAvatar] = useState(null);

  const saveValueFunction = () => {
    if (name || firstname) {
      const items = [['name', name], ['firstname', firstname]];
      AsyncStorage.multiSet(items, () => {
        console.log('Data Saved');
    })} else {
      console.log('Please fill data');
    }
  };

  const getValueFunction = () => {
    AsyncStorage.multiGet(["name", "firstname", "image"]).then(response => {
      setName(response[0][1]);
      setFirstname(response[1][1]);
      setAvatar(response[2][1]);
    })
  }

  useEffect(() => {
    getValueFunction();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Avatar avatar={avatar}/>
      <View>
        <TextInput
          placeholder="Nom"
          style={{ height: 40, width: 300, borderBottomColor: 'gray', borderBottomWidth	: 1, marginBottom: 30 }}
          onChangeText={(text) => (setName(text))}
          value={name}
          returnKeyType='done'
          onSubmitEditing={() => saveValueFunction()}
          clearButtonMode='while-editing'
        />
        <TextInput
          placeholder="Prénom"
          style={{ height: 40, width: 300, borderBottomColor: 'gray', borderBottomWidth	: 1, marginBottom: 50 }}
          onChangeText={(text) => (setFirstname(text))}
          value={firstname}
          returnKeyType='done'
          onSubmitEditing={() => saveValueFunction()}
          clearButtonMode='while-editing'
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          saveValueFunction(),
          navigation.goBack();
        }}
      >
          <Text style={styles.textButton}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profile: {
    marginTop: 10,
    marginBottom: 50,
    alignItems: 'center',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'grey',
  },
  text: {
    margin: 10,
    fontSize: 20,
    fontWeight: '500',
    color: 'red'
  },
  button: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: 300,
    height: 60,
    marginTop: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
  }
});


export default ProfileEdit;
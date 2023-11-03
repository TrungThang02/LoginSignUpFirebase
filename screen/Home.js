import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

const Home = ({ navigation }) => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
  
    const onAuthStateChanged = user => {
      setUser(user);
      if (initializing) setInitializing(false);
    };
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // Unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
    if (!user) {
      navigation.navigate('Login');
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Logged out</Text>
          <Pressable onPress={() => navigation.navigate('Auth')} style={styles.button}>
            <Text style={styles.text}>Log in page</Text>
          </Pressable>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Đăng nhập thành công</Text>
        <Text style={styles.text}>Xin chào: {user.email} !</Text>
        <Pressable onPress={() => auth().signOut().then(() => navigation.navigate('Login'))} style={styles.button}>
          <Text style={styles.text}>Đăng xuất</Text>
        </Pressable>
      </View>
    );
  };
  
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#fff'
    },
    text:{
        fontFamily: 'Arial',
        fontWeight:'bold',
        padding: 10,
        fontSize: 17,

    },
    button:{
        marginTop: 10,
        backgroundColor: '#D6E5FA',
        padding: 2,
        borderRadius: 10,
        width: '40%',
        alignItems:'center',

    }
});
export default Home;
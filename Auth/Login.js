import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '1005163202678-hiof16fo4egdsbdbe0omfj432ee7gej0.apps.googleusercontent.com',
});
async function onGoogleButtonPress() {
  try {
      // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log(statusCodes.SIGN_IN_CANCELLED)
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log(statusCodes.IN_PROGRESS)
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log(statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
    } else {
      // some other error happened
      console.log(error)
    }
  }
};


  async function googleSignOut()  {
  try {
    await GoogleSignin.signOut();
    setUser(null); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};
  

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in using email - password');
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable email - password in your Firebase console.');
        }
        if (error.code === 'auth/wrong-password') {
          console.log('The password is invalid!!!');
        }
        console.error(error);
      });
  };
  const img = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png"
  return (

    <View style={styles.container}>
      <Image
        style={styles.Logo}
        source={{
          uri: img,
        }}
      />
      <TextInput
        style={styles.TextInput}
        onChangeText={setEmail}
        value={email}
        label="Nhập vào email"
        placeholder="Email address"
        keyboardType="email-address"
        inputMode="email"
        underlineColor='transparent'
      />
      <TextInput
        style={styles.TextInput}
        onChangeText={setPassword}
        value={password}
        label="Nhập lại mật khẩu"
        placeholder="Password"
        underlineColor='transparent'
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
      />
      <Pressable onPress={handleLogin} style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#D6E5FA',
        width: 350,
        alignSelf: 'center',
        borderRadius: 10
      }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#333' }}>
          Đăng nhập tài khoản
        </Text>
      </Pressable>
      <View style={{justifyContent:'center', alignItems:'center', padding: 10 }}>
      <GoogleSigninButton
        onPress = {
          ()=>onGoogleButtonPress()
          .then(()=>{
            navigation.navigate("Home");
            console.log("User signed in using Google");
          })
          .catch(error => {
            console.log(error)
          })
        }
        />
      </View>
      <View>
      <Pressable onPress={() => navigation.navigate('SignUp')} style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#0779E4' }}>
          Đăng ký tài khoản
        </Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Reset')} style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#0779E4' }}>
         Quên mật khẩu ?
        </Text>
      </Pressable>
      </View>
     
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  TextInput: {
    width: 350,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderColor: '#0779E4',
    borderWidth: 1,
  },
  Logo: {
    width: 200,
    height: 66,
    marginBottom: 15,
    alignSelf: 'center',
  },
});

export default Login;
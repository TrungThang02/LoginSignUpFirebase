import React from 'react';
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { TextInput, IconButton, Icon, IconButtonProps } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
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
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (values) => {
    const { email, password } = values;
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

  const validationSchema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: yup.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
  });
  const toggleShowPassword = () => {
    setShowPassword(!showPassword); 
  };
  const img = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.png";

  return (
    <View style={styles.container}>
      <Image
        style={styles.Logo}
        source={{
          uri: img,
        }}
      />

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleLogin(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <TextInput
              style={styles.TextInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              label="Nhập vào email"
              placeholder="Email address"
              keyboardType="email-address"
              inputMode="email"
              underlineColor='transparent'
            />
            {errors.email && <Text style={{ color: 'red' ,marginLeft:20, padding: 10}}>{errors.email}</Text>}

            <TextInput
              style={styles.TextInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              label="Nhập mật khẩu"
              placeholder="Password"
              underlineColor='transparent'
              secureTextEntry
               right={
                <TextInput.Icon
                  name={showPassword ? 'eye-off' : 'eye'} 
                  onPress={toggleShowPassword} 
                />
              }
            />
            {errors.password && <Text style={{ color: 'red' ,marginLeft:20, padding: 10}}>{errors.password}</Text>}

            <Pressable onPress={handleSubmit} style={{
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
          </>
        )}
      </Formik>

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
    marginBottom: 5,
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

import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-paper';


const SignUp = ({ navigation }) => {
    const img = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png"
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const handleSignUp = () => {
        auth()
            .createUserWithEmailAndPassword(email, password, passwordRepeat)
            .then(() => {
                console.log('User account created & signed in!');
                navigation.navigate('Home');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    };

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
                placeholder="Email address"
                keyboardType="email-address"
                inputMode="email"
                underlineColor='transparent'
                label="Nhập vào email"
            />
            <TextInput
                style={styles.TextInput}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                label="Nhập mật khẩu"
                underlineColor='transparent'
                secureTextEntry
                right={<TextInput.Icon icon="eye" />}
            />
            <TextInput
                style={styles.TextInput}
                onChangeText={setPasswordRepeat}
                value={passwordRepeat}
                placeholder="Password"
                label="Nhập lại mật khẩu"
                underlineColor='transparent'
                secureTextEntry
                right={<TextInput.Icon icon="eye" />}
            />
            <Pressable onPress={handleSignUp} style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                backgroundColor: '#D6E5FA',

                width: 350,
                alignSelf: 'center',
                borderRadius: 10
            }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#333' }}>
                    Đăng ký tài khoản
                </Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Login')}
                style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginRight: 10,
                    padding: 10,
                }}>
                <Text style={{ fontSize: 17, fontStyle: 'italic', fontWeight: 'bold', color: '#0779E4' }}>
                    Đăng nhập tài khoản
                </Text>
            </Pressable>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'


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
})

export default SignUp;
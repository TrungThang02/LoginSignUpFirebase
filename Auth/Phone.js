import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const PhoneSignIn = () => {
    const [phone, setPhone] = useState('');
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const img = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.png";


    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, navigate to the Home screen
                navigation.navigate('Home');
                setPhone("+84" + phone)
            }
        });

        // Cleanup function to unsubscribe the listener when the component unmounts
        return () => unsubscribe();
    }, [navigation]);

    const signInWithPhoneNumber = async () => {
        try {
            setLoading(true);
            const confirmation = await auth().signInWithPhoneNumber("+84" + phone);
            setConfirm(confirmation);
        } catch (error) {
            console.error('Error sending confirmation code:', error);
            setError('Error sending confirmation code');
        } finally {
            setLoading(false);
        }
    };

    const confirmCode = async () => {
        try {
            setLoading(true);
            await confirm.confirm(code);
        } catch (error) {
            console.error('Invalid code:', error);
            setError('Invalid code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
              <Image
        style={styles.Logo}
        source={{
          uri: img,
        }}
      />
            {!confirm ? (
                <>
                    <TextInput
                        style={styles.TextInput}
                        label="Nhập vào SDT"
                        underlineColor='transparent'
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity onPress={signInWithPhoneNumber}
                        loading={loading}
                        disabled={loading}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 15,
                            backgroundColor: '#D6E5FA',
                            width: 350,
                            alignSelf: 'center',
                            borderRadius: 10
                        }}
                    >
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#333' }}>
                            Gửi mã xác nhận
                        </Text>

                    </TouchableOpacity>

                </>
            ) : (
                <>
                    <TextInput
                        style={styles.TextInput}
                        label="Nhập OTP"
                        underlineColor='transparent'
                        value={code}
                        onChangeText={(text) => setCode(text)}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity onPress={confirmCode}
                        loading={loading}
                        disabled={loading}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 15,
                            backgroundColor: '#D6E5FA',
                            width: 350,
                            alignSelf: 'center',
                            borderRadius: 10
                        }}
                    >
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#333' }}>
                            Gửi mã xác nhận
                        </Text>

                    </TouchableOpacity>

                </>
            )}

            {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
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
});
export default PhoneSignIn;

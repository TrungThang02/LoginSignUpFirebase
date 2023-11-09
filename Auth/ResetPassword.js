import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Reset = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [errorState, setErrorState] = useState('');

    const handleSendPasswordResetEmail = () => {

        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert('Thông báo', 'Gửi yêu cầu thành công!');
            })
            .catch(error => {
                setErrorState(error.message);
                Alert.alert('Lỗi', 'Không tìm thấy tài khoản!');
            });
    }


    const img = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png";

    return (
        <View style={styles.container}>
            <Image
                style={styles.Logo}
                source={{ uri: img }}
            />
            <View>
                <TextInput
                    style={styles.TextInput}
                    label="Nhập vào Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                />
            </View>

            <View>
                <TouchableOpacity
                    onPress={handleSendPasswordResetEmail}
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
                        Gửi yêu cầu đặt lại mật khẩu
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginRight: 10,
                        padding: 10,
                    }}
                >
                    <Text style={{ fontSize: 17, fontStyle: 'italic', fontWeight: 'bold', color: '#0779E4' }}>
                        Đăng nhập tài khoản
                    </Text>
                </TouchableOpacity>
            </View>
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

export default Reset;

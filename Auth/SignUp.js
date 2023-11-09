import React from 'react';
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, Alert} from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';

const SignUp = ({ navigation }) => {
    const img = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png"
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
    const handleSignUp = (values) => {
        const { email, password } = values;

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('Thông báo', 'Đăng ký thành công!')
                navigation.navigate('Login');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                   Alert.alert('Thông báo','Email này đã được sử dụng!')
                }

                if (error.code === 'auth/invalid-email') {
                    
                }

                console.error(error);
            });
    };

    const validationSchema = yup.object().shape({
        email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        password: yup.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
        passwordRepeat: yup.string()
            .oneOf([yup.ref('password'), null], 'Mật khẩu lặp lại không trùng khớp')
            .required('Vui lòng nhập lại mật khẩu'),
    });

    return (
        <View style={styles.container}>
            <Image
                style={styles.Logo}
                source={{ uri: img }}
            />
            <Formik
                
                initialValues={{ email: '', password: '', passwordRepeat: '' }}
                onSubmit={values => handleSignUp(values)}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Email address"
                            keyboardType="email-address"
                            inputMode="email"
                            underlineColor='transparent'
                            label="Nhập vào email"
                        />
                        {errors.email && <Text style={{ color: 'red' ,marginLeft:20, padding: 10}}>{errors.email}</Text>}

                        <TextInput
                            style={styles.TextInput}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder="Password"
                            label="Nhập mật khẩu"
                            underlineColor='transparent'
                            secureTextEntry={!showPassword} 
                            right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={toggleShowPassword}/>}
                              
                        />
                        {errors.password && <Text style={{color: 'red' ,marginLeft:20, padding: 10}}>{errors.password}</Text>}

                        <TextInput
                            style={styles.TextInput}
                            onChangeText={handleChange('passwordRepeat')}
                            onBlur={handleBlur('passwordRepeat')}
                            value={values.passwordRepeat}
                            placeholder="Password"
                            label="Nhập lại mật khẩu"
                            underlineColor='transparent'
                            secureTextEntry={!showPassword} 
                            right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={toggleShowPassword}/>}
                        />
                        {errors.passwordRepeat && <Text style={{ color: 'red' ,marginLeft:20, padding: 10}}>{errors.passwordRepeat}</Text>}

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
                                Đăng ký tài khoản
                            </Text>
                        </Pressable>
                    </>
                )}
            </Formik>

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
})

export default SignUp;
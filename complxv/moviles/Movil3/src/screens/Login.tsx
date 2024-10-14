import React, { useState } from 'react';
import { styles } from '../theme/styles';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';
import { Button, Text, TextInput } from 'react-native-paper';
import { Alert, View } from 'react-native';

export const LoginScreen = ({ navigation }: any) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Alerta', 'Por favor, complete todos los campos.');
      return; 
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert('Alerta', error.message);
      });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Iniciar Sesión</Text>
      <TextInput
        label="Correo"
        mode='outlined'
        placeholder='Ingrese su correo'
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        value={password}
        secureTextEntry={isPasswordHidden}
        onChangeText={setPassword}
        right={<TextInput.Icon icon="eye" onPress={() => setIsPasswordHidden(!isPasswordHidden)} />}
      />
      <Button icon="login" mode="contained" onPress={handleLogin}>
        Iniciar sesión
      </Button>
      <Button icon="account-plus" mode="contained" onPress={() => navigation.navigate('Registro')}>
        Registrarse
      </Button>
    </View>
  );
};

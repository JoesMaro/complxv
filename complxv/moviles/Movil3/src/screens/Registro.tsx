import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { auth } from '../config/Config';
import { createUserWithEmailAndPassword } from "firebase/auth";

export const RegistroScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const registrar = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Usuario registrado con éxito');
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.root}>
      <TextInput
        label="Nombre"
        mode="outlined"
        placeholder="Escriba su nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        label="Correo"
        mode='outlined'
        placeholder='Escriba el correo'
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Contraseña"
        mode="outlined"
        placeholder="Escriba la contraseña"
        value={password}
        secureTextEntry={hiddenPassword}
        onChangeText={setPassword}
        right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
      />
      <Button icon="login" mode="contained" onPress={registrar}>
        Registrar
      </Button>
    </View>
  );
};

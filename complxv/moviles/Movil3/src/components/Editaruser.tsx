import React, { useEffect, useState } from 'react';
import { Button, IconButton, Modal, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { Alert, View } from 'react-native';
import { onValue, ref, update } from 'firebase/database';
import { auth, db } from '../config/Config';

interface PropUser {
    showModelUser: boolean;
    setshowModelUser: Function;
}

export const Editaruser = ({ showModelUser, setshowModelUser }: PropUser) => {
    const [uid, setuid] = useState('');
    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            setuid(uid);
            leerUsuario(uid);
        }
    }, []);

    function leerUsuario(uid: string) {
        const userRef = ref(db, `users/${uid}`);

        onValue(userRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                setnombre(data.nombre);
                setapellido(data.apellido);
            } else {
                Alert.alert('Usuario no encontrado');
            }
        });
    }

    const editar = () => {
        update(ref(db, `users/${uid}`), {
            nombre,
            apellido
        }).then(() => {
            Alert.alert('Usuario Actualizado');
            setshowModelUser(false);
        });
    };

    return (
        <Modal visible={showModelUser} contentContainerStyle={styles.modal}>
            <View style={styles.header}>
                <Text variant='headlineSmall'>Actualizar</Text>
                <View style={styles.icon}>
                    <IconButton icon='account-star' size={30} onPress={() => setshowModelUser(false)} />
                </View>
            </View>
            <TextInput
                label="Nombre"
                mode="outlined"
                placeholder="Escriba su nombre"
                value={nombre}
                onChangeText={text => setnombre(text)}
            />
            <TextInput
                label="Apellido"
                mode="outlined"
                placeholder="Escriba su apellido"
                value={apellido}
                onChangeText={text => setapellido(text)}
            />
            <Button icon="alert-circle-outline" mode="contained" onPress={editar}>
                Guardar
            </Button>
        </Modal>
    );
};

import React, { useEffect, useState } from 'react';
import { styles } from '../theme/styles';
import { Button, IconButton, Modal, Text, TextInput } from 'react-native-paper';
import { Alert, View } from 'react-native';
import { auth, db } from '../config/Config';
import { onValue, ref, remove, update } from 'firebase/database';

interface PropEditProduct {
    setshowModalEditProduct: Function;
    showModalEditProduct: boolean;
    productoSeleccionado: string;
}

export const EditarProductos = ({ setshowModalEditProduct, showModalEditProduct, productoSeleccionado }: PropEditProduct) => {
    const [uid, setuid] = useState('');
    const [producto, setproducto] = useState('');
    const [precio, setprecio] = useState('');

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            setuid(uid);
        }
        if (productoSeleccionado) {
            cargarProducto(productoSeleccionado);
        }
    }, [productoSeleccionado]);

    const cargarProducto = (producto: string) => {
        const productRef = ref(db, `users/${uid}/productos/${producto}`);
        onValue(productRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setproducto(data.producto);
                setprecio(data.precio);
            }
        });
    };

    const editar = () => {
        update(ref(db, `users/${uid}/productos/${producto}`), {
            producto: producto,
            precio: precio,
        });

        setshowModalEditProduct(false); // Cierra el modal después de actualizar
    };

    function eliminar() {
        remove(ref(db, `users/${uid}/productos/${producto}`));
        Alert.alert('Producto eliminado con éxito');
        setshowModalEditProduct(false);
    }

    return (
        <Modal visible={showModalEditProduct} contentContainerStyle={styles.modal}>
            <View style={styles.header}>
                <Text variant='headlineSmall'>{producto}</Text>
                <View style={styles.icon}>
                    <IconButton icon='close-circle-outline'
                        size={30}
                        onPress={() => setshowModalEditProduct(false)} />
                </View>
            </View>

            <TextInput
                label="Precio"
                mode="outlined"
                placeholder="Escriba el precio del producto"
                value={precio}
                onChangeText={setprecio}
            />
            <Button mode="contained" onPress={editar}>
                Editar 
            </Button>
            <IconButton                
                icon="delete"
                size={20}
                onPress={eliminar}
            />
        </Modal>
    );
}

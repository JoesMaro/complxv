import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, Button, IconButton, Divider } from 'react-native-paper';
import { styles } from '../theme/styles';
import { auth, db } from '../config/Config';
import { onAuthStateChanged, } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { Alert, View } from 'react-native';

interface PropsProduct {
    showModalProduct: boolean;
    setshowModalProduct: Function;
}
export const NuevoProducto  = ({ showModalProduct, setshowModalProduct }: PropsProduct) => {
 // Hooks para manejar los datos del producto
 const [id, setid] = useState('')
 const [producto, setproducto] = useState('');
 const [precio, setprecio] = useState('');
 useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
             const uid = user.uid; 
             setid(uid);
         }
     });
     return () => unsubscribe(); 
 }, []);

 const enviarDatos = () => {     
             set(ref(db, `users/${id}/productos/${producto}`), {
                 producto: producto,
                 precio: precio,
                 
             })
                 .then(() => {
                     setproducto('');
                     setprecio('');
                     
                     Alert.alert("Producto almacenado en la bdd")
                     setshowModalProduct(false)                        
                 })
                 .catch((error) => {
                     console.error('Error al guardar los datos:', error);
                 });
         
     
 };

 return (

     <Modal visible={showModalProduct} contentContainerStyle={styles.modal}>
         <View style={styles.header}>
             <Text variant='headlineSmall'>Nuevo Producto</Text>
             <View style={styles.icon}>
                 <IconButton icon='close-circle-outline'
                     size={20}
                     onPress={() => setshowModalProduct(false)} />
             </View>
         </View>
         <Divider />
         <TextInput
             label="Nombre "
             mode="outlined"
             placeholder="Nombre"
             value={producto}
             onChangeText={setproducto}
         />
         <TextInput
             label="Precio"
             mode="outlined"
             placeholder="Precio"
             value={precio}
             onChangeText={setprecio}
             
         />   
         <Button mode="contained" onPress={enviarDatos}>Agregar </Button>
     </Modal>

 );
};


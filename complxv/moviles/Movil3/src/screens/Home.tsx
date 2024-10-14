import React, { useEffect, useState } from 'react';
import { styles } from '../theme/styles';
import { Avatar, FAB, IconButton, Modal, Portal, Text } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { auth, db } from '../config/Config';
import { FlatList } from 'react-native-gesture-handler';
import { Productcomponent } from '../components/Productcomponent';
import { Editaruser } from '../components/Editaruser';
import { EditarProductos } from '../components/EditarProductos';
import { NuevoProducto } from '../components/NuevoProducto';

interface Product {
  producto: string;
  precio: string;
  descripcion: string;
}

export const HomeScreen = ({ navigation }: any) => {
  const [uid, setuid] = useState('');
  const [showModalProduct, setshowModalProduct] = useState<boolean>(false);
  const [showModelUser, setshowModelUser] = useState<boolean>(false);
  const [showModalEditProduct, setshowModalEditProduct] = useState<boolean>(false);
  const [productoSeleccionado, setproductoSeleccionado] = useState('');
  const [nombre, setnombre] = useState('');
  const [apellido, setapellido] = useState('');
  const [genero, setgenero] = useState<boolean>(true);
  const [productos, setproductos] = useState<Product[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      setuid(uid);
      cargarUsuario(uid);
      cargarProductos(uid);
    }
  }, []);

  function cargarUsuario(uid: string) {
    const starCountRef = ref(db, `users/${uid}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setnombre(data.nombre);
        setapellido(data.apellido);
        setgenero(data.genero);
      }
    });
  }

  function cargarProductos(uid: string) {
    const productRef = ref(db, `users/${uid}/productos`);
    onValue(productRef, (snapshot) => {
      const dataProductos = snapshot.val();
      const listaProductos: any = Object.keys(dataProductos).map((producto) => ({ producto, ...dataProductos[producto] }));
      setproductos(listaProductos);
    });
  }

  const avatarLabel = `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <View>
            <Avatar.Text size={30} label={avatarLabel} />
            <Text variant="bodySmall">
              {genero === true ? 'Bienvenido' : genero === false ? 'Bienvenida' : 'Bienvenid@'}
            </Text>
            <Text variant="labelLarge">{nombre} {apellido}</Text>
          </View>
          <IconButton
            style={styles.icon}
            icon="account-search"
            size={20}
            onPress={() => setshowModelUser(true)}
          />
        </View>

        <FlatList
          data={productos}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setproductoSeleccionado(item.producto); 
              setshowModalEditProduct(true); 
            }}>
              <Productcomponent product={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.producto}
        />
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setshowModalProduct(true)}
      />
      <NuevoProducto showModalProduct={showModalProduct} setshowModalProduct={() => setshowModalProduct(false)} />
      <Editaruser showModelUser={showModelUser} setshowModelUser={() => setshowModelUser(false)} />
      <EditarProductos
        showModalEditProduct={showModalEditProduct}
        setshowModalEditProduct={() => setshowModalEditProduct(false)}
        productoSeleccionado={productoSeleccionado} 
      />
    </>
  );
};

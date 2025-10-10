import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/auth';

const HomeScreen: React.FC = () => {
const dispatch = useDispatch();
const uid = useSelector((state: RootState) => state.auth.uid);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Text style={styles.uidText}>UID: {uid}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  uidText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'gray',
  },
});

export default HomeScreen;
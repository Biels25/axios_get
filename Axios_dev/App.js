import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import api from './src/devices/api';

export default function App() {
  const [users, setUsers] = useState([]);

  const API = "http://10.110.12.47:3000/users";

  // Fetch users from API
  async function fetchUsers() {
    try {
      const response = await api.get(API);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  // Render user items in the list
  const renderUsers = () => {
    return users.map((item) => (
      <View key={item.id} style={styles.itemContainer}>
        <Text style={styles.item}>ID: {item.id} - Nome: {item.name} - Email: {item.email}</Text>
      </View>
    ));
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GET - Listar Usuários</Text>
      <Button title="Recarregar lista" onPress={fetchUsers} />
      <ScrollView>{renderUsers()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  item: {
    fontSize: 14,
    marginBottom: 5,
  },
});

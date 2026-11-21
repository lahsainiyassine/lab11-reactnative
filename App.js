import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native';

import UserCard from './components/UserCard';
import UserDetail from './components/UserDetail';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) {
        throw new Error('Erreur HTTP ' + res.status);
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Impossible de charger les utilisateurs : ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.inner}>
        <Text style={styles.headerTitle}>Annuaire Utilisateurs (API REST)</Text>

        {selectedUser ? (
          <UserDetail user={selectedUser} onBack={() => setSelectedUser(null)} />
        ) : (
          <>
            <TextInput
              placeholder="Rechercher par nom ou email..."
              value={searchText}
              onChangeText={setSearchText}
              style={styles.input}
              placeholderTextColor="#888888"
            />

            <View style={styles.actionsBar}>
              <Button title="Actualiser" onPress={fetchUsers} color="#EE9972" />
            </View>

            {loading ? (
              <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#EE9972" />
                <Text style={styles.loadingText}>Chargement des utilisateurs...</Text>
              </View>
            ) : error ? (
              <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Réessayer" onPress={fetchUsers} />
              </View>
            ) : (
              <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <UserCard user={item} onPress={() => setSelectedUser(item)} />
                )}
                contentContainerStyle={styles.listContent}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inner: {
    flex: 1,
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  actionsBar: {
    marginBottom: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

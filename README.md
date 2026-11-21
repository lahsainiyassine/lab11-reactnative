# Lab 11 : Consommation d'une API REST avec React Native : GET, JSON et Fetch/Axios

- **URL de la plateforme** : https://mliaedu.toubkalit.com/student/courses/38/labs/549
- **Formation** : React Native

---

## 1. Objectifs
- Comprendre le modèle client-serveur et les API REST.
- Effectuer des requêtes HTTP GET avec `fetch` et `axios`.
- Manipuler des données JSON asynchrones avec `async/await`.
- Gérer l'état de l'application avec `useState` et `useEffect` (données, `loading`, `error`).
- Afficher les listes de données avec `FlatList` et indicateur de chargement `ActivityIndicator`.
- Ajouter la recherche en temps réel et la vue détaillée.

---

## 2. Dépendances requises
```bash
npm install axios
```

---

## 3. Structure des fichiers
```text
tp11/
  components/
    UserCard.js
    UserDetail.js
  App.js
  package.json
```

---

## 4. Composant UserCard.js
**Fichier : `components/UserCard.js`**
```javascript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function UserCard({ user, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.city}>📍 {user.address?.city}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  email: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  city: {
    fontSize: 12,
    color: '#888888',
    marginTop: 6,
  },
});
```

---

## 5. Composant UserDetail.js
**Fichier : `components/UserDetail.js`**
```javascript
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function UserDetail({ user, onBack }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Détails de l'utilisateur</Text>
        <Text style={styles.label}>Nom : <Text style={styles.val}>{user.name}</Text></Text>
        <Text style={styles.label}>Nom d'utilisateur : <Text style={styles.val}>{user.username}</Text></Text>
        <Text style={styles.label}>Email : <Text style={styles.val}>{user.email}</Text></Text>
        <Text style={styles.label}>Téléphone : <Text style={styles.val}>{user.phone}</Text></Text>
        <Text style={styles.label}>Site web : <Text style={styles.val}>{user.website}</Text></Text>
        <Text style={styles.label}>Ville : <Text style={styles.val}>{user.address?.city}</Text></Text>
        <Text style={styles.label}>Rue : <Text style={styles.val}>{user.address?.street}</Text></Text>
        <Text style={styles.label}>Entreprise : <Text style={styles.val}>{user.company?.name}</Text></Text>

        <View style={styles.buttonWrapper}>
          <Button title="← Retour à la liste" onPress={onBack} color="#EE9972" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555555',
    marginVertical: 4,
  },
  val: {
    fontWeight: 'normal',
    color: '#222222',
  },
  buttonWrapper: {
    marginTop: 24,
  },
});
```

---

## 6. Code complet App.js
**Fichier : `App.js`**
```javascript
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
```

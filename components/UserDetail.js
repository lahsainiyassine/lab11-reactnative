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

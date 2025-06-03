import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, List } from 'react-native-paper';

export default function SettingsScreen() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <List.Section>
        <List.Subheader style={styles.subheader}>Notificações</List.Subheader>
        <List.Item
          title="Ativar Notificações"
          titleStyle={styles.text}
          right={() => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  subheader: {
    color: '#FFD700',
  },
  text: {
    color: '#FFFFFF',
  },
});

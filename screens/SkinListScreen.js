import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Text, Card, Paragraph, Modal, Portal, Button } from 'react-native-paper';

const API_URL = 'https://bymykel.github.io/CSGO-API/api/en/skins.json';

export default function SkinsListScreen({ route }) {
  const { weaponType } = route.params;
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkin, setSelectedSkin] = useState(null);
  const [visible, setVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const allSkins = Object.values(data).flat();
        const filtered = allSkins.filter(skin =>
          skin.name?.toLowerCase().includes(weaponType.toLowerCase())
        );
        setSkins(filtered);
        setLoading(false);
      })
      .catch(() => {
        setSkins([]);
        setLoading(false);
      });
  }, [weaponType]);

  const openModal = (skin) => {
    const normalizedSkin = {
      ...skin,
      name: skin.name || 'Nome não disponível',
      image: skin.image || null,
      pattern: typeof skin.pattern === 'object' ? skin.pattern.name : skin.pattern,
      quality: typeof skin.quality === 'object' ? skin.quality.name : skin.quality,
      rarity: typeof skin.rarity === 'object' ? skin.rarity.name : skin.rarity,
      float: skin.float || 'Aleatório'
    };
    setSelectedSkin(normalizedSkin);
    setImageError(false);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedSkin(null);
    setImageError(false);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.text}>Carregando skins...</Text>
      </View>
    );
  }

  if (!skins.length) {
    return (
      <View style={styles.loading}>
        <Text style={styles.text}>Nenhuma skin encontrada para {weaponType}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={skins}
        keyExtractor={(item, index) => `${item.id || item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <Card 
              style={styles.card} 
              onPress={() => openModal(item)}
              mode="contained"
            >
              <Card.Cover 
                source={{ uri: item.image }} 
                style={styles.cardImage} 
                resizeMode="contain" 
              />
              <Card.Content>
                <Text style={styles.cardTitle}>{item.name || 'Sem nome'}</Text>
              </Card.Content>
            </Card>
          </View>
        )}
      />

      <Portal>
        <Modal visible={visible} onDismiss={closeModal} contentContainerStyle={styles.modal}>
          {selectedSkin && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedSkin.name}</Text>

              {selectedSkin.image && !imageError ? (
                <Image 
                  source={{ uri: selectedSkin.image }} 
                  style={styles.modalImage} 
                  onError={() => setImageError(true)} 
                />
              ) : (
                <View style={[styles.modalImage, styles.imagePlaceholder]}>
                  <Text style={styles.text}>Imagem não disponível</Text>
                </View>
              )}

              <Paragraph style={styles.detail}>🎯 Pattern: {selectedSkin.pattern || 'N/A'}</Paragraph>
              <Paragraph style={styles.detail}>🔹 Raridade: {selectedSkin.rarity || 'Desconhecida'}</Paragraph>
              <Paragraph style={styles.detail}>📉 Float: {selectedSkin.float}</Paragraph>

              <Button 
                mode="contained" 
                onPress={closeModal} 
                buttonColor="#FFD700" 
                labelStyle={{ color: '#000' }} 
                style={styles.closeButton}
              >
                Fechar
              </Button>
            </View>
          )}
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#000',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#FFD700',
    marginTop: 10,
  },
  cardWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    // Sombra para Android e iOS
    elevation: 3,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
    backgroundColor: '#1E1E1E',
  },
  cardImage: {
    height: 180,
    backgroundColor: '#222',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FFD700',
  },
  modal: {
    backgroundColor: 'transparent',
    padding: 20,
    margin: 20,
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#FFD700',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
    backgroundColor: '#333',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#444',
    borderWidth: 1,
  },
  detail: {
    fontSize: 15,
    marginBottom: 5,
    color: '#DDD',
  },
  closeButton: {
    marginTop: 20,
  },
});
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [isFavorited, setIsFavorited] = React.useState(false);
  const recoilAnim = React.useRef(new Animated.Value(0)).current; // Animação para o efeito de recuo

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
    
    // Animação de recuo que dispara a cada 3 segundos
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(recoilAnim, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(recoilAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000);

    return () => clearInterval(interval);
  }, [fadeAnim, recoilAnim]);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  // Exemplo de skin em destaque
  const featuredSkin = {
    name: 'AWP | Dragon Lore',
    image: 'https://s2-techtudo.glbimg.com/Yt1KyOropQxteSSgbgTlMgXfSxo=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2019/Q/C/abgL3mSDWNqZpdoA8jhA/novo-projeto-75-.jpg',
    price: '$2,000.00',
  };

  // Interpolação para a animação de recuo
  const recoilInterpolation = recoilAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -10], // Move o texto para cima durante o recuo
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho */}
        <Card style={[styles.headerCard, styles.elevation]}>
          <Card.Content>
            <View style={styles.headerContent}>
              <Animated.Text 
                style={[
                  styles.welcomeText,
                  {
                    transform: [
                      { 
                        translateY: recoilInterpolation,
                      },
                      {
                        scale: recoilAnim.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: [1, 1.05, 1], // Pequeno efeito de escala
                        }),
                      },
                    ],
                  },
                ]}
              >
                CS2 Skins🔫
              </Animated.Text>
            </View>
            <Text style={styles.subtitle}>Explore as skins mais valiosas do mercado</Text>
          </Card.Content>
        </Card>

        {/* Restante do seu código permanece igual */}
        {/* Skin em destaque */}
        <TouchableOpacity activeOpacity={0.8} style={[styles.featuredCard, styles.elevation]}>
          <Image source={{ uri: featuredSkin.image }} style={styles.skinImage} />
          <View style={styles.featuredInfo}>
            <Text style={styles.skinName}>{featuredSkin.name}</Text>
            <Text style={styles.skinPrice}>{featuredSkin.price}</Text>
          </View>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Icon
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorited ? '#FFD700' : '#ccc'}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Ações */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionCard, styles.elevation]}>
            <Icon name="heart" size={28} color="#FFD700" />
            <Text style={styles.actionText}>Favoritas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionCard, styles.elevation]}>
            <Icon name="magnify" size={28} color="#FFD700" />
            <Text style={styles.actionText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </Animated.View>
  );
}

// Seus estilos permanecem exatamente os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  headerCard: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#1f1f1f',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  featuredCard: {
    height: 200,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  skinImage: {
    width: '100%',
    height: '65%',
    resizeMode: 'contain',
  },
  featuredInfo: {
    padding: 10,
  },
  skinName: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  skinPrice: {
    fontSize: 14,
    color: '#FFD700',
    marginTop: 4,
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#00000055',
    borderRadius: 20,
    padding: 6,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFD700',
  },
  elevation: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
});
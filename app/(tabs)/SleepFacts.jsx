import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const facts = [
  {
    id: '1',
    text: 'Newborns sleep up to 16-17 hours a day, but in short bursts of 2-4 hours.',
    image: require('../../assets/images/bby.png'),  
  },
  {
    id: '2',
    text: 'Blue light exposure suppresses melatonin, making it harder to fall asleep.',
    image: require('../../assets/images/light.png'), 
  },
  {
    id: '3',
    text: 'Regular meditation reduces insomnia and can lead to longer, deeper sleep.',
    image: require('../../assets/images/meditation.png'),
  },
  {
    id: '4',
    text: 'Power naps lasting 10-20 minutes can improve alertness and performance.',
    image: require('../../assets/images/nap.png'), 
  },
];

const SleepFacts = () => {
  const renderFactItem = ({ item }) => (
    <View style={styles.factCard}>
      <Image source={item.image} style={styles.factImage} />
      <Text style={styles.factText}>{item.text}</Text>
    </View>
  );
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('sleepTrack')}>
                <Image source={require('../../assets/back-icon.png')} className="w-8 h-8 mt-12" />
              </TouchableOpacity>
      <Text style={styles.header}>Interesting Facts</Text>
      <FlatList
        data={facts}
        renderItem={renderFactItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffff',
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  factCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEEAD',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  factImage: {
    width: 120, // Explicit size
    height: 100, // Explicit size
    borderRadius: 8,
    marginRight: 10,
    marginBottom:0,
  },
  factText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'semibold'
  },
});

export default SleepFacts;

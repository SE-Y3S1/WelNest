import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';

const SleepMusic = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const musicCategories = [
    { id: '1', title: 'Rain Sounds', image: require('../../assets/images/rain.png') },
    { id: '2', title: 'Ocean & Waves', image: require('../../assets/images/ocean.png') },
    { id: '3', title: 'Rivers & Waterfalls', image: require('../../assets/images/waterfall.png') },
    { id: '4', title: 'Deep Forests', image: require('../../assets/images/forest.png') },
    { id: '5', title: 'Night Sounds', image: require('../../assets/images/night.png') },
    { id: '6', title: 'Early Mornings', image: require('../../assets/images/sunrise.png') },
  ];

  const renderTile = ({ item }) => (
    <TouchableOpacity style={styles.tileButton}>
      <ImageBackground source={item.image} style={styles.tileImage} imageStyle={{ borderRadius: 10 }}>
        <View style={styles.overlay}>
          <Text style={styles.tileText}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('sleepTrack')}>
                <Image source={require('../../assets/back-icon.png')} className="w-8 h-8 mt-12" />
              </TouchableOpacity>
      <Text style={styles.header}>Sleep Music</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Genre Buttons */}
      <View style={styles.genreButtonsContainer}>
        <TouchableOpacity style={styles.genreButton}>
          <Text style={styles.genreButtonText}>All genres</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genreButton}>
          <Text style={styles.genreButtonText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genreButton}>
          <Text style={styles.genreButtonText}>My Playlists</Text>
        </TouchableOpacity>
      </View>

      {/* Music Category Tiles */}
      <FlatList
        data={musicCategories}
        renderItem={renderTile}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.tileContainer}
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
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: '#f2f2f2',
  },
  genreButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genreButton: {
    backgroundColor: '#FFA500',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  genreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tileContainer: {
    marginTop: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tileButton: {
    borderRadius: 10,
    margin: 10,
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Add a dark overlay for better text visibility
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  tileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SleepMusic;

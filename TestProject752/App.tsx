import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import Sound from 'react-native-sound';

// Get screen width and height
const {width, height} = Dimensions.get('window');

// List of random colors
const colors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#8E44AD',
  '#F39C12',
  '#1ABC9C',
  '#2C3E50',
];

// Setup sound
Sound.setCategory('Playback');
const soundEffect = new Sound(
  'https://www.soundjay.com/button/beep-07.wav',
  null,
  error => {
    if (error) {
      console.log('Sound failed to load', error);
    }
  },
);

const App = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [animatedValue] = useState(new Animated.Value(1));

  useEffect(() => {
    // Cleanup sound when the component unmounts
    return () => {
      soundEffect.release();
    };
  }, []);

  // Function to generate a random color and update score
  const changeColor = () => {
    const newColorIndex = Math.floor(Math.random() * colors.length);
    setColorIndex(newColorIndex);
    setScore(score + 1);

    // Play sound when the button is clicked
    soundEffect.play();

    // Animate the background color change
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: colors[colorIndex], opacity: animatedValue},
      ]}>
      <Text style={styles.title}>Tap to Change Color!</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <TouchableOpacity onPress={changeColor} style={styles.button}>
        <Text style={styles.buttonText}>Tap Me!</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>React Native Color Tap Game</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  score: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default App;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from './components/Game';




export default function App() {
  return (
    <View style={styles.container}>
      <Text style= {styles.text}>Where Am I?</Text>
      <Game />
      <StatusBar style= "auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 30,
    margin: 10
  }
});

import { useState } from "react"
import { TextInput, Text, View, StyleSheet, Pressable, Modal, Button} from "react-native"
import { locationDayOne } from "../data/ImageData";
import ImageViewer from "./ImageViewer";

export default function Game() {
    const [input, setInput] = useState(""); // Declare a state variable to store user input
    const [showModal, setShowModal] = useState(false); // Declare a state variable to control modal visibility
    const [numAttempts, setNumAttempts] = useState(0); // Declare a state variable to keep track of the number of attempts
    const [photoIndex, setPhotoIndex] = useState(0) // Declare a state variable to change photos
  
    const handlePress = () => {
      const nextPhotoIndex = photoIndex + 1;
      const location = Object.values(locationDayOne)[photoIndex];
      
      if (input.trim().toLowerCase() === location.answer) { // Check if user's input is correct
        setShowModal(true); // Set the showModal state to true to reveal the modal
        setNumAttempts(0); // Reset the number of attempts
        setInput(""); // Reset the input bar to an empty string
        setPhotoIndex(nextPhotoIndex) // reveal the new photo
      } else {
        if (numAttempts < 4) { // Check if the number of attempts is less than 4
          setNumAttempts(numAttempts + 1); // Increment the number of attempts
        } else {
          setShowModal(true); // Set the showModal state to true to reveal the modal
          setNumAttempts(0); // Reset the number of attempts
          setInput(""); // Reset the input bar to an empty string
          setPhotoIndex(nextPhotoIndex) // reveal the new photo
        }
      }
    };
  
    // Get the tally based on the number of attempts
    const getTally = (numAttempts) => {
      switch (numAttempts) {
        case 1:
          return "|";
        case 2:
          return "||";
        case 3:
          return "|||";
        case 4:
          return "||||";
        // case 5: 
        //   return "|\u0336|\u0336|\u0336|\u0336|\u0336";
        default:
          return "";
      }
    };

    return (
      <View> 
        <ImageViewer photoIndex={photoIndex} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInput(text)} // Update the input state when the user types
          value={input} // Pass the input state as value to the TextInput component
        />
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.text}>Submit</Text>    
        </Pressable> 
        <Text style={styles.attemptsText}>{getTally(numAttempts)}</Text> 
        <Modal visible={showModal}>
          <View style={styles.modal}>
          {console.log('bye', Object.values(locationDayOne)[photoIndex].answer )}
          {console.log('hello', input)}
            {input.trim().toLowerCase() === Object.values(locationDayOne)[photoIndex].answer.trim() ? (
              <Text style={styles.modalText}>Bingo </Text>
            ) : (
              <Text style={styles.modalText}>No Bueno</Text>
            )}
            <Button title="OK" onPress={() => setShowModal(false)} />
          </View>
        </Modal>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    input: {
      alignSelf:'center',
      textAlign: 'center',
      height: 50,
      width: 200,
      margin: 10,
      borderWidth: 2,
      borderColor: 'gray',
      borderRadius: 8,
      fontFamily: 'monospace',
    },
    text: {
      textAlign: 'center'
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'antiquewhite',
      borderRadius: 4,
      height: 40,
      padding: 10,
      marginLeft: 40,
      marginRight: 40,
      marginTop: 5
    },
    modal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    modalText: {
      fontSize: 20,
      marginBottom: 20
    },
    attemptsText: {
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'monospace'
  },
  text: {
    fontFamily: 'monospace'
  }

  });
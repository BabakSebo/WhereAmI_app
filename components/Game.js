import { useState } from "react"
import { TextInput, Text, View, StyleSheet, Pressable, Modal, Button} from "react-native"
import { roundsData } from "../data/ImageData";
import ImageViewer from "./ImageViewer";

export default function Game() {
    const [input, setInput] = useState(""); // Declare a state variable to store user input
    const [showModal, setShowModal] = useState(false); // Declare a state variable to control modal visibility
    const [numAttempts, setNumAttempts] = useState(0); // Declare a state variable to keep track of the number of attempts
    const [photoIndex, setPhotoIndex] = useState(0); // Declare a state variable to change photos
    const [currentInput, setCurrentInput] = useState("");
    const [endRoundModal, setEndRoundModal] = useState(false);
    const [scoreboardVisible, setScoreboardVisible] = useState(false); // Declare a state variable for the scoreboard modal
    const [roundScore, setRoundScore] = useState(0); // Declare a state variable for the score per round
    const [totalScore, setTotalScore] = useState(0);
    const [currentRound, setCurrentRound] = useState(1); // Declare a state varable to store the current round 

    const getCurrentRoundData = () => {
      return roundsData[currentRound] || {}; // return the data for the current round or an empty object if the round data is not available
    }

    const resetGame = () => {
      setInput("");
      setShowModal(false);
      setNumAttempts(0);
      setPhotoIndex(0);
      setCurrentInput("");
      setEndRoundModal(false);
      setScoreboardVisible(false);
      setRoundScore(0);
      setTotalScore(0);
      setCurrentRound(1);
    }

    const currentRoundData = getCurrentRoundData();
  
    const handlePress = () => {
      const location = Object.values(currentRoundData)[photoIndex];
   
      
      if (input.trim().toLowerCase() === location.answer) { // Check if user's input is correct
        setCurrentInput(input.trim().toLowerCase())
        setShowModal(true); // Set the showModal state to true to reveal the modal
        setNumAttempts(0); // Reset the number of attempts
        setRoundScore(roundScore + 1) // increase the score for the round when the answer is correct
        setTotalScore(totalScore + 1) // increase the total score when the answer is correct
        setInput(""); // Reset the input bar to an empty string
        if(photoIndex === 4) {
          setEndRoundModal(true)
        }
      } else {
        if (numAttempts < 4) { // Check if the number of attempts is less than 4
          setNumAttempts(numAttempts + 1); // Increment the number of attempts
        } else {
          setCurrentInput(input.trim().toLowerCase())
          setShowModal(true); // Set the showModal state to true to reveal the modal
          setNumAttempts(0); // Reset the number of attempts
          setInput(""); // Reset the input bar to an empty string
          if(photoIndex === 4) {
            setEndRoundModal(true)
          }
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
        <ImageViewer photoIndex={photoIndex} currentRoundData={currentRoundData} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInput(text)} // Update the input state when the user types
          value={input} // Pass the input state as value to the TextInput component
        />
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.text}>Submit</Text>    
        </Pressable> 
        <Text style={styles.attemptsText}>{getTally(numAttempts)}</Text> 
        <Pressable style={styles.buttonScore} onPress={()=> setScoreboardVisible(true)}>
        <Text style={styles.text}>Score</Text>  
        </Pressable>
        <Modal visible={showModal}>
          <View style={styles.modal}>
            {currentInput === Object.values(currentRoundData)[photoIndex].answer.trim() ? (
              <Text style={styles.modalText}>Bingo</Text>
            ) : (
              <Text style={styles.modalText}>No Bueno</Text>
            )}
            <Button title="OK" onPress={() => {setShowModal(false);  setPhotoIndex(photoIndex + 1) }} />
          </View>
        </Modal>
        <Modal visible={scoreboardVisible}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Round {currentRound} Score: {roundScore}</Text>
          <Text style={styles.modalText}>Total Score: {totalScore}</Text>
          <Button
            title="Close"
            onPress={() => setScoreboardVisible(false)}
          />
        </View>
      </Modal>
        <Modal visible={endRoundModal}>
              <View style={styles.modal}>
                <Text style={styles.modalText}>Round 1 Completed, you got {roundScore}/5</Text>
                <Button title="NEXT ROUND" onPress={() => {setEndRoundModal(false);   setShowModal(false), setCurrentRound(currentRound + 1); setPhotoIndex(0); setRoundScore(0) }} />
              </View>
        </Modal>
        <Pressable style={styles.buttonRestart} onPress={resetGame}>
         <Text style={styles.text}>R</Text>
        </Pressable>
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
    buttonScore: {
      alignItems: 'center',
      backgroundColor: 'darkseagreen',
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
      marginBottom: 20,
      fontFamily: 'monospace',
    },
    attemptsText: {
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'monospace'
  },
  text: {
    fontFamily: 'monospace'
  },
  buttonRestart: {

    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,

    width:30
  },

  });
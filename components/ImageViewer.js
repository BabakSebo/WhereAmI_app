import { Image } from "react-native"
import { StyleSheet } from "react-native"


export default function ImageViewer({photoIndex, currentRoundData}){
    const location = Object.values(currentRoundData)[photoIndex];


      return (
        <Image 
        style={styles.image}
        source={location.photo}/>
    )
}

const styles = StyleSheet.create(
   { 
    image: {
        height: 320,
        width: 340,
        borderRadius: 18
    }
    }
    )
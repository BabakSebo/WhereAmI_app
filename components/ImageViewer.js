import { Image } from "react-native"
import { StyleSheet } from "react-native"
import { locationDayOne } from "../data/ImageData"  

export default function ImageViewer({photoIndex}){
    const location = Object.values(locationDayOne)[photoIndex];


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
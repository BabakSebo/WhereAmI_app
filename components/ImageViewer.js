import { Image } from "react-native"
import { StyleSheet } from "react-native"
import { locationDayOne } from "../data/ImageData"

export default function ImageViewer(){
    return (
        <Image 
        style={styles.image}
        source={locationDayOne.one.image}/>
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
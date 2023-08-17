import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Button, Alert, TouchableOpacity } from 'react-native'
import reactIcon from './assets/React-icon.png'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

const App = () => {
  const [imageVisible, setimageVisible] = useState(false)
  const [image, setImage] = useState('https://picsum.photos/200/200')

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera is required')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()

    console.log(pickerResult)
    setImage(pickerResult['assets'][0]['uri'])
  }

  const OpenShareDialog = async () => {
    if(!await Sharing.isAvailableAsync()) {
      alert('Sharing is not availeble on this phone')
      return
    }

    await Sharing.shareAsync(image)
  }

  return (
    <View style={styles.container}>
      <Image
        source={reactIcon}
        style={styles.localImage} />
      <Text style={styles.title} >React native demo</Text>

      {imageVisible &&
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Image
            source={{ uri: image }}
            style={styles.imageWeb} />
        </TouchableOpacity>
      }

      <Button
        title={imageVisible ? "Hidde Image" : "Show Image"}
        onPress={
          () => {
            Alert.alert(imageVisible ? "Image Hidden" : " Image Visible")
            setimageVisible(!imageVisible)
          }
        } />

      <TouchableOpacity
        style={styles.TouchableButton}
        onPress={OpenShareDialog}>
        <Text style={{
          color: '#fff',
          fontSize: 30
        }}>
          Share Image
        </Text>
      </TouchableOpacity>

    </View>
  )
}

// **********
// * Styles *
// **********
const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#292929'
  },
  title: {
    fontSize: 30,
    color: 'red'
  },
  imageWeb: {
    width: 200,
    height: 200
  },
  localImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#61DBFB',
    resizeMode: 'contain'
  },
  TouchableButton: {
    backgroundColor: 'red',
    padding: 20,
    marginTop: 10
  }
})

export default App
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { datasource, images, getImage } from "./data.js";

const Add = ({ navigation }) => {
    // Form values typed or chosen by the user
    const [name, setName] = useState("");
    const [meaning, setMeaning] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [type, setType] = useState("Romantic Blooms");
    const [image, setImage] = useState("rose");
    const [photoUri, setPhotoUri] = useState(""); // photo uploaded from the gallery

    // Open the phone's photo gallery so the user can choose a picture
    const pickPhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1], // square crop, same shape as the list images
            quality: 0.7,
        });

        // Only save the photo if the user did not press cancel
        if (!result.canceled) {
            setPhotoUri(result.assets[0].uri);
        }
    };

    // Choosing a built-in image replaces any uploaded photo
    const chooseBuiltInImage = (imageName) => {
        setImage(imageName);
        setPhotoUri("");
    };

    // Add the new flower to the chosen section, then go back to Home
    const submit = () => {
        if (name.trim() === "") {
            Alert.alert("Missing name", "Please enter a flower name.");
            return;
        }

        const item = {
            key: name.trim(),
            meaning: meaning.trim(),
            scientificName: scientificName.trim(),
            image: image,
            photoUri: photoUri,
        };

        // Find which section matches the chosen category
        let indexnum = 0;
        if (type === "Sunshine Blooms") {
            indexnum = 1;
        } else if (type === "Elegant Blooms") {
            indexnum = 2;
        }

        datasource[indexnum].data.push(item);
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Image preview */}
            <Image source={getImage({ image, photoUri })} style={styles.preview} />

            <Text style={styles.label}>Flower Name</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Rose"
                placeholderTextColor="#B9A6A6"
                onChangeText={setName}
            />

            <Text style={styles.label}>Meaning</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Love and romance"
                placeholderTextColor="#B9A6A6"
                onChangeText={setMeaning}
            />

            <Text style={styles.label}>Scientific Name</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Rosa"
                placeholderTextColor="#B9A6A6"
                onChangeText={setScientificName}
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerBox}>
                <Picker selectedValue={type} onValueChange={setType}>
                    <Picker.Item label="Romantic Blooms" value="Romantic Blooms" />
                    <Picker.Item label="Sunshine Blooms" value="Sunshine Blooms" />
                    <Picker.Item label="Elegant Blooms" value="Elegant Blooms" />
                </Picker>
            </View>

            <Text style={styles.label}>Image</Text>
            {/* Option 1: upload a photo from the phone's gallery */}
            <TouchableOpacity style={styles.uploadButton} onPress={pickPhoto}>
                <FontAwesome6 name="image" size={15} color="#B96B85" />
                <Text style={styles.uploadText}>
                    {photoUri ? "Change Uploaded Photo" : "Upload from Gallery"}
                </Text>
            </TouchableOpacity>

            {/* Option 2: choose one of the built-in images */}
            <Text style={styles.orText}>or choose a built-in image</Text>
            <View style={styles.pickerBox}>
                <Picker selectedValue={image} onValueChange={chooseBuiltInImage}>
                    {/* One option for every image in data.js */}
                    {Object.keys(images).map((imageName) => (
                        <Picker.Item key={imageName} label={imageName} value={imageName} />
                    ))}
                </Picker>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={submit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFAF7",
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    preview: {
        width: 120,
        height: 120,
        borderRadius: 16,
        alignSelf: "center",
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#4A3838",
        marginTop: 14,
        marginBottom: 6,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#F4DCE4",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        color: "#4A3838",
    },
    pickerBox: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#F4DCE4",
        borderRadius: 10,
        overflow: "hidden",
    },
    uploadButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F4DCE4",
        paddingVertical: 12,
        borderRadius: 10,
    },
    uploadText: {
        color: "#B96B85",
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 8,
    },
    orText: {
        textAlign: "center",
        fontSize: 12,
        color: "#4A3838",
        marginVertical: 8,
    },
    submitButton: {
        backgroundColor: "#B96B85",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 24,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Add;

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

const Edit = ({ navigation, route }) => {
    // Values sent from Home: flower name, section title and row index
    const { key, type, index } = route.params;

    // Find which section the flower belongs to
    let indexnum = 0;
    if (type === "Sunshine Blooms") {
        indexnum = 1;
    } else if (type === "Elegant Blooms") {
        indexnum = 2;
    }

    // The flower that was tapped
    const flower = datasource[indexnum].data[index];

    // Form values start with the flower's current details
    const [name, setName] = useState(key);
    const [meaning, setMeaning] = useState(flower.meaning);
    const [scientificName, setScientificName] = useState(flower.scientificName);
    const [image, setImage] = useState(flower.image);
    const [photoUri, setPhotoUri] = useState(flower.photoUri || ""); // uploaded photo, if any

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

    // Update the flower in place, then go back to Home
    function save() {
        if (name.trim() === "") {
            Alert.alert("Missing name", "Please enter a flower name.");
            return;
        }

        datasource[indexnum].data[index].key = name.trim();
        datasource[indexnum].data[index].meaning = meaning.trim();
        datasource[indexnum].data[index].scientificName = scientificName.trim();
        datasource[indexnum].data[index].image = image;
        datasource[indexnum].data[index].photoUri = photoUri;
        navigation.goBack();
    }

    // Ask before deleting. "Yes" removes the flower from its section.
    function confirmDelete() {
        Alert.alert("Are you sure?", "Delete " + key + " from " + type + "?", [
            { text: "No", style: "cancel" },
            {
                text: "Yes",
                style: "destructive",
                onPress: () => {
                    datasource[indexnum].data.splice(index, 1);
                    navigation.goBack();
                },
            },
        ]);
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Image preview and category */}
            <Image source={getImage({ image, photoUri })} style={styles.preview} />
            <Text style={styles.category}>{type}</Text>

            <Text style={styles.label}>Flower Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Meaning</Text>
            <TextInput style={styles.input} value={meaning} onChangeText={setMeaning} />

            <Text style={styles.label}>Scientific Name</Text>
            <TextInput
                style={styles.input}
                value={scientificName}
                onChangeText={setScientificName}
            />

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
                    {Object.keys(images).map((imageName) => (
                        <Picker.Item key={imageName} label={imageName} value={imageName} />
                    ))}
                </Picker>
            </View>

            {/* Save and Delete buttons side by side */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={save}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={confirmDelete}
                >
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
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
    },
    category: {
        textAlign: "center",
        color: "#B96B85",
        fontStyle: "italic",
        marginTop: 8,
        marginBottom: 6,
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
    buttonRow: {
        flexDirection: "row",
        marginTop: 24,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "#B96B85",
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1.5,
        borderColor: "#B96B85",
        marginLeft: 8,
    },
    saveText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    deleteText: {
        color: "#B96B85",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Edit;

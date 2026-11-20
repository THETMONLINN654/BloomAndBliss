import React from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Image,
    SectionList,
    TouchableOpacity,
    Alert,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { datasource } from "./data.js";

// Colour palette used throughout the app
const COLORS = {
    dustyRose: "#B96B85",
    blushPink: "#F4DCE4",
    warmWhite: "#FFFAF7",
    darkBrown: "#4A3838",
    white: "#FFFFFF",
};

export default function App() {
    // Shows the flower details when a card is pressed
    const showFlowerInfo = (item) => {
        Alert.alert(
            item.key,
            "Meaning: " + item.meaning + "\nScientific name: " + item.scientificName
        );
    };

    // Simple placeholder for the Add Flower button
    const addFlower = () => {
        Alert.alert("Add Flower", "This feature is coming soon!");
    };

    // How each flower card looks
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => showFlowerInfo(item)}>
                {/* Left side: flower information */}
                <View style={styles.cardInfo}>
                    <Text style={styles.flowerName}>{item.key}</Text>
                    <Text style={styles.flowerMeaning}>{item.meaning}</Text>
                    <Text style={styles.scientificName}>{item.scientificName}</Text>
                </View>

                {/* Right side: flower image */}
                <Image source={item.image} style={styles.flowerImage} />
            </TouchableOpacity>
        );
    };

    // How each section header looks (colours and icon come from data.js)
    const renderSectionHeader = ({ section }) => {
        return (
            <View style={[styles.sectionHeader, { backgroundColor: section.bgColor }]}>
                <FontAwesome6 name={section.icon} size={16} color={section.textColor} />
                <Text style={[styles.sectionTitle, { color: section.textColor }]}>
                    {section.title}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* App header */}
            <View style={styles.header}>
                <FontAwesome6 name="spa" size={28} color={COLORS.dustyRose} />
                <Text style={styles.title}>Bloom & Bliss</Text>
                <Text style={styles.tagline}>Discover the Beauty of Every Bloom</Text>
            </View>

            {/* Add Flower button */}
            <TouchableOpacity style={styles.addButton} onPress={addFlower}>
                <FontAwesome6 name="plus" size={14} color={COLORS.white} />
                <Text style={styles.addButtonText}>Add Flower</Text>
            </TouchableOpacity>

            {/* Flower list grouped into sections */}
            <SectionList
                sections={datasource}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListFooterComponent={
                    <View style={styles.footer}>
                        <FontAwesome6 name="angles-down" size={12} color={COLORS.dustyRose} />
                        <Text style={styles.footerText}>Scroll to explore more flowers</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.warmWhite,
        paddingTop: 50,
        paddingHorizontal: 16,
    },

    // Header
    header: {
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.dustyRose,
        marginTop: 6,
        textAlign: "center",
    },
    tagline: {
        fontSize: 13,
        color: COLORS.darkBrown,
        marginTop: 4,
        textAlign: "center",
    },

    // Add Flower button
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.dustyRose,
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 12,
    },
    addButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },

    // List
    listContent: {
        paddingBottom: 30,
    },

    // Section header
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginTop: 12,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "bold",
        marginLeft: 10,
    },

    // Flower card
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        // Soft shadow (iOS) and elevation (Android)
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    cardInfo: {
        flex: 1,
        marginRight: 12,
    },
    flowerName: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.darkBrown,
    },
    flowerMeaning: {
        fontSize: 14,
        color: COLORS.darkBrown,
        marginTop: 4,
    },
    scientificName: {
        fontSize: 13,
        fontStyle: "italic",
        color: COLORS.dustyRose,
        marginTop: 4,
    },
    flowerImage: {
        width: 90,
        height: 90,
        borderRadius: 12,
    },

    // Footer
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    footerText: {
        fontSize: 12,
        color: COLORS.darkBrown,
        marginLeft: 6,
    },
});

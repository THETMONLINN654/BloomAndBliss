import React from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Image,
    SectionList,
    TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { datasource, getImage } from "./data.js";

const Home = ({ navigation }) => {
    // Re-render Home whenever we come back from Add or Edit
    useIsFocused();

    // Make a fresh copy of the data so the SectionList shows the latest changes
    const sections = datasource.map((section) => ({
        ...section,
        data: [...section.data],
    }));

    // How each flower card looks. Tapping it opens the Edit screen.
    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate("Edit", {
                        index: index, // position inside the section
                        type: section.title, // which section the flower is in
                        key: item.key, // flower name
                    })
                }
            >
                {/* Left side: flower information */}
                <View style={styles.cardInfo}>
                    <Text style={styles.flowerName}>{item.key}</Text>
                    <Text style={styles.flowerMeaning}>{item.meaning}</Text>
                    <Text style={styles.scientificName}>{item.scientificName}</Text>
                </View>

                {/* Right side: flower image */}
                <Image source={getImage(item)} style={styles.flowerImage} />
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
                <FontAwesome6 name="spa" size={28} color="#B96B85" />
                <Text style={styles.title}>Bloom & Bliss</Text>
                <Text style={styles.tagline}>Discover the Beauty of Every Bloom</Text>
            </View>

            {/* Add Flower button opens the Add screen */}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Add")}>
                <FontAwesome6 name="plus" size={14} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Add Flower</Text>
            </TouchableOpacity>

            {/* Flower list grouped into sections */}
            <SectionList
                sections={sections}
                keyExtractor={(item, index) => item.key + index}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListFooterComponent={
                    <View style={styles.footer}>
                        <FontAwesome6 name="pen" size={11} color="#B96B85" />
                        <Text style={styles.footerText}>Tap a flower to edit or delete it</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFAF7",
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
        color: "#B96B85",
        marginTop: 6,
        textAlign: "center",
    },
    tagline: {
        fontSize: 13,
        color: "#4A3838",
        marginTop: 4,
        textAlign: "center",
    },

    // Add Flower button
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B96B85",
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 12,
    },
    addButtonText: {
        color: "#FFFFFF",
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
        backgroundColor: "#FFFFFF",
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
        color: "#4A3838",
    },
    flowerMeaning: {
        fontSize: 14,
        color: "#4A3838",
        marginTop: 4,
    },
    scientificName: {
        fontSize: 13,
        fontStyle: "italic",
        color: "#B96B85",
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
        color: "#4A3838",
        marginLeft: 6,
    },
});

export default Home;

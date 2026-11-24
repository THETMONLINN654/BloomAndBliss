// Flower data shared by the Home, Add and Edit screens.
// Each section has a title, a FontAwesome6 icon name, a background colour,
// a text colour and a "data" array of flowers.
// Changes made in Add and Edit last while the app is running.

// All local flower images, loaded with require().
// Each flower stores the NAME of its image (e.g. "rose"), and the app looks it up here.
// Note: the filenames match the files exactly (e.g. "dasiy.jpg", "pony.jpg").
const images = {
    rose: require("./img/rose.jpg"),
    tulip: require("./img/tulip.jpg"),
    peony: require("./img/pony.jpg"),
    sunflower: require("./img/sunflower.jpg"),
    daisy: require("./img/dasiy.jpg"),
    daffodil: require("./img/daffodil.jpg"),
    lily: require("./img/lily.jpg"),
    lavender: require("./img/lavender.jpg"),
    orchid: require("./img/orchid.jpg"),
    forgetmenot: require("./img/forget-me-not.jpg"),
};

const datasource = [
    {
        title: "Romantic Blooms",
        icon: "heart",
        bgColor: "#F4DCE4", // Blush Pink
        textColor: "#B96B85", // Dusty Rose
        data: [
            { key: "Rose", meaning: "Love and romance", scientificName: "Rosa", image: "rose" },
            { key: "Tulip", meaning: "Deep love and affection", scientificName: "Tulipa", image: "tulip" },
            { key: "Peony", meaning: "Romance and prosperity", scientificName: "Paeonia", image: "peony" },
        ],
    },
    {
        title: "Sunshine Blooms",
        icon: "sun",
        bgColor: "#F9EDC8", // Butter Yellow
        textColor: "#9C7A1E", // Golden brown (readable on yellow)
        data: [
            { key: "Sunflower", meaning: "Happiness and loyalty", scientificName: "Helianthus", image: "sunflower" },
            { key: "Daisy", meaning: "Innocence and joy", scientificName: "Bellis perennis", image: "daisy" },
            { key: "Daffodil", meaning: "New beginnings", scientificName: "Narcissus", image: "daffodil" },
        ],
    },
    {
        title: "Elegant Blooms",
        icon: "spa",
        bgColor: "#E6DDF4", // Soft Lavender
        textColor: "#7A62A8", // Deep lavender
        data: [
            { key: "Lily", meaning: "Purity and devotion", scientificName: "Lilium", image: "lily" },
            { key: "Lavender", meaning: "Peace and calmness", scientificName: "Lavandula", image: "lavender" },
            { key: "Orchid", meaning: "Beauty and elegance", scientificName: "Orchidaceae", image: "orchid" },
        ],
    },
];

// Returns the picture to show for a flower.
// A photo uploaded from the phone's gallery is stored in photoUri.
// Otherwise, the flower uses one of the built-in images listed above.
const getImage = (flower) => {
    if (flower.photoUri) {
        return { uri: flower.photoUri };
    }
    return images[flower.image];
};

export { datasource, images, getImage };

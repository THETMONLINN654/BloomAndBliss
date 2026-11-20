// Flower data for the Bloom & Bliss SectionList.
// Each section has a title, a FontAwesome6 icon name, a background colour,
// a text colour and a "data" array of flowers.
// Images are loaded from the local "img" folder using require().
// Note: the filenames below match the files exactly (e.g. "dasiy.jpg", "pony.jpg").

const datasource = [
    {
        title: "Romantic Blooms",
        icon: "heart",
        bgColor: "#F4DCE4", // Blush Pink
        textColor: "#B96B85", // Dusty Rose
        data: [
            {
                key: "Rose",
                meaning: "Love and romance",
                scientificName: "Rosa",
                image: require("./img/rose.jpg"),
            },
            {
                key: "Tulip",
                meaning: "Deep love and affection",
                scientificName: "Tulipa",
                image: require("./img/tulip.jpg"),
            },
            {
                key: "Peony",
                meaning: "Romance and prosperity",
                scientificName: "Paeonia",
                image: require("./img/pony.jpg"),
            },
        ],
    },
    {
        title: "Sunshine Blooms",
        icon: "sun",
        bgColor: "#F9EDC8", // Butter Yellow
        textColor: "#9C7A1E", // Golden brown (readable on yellow)
        data: [
            {
                key: "Sunflower",
                meaning: "Happiness and loyalty",
                scientificName: "Helianthus",
                image: require("./img/sunflower.jpg"),
            },
            {
                key: "Daisy",
                meaning: "Innocence and joy",
                scientificName: "Bellis perennis",
                image: require("./img/dasiy.jpg"),
            },
            {
                key: "Daffodil",
                meaning: "New beginnings",
                scientificName: "Narcissus",
                image: require("./img/daffodil.jpg"),
            },
        ],
    },
    {
        title: "Elegant Blooms",
        icon: "spa",
        bgColor: "#E6DDF4", // Soft Lavender
        textColor: "#7A62A8", // Deep lavender
        data: [
            {
                key: "Lily",
                meaning: "Purity and devotion",
                scientificName: "Lilium",
                image: require("./img/lily.jpg"),
            },
            {
                key: "Lavender",
                meaning: "Peace and calmness",
                scientificName: "Lavandula",
                image: require("./img/lavender.jpg"),
            },
            {
                key: "Orchid",
                meaning: "Beauty and elegance",
                scientificName: "Orchidaceae",
                image: require("./img/orchid.jpg"),
            },
        ],
    },
];

export { datasource };

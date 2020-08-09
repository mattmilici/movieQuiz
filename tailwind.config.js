module.exports = {
    purge: [],
    theme: {
        container: {
            center: true,
            padding: "2rem",
        },
        colors: {
            green1: "#006a71",
            tan1: "#ffffdd",
            baby1: "#cbeaed",
            lime1: "#d3de32",
        },
        height: (theme) => ({
            "screen/2": "50vh",
            "screen/3": "calc(100vh * .65)",
            "screen/4": "calc(100vh / 4)",
            "screen/5": "calc(100vh * .1)",
            "screen/1": "100vh",
        }),
    },
    variants: {},
    plugins: [],
};
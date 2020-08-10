module.exports = {
    purge: [],
    theme: {
        container: {
            center: true,
            padding: "2rem",
        },
        colors: {
            green1: "#eeeeee",
            tan1: "#84a9ac",
            baby1: "#e4e3e3",
            lime1: "#bbd196",
            bluem1: "#84a9ac",
            blueLight1: "#b2ebf2",
        },
        height: (theme) => ({
            "screen/2": "50vh",
            "screen/3": "calc(100vh * .65)",
            "screen/4": "calc(100vh / 4)",
            "screen/5": "calc(100vh * .1)",
            "screen/6": "calc(100vh * .07)",
            "screen/7": "calc(100vh * .51)",
            "screen/1": "100vh",
        }),
    },
    variants: {},
    plugins: [],
};
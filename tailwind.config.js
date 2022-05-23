module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0e2431",
          secondary: "#035431",
          accent: "#f9b248",
          neutral: "#e8d5b7",
          "base-100": "#ffffff",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      "light",
    ],
  },
  plugins: [require("daisyui")],
};

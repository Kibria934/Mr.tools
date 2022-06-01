module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0a192d",
          secondary: "#0c4f4e",
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

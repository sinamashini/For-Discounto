module.exports = {
  presets: ["blitz/babel", ["@babel/preset-react", {
    "runtime": "automatic",
    "importSource": "@emotion/react"
  }]],
  plugins: ["@emotion", "inline-react-svg"],
}

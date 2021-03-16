module.exports = {
  purge: {
    mode: "all",
    content: ["./**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      'display': ['Space\\ Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', "Courier New", 'monospace'],
      'body': ['Lora', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif']
    },
    extend: {
      colors: {
        teal: {
          50: '#ebf6f7',
          100:'#a7e3e8',
          200:'#7acbd7',
          300: '#42b5c7',
          400: '#099fb7',
          500: '#06879d',
          600: '#036e83',
          700: '#055a6e',
          800: '#054658',
          900: '#03232c'
        },
        coral:{
          50: '#f9eded',
          100:'#f8d3cc',
          200:'#f8baaa',
          300: '#f79f89',
          400: '#f17f71',
          500: '#ea5f59',
          600: '#bb5455',
          700: '#8e4951',
          800: '#683138',
          900: '#421a1f'
        },
        gray: {
          50: '#ffffff',
          100:'#e3e3e3',
          200:'#c6c6c6',
          300: '#aaaaaa',
          400: '#8e8e8e',
          500: '#717171',
          600: '#555555',
          700: '#393939',
          800: '#1c1c1c',
          900: '#000000'
        },
        green: {
          50: '#ebf6f7',
          100:'#c9e7c9',
          200:'#a5d89a',
          300: '#84c86c',
          400: '#61b93d',
          500: '#4f9b3a',
          600: '#3b7d36',
          700: '#295f32',
          800: '#16412f',
          900: '#03232c'
        }
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
  experimental: "all",
  future: {
    purgeLayersByDefault: true,
  },
};

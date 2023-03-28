import { createGlobalStyle } from "styled-components";
import Neue from "../assets/fonts/neue/NeueHaasDisplayRoman.ttf";
import Caraque from "../assets/fonts/caraque/Caraque_Trial_RgMelted.ttf";


const FontStyles = createGlobalStyle`

@font-face {
  font-family: "Neue Haas Grotesk Display - Roman";
  src: url(${Neue}) format("truetype"));
}

@font-face {
    font-family: "Caraque-Melt";
    src: url(${Caraque});
  }
`;

export default FontStyles;
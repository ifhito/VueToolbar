import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faScissors,
  faPaste,
  faCopy,
  faBold,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

library.add(faScissors, faPaste, faCopy, faBold, faPalette);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");

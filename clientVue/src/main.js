import "./assets/main.css";

import "primeflex/primeflex.css";
import "primevue/resources/themes/md-light-indigo/theme.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import modules from "@/store/index.js";


import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Chip from "primevue/chip";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import FileUpload from "primevue/fileupload";
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import Image from "primevue/image";

const app = createApp(App);

app.component("InputText", InputText);
app.component("Button", Button);
app.component("Checkbox", Checkbox);
app.component("Chip", Chip);
app.component("Menubar", Menubar);
app.component("FileUpload", FileUpload);
app.component("Message", Message);
app.component("Toolbar", Toolbar)
app.component("Card", Card)
app.component("Avatar", Avatar)
app.component("Image", Image)




app.use(ToastService);
app.use(router);
app.use(PrimeVue);
app.use(modules).mount("#app");

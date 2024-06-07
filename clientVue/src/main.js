import "./assets/main.css";

import "primeflex/primeflex.css";
import "primevue/resources/themes/md-light-deeppurple/theme.css";

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


const app = createApp(App);

app.component("InputText", InputText);
app.component("Button", Button);
app.component("Checkbox", Checkbox);
app.component("Chip", Chip);
app.component("Menubar", Menubar);
app.component("FileUpload", FileUpload);
app.component("Message", Message);



app.use(ToastService);
app.use(router);
app.use(PrimeVue);
app.use(modules).mount("#app");

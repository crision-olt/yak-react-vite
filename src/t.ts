import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    // disable in production
    debug: true,
    // you can have multiple namespaces, in case you want to divide a huge
    // translation into smaller pieces and load them on demand
    interpolation: {
        escapeValue: false,
        spaceValue: false,
        formatSeparator: ",",
    },
    react: {
        wait: true,
    },
});
export default i18n;
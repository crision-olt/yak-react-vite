import { InitOptions } from "i18next";
import globalES from "@/translations/es/global.json";
import globalEN from "@/translations/en/global.json";

export const getTranslationConfig = (): InitOptions => (
    {
        interpolation: { escapeValue: false },
        lng: "en",
        resources: {
            es: {
                global: globalES,
            },
            en: {
                global: globalEN,
            },
        },
    }
);
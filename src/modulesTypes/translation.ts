import { InitOptions } from "i18next";

const Languages = ["en", "es"];
export const getTranslationConfig = (): InitOptions => {
    return (
        {
            interpolation: { escapeValue: false },
            react: {
                useSuspense: false,
            },
            fallbackLng: Languages[0],
            debug: true,
            lng: Languages[0],
        }
    );
};
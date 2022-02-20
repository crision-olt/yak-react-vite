import { StrictMode } from "react";
import { render as ReactRender } from "react-dom";
import { init as Sentry } from "@sentry/react";
import "./index.css";
import App from "@/App";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Translation from "i18next";
import { getSentryConfiguration } from "@/modulesTypes";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getTranslationConfig } from "@/modulesTypes/translation";

Sentry(getSentryConfiguration());
Translation.use(Backend).use(LanguageDetector).use(initReactI18next).init(getTranslationConfig);
ReactRender(
    <StrictMode>
        <I18nextProvider i18n={Translation}>
            <App/>
        </I18nextProvider>
    </StrictMode>,
    document.getElementById("root"),
);

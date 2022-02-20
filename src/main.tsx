import { StrictMode } from "react";
import { render as ReactRender } from "react-dom";
import { init as Sentry } from "@sentry/react";
import "./index.css";
import App from "@/App";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { getSentryConfiguration } from "@/modulesTypes";
import globalES from "@/translations/es/global.json";
import globalEN from "@/translations/en/global.json";

Sentry(getSentryConfiguration());
i18next.init({
    interpolation: { excapeValue: false },
    lng: "en",
    resources: {
        es: {
            global: globalES,
        },
        en: {
            global: globalEN,
        },
    },
});
ReactRender(
    <StrictMode>
        <I18nextProvider i18n={i18next}>
            <App/>
        </I18nextProvider>
    </StrictMode>,
    document.getElementById("root"),
);

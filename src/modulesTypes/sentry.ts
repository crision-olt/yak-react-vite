import { BrowserOptions, Event, EventHint } from "@sentry/react";
import { TF } from "@utils";
import { isEmpty } from "@/utils";
import { Integrations } from "@sentry/tracing";
import { name, version } from "../../package.json";

const isProduction: keyof TF<BeforeSendFunction> = isEmpty(import.meta.env.PROD);
type BeforeSendFunction = (event: Event, hint?: EventHint | undefined) => Event | PromiseLike<Event | null> | null

const sentryBeforeSend: TF<BeforeSendFunction> = {
    "true": (event: Event) => event,
    "false": () => null,
};
const sentryBeforeSendFunction = (): BeforeSendFunction => sentryBeforeSend[isProduction];

export const getSentryConfiguration = (): BrowserOptions => (
    {
        dsn: "https://49d646ad9c0a4f19acd06fae9d1e6867@o1099451.ingest.sentry.io/6124136",
        integrations: [new Integrations.BrowserTracing()],
        beforeSend: sentryBeforeSendFunction(),
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
        environment: "production",
        release: `${name}@${version}`,
    }
);
import '../../public/vendors/fonts/basefont.css';
import {
    AppProps,
    ErrorBoundary,
    ErrorComponent,
    AuthenticationError,
    AuthorizationError,
    ErrorFallbackProps,
    useQueryErrorResetBoundary,
    Head,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"
import { AppContextProvider, AppLoader } from "@zhava/index"
import { AppThemeProvider } from "@zhava/index"
import { AppStyleProvider } from "@zhava/index"
import { AppLocaleProvider } from "@zhava/index"
import { useStore } from "../redux/store"
import { Provider } from 'react-redux';
import { Suspense } from "react"
import '../shared/vendors/index.css';
import { globalStyles } from "app/core/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from 'app/core/components/emotion/createEmotionCache';
import LazyLoader from '@zhava/core/AppSuspense/LazyLoader';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

interface MyAppProps extends AppProps { emotionCache?: EmotionCache }

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


export default function App(
    {
        Component,
        pageProps,
        emotionCache = clientSideEmotionCache
    }: MyAppProps
) {
    const store = useStore(pageProps.initialReduxState);

    return (
        <CacheProvider value={emotionCache}>
            <CssBaseline />
            <ErrorBoundary
                FallbackComponent={RootErrorFallback}
                onReset={useQueryErrorResetBoundary().reset}
            >
                {globalStyles}
                <Head>
                    <title>ژاوا</title>
                    <meta name='viewport' content='initial-scale=1, width=device-width' />
                </Head>
                <AppContextProvider>
                    <Provider store={store}>
                        <AppThemeProvider>
                            <AppStyleProvider>
                                <AppLocaleProvider>
                                    <Suspense fallback={<LazyLoader />}>
                                        <Component {...pageProps} />
                                    </Suspense>
                                </AppLocaleProvider>
                            </AppStyleProvider>
                        </AppThemeProvider>
                    </Provider>
                </AppContextProvider>
            </ErrorBoundary>
        </CacheProvider>
    );
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    if (error instanceof AuthenticationError) {
        return <LoginForm onSuccess={resetErrorBoundary} />
    } else if (error instanceof AuthorizationError) {
        return (
            <ErrorComponent
                statusCode={error.statusCode}
                title="شما به این قسمت دسترسی ندارید"
            />
        )
    } else {
        return (
            <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
        )
    }
}

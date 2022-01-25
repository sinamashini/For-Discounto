import React from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import createEmotionCache from './emotion/createEmotionCache';
import AppContextProvider from '../../@zhava/utility/AppContextProvider';
import AppThemeProvider from '../../@zhava/utility/AppThemeProvider';
import AppStyleProvider from '../../@zhava/utility/AppStyleProvider';
import AppLocaleProvider from '../../@zhava/utility/AppLocaleProvider';
import {EmotionCache} from '@emotion/cache';
import '../../@zhava/services/index';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../../public/assets/styles/index.css';
import '../../shared/vendors/index.css';
import {useStore} from '../../redux/store'; // Client-side cache, shared for the whole session of the user in the browser.


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>ژاوا</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <AppContextProvider>
          <AppThemeProvider>
            <AppStyleProvider>
              <AppLocaleProvider>
                    <CssBaseline />
                    <Component {...pageProps} />
              </AppLocaleProvider>
            </AppStyleProvider>
          </AppThemeProvider>
      </AppContextProvider>
    </CacheProvider>
  );
}

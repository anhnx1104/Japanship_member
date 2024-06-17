import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalBaseline from 'components/GlobalBaseline';
import SplashScreen from 'components/SplashScreen';
import { AuthConsumer, AuthProvider } from 'contexts/Auth';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimeLocaleText } from 'constant/locale';
import viLocale from 'date-fns/locale/vi';
import { NotificationProvider } from 'contexts/Notification';
import { SettingsProvider } from 'contexts/Settings';
// import { AddressProvider } from 'contexts/Address';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';
import createEmotionCache from 'utils/createEmotionCache';
// import { ShoppingCartProvider } from 'contexts/ShoppingCart';
import 'swiper/css/bundle';
import '../i18n';
import 'pages/term-of-service/index.css';
import { CategoryProvider } from 'contexts/Category';
import { SocketNotificationProvider } from 'contexts/SocketNotification';
import DialogProvider from 'contexts/Dialog';
// import { OrdersProvider } from 'contexts/Orders';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface Props extends AppProps {
  emotionCache?: EmotionCache;
}

const App = (props: Props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>JAPAN SHIP</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReduxProvider store={store}>
        <AuthProvider>
          <SettingsProvider>
            {/* <ShoppingCartProvider> */}
            {/* <OrdersProvider> */}
            {/* <AddressProvider> */}
            <CategoryProvider>
              <NotificationProvider>
                <DialogProvider>
                  <SocketNotificationProvider>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={viLocale}
                      localeText={DateTimeLocaleText}
                    >
                      <CssBaseline />
                      <GlobalBaseline />
                      <AuthConsumer>
                        {(auth) =>
                          !auth || !auth.isInitialized ? (
                            <SplashScreen />
                          ) : (
                            <Component {...pageProps} />
                          )
                        }
                      </AuthConsumer>
                    </LocalizationProvider>
                  </SocketNotificationProvider>
                </DialogProvider>
              </NotificationProvider>
            </CategoryProvider>
            {/* </AddressProvider> */}
            {/* </OrdersProvider> */}
            {/* </ShoppingCartProvider> */}
          </SettingsProvider>
        </AuthProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;

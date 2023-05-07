import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { workSans } from '.';
import { ChakraProvider } from '@chakra-ui/react';
import Script from 'next/script';
import store from '@/state/store';
import { Provider } from 'react-redux';

export type PageLayoutProps = {
  children: React.ReactNode;
};

type TComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType<PageLayoutProps>;
  };
};
export default function App({
  Component,
  pageProps,
}: TComponentWithPageLayout) {
  return (
    <Provider store={store}>
      <MantineProvider>
        <ChakraProvider>
          <style jsx global>{`
            html {
              font-family: ${workSans.style.fontFamily};
            }
          `}</style>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-JP7GFWH98T"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JP7GFWH98T', {
    page_path: window.location.pathname,
  });
        `,
            }}
          />
          <Notifications position="top-right" zIndex={2077} />
          {Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </ChakraProvider>
      </MantineProvider>
    </Provider>
  );
}

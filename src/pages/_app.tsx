import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { workSans } from '.';

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
    <MantineProvider>
      <style jsx global>{`
        html {
          font-family: ${workSans.style.fontFamily};
        }
      `}</style>
      <Notifications position="top-right" zIndex={2077} />
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </MantineProvider>
  );
}

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
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
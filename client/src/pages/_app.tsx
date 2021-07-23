import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import { Layout } from "../components/Layout";
import { GlobalStyle, lightTheme } from "../styles";
import { DefaultSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation("common");
  const { t: tHome } = useTranslation("home");
  const { asPath, locale } = useRouter();
  const pageTitle = t("God's Promises");
  const pageDescription = tHome("intro");
  const pageUrl = `https://godspromises.bible/${locale}${asPath}`;

  return (
    <>
      <DefaultSeo
        title={pageTitle}
        description={pageDescription}
        canonical={pageUrl}
        openGraph={{
          url: pageUrl,
          title: pageTitle,
          description: pageDescription,
          site_name: pageTitle,
        }}
        twitter={{
          handle: "@GodsPromisesBot",
          site: "@GodsPromisesBot",
          cardType: "summary",
        }}
      />
      <ThemeProvider theme={lightTheme}>
        <Normalize />
        <GlobalStyle />
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Layout>
      </ThemeProvider>
    </>
  );
}
export default MyApp;

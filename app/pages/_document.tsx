/* eslint-disable @next/next/no-page-custom-font */
import {
    BlitzScript,
    Document,
    DocumentContext,
    DocumentHead,
    DocumentInitialProps,
    Html,
    Main,
} from "blitz"
import { Children, Suspense } from "react"
import createEmotionServer from "@emotion/server/create-instance"
import theme from "app/core/styles/theme"
import createEmotionCache from "app/core/utils/createEmotionCache"

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const originalRenderPage = ctx.renderPage
        const cache = createEmotionCache()
        const { extractCriticalToChunks } = createEmotionServer(cache)

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App: any) =>
                    function EnhanceApp(props) {
                        return <App emotionCache={cache} {...props} />
                    },
            })

        const initialProps = await Document.getInitialProps(ctx)
        const emotionStyles = extractCriticalToChunks(initialProps.html)
        const emotionStyleTags = emotionStyles.styles.map((style) => (
            <style
                data-emotion={`${style.key} ${style.ids.join(" ")}`}
                key={style.key}
                dangerouslySetInnerHTML={{ __html: style.css }}
            />
        ))

        return {
            ...initialProps,
            styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
        }
    }

    render() {
        return (
            <Html lang="en">
                <DocumentHead>
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                </DocumentHead>
                <body>
                    <Main />
                    <BlitzScript />
                </body>
            </Html>
        )
    }
}

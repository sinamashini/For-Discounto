import { Head, ErrorComponent } from "blitz"

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
export default function Page404() {
    const statusCode = 404
    const title = "این صفحه موجود نیست"
    return (
        <>
            <Head>
                <title>
                    {statusCode}: {title}
                </title>
            </Head>
            <ErrorComponent statusCode={statusCode} title={title} />
        </>
    )
}


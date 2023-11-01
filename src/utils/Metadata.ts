import { Metadata } from "next"

export function constructMetadata({
    title = "Pregnancy Risk - Instant assessment for a safer maternity.",
    description = "Navigate Your Pregnancy with Confidence and Ease.",
    // image = "/thumbnail.png",
    image = "",
    icons = "/favicon.ico",
    noIndex = false,

}: {
    title?: string
    description?: string
    image?: string
    icons?: string
    noIndex?: boolean
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image
                }
            ]
        },
        icons,
        metadataBase: new URL('https://www.pregnancyrisk.no/'),
        themeColor: '#FFF',
        ...(noIndex && {
            robots: {
                index: false,
                follow: false
            }
        })
    }
}
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://tucode-pamoja.vercel.app"; // Update with actual domain later

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/api/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}

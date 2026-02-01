import { supabase } from "@/lib/supabase/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL || "https://tu-code.pages.dev";

    // 1. Static Routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/team`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];

    // 2. Dynamic Routes (Projects)
    // Only attempt to fetch if we have a valid Supabase URL
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        try {
            const { data: projects } = await supabase
                .from("projects")
                .select("id, updated_at");

            if (projects) {
                const projectRoutes = projects.map((project) => ({
                    url: `${baseUrl}/projects/${project.id}`,
                    lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
                    changeFrequency: "weekly" as const,
                    priority: 0.7,
                }));
                routes.push(...projectRoutes);
            }
        } catch (error) {
            console.error("Failed to generate sitemap for projects:", error);
        }
    }

    return routes;
}

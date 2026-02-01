import { supabase } from "@/lib/supabase/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://tucode-pamoja.vercel.app"; // Update with actual domain later

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
    try {
        const { data: projects } = await supabase
            .from("projects")
            .select("id, updated_at");

        if (projects) {
            const projectRoutes = projects.map((project) => ({
                url: `${baseUrl}/projects/${project.id}`,
                lastModified: new Date(project.updated_at),
                changeFrequency: "weekly" as const,
                priority: 0.7,
            }));
            routes.push(...projectRoutes);
        }
    } catch (error) {
        console.error("Failed to generate sitemap for projects:", error);
    }

    return routes;
}

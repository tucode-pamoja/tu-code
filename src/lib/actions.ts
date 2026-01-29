"use server";

import { supabaseAdmin } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { parseGitHubUrl, fetchGitHubReadme, fetchGitHubRepoInfo } from "@/lib/github/api";

export async function createProject(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    let title = formData.get("title") as string;
    let description = formData.get("description") as string;
    const github_url = formData.get("github_url") as string;
    const tagsString = formData.get("tags") as string;
    const tags = tagsString ? tagsString.split(",").map(t => t.trim()) : [];

    let readme_content = "";

    // GitHub 정보 자동 가져오기
    if (github_url) {
        const gitInfo = parseGitHubUrl(github_url);
        if (gitInfo) {
            const [repoData, readmeData] = await Promise.all([
                fetchGitHubRepoInfo(gitInfo.owner, gitInfo.repo),
                fetchGitHubReadme(gitInfo.owner, gitInfo.repo),
            ]);

            if (repoData) {
                if (!title) title = repoData.name;
                if (!description) description = repoData.description;
            }
            if (readmeData) {
                readme_content = readmeData;
            }
        }
    }

    const { data, error } = await supabaseAdmin
        .from("projects")
        .insert([
            {
                title,
                description,
                github_url,
                readme_content,
                tags,
                created_by: session.user?.email || session.user?.name,
            },
        ])
        .select()
        .single();

    if (error) {
        console.error("Error creating project:", error);
        return { error: error.message };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
}

export async function deleteProject(id: string) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const { error } = await supabaseAdmin
        .from("projects")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting project:", error);
        return { error: error.message };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
}

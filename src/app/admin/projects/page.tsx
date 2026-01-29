import { supabaseAdmin } from "@/lib/supabase/server";
import { Plus, Github, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteProject } from "@/lib/actions";

export default async function AdminProjectsPage() {
    const { data: projects } = await supabaseAdmin
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="container mx-auto max-w-5xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">프로젝트 관리</h1>
                    <p className="text-text-secondary mt-2">등록된 모든 라이브 프로젝트를 관리합니다.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    새 프로젝트 추가
                </Link>
            </div>

            <div className="grid gap-4">
                {projects?.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-text-secondary">아직 등록된 프로젝트가 없습니다.</p>
                    </div>
                ) : (
                    projects?.map((project) => (
                        <div key={project.id} className="card flex items-center justify-between group">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xl font-bold group-hover:text-primary-400 transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-text-secondary">
                                    {project.github_url && (
                                        <span className="flex items-center gap-1">
                                            <Github className="h-3 w-3" />
                                            {new URL(project.github_url).pathname.slice(1)}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <Plus className="h-3 w-3 rotate-45" />
                                        {project.tags?.join(", ")}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/projects/${project.id}`}
                                    className="p-2 hover:bg-surface-3 rounded-lg transition-colors"
                                    target="_blank"
                                >
                                    <ExternalLink className="h-5 w-5 text-text-secondary" />
                                </Link>
                                <form action={async () => {
                                    "use server";
                                    await deleteProject(project.id);
                                }}>
                                    <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-text-secondary">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

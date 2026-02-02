import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
    project: any; // Use proper type from supabase/types in a real scenario
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const status = (project.deployment_status || "live") as "live" | "building" | "offline";
    const statusColors = {
        live: "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]",
        building: "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse",
        offline: "bg-red-500/50",
    };
    const statusLabel = {
        live: "LIVE",
        building: "BUILDING",
        offline: "OFFLINE",
    };

    return (
        <Link href={`/projects/${project.id}`} className="group relative h-full flex flex-col p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-700 backdrop-blur-sm overflow-hidden">
            {/* Subtle Gradient Glow Background */}
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-black/20 border border-white/5 mb-8 shadow-2xl transition-all duration-700 ring-1 ring-white/5 group-hover:ring-orange-500/20">
                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
                    <div className={`h-1.5 w-1.5 rounded-full ${statusColors[status] || statusColors.live}`} />
                    <span className="text-[10px] font-bold tracking-widest text-white/90">
                        {statusLabel[status] || "LIVE"}
                    </span>
                </div>

                {project.thumbnail_url ? (
                    <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="h-full w-full object-contain p-8 transition-transform duration-[1.5s] cubic-bezier(0.23, 1, 0.32, 1) group-hover:scale-110"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-surface-2/20 to-surface-3/20 backdrop-blur-sm">
                        <div className="relative">
                            <Github className="h-20 w-20 text-text-muted opacity-10" />
                            <div className="absolute inset-0 bg-primary-500/10 blur-2xl rounded-full" />
                        </div>
                    </div>
                )}

                {/* Glassy Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="relative flex-1 flex flex-col z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-display font-black tracking-tight text-white group-hover:brand-gradient-text transition-all duration-500">
                        {project.title}
                    </h3>
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(255,107,43,1)]" />
                </div>

                <p className="text-text-secondary text-base leading-relaxed line-clamp-2 mb-8 font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                    {project.description || "Project in development."}
                </p>

                <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                    <div className="flex flex-wrap gap-2.5">
                        {project.tags?.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/50 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 transition-colors group-hover:border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="bg-white/5 p-2 rounded-full border border-white/5 group-hover:border-orange-500/30 group-hover:bg-orange-500/10 transition-all duration-500">
                        <ArrowRight className="h-5 w-5 text-text-muted group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

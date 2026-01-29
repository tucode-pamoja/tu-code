import { auth } from "@/lib/auth";
import { FolderGit2, Plus, Users, Star } from "lucide-react";
import Link from "next/link";

export default async function AdminPage() {
    const session = await auth();

    const stats = [
        { label: "총 프로젝트", value: "0", icon: FolderGit2, color: "text-primary-400" },
        { label: "팀원", value: "1", icon: Users, color: "text-accent-400" },
        { label: "즐겨찾기", value: "0", icon: Star, color: "text-yellow-400" },
    ];

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-bold font-display">대시보드</h1>
                <p className="text-text-secondary mt-2">환영합니다, {session?.user?.name}님! 오늘 프로젝트를 관리해볼까요?</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="card flex items-center gap-6">
                        <div className={`p-4 rounded-2xl bg-surface-2 ${stat.color}`}>
                            <stat.icon className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-sm text-text-muted">{stat.label}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card space-y-4">
                    <h3 className="text-xl font-bold">프로젝트 관리</h3>
                    <p className="text-text-secondary text-sm">
                        등록된 프로젝트 목록을 확인하고 편집하거나 삭제할 수 있습니다.
                    </p>
                    <Link
                        href="/admin/projects"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        프로젝트 목록 보기
                    </Link>
                </div>

                <div className="card border-dashed border-surface-3 bg-transparent flex flex-col items-center justify-center py-10 text-center space-y-4 hover:border-primary-500 transition-colors group">
                    <div className="p-4 rounded-full bg-surface-1 group-hover:bg-primary-500/10 transition-colors">
                        <Plus className="h-8 w-8 text-text-muted group-hover:text-primary-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">새 프로젝트 추가</h3>
                        <p className="text-text-secondary text-sm mt-1">새로운 성과물을 아카이빙하세요.</p>
                    </div>
                    <Link
                        href="/admin/projects/new"
                        className="btn-primary"
                    >
                        지금 등록하기
                    </Link>
                </div>
            </div>
        </div>
    );
}

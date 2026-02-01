export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#050508] text-white overflow-hidden">
            <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-white/10 border-t-orange-500 animate-spin" />
                <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-b-purple-500 animate-[spin_1s_linear_infinite_reverse] opacity-70" />
            </div>
        </div>
    );
}

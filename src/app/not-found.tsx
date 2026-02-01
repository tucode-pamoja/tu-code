import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#050508] flexflex-col items-center justify-center relative overflow-hidden text-white">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-600/10 blur-[80px] rounded-full animate-pulse" />
            </div>

            <div className="relative z-10 text-center flex flex-col items-center justify-center h-screen px-6">
                <h1 className="text-[10rem] md:text-[15rem] font-black leading-none bg-clip-text text-transparent bg-gradient-to-br from-white/20 to-transparent select-none">
                    404
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    Page Not Found
                </h2>
                <p className="text-white/50 text-lg md:text-xl max-w-md mx-auto mb-10 leading-relaxed">
                    The page you are looking for seems to have drifted into outer space.
                </p>

                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
}

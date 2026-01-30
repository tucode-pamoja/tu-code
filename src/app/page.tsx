"use client";

import { motion } from "framer-motion";
import { Github, Rocket, ShieldCheck, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import ProjectCard from "@/components/projects/project-card";

export default function Home() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-x-hidden">
      {/* Atmospheric Background */}
      <div className="fixed top-0 -z-10 h-full w-full bg-[#050508] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.65 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat saturate-[1.1]"
          style={{ backgroundImage: 'url("/hero-bg.png")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/5 via-[#050508]/20 to-[#050508]/70" />

        {/* Dynamic Glows - Tri-Color Harmony */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-orange-500/15 blur-[150px] animate-fire" />
        <div className="absolute top-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-pink-500/5 blur-[100px] animate-pulse" />
      </div>

      {/* Navigation Header - Premium Style */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-4 group">
          <motion.div
            className="relative h-16 w-16 flex items-center justify-center shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img
              src="/tucode-pamoja-logo.png"
              alt="Logo"
              className="h-full w-full object-contain mix-blend-screen"
            />
          </motion.div>
          <span className="font-display font-black text-xl md:text-2xl tracking-tighter brand-gradient-text uppercase leading-none whitespace-pre-line">
            Tucode{"\n"}Pamoja
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-sm font-bold text-white/70 hover:text-white transition-colors bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
                대시보드
              </Link>
              <button
                onClick={() => signOut()}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 transition-all"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-sm font-black hover:bg-white/90 transition-all shadow-xl"
            >
              <Github className="h-4 w-4" />
              ADMIN SIGN IN
            </button>
          )}
        </div>
      </div>

      <main className="container mx-auto px-6">
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center justify-center text-center pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Logo Wrapper - Premium Fire Orb */}
            <div className="mb-12 relative group">
              <div className="absolute inset-0 bg-orange-500/30 blur-3xl animate-fire" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center overflow-hidden">
                <motion.img
                  src="/original-logo.png"
                  alt="Tucode Pamoja Logo"
                  className="w-full h-full object-contain filter drop-shadow(0 0 50px rgba(255, 107, 43, 0.5)) z-10 mix-blend-screen"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 0.5
                  }}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs text-white/60 backdrop-blur-3xl font-mono uppercase tracking-[0.4em]"
            >
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Code Together, Vibe Forever
            </motion.div>

            <h1 className="mb-8 font-display text-7xl font-black tracking-tighter sm:text-8xl md:text-[8rem] leading-[0.95] text-premium-gradient pb-4">
              Tucode<br />Pamoja
            </h1>

            <p className="mx-auto mb-14 max-w-2xl text-lg text-text-secondary sm:text-xl leading-relaxed">
              &apos;함께&apos;라는 가치 아래 모여 코드로 소통하고
              성장의 온기를 나누는 팀, <br className="hidden sm:block" />
              우리의 모든 발자취를 이곳에 기록합니다.
            </p>

            <div className="flex flex-col gap-6 sm:flex-row">
              <a href="#projects" className="btn-premium px-16 py-6 text-xl">
                OUR JOURNEY
                <ChevronDown className="h-6 w-6 animate-bounce" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest font-mono">Scroll Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary-500 to-transparent" />
          </motion.div>
        </section>

        {/* Project Grid Section */}
        <section id="projects" className="py-24 relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter mb-4 text-white uppercase italic">
              Our<br />Archive
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-full" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] animate-pulse bg-white/5 rounded-[2rem] border border-white/5" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="card text-center py-24 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10">
              <p className="text-text-secondary text-lg mb-4">아직 전시된 프로젝트가 없습니다.</p>
              <Link href="/admin" className="btn-premium px-8 py-3 text-sm inline-flex">
                첫 프로젝트 등록하기 &rarr;
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="w-full border-t border-white/5 py-12 text-center text-text-muted">
        <div className="container mx-auto px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] mb-4">
            Code Together, Vibe Forever
          </p>
          <p className="text-xs opacity-50">
            &copy; 2024 TUCODE PAMOJA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div >
  );
}

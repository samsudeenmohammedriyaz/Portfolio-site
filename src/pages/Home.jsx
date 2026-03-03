/* eslint-disable no-unused-vars */
import { motion } from "framer-motion"
import PageTransition from "../components/PageTransition"
import { resume } from "../data/resumeData"

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
}

export default function Home() {
    return (
        <PageTransition>
            <div className="relative bg-white overflow-hidden">

                {/* Ambient background gradients */}
                <div className="absolute -top-52 -left-52 w-[600px] h-[600px] bg-sky-200 rounded-full blur-3xl opacity-35" />
                <div className="absolute top-24 -right-52 w-[600px] h-[600px] bg-emerald-200 rounded-full blur-3xl opacity-35" />
                <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-30" />

                {/* HERO */}
                <section className="min-h-screen flex items-center justify-center px-6 relative">
                    <div className="max-w-5xl text-center">

                        <motion.h1
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.9 }}
                            className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
                        >
                            <span className="bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">
                                {resume.name}
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.15, duration: 0.8 }}
                            className="text-xl md:text-2xl text-gray-700 mb-8"
                        >
                            {resume.role}
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="max-w-2xl mx-auto text-gray-600 leading-relaxed"
                        >
                            I design and build thoughtful web applications where clean code,
                            calm interfaces, and real-world usability come together.
                            I care deeply about how software feels, not just how it works.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-12 flex justify-center gap-6"
                        >
                            <a
                                href="/projects"
                                className="px-8 py-3 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
                            >
                                Explore My Work
                            </a>

                            <a
                                href="/contact"
                                className="px-8 py-3 rounded-full border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                Get in Touch
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="mt-24 text-sm text-gray-400"
                        >
                            ↓ Scroll down
                        </motion.div>
                    </div>
                </section>

                {/* PHILOSOPHY */}
                <section className="py-32 px-6 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        transition={{ duration: 0.9 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-3xl font-semibold mb-6">
                            Building With Calm & Clarity
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            I believe great software should feel effortless.
                            My approach blends clean architecture, gentle motion,
                            and thoughtful UI decisions that respect the user’s attention.
                        </p>
                    </motion.div>
                </section>

                {/* HIGHLIGHTS */}
                <section className="pb-36 px-6">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">

                        {[
                            {
                                title: "Full Stack Perspective",
                                text: "Understanding systems end-to-end helps me build reliable and scalable solutions.",
                            },
                            {
                                title: "Peaceful Interfaces",
                                text: "Soft colors, generous spacing, and smooth transitions create enjoyable experiences.",
                            },
                            {
                                title: "Real Impact",
                                text: "I’ve worked on applications that solve real problems for real users in production.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.8 }}
                                className="text-center"
                            >
                                <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-emerald-400 mx-auto mb-5 rounded-full" />
                                <h3 className="font-semibold text-lg mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}

                    </div>
                </section>

            </div>
        </PageTransition>
    )
}

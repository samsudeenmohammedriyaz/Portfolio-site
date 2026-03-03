import { motion } from "framer-motion"
import PageTransition from "../components/PageTransition"
import { resume } from "../data/resumeData"

const fade = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  return (
    <PageTransition>
      <div className="relative bg-white overflow-hidden">

        {/* ARTISTIC COLOR FIELDS */}
        <div className="absolute -top-64 -left-64 w-[700px] h-[700px] bg-sky-200 rounded-full blur-3xl opacity-35" />
        <div className="absolute top-1/3 -right-64 w-[700px] h-[700px] bg-emerald-200 rounded-full blur-3xl opacity-35" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-indigo-200 rounded-full blur-3xl opacity-25" />

        <div className="pt-32 max-w-5xl mx-auto px-6 relative">

          {/* WHO I AM */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 1 }}
            className="mb-32"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-10">
              A Little About Me
            </h1>

            <p className="text-lg leading-relaxed text-gray-700 max-w-3xl">
              I’m <span className="font-semibold text-sky-600">Riyaz</span> — a
              Full Stack Developer who enjoys building software that feels calm,
              thoughtful, and reliable.
              <br /><br />
              I don’t just see code as instructions for machines.
              For me, code is a way to shape experiences — how something responds,
              how it flows, and how comfortable it feels for the person using it.
            </p>
          </motion.section>

          {/* HOW I THINK */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fade}
            transition={{ duration: 1 }}
            className="mb-32 max-w-4xl"
          >
            <h2 className="text-3xl font-semibold mb-8">
              How I Think About Building Software
            </h2>

            <p className="text-gray-700 leading-relaxed">
              I’m naturally curious about how things work beneath the surface.
              When I build an application, I think about:
            </p>

            <ul className="mt-8 space-y-4 text-gray-700">
              <li>• How simple can this be made?</li>
              <li>• Will this scale when requirements grow?</li>
              <li>• Will another developer understand this code easily?</li>
              <li>• Does this feel calm and intuitive to the user?</li>
            </ul>
          </motion.section>

          {/* WHAT I’M LEARNING */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fade}
            transition={{ duration: 1 }}
            className="mb-36 bg-white/60 backdrop-blur border border-gray-200 rounded-3xl p-10"
          >
            <h2 className="text-3xl font-semibold mb-6 text-emerald-600">
              What I’m Currently Learning & Exploring
            </h2>

            <p className="text-gray-700 leading-relaxed">
              I believe growth never stops. Right now, I’m focused on:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              {[
                "Designing scalable backend architectures",
                "Improving performance and API design",
                "Creating smoother, more natural UI animations",
                "Writing cleaner, more maintainable React code",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 border border-gray-200"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* EXPERIENCE – JOURNEY */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fade}
            transition={{ duration: 1 }}
            className="mb-36"
          >
            <h2 className="text-3xl font-semibold mb-16">
              My Professional Journey
            </h2>

            <div className="space-y-16 max-w-4xl">
              {resume.experience.map((e, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-lg text-indigo-600">
                    {e.company}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {e.role} • {e.period}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {e.points.join(". ")}.
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* PERSONAL VALUES */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fade}
            transition={{ duration: 1 }}
            className="pb-36 text-center"
          >
            <h2 className="text-3xl font-semibold mb-16">
              What I Value
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { title: "Clarity", text: "Clear code, clear communication, clear intent." },
                { title: "Growth", text: "Always learning, always improving." },
                { title: "Calm", text: "Software should reduce friction, not add stress." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-3xl bg-white/70 backdrop-blur border border-gray-200 shadow-sm"
                >
                  <h3 className="font-semibold mb-4 text-sky-600">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

        </div>
      </div>
    </PageTransition>
  )
}

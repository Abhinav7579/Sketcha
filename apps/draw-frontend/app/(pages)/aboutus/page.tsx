import Navbar from "@/components/Navbar";

export default function Aboutus() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-800 text-white flex justify-center items-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white mt-[60px] text-purple-900 rounded-3xl shadow-2xl p-8 max-w-4xl w-full space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">About Sketcha</h1>

          <p className="text-base sm:text-lg leading-relaxed">
            <strong>Sketcha</strong> is a real-time collaborative whiteboard designed to empower teams,
            educators, designers, and creative thinkers. Whether you're remote or side-by-side, Sketcha
            enables seamless brainstorming, wireframing, note-taking, or freeform creativity.
          </p>

          <p className="text-base sm:text-lg leading-relaxed">
            Inspired by tools like <em>Excalidraw</em>, Sketcha combines the ease of hand-drawn sketches
            with the power of real-time collaboration. Users can join shared rooms and draw together,
            thanks to efficient WebSocket-based architecture.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">🔗 Core Features</h2>
              <ul className="list-disc list-inside space-y-1 text-base">
                <li>Real-time drawing using WebSockets</li>
                <li>Create or join collaborative rooms</li>
                <li>Smooth, responsive sketching experience</li>
                <li>Minimal, distraction-free interface</li>
                <li>Auto-sync without manual saving</li>
              </ul>
            </div>
          </div>

          <p className="text-base sm:text-lg leading-relaxed">
            Our mission is to simplify visual collaboration for everyone—from students and teachers to
            product teams and solo creators. Sketcha is currently in active development, and we’re
            always improving based on your feedback.
          </p>

          <p className="text-center text-sm text-gray-500 mt-4">
            Built with 💜 by passionate creators. Let your ideas flow.
          </p>
        </div>
      </div>
    </div>
  );
}

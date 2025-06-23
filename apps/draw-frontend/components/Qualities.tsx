export default function SketchaQualities() {
  return (
    <div className="bg-gradient-to-b from-purple-900 to-blue-800 text-white py-16 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-center mb-12">Why Sketcha?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="bg-white text-purple-900 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">🧠 Real-Time Collaboration</h3>
          <p>
            Sketch with friends, teams, or classmates in real-time using WebSockets — no refresh, no delay.
          </p>
        </div>

        <div className="bg-white text-purple-900 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">🎨 Intuitive Interface</h3>
          <p>
            Clean, minimal, and user-friendly design that keeps your focus where it matters — on your ideas.
          </p>
        </div>

        <div className="bg-white text-purple-900 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-2">🚀 Room-Based Sharing</h3>
          <p>
            Create or join shared rooms instantly and start drawing — no complex setup required.
          </p>
        </div>
        
      </div>
    </div>
  );
}

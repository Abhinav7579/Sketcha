import Navbar from "@/components/Navbar";
export default function Contactus() {
  return (
    <div>
        <div>
            <Navbar/>
        </div>
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-b from-blue-900 to-purple-800 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Message</label>
            <textarea
              rows={4}
              placeholder="Your message"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

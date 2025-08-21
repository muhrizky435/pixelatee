export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#eaf0fb]">
      {/* Card */}
      <div className="relative bg-cyan-400 p-10 rounded-lg w-[400px] shadow-lg">
        {/* Logo di atas */}
        <img
          src="/img/Logo.png"
          alt="Pixelatee Logo"
          className="absolute -top-25 left-1 w-40"
        />

        {/* Judul */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Pixelatee
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 mt-1 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 mt-1 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Forgot password */}
          <p className="text-xs text-right text-gray-600 cursor-pointer hover:underline">
            Forgot Password?
          </p>

          {/* Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-500 text-white py-2 rounded-md shadow hover:opacity-90 transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

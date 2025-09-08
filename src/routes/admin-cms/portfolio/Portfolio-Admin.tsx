import NavBarCMS from "../../../components/CMS-Navbar";


export default function PortfolioAdmin() {

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <NavBarCMS />

      {/* Main Content */}
      <main className="bg-gray-50 min-h-screen p-6 space-y-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Portfolio</h1>

      </main>
    </div>
  );
}

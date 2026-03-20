export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFF8E1]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#2D5016] mb-4">Murphy&apos;s Turf</h1>
        <p className="text-[#5D4037] text-lg">Professional Lawn Care Services</p>
        <a
          href="/admin/login"
          className="mt-8 inline-block px-6 py-3 bg-[#2D5016] text-white rounded-lg hover:bg-[#7CB342] transition-colors"
        >
          Admin Login
        </a>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Landing Page for non-logged in users */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl px-6">
          <h1 className="text-7xl font-bold mb-6">Football Stats Pro ⚽</h1>
          <p className="text-3xl mb-10">Real-time Premier League standings and custom dashboards</p>
          
          <a 
            href="/auth/login"
            className="inline-block bg-white text-black font-semibold py-5 px-12 rounded-2xl text-2xl hover:bg-gray-100 transition-all"
          >
            Sign In to Continue
          </a>

          <p className="mt-12 text-gray-400">
            Subscription based • Powered by API-Football
          </p>
        </div>
      </div>
    </div>
  );
}
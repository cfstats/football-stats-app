import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Public landing page
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
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
    );
  }

  // Dashboard for logged-in users
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900">Your Dashboard ⚽</h1>
          <div>
            <p className="text-sm text-gray-500">Logged in as</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Welcome back!</h2>
          <p className="text-gray-600 text-lg mb-8">
            Your personalized Premier League standings and custom features will appear here.
          </p>
          <p className="text-sm text-gray-500">
            (Football data connection is ready — we just need to finalize the API key)
          </p>
        </div>
      </div>
    </div>
  );
}
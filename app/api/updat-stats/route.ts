import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const API_KEY = process.env.API_FOOTBALL_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: 'API_FOOTBALL_KEY is not set' }, { status: 500 });
  }

  try {
    const season = 2025; // Using 2025 because 2026 is not available on free plans yet

    const response = await fetch(`${BASE_URL}/standings?league=39&season=${season}`, {
      headers: {
        'x-apisports-key': API_KEY,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ 
        error: `API-Football error: ${response.status}`,
        details: errorText 
      }, { status: response.status });
    }

    const data = await response.json();

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    const { error } = await supabase
      .from('football_stats')
      .upsert({
        type: 'standings',
        league_id: 39,
        season: season,
        data: data,
        last_updated: new Date().toISOString(),
      }, { onConflict: 'type,league_id,season' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Premier League 2025 standings updated successfully`,
      season: season,
    });

  } catch (err: any) {
    console.error('Update stats error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
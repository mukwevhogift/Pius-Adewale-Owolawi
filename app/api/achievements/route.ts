import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: achievements, error } = await supabase
      .from('achievements')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching achievements:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(achievements);
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    console.log('Creating achievement with data:', body);

    const { data, error } = await supabase
      .from('achievements')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Error creating achievement:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Achievement created successfully:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

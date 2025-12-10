import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: initiatives, error } = await supabase
      .from('community_initiatives')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching initiatives:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(initiatives);
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    console.log('Creating initiative with data:', body);

    const { data, error } = await supabase
      .from('community_initiatives')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Error creating initiative:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Initiative created successfully:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

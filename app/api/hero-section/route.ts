import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: hero, error } = await supabase
      .from('hero_section')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching hero section:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(hero);
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    console.log('Updating hero section with data:', body);

    // Get the existing hero record
    const { data: existing } = await supabase
      .from('hero_section')
      .select('id')
      .single();

    let data, error;

    if (existing) {
      // Update existing record
      const result = await supabase
        .from('hero_section')
        .update(body)
        .eq('id', existing.id)
        .select()
        .single();
      
      data = result.data;
      error = result.error;
    } else {
      // Create new record if none exists
      const result = await supabase
        .from('hero_section')
        .insert([body])
        .select()
        .single();
      
      data = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Error updating hero section:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Hero section updated successfully:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

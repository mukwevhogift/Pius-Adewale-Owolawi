import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: images, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching gallery images:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(images);
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    console.log('Creating gallery image with data:', body);

    const { data, error } = await supabase
      .from('gallery_images')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Error creating gallery image:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Gallery image created successfully:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import TestimonialForm from '@/components/admin/TestimonialForm';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTestimonialPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: testimonial, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !testimonial) {
    console.error('Error fetching testimonial:', error);
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link 
          href="/admin/testimonials"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Testimonials
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Testimonial</h1>
        <p className="text-gray-600 mt-2">Update testimonial details</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <TestimonialForm initialData={testimonial} testimonialId={id} />
      </div>
    </div>
  );
}

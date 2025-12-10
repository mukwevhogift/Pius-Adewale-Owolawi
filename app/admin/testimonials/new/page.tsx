import TestimonialForm from '@/components/admin/TestimonialForm';
import Link from 'next/link';

export default function NewTestimonialPage() {
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
        <h1 className="text-3xl font-bold text-gray-900">Add New Testimonial</h1>
        <p className="text-gray-600 mt-2">Create a new testimonial or recommendation</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <TestimonialForm />
      </div>
    </div>
  );
}

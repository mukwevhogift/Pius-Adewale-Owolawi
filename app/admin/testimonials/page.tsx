import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function TestimonialsPage() {
  const supabase = await createClient();

  const { data: testimonials, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching testimonials:', error);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600 mt-2">Manage testimonials and recommendations</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <i className="ri-add-line text-xl"></i>
          Add Testimonial
        </Link>
      </div>

      {testimonials && testimonials.length > 0 ? (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 border-l-4 border-blue-500"
            >
              <div className="flex items-start gap-6">
                {/* Icon/Image */}
                <div className="flex-shrink-0">
                  {testimonial.image_url ? (
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <i className={`${testimonial.icon} text-white text-2xl`}></i>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{testimonial.author}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      {testimonial.organization && (
                        <p className="text-sm text-gray-500">{testimonial.organization}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {testimonial.is_active ? (
                        <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  <blockquote className="text-gray-700 italic mb-4 relative">
                    <i className="ri-double-quotes-l text-2xl text-blue-400 absolute -left-2 -top-2"></i>
                    <p className="pl-6">{testimonial.quote}</p>
                  </blockquote>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Order: {testimonial.order_index}</span>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/testimonials/${testimonial.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <i className="ri-edit-line text-lg"></i>
                      </Link>
                      <DeleteButton
                        id={testimonial.id}
                        type="testimonial"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <i className="ri-chat-quote-line text-6xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first testimonial.</p>
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <i className="ri-add-line text-xl"></i>
            Add Testimonial
          </Link>
        </div>
      )}
    </div>
  );
}

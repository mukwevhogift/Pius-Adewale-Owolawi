'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmDialog from './ConfirmDialog';
import Toast from './Toast';

interface DeleteButtonProps {
  id: string;
  type: 'publication' | 'education' | 'award' | 'speech' | 'certification' | 'research-area' | 'achievement' | 'professional-membership' | 'community-initiative' | 'testimonial' | 'gallery-image';
  onDelete?: () => void;
  itemName?: string;
}

export default function DeleteButton({ id, type, onDelete, itemName }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const router = useRouter();

  const typeLabels: Record<string, string> = {
    'publication': 'publication',
    'education': 'education record',
    'award': 'award',
    'speech': 'speech',
    'certification': 'certification',
    'research-area': 'research area',
    'achievement': 'achievement',
    'professional-membership': 'membership',
    'community-initiative': 'community initiative',
    'testimonial': 'testimonial',
    'gallery-image': 'image',
  };

  // Map types to their correct API endpoints
  const apiEndpoints: Record<string, string> = {
    'publication': 'publications',
    'education': 'education',
    'award': 'awards',
    'speech': 'speeches',
    'certification': 'certifications',
    'research-area': 'research-areas',
    'achievement': 'achievements',
    'professional-membership': 'professional-memberships',
    'community-initiative': 'community-initiatives',
    'testimonial': 'testimonials',
    'gallery-image': 'gallery-images',
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const apiPath = apiEndpoints[type] || `${type}s`;
      const response = await fetch(`/api/${apiPath}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Failed to delete' }));
        throw new Error(error.error || 'Failed to delete');
      }

      setToast({ 
        message: `${itemName || typeLabels[type] || 'Item'} deleted successfully!`, 
        type: 'success' 
      });

      // Wait a moment for the toast to show, then refresh
      setTimeout(() => {
        if (onDelete) {
          onDelete();
        } else {
          router.refresh();
        }
      }, 500);
    } catch (error: any) {
      console.error('Delete error:', error);
      setToast({ 
        message: error.message || 'Failed to delete. Please try again.', 
        type: 'error' 
      });
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting}
        className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete"
      >
        <i className="ri-delete-bin-line text-lg"></i>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete this ${typeLabels[type] || 'item'}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}


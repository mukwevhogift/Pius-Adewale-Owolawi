'use client';

import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    success: 'ri-check-line',
    error: 'ri-error-warning-line',
    info: 'ri-information-line',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-[300px] max-w-md ${styles[type]}`}>
        <i className={`${icons[type]} text-xl flex-shrink-0`}></i>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>
    </div>
  );
}

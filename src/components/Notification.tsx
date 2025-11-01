import React, { useEffect } from 'react'
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Notification = ({ message, type, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md p-4 mt-4">
      <div 
        className={`
          rounded-md p-4 shadow-lg 
          ${isSuccess ? 'bg-green-600/80 border border-green-400/50' : 'bg-red-600/80 border border-red-400/50'}
        `}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            {isSuccess ? (
              <CheckCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
            ) : (
              <XCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{message}</p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex rounded-md p-1.5 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
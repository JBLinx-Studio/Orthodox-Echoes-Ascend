
import { useState, useEffect } from 'react';
import { X, Check, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface CustomToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export function CustomToast({
  message,
  type = 'info',
  duration = 3000,
  onClose
}: CustomToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 300); // Allow for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" />;
      case 'info':
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getStyles = () => {
    const baseStyles = "flex items-center gap-2 px-4 py-2 rounded-lg shadow-md border transform transition-all duration-300";
    
    switch (type) {
      case 'success':
        return cn(baseStyles, "bg-[#F2FCE2] border-green-300 text-green-800");
      case 'error':
        return cn(baseStyles, "bg-[#FFDEE2] border-red-300 text-red-800");
      case 'warning':
        return cn(baseStyles, "bg-[#FEF7CD] border-yellow-300 text-yellow-800");
      case 'info':
      default:
        return cn(baseStyles, "bg-[#FEC6A1] border-orange-300 text-orange-800");
    }
  };

  return (
    <div 
      className={cn(
        getStyles(),
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      )}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-grow">
        {message}
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 ml-2 hover:bg-gray-200/40 rounded-full p-1"
        aria-label="Close notification"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
      {children}
    </div>
  );
}

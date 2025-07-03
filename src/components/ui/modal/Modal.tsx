import type React from 'react';
import { useGlobal } from '@/contexts/global.context';
import XMarkIcon from '@/components/icons/XMark';
import InfoCircleIcon from '@/components/icons/InfoCircle';
import { useLockBody } from '@/hooks/useLockBody';

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  action?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ title, children, action, onClose }) => {
  const { modal, handleModal } = useGlobal();

  useLockBody(!!modal);

  if (!modal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-ui-900/50 backdrop-blur-sm"
        onClick={onClose ?? handleModal}
      />
      {/* MODAL */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-xs sm:max-w-lg rounded-2xl py-6 bg-ui-800"
      >
        {/* HEADER */}
        <div className="w-full flex justify-between px-6 items-center">
          {title && (
            <div className="flex gap-2">
              <InfoCircleIcon className="h-6 w-6 text-primary" />
              <h1 className="text-md">{title}</h1>
            </div>
          )}
          <button onClick={onClose ?? handleModal}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        {/* DIVIDER */}
        <div className="border-b border-secondary/[8%] my-4" />
        {/* BODY */}
        <div className="px-6 overflow-y-auto custom-scrollbar max-h-[500px]">{children}</div>
        {/* ACTION */}
        {action && (
          <div>
            <div className="border-t border-secondary/[8%] my-4" />
            <div className="px-6">{action}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

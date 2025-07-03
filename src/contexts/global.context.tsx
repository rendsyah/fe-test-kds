'use client';

import type React from 'react';
import type { Device, Nullable } from '@/types/commons.types';
import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';
import { createSafeContext } from '@/libs/utils/createSafeContext';
import Notification from '@/components/ui/notification/Notification';

type FeedbackModal = {
  open: boolean;
  type: 'success' | 'error';
  message: string;
  traceId?: string;
};

type GlobalContextProps = Nullable<{
  modal: boolean;
  feedbackModal: FeedbackModal;
  device: Device;
  handleModal: () => void;
  openFeedbackModal: (data: Omit<FeedbackModal, 'open'>) => void;
  closeFeedbackModal: () => void;
  copyClipboard: (data: string) => void;
}>;

const [GlobalContext, useGlobal] = createSafeContext<GlobalContextProps>('Global');

const GlobalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [modal, setModal] = useState<boolean>(false);

  const [feedbackModal, setFeedbackModal] = useState<FeedbackModal>({
    open: false,
    type: 'success',
    message: '',
    traceId: '',
  });

  const [device, setDevice] = useState<Device>({
    browserName: '',
    browserVersion: '',
    osName: '',
    osVersion: '',
    deviceType: '',
    deviceVendor: '',
    deviceModel: '',
    userAgent: '',
  });

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const openFeedbackModal = (data: Omit<FeedbackModal, 'open'>) => {
    setFeedbackModal({ ...data, open: true });
  };

  const closeFeedbackModal = () => {
    setFeedbackModal((prev) => ({ ...prev, open: false }));
  };

  const copyClipboard = (data: string) => {
    navigator.clipboard.writeText(data);
    Notification({
      message: 'Copied to clipboard',
    });
  };

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();

    setDevice({
      browserName: result.browser.name || 'Unknown Browser',
      browserVersion: result.browser.version || '',
      osName: result.os.name || 'Unknown OS',
      osVersion: result.os.version || '',
      deviceType: result.device.type || 'desktop',
      deviceVendor: result.device.vendor || '',
      deviceModel: result.device.model || '',
      userAgent: result.ua,
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        modal,
        feedbackModal,
        device,
        handleModal,
        openFeedbackModal,
        closeFeedbackModal,
        copyClipboard,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { useGlobal, GlobalProvider };

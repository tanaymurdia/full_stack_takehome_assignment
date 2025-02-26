"use client";

import React from 'react';
import Modal from 'react-modal';

// Bind modal to your appElement for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
}; 
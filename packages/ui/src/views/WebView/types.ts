import React from 'react';

export declare type WebViewModal = WebViewModalMethods;

declare const WebViewModal: React.MemoExoticComponent<
  React.ForwardRefExoticComponent<WebViewModalProps & React.RefAttributes<WebViewModalMethods>>
>;

export interface WebViewModalProps {
  snapPoints?: (string | number)[];
}

export interface WebViewModalMethods {
  present: (url: string) => void;
}

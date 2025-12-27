type BridgeTopic = "OPEN_CAMERA" | "VIBRATE" | "CLOSE_WINDOW" | "SET_TITLE";

export const sendMessageToNative = (topic: BridgeTopic, data?: any) => {
  const payload = JSON.stringify({ topic, data });

  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(payload);
  } else if (window.webkit?.messageHandlers?.handler) {
    window.webkit.messageHandlers.handler.postMessage(payload);
  } else if (window.Android?.postMessage) {
    window.Android.postMessage(payload);
  } else {
    // 개발 단계(브라우저)에서 확인용
    console.warn(`[Native Bridge] ${topic} 전송됨:`, data);
  }
};

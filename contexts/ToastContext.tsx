import React, { createContext, useState, useContext } from "react";
import Toast from "@/components/Toast";  // import your custom Toast component
import { View } from "react-native";
import { styles } from "@/utils/styles";

const ToastContext = createContext<any>(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: any) => {
  const [toasts, setToasts] = useState<Array<{ id: number, title: string, message: string, type: "success" | "error"; duration: number }>>([]);

  const showToast = (title: string, message: string, type: 'success' | 'error', duration: number = 4000) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, title, message, type, duration }]);

    setTimeout(() => {
      hideToast(id);
    }, duration);
  };

  const hideToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <View style={styles.toasterContainer}>
        {toasts.slice().reverse().map((toast) => (
          <Toast key={toast.id} title={toast.title} message={toast.message} type={toast.type} dura={toast.duration} />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

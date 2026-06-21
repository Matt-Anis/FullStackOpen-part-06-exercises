import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notification: "",
  actions: {
    setNotification: (notification) => {
      set({ notification });
      setTimeout(() => {
        set({ notification: "" });
      }, 5000);
    },
  },
}));

export const useNotification = () =>
  useNotificationStore((state) => state.notification);
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
export default useNotificationStore;

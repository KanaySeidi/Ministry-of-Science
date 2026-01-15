import { create } from "zustand";
import api from "../auth/axiosConfig";
type SubmitState = {
  loading: boolean;
  error: string | null;
  submit: (payloads: any[]) => Promise<void>;
};

export const useStudentSubmitStore = create<SubmitState>((set) => ({
  loading: false,
  error: null,

  submit: async (payloads) => {
    try {
      console.log("Payload being sent:", JSON.stringify(payloads, null, 2)); // Debugging line
      set({ loading: true, error: null });

      for (const payload of payloads) {
        await api.post("/ru/api/core/contingents/", payload);
      }

      set({ loading: false });
    } catch (e) {
      console.error("Error during submission:", e); // Debugging line
      set({
        loading: false,
        error: "Ошибка при отправке данных",
      });
      throw e;
    }
  },
}));

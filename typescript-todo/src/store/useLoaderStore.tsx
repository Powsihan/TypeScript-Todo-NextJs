
import { create } from "zustand";

interface LoaderState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
} 

const useLoaderStore = create<LoaderState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useLoaderStore;


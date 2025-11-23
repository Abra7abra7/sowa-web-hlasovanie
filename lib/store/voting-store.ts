import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface VoteSelection {
  categoryId: string;
  categoryName: string;
  nomineeId: string;
  nomineeName: string;
}

interface VotingState {
  selections: VoteSelection[];
  currentStep: number;
  userEmail: string;
  userPhone: string;
  userId: string | null;
  fingerprint: string | null;
  
  // Actions
  addSelection: (selection: VoteSelection) => void;
  removeSelection: (categoryId: string) => void;
  clearSelections: () => void;
  setCurrentStep: (step: number) => void;
  setUserInfo: (email: string, phone: string) => void;
  setUserId: (userId: string) => void;
  setFingerprint: (fingerprint: string) => void;
  reset: () => void;
}

const initialState = {
  selections: [],
  currentStep: 0,
  userEmail: "",
  userPhone: "",
  userId: null,
  fingerprint: null,
};

export const useVotingStore = create<VotingState>()(
  persist(
    (set) => ({
      ...initialState,
      
      addSelection: (selection) =>
        set((state) => {
          const filtered = state.selections.filter(
            (s) => s.categoryId !== selection.categoryId
          );
          return { selections: [...filtered, selection] };
        }),
      
      removeSelection: (categoryId) =>
        set((state) => ({
          selections: state.selections.filter(
            (s) => s.categoryId !== categoryId
          ),
        })),
      
      clearSelections: () => set({ selections: [] }),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setUserInfo: (email, phone) =>
        set({ userEmail: email, userPhone: phone }),
      
      setUserId: (userId) => set({ userId }),
      
      setFingerprint: (fingerprint) => set({ fingerprint }),
      
      reset: () => set(initialState),
    }),
    {
      name: "voting-storage",
      partialize: (state) => ({
        selections: state.selections,
        currentStep: state.currentStep,
        userEmail: state.userEmail,
        userPhone: state.userPhone,
        fingerprint: state.fingerprint,
      }),
    }
  )
);


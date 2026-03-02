import { create } from "zustand";

/**
 * 家族グループ作成フォームの状態
 */
interface CreateFamilyFormState {
  familyName: string;
  error: string | null;
  isSubmitting: boolean;
}

/**
 * 家族グループ作成フォームのアクション
 */
interface CreateFamilyFormActions {
  setFamilyName: (familyName: string) => void;
  setError: (error: string | null) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  validate: () => boolean;
  reset: () => void;
}

type CreateFamilyStore = CreateFamilyFormState & CreateFamilyFormActions;

const initialState: CreateFamilyFormState = {
  familyName: "",
  error: null,
  isSubmitting: false,
};

/**
 * 家族グループ作成用のZustandストア
 */
export const useCreateFamilyStore = create<CreateFamilyStore>((set, get) => ({
  ...initialState,

  setFamilyName: (familyName: string) => {
    set({ familyName, error: null });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setSubmitting: (isSubmitting: boolean) => {
    set({ isSubmitting });
  },

  validate: () => {
    const { familyName } = get();

    if (!familyName.trim()) {
      set({ error: "家族グループ名を入力してください" });
      return false;
    }

    return true;
  },

  reset: () => {
    set(initialState);
  },
}));

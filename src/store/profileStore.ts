import { create } from "zustand";
import type { User } from "@/lib/actions/users";

/**
 * プロフィールフォームの状態
 */
interface ProfileFormState {
  name: string;
  email: string;
  originalData: User | null;
  errors: {
    name?: string;
    email?: string;
  };
  isSubmitting: boolean;
  isDirty: boolean;
}

/**
 * プロフィールフォームのアクション
 */
interface ProfileFormActions {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setOriginalData: (user: User) => void;
  validateName: () => boolean;
  validateEmail: () => boolean;
  validateAll: () => boolean;
  setSubmitting: (isSubmitting: boolean) => void;
  reset: () => void;
  resetToOriginal: () => void;
}

type ProfileStore = ProfileFormState & ProfileFormActions;

const initialState: ProfileFormState = {
  name: "",
  email: "",
  originalData: null,
  errors: {},
  isSubmitting: false,
  isDirty: false,
};

/**
 * プロフィール編集用のZustandストア
 */
export const useProfileStore = create<ProfileStore>((set, get) => ({
  ...initialState,

  setName: (name: string) => {
    const state = get();
    set({
      name,
      isDirty:
        name !== state.originalData?.name ||
        state.email !== state.originalData?.email,
      errors: { ...state.errors, name: undefined },
    });
  },

  setEmail: (email: string) => {
    const state = get();
    set({
      email,
      isDirty:
        state.name !== state.originalData?.name ||
        email !== state.originalData?.email,
      errors: { ...state.errors, email: undefined },
    });
  },

  setOriginalData: (user: User) => {
    set({
      name: user.name,
      email: user.email,
      originalData: user,
      isDirty: false,
      errors: {},
    });
  },

  validateName: () => {
    const { name } = get();
    let error: string | undefined;

    if (!name.trim()) {
      error = "お名前を入力してください";
    } else if (name.trim().length < 2) {
      error = "お名前は2文字以上で入力してください";
    } else if (name.trim().length > 50) {
      error = "お名前は50文字以内で入力してください";
    }

    set((state) => ({
      errors: { ...state.errors, name: error },
    }));

    return !error;
  },

  validateEmail: () => {
    const { email } = get();
    let error: string | undefined;

    if (!email.trim()) {
      error = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = "有効なメールアドレスを入力してください";
    }

    set((state) => ({
      errors: { ...state.errors, email: error },
    }));

    return !error;
  },

  validateAll: () => {
    const { validateName, validateEmail } = get();
    const nameValid = validateName();
    const emailValid = validateEmail();
    return nameValid && emailValid;
  },

  setSubmitting: (isSubmitting: boolean) => {
    set({ isSubmitting });
  },

  reset: () => {
    set(initialState);
  },

  resetToOriginal: () => {
    const { originalData } = get();
    if (originalData) {
      set({
        name: originalData.name,
        email: originalData.email,
        isDirty: false,
        errors: {},
      });
    }
  },
}));

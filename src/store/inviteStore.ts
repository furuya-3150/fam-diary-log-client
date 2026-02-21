import { create } from "zustand";

/**
 * メールアドレスフィールド
 */
interface EmailField {
  id: string;
  value: string;
}

/**
 * メール招待フォームの状態
 */
interface InviteFormState {
  emailFields: EmailField[];
  errors: Record<string, string>;
  isSubmitting: boolean;
}

/**
 * メール招待フォームのアクション
 */
interface InviteFormActions {
  addEmail: () => void;
  removeEmail: (id: string) => void;
  updateEmail: (id: string, value: string) => void;
  validateEmail: (id: string) => boolean;
  validateAll: () => boolean;
  setSubmitting: (isSubmitting: boolean) => void;
  reset: () => void;
  getEmails: () => string[];
}

type InviteStore = InviteFormState & InviteFormActions;

const initialState: InviteFormState = {
  emailFields: [{ id: crypto.randomUUID(), value: "" }],
  errors: {},
  isSubmitting: false,
};

/**
 * メール招待用のZustandストア
 */
export const useInviteStore = create<InviteStore>((set, get) => ({
  ...initialState,

  addEmail: () => {
    const { emailFields } = get();
    set({
      emailFields: [...emailFields, { id: crypto.randomUUID(), value: "" }],
    });
  },

  removeEmail: (id: string) => {
    const { emailFields, errors } = get();
    if (emailFields.length > 1) {
      const newEmailFields = emailFields.filter((field) => field.id !== id);
      const newErrors = { ...errors };
      delete newErrors[id];

      set({ emailFields: newEmailFields, errors: newErrors });
    }
  },

  updateEmail: (id: string, value: string) => {
    const { emailFields, errors } = get();
    const newEmailFields = emailFields.map((field) =>
      field.id === id ? { ...field, value } : field,
    );

    // エラーをクリア
    const newErrors = { ...errors };
    delete newErrors[id];

    set({ emailFields: newEmailFields, errors: newErrors });
  },

  validateEmail: (id: string) => {
    const { emailFields } = get();
    const field = emailFields.find((f) => f.id === id);
    if (!field) return false;

    const email = field.value;
    let error: string | undefined;

    if (email.trim()) {
      // メールアドレスの形式チェック
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        error = "有効なメールアドレスを入力してください";
      }
    } else {
      error = "メールアドレスを入力してください";
    }

    set((state) => ({
      errors: error
        ? { ...state.errors, [id]: error }
        : (() => {
            const newErrors = { ...state.errors };
            delete newErrors[id];
            return newErrors;
          })(),
    }));

    return !error;
  },

  validateAll: () => {
    const { emailFields, validateEmail } = get();

    // 空のメールアドレスは除外してバリデーション
    let isValid = true;
    const newErrors: Record<string, string> = {};

    emailFields.forEach((field) => {
      if (field.value.trim() !== "") {
        if (!validateEmail(field.id)) {
          isValid = false;
        }
      }
    });

    // 全て空の場合はエラー
    const hasAtLeastOneEmail = emailFields.some(
      (field) => field.value.trim() !== "",
    );
    if (!hasAtLeastOneEmail && emailFields.length > 0) {
      newErrors[emailFields[0].id] =
        "少なくとも1つのメールアドレスを入力してください";
      set({ errors: newErrors });
      return false;
    }

    return isValid;
  },

  setSubmitting: (isSubmitting: boolean) => {
    set({ isSubmitting });
  },

  reset: () => {
    set({
      emailFields: [{ id: crypto.randomUUID(), value: "" }],
      errors: {},
      isSubmitting: false,
    });
  },

  getEmails: () => {
    const { emailFields } = get();
    return emailFields
      .map((field) => field.value)
      .filter((email) => email.trim() !== "");
  },
}));

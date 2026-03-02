import { create } from "zustand";

/**
 * 日記フォームの状態
 */
interface DiaryFormState {
  title: string;
  content: string;
  errors: {
    title?: string;
    content?: string;
  };
  isSubmitting: boolean;
  isDirty: boolean;
}

/**
 * 日記フォームのアクション
 */
interface DiaryFormActions {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  validateTitle: () => boolean;
  validateContent: () => boolean;
  validateAll: () => boolean;
  setSubmitting: (isSubmitting: boolean) => void;
  reset: () => void;
}

type DiaryFormStore = DiaryFormState & DiaryFormActions;

const initialState: DiaryFormState = {
  title: "",
  content: "",
  errors: {},
  isSubmitting: false,
  isDirty: false,
};

/**
 * 日記投稿用のZustandストア
 */
export const useDiaryFormStore = create<DiaryFormStore>((set, get) => ({
  ...initialState,

  setTitle: (title: string) => {
    set({
      title,
      isDirty: true,
      errors: { ...get().errors, title: undefined },
    });
  },

  setContent: (content: string) => {
    set({
      content,
      isDirty: true,
      errors: { ...get().errors, content: undefined },
    });
  },

  validateTitle: () => {
    const { title } = get();
    let error: string | undefined;

    if (!title.trim()) {
      error = "タイトルを入力してください";
    } else if (title.trim().length > 255) {
      error = "タイトルは255文字以内で入力してください";
    }

    set((state) => ({
      errors: { ...state.errors, title: error },
    }));

    return !error;
  },

  validateContent: () => {
    const { content } = get();
    let error: string | undefined;

    if (!content.trim()) {
      error = "本文を入力してください";
    } else if (content.trim().length < 10) {
      error = "本文は10文字以上で入力してください";
    } else if (content.trim().length > 1500) {
      error = "本文は1500文字以内で入力してください";
    }

    set((state) => ({
      errors: { ...state.errors, content: error },
    }));

    return !error;
  },

  validateAll: () => {
    const { validateTitle, validateContent } = get();
    const titleValid = validateTitle();
    const contentValid = validateContent();
    return titleValid && contentValid;
  },

  setSubmitting: (isSubmitting: boolean) => {
    set({ isSubmitting });
  },

  reset: () => {
    set(initialState);
  },
}));

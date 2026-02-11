// 家族アイコンのSVGパスデータ
// FamilyIcon.tsx、icon.tsx、apple-icon.tsxで共有

export const FAMILY_ICON_PATHS = {
  house: "M12 3 L20 10 L20 20 L4 20 L4 10 Z",

  leftParent: {
    head: { cx: 9, cy: 13, r: 1.5 },
    body: "M9 14.5 L9 17.5 M7.5 15.5 L10.5 15.5",
  },

  rightParent: {
    head: { cx: 15, cy: 13, r: 1.5 },
    body: "M15 14.5 L15 17.5 M13.5 15.5 L16.5 15.5",
  },

  child: {
    head: { cx: 12, cy: 14, r: 1.2 },
    body: "M12 15.2 L12 17.5 M10.8 16 L13.2 16",
  },
} as const;

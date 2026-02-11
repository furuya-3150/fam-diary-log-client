import { FAMILY_ICON_PATHS } from "@/constants/familyIconPaths";

interface FamilyIconProps {
  className?: string;
}

export function FamilyIcon({ className = "w-10 h-10" }: FamilyIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* 家のシルエット */}
      <path
        d={FAMILY_ICON_PATHS.house}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.3"
      />

      {/* 3人の家族（親2人、子1人） */}
      {/* 左の親 */}
      <circle {...FAMILY_ICON_PATHS.leftParent.head} fill="currentColor" />
      <path
        d={FAMILY_ICON_PATHS.leftParent.body}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 右の親 */}
      <circle {...FAMILY_ICON_PATHS.rightParent.head} fill="currentColor" />
      <path
        d={FAMILY_ICON_PATHS.rightParent.body}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 中央の子供（小さめ） */}
      <circle {...FAMILY_ICON_PATHS.child.head} fill="currentColor" />
      <path
        d={FAMILY_ICON_PATHS.child.body}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

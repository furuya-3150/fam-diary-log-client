import { ImageResponse } from "next/og";
import { FAMILY_ICON_PATHS } from "@/constants/familyIconPaths";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 24,
        background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "20%",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        {/* 家のシルエット */}
        <path
          d={FAMILY_ICON_PATHS.house}
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.3"
        />

        {/* 3人の家族（親2人、子1人） */}
        {/* 左の親 */}
        <circle
          cx={FAMILY_ICON_PATHS.leftParent.head.cx}
          cy={FAMILY_ICON_PATHS.leftParent.head.cy}
          r={FAMILY_ICON_PATHS.leftParent.head.r}
          fill="white"
        />
        <path
          d={FAMILY_ICON_PATHS.leftParent.body}
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 右の親 */}
        <circle
          cx={FAMILY_ICON_PATHS.rightParent.head.cx}
          cy={FAMILY_ICON_PATHS.rightParent.head.cy}
          r={FAMILY_ICON_PATHS.rightParent.head.r}
          fill="white"
        />
        <path
          d={FAMILY_ICON_PATHS.rightParent.body}
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 中央の子供（小さめ） */}
        <circle
          cx={FAMILY_ICON_PATHS.child.head.cx}
          cy={FAMILY_ICON_PATHS.child.head.cy}
          r={FAMILY_ICON_PATHS.child.head.r}
          fill="white"
        />
        <path
          d={FAMILY_ICON_PATHS.child.body}
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}

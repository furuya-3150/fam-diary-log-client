import type { MemberApiResponse, MemberMap } from "@/lib/actions/members";

/**
 * メンバー配列を { userId: userName } の形式に変換
 * @param members メンバーの配列
 * @returns { userId: userName } の形式のオブジェクト
 */
export function convertMembersToMap(
  members: MemberApiResponse[]
): MemberMap {
  const memberMap: MemberMap = {};
  members.forEach((member) => {
    memberMap[member.id] = member.name;
  });
  return memberMap;
}

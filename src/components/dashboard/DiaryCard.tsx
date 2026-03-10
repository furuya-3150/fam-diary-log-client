import { Award, Clock } from "lucide-react";
import { type DiaryPost } from "@/lib/actions/diaries";
import { TimeAgo } from "./TimeAgo";

interface DiaryCardProps {
  diary: DiaryPost;
  memberName: string;
  onClick: () => void;
}

export function DiaryCard({
  diary,
  memberName,
  onClick,
}: Readonly<DiaryCardProps>) {
  return (
    <button
      type="button"
      className="w-full text-left bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {diary.image && (
          <img
            src={diary.image}
            alt=""
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
          />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-gray-900">{diary.title}</h3>
            <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              <Award className="w-3 h-3" />
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-1 line-clamp-2">
            {diary.content}
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{memberName}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <TimeAgo timestamp={diary.timestamp} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

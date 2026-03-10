import { useEffect, useRef } from "react";
import { X, Clock } from "lucide-react";
import { type DiaryPost } from "@/lib/actions/diaries";
import { TimeAgo } from "./TimeAgo";

interface DiaryDetailModalProps {
  diary: DiaryPost;
  memberName: string;
  onClose: () => void;
}

export function DiaryDetailModal({
  diary,
  memberName,
  onClose,
}: Readonly<DiaryDetailModalProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClick = (e: MouseEvent) => {
      if (e.target === dialog) onClose();
    };
    dialog.addEventListener("click", handleClick);
    return () => dialog.removeEventListener("click", handleClick);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="w-full max-w-lg max-h-[90dvh] md:max-h-[80vh] min-h-[50dvh] m-auto rounded-2xl shadow-xl p-0 backdrop:bg-black/50 flex flex-col"
      onClose={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <h2 id="diary-modal-title" className="text-gray-900 font-semibold">
          {diary.title}
        </h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {diary.image && (
        <img
          src={diary.image}
          alt=""
          className="w-full max-h-48 object-cover"
        />
      )}

      <div className="px-5 py-4 overflow-y-auto flex-1">
        <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">
          {diary.content}
        </p>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
        <span>{memberName}</span>
        <span>•</span>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <TimeAgo timestamp={diary.timestamp} />
        </div>
      </div>
    </dialog>
  );
}

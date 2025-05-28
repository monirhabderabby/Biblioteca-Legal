// components/CommentPopover.tsx

import { motion } from "framer-motion";
import { RefObject } from "react";

interface Props {
  comment: string;
  setComment: (val: string) => void;
  onClose: () => void;
  inputRef: RefObject<HTMLTextAreaElement>;
}

const CommentPopover = ({ comment, setComment, onClose, inputRef }: Props) => (
  <motion.div
    className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg p-3 z-20 w-64 border"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex flex-col gap-2">
      <textarea
        ref={inputRef}
        className="w-full p-2 border rounded-md text-sm resize-none"
        rows={3}
        placeholder="Add your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-700"
          onClick={onClose}
        >
          Save
        </button>
      </div>
    </div>
  </motion.div>
);

export default CommentPopover;

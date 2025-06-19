// components/CommentPopover.tsx

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { RefObject } from "react";

interface Props {
  comment: string;
  setComment: (val: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  inputRef: RefObject<HTMLTextAreaElement>;
  loading: boolean;
}

const CommentPopover = ({
  comment,
  setComment,
  onDelete,
  inputRef,
  onSubmit,
  loading,
}: Props) => (
  <motion.div
    className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg p-3 z-20 w-64 border"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex flex-col gap-2">
      <Textarea
        ref={inputRef}
        className="w-full p-2 border rounded-md text-sm resize-none"
        rows={3}
        placeholder="Agrega tu comentario..."
        value={comment}
        disabled={loading}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex justify-end gap-x-3">
        <Button
          size="icon"
          variant="destructive"
          onClick={onDelete}
          disabled={loading}
        >
          <Trash />
        </Button>
        <button
          className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-700"
          onClick={onSubmit}
          disabled={loading}
        >
          Guardar
        </button>
      </div>
    </div>
  </motion.div>
);

export default CommentPopover;

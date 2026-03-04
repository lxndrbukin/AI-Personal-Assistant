import {
  type JSX,
  type FormEvent,
  type ChangeEvent,
  type KeyboardEvent,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { type RootState, type PromptProps, type ImageProps } from "../../store";

type MessageInputProps = {
  onSend: (message: PromptProps) => void;
};

export default function MessageInput({
  onSend,
}: MessageInputProps): JSX.Element {
  const { isLoading } = useSelector(
    (state: RootState) => state.chats.currentChat,
  );

  const [image, setImage] = useState<ImageProps | null>(null);
  const [input, setInput] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setImage({
        type: "file",
        data: base64,
        mediaType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend({
        input,
        image,
      });
      setInput("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend({
      input,
      image,
    });
    setInput("");
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <textarea
        onKeyDown={handleKeyDown}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name="message"
        placeholder="Ask anything"
      ></textarea>
      <div className="message-input-actions">
        <input type="file" onChange={handleFileChange} />
        <button disabled={isLoading} type="submit">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
}

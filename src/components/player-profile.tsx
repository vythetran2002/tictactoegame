import React, { useEffect, useRef, useState } from "react";
import { Avatar, Form } from "radix-ui";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { PlayerType } from "../sections/playground";
import { UploadImageToCloudinary } from "../services/cloudinary";
import { setCookie, getCookie } from "../utils/cookie-helper";

interface PlayerProfileProps {
  isReversed?: boolean;
  role: PlayerType;
  score: number;
  isDisabled: boolean;
  name: string;
  setName: (name: string) => void;
}

function PlayerProfile({
  isReversed,
  role,
  score,
  isDisabled,
  name,
  setName,
}: PlayerProfileProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(() => {
    return getCookie(`player${role}Avatar`) || null;
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get("name") as string;

    if (newName) {
      if (newName.length > 10) {
        toast.error("Tên không được quá 10 ký tự!");
        return;
      }
      setName(newName);
      setIsEditMode(false);

      toast.success("Updated Player " + role + " name sucessfully", {
        style: {
          fontSize: "15px",
          lineHeight: "1.5",
          transition: "color 0.3s",
        },
      });
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tick-tac-toe");

      toast.promise(
        UploadImageToCloudinary(formData).then((result) => {
          if (result) {
            setAvatarSrc(result);
            setCookie(`player${role}Avatar`, result, { path: "/" });
            return result;
          }
          throw new Error("Upload failed");
        }),
        {
          loading: "Updating avatar",
          success: () => "Upload image successfully",
          error: (err) => err.message || "Something went wrong",
        },
      );
    }
  };

  const handleStartEdit = () => {
    setIsEditMode(true);
  };

  useEffect(() => {
    if (isDisabled) {
      setIsEditMode(false);
    }
  }, [isDisabled]);

  return (
    <div
      className={`p-3 flex ${
        !isReversed ? "flex-row" : "flex-row-reverse"
      } rounded-md shadow-2xl bg-white gap-1`}
    >
      <div
        className="relative group h-[fit-content] "
        onClick={() => inputFileRef.current?.click()}
      >
        <Avatar.Root className="w-12 h-12 flex justify-center items-center rounded-full border-2 cursor-pointer duration-150 group-hover:opacity-20 group-hover:brightness-10">
          <Avatar.Image
            className="rounded-full w-12 h-12 object-cover"
            src={avatarSrc || ""}
            alt={name}
          />
          <Avatar.Fallback>{name.slice(0, 2)}</Avatar.Fallback>
        </Avatar.Root>

        <Pencil
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-0 duration-150 group-hover:opacity-100"
          size={17}
        />
      </div>

      <div className="flex flex-col max-w-20">
        {!isEditMode ? (
          <span
            className={`text-sm font-medium
             cursor-pointer
            `}
            onClick={handleStartEdit}
          >
            {name}
          </span>
        ) : (
          <Form.Root className="space-y-4" onSubmit={handleSubmitForm}>
            <Form.Field name="name" className="flex flex-col gap-1">
              <Form.Control asChild>
                <input
                  type="text"
                  defaultValue={name}
                  maxLength={10}
                  className="bg-gray-50 border max-w-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập tên người chơi"
                  required
                />
              </Form.Control>
              <Form.Message
                match="valueMissing"
                className="text-red-500 text-xs"
              >
                Please input player's {role} name
              </Form.Message>
              <span className="text-xs text-gray-500">10 characters </span>
            </Form.Field>
          </Form.Root>
        )}
        <input
          accept="image/*"
          ref={inputFileRef}
          className="hidden"
          type="file"
          onChange={handleFileChange}
        />
        <span className="text-sm">score: {score}</span>
      </div>
    </div>
  );
}

export default PlayerProfile;

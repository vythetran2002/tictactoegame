import React, { useState } from "react";
import { Avatar, Form } from "radix-ui";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { PlayerType } from "../sections/playground";

interface PlayerProfileProps {
  isReversed?: boolean;
  role: PlayerType;
  score: number;
}

function PlayerProfile({ isReversed, role, score }: PlayerProfileProps) {
  const [name, setName] = useState("Player " + role);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = formData.get("name") as string;

    if (newName) {
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

  return (
    <div
      className={`p-3 flex   ${
        !isReversed ? "flex-row" : "flex-row-reverse"
      } rounded-md shadow-2xl bg-white gap-1`}
    >
      <div className="relative group">
        <Avatar.Root className="w-12 h-12 flex justify-center items-center rounded-full border-2 cursor-pointer duration-150 group-hover:opacity-20 group-hover:brightness-10">
          <Avatar.Image
            className="rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg"
            alt=""
          />
          <Avatar.Fallback>{name.slice(0, 2)}</Avatar.Fallback>
        </Avatar.Root>

        <Pencil
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-0 duration-150 group-hover:opacity-100"
          size={17}
        />
      </div>

      <div className="flex flex-col ">
        {!isEditMode ? (
          <span
            className="text-sm font-medium cursor-pointer"
            onClick={() => setIsEditMode(true)}
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
                  className="bg-gray-50 border max-w-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập tên người chơi"
                  required
                />
              </Form.Control>
              <Form.Message
                match="valueMissing"
                className="text-red-500 text-xs"
              >
                Vui lòng nhập tên người chơi
              </Form.Message>
            </Form.Field>
          </Form.Root>
        )}

        <span className="text-sm">score: {score}</span>
      </div>
    </div>
  );
}

export default PlayerProfile;

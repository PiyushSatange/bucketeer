import { Type } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateButton = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  const handleClickCreate = async () => {
    if (children == "Folder") {
      // Handle folder creation
    } else if (children == "Bucket") {
      // Handle bucket creation
      const response = await fetch("/api/buckets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bucketName: name }),
      });
      const data = await response.json();
      if (data.status === 200) {
        toast.success(`Bucket "${name}" created successfully!`);
      } else {
        toast.error(`Error creating bucket: ${data.error}`);
      }
    }
  };

  return (
    <>
      <button
        className="bg-primary text-white py-2 px-4 rounded mb-4 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        New {children}
      </button>
      <Toaster />

      {isModalOpen && (
        <div className="fixed flex justify-center items-center inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm">
          <div className="w-[30%] h-[30%] border-black rounded p-5 flex-col justify-around items-center bg-black">
            <h2 className="text-lg  font-bold mb-4">Create a new {children}</h2>
            <div>
              <form>
                <label htmlFor="bucket-name" className="text-zinc-500">
                  Enter a {children} name
                </label>
                <input
                  type="text"
                  id="bucket-name"
                  placeholder={`${children} Name`}
                  value={name}
                  className="border border-gray-300 p-2 rounded mb-4 w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </form>
            </div>
            <div className="flex justify-start items-center gap-5">
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded"
                onClick={handleClickCreate}
              >
                Create
              </button>
              <button
                className="bg-primary text-white py-2 px-4 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateButton;

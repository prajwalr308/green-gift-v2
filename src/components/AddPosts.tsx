import React, { useState } from "react";
import Modal from "react-modal";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
interface AddPostsProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: () => void;
  closeModal: () => void;
}
interface FormData {
  postTitle: string;
  postBody: string;
  image: File | null;
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
};

const AddPosts = (props: AddPostsProps) => {
  const [formData, setFormData] = useState<FormData>({
    postTitle: "",
    postBody: "",
    image: null,
  });
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: (data) => {
      console.log(data);
      setFormData({
        postTitle: "",
        postBody: "",
        image: null,
      });
      void ctx.posts.getAll.invalidate();
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("something went wrong");
      }
      console.log(err);
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      const { files } = target;
      const selectedFiles = files as FileList;
      const value = target.type === "file" ? selectedFiles[0] : target.value;
      const name = target.name;

      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      const value = target.value;
      const name = target.name;

      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform any necessary actions with the form data
    mutate({
      content: formData.postBody,
      title: formData.postTitle,
      image: "image",
    });
  };

  return (
    <Modal
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      style={customStyles}
    >
      <div className="mx-auto w-full max-w-md">
        <form
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">
              Post Title
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="postTitle"
              name="postTitle"
              type="text"
              placeholder="Post Title"
              value={formData.postTitle}
              onChange={handleInputChange}
              disabled={isPosting}
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block font-bold text-gray-700">
              Post Body
            </label>
            <textarea
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="postBody"
              name="postBody"
              placeholder="Post Body"
              value={formData.postBody}
              disabled={isPosting}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="mb-2 block font-bold text-gray-700">Image</label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="image"
              name="image"
              type="file"
              placeholder="Image"
              onChange={handleInputChange}
              disabled={isPosting}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
              disabled={isPosting}
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPosts;

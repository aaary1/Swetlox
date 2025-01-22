import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Fab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadIcon from "@mui/icons-material/CloudUpload";
import { privateApi } from "../utils/api";

const AddStoryDialog = ({ open, handleClose }) => {
  const [selectedStory, setSelectedStory] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // Handle file input
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setSelectedStory((prevImages) => [...prevImages, ...files]); // Append new files to existing state
  };

  const handleSubmit = async () => {
    console.log("calling.......");
    setLoading(true);
    const formData = new FormData();
    selectedStory.forEach((story) => {
      const mediaType = story.type.startsWith("video/") ? "VIDEO" : "IMAGE";
      formData.append("files", story); // Add the file
      console.log(story);
      formData.append("mediaTypes", mediaType); // Add the corresponding media type
    });

    console.log(formData);

    try {
      await privateApi.post("/story/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      setSelectedStory([]);
      handleClose();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      {isLoading ? (
        <div className="w-full bg-[#1c1c1c] h-[350px] flex justify-center items-center">
          <CircularProgress style={{ color: "#ff3d00" }} />
        </div>
      ) : (
        <div className="bg-[#1c1c1c] text-white">
          <DialogTitle className="flex justify-between items-center text-lg font-semibold">
            Add Story
            <IconButton onClick={handleClose}>
              <CloseIcon className="text-white" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="mb-6">
              <label className="block mb-3 text-sm">Select Images</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="upload-images"
                />
                <label
                  htmlFor="upload-images"
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transform hover:scale-105 transition duration-300"
                >
                  <AddPhotoAlternateIcon /> Choose Files
                </label>
              </div>
            </div>

            {selectedStory.length > 0 && (
              <div className="grid grid-cols-5 gap-4 mt-4">
                {selectedStory.map((story, index) =>
                  story.type.startsWith("video/") ? (
                    <div
                      key={index}
                      className="relative rounded overflow-hidden group cursor-pointer"
                    >
                      <video
                        controls
                        autoPlay
                        loop
                        src={URL.createObjectURL(story)}
                        className="h-24 w-24 object-cover rounded transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="relative rounded overflow-hidden group cursor-pointer"
                    >
                      <img
                        src={URL.createObjectURL(story)}
                        alt={`Preview ${index}`}
                        className="h-24 w-24 object-cover rounded transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <span className="text-sm text-white">Preview</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </DialogContent>
          <DialogActions className="justify-center">
            <Fab
              onClick={handleSubmit}
              style={{
                background:
                  "linear-gradient(45deg, rgba(255,61,0,1) 30%, rgba(255,105,0,1) 90%)",
                color: "white",
              }}
              className="hover:shadow-2xl transform hover:scale-110 transition duration-300"
            >
              <UploadIcon />
            </Fab>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
};

export default AddStoryDialog;

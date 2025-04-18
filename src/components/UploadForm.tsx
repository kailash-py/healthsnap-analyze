
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, Camera, Image } from "lucide-react";
import { toast } from "sonner";

interface UploadFormProps {
  onUpload: (file: File) => void;
}

const UploadForm = ({ onUpload }: UploadFormProps) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast.error("Please upload an image file (JPEG, PNG)");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 5MB.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    } else {
      toast.error("Please select an image to upload");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300"
        } transition-colors cursor-pointer`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleChange}
          className="hidden"
        />
        
        {previewUrl ? (
          <div className="space-y-4">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-h-[300px] mx-auto rounded-md object-contain"
            />
            <p className="text-sm text-gray-600">{selectedFile?.name}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Image className="h-8 w-8 text-gray-500" />
            </div>
            <div>
              <p className="text-lg font-medium">Upload Nutrition Label</p>
              <p className="text-sm text-gray-500 mt-1">
                Drag and drop or click to upload
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Supports: JPEG, PNG (up to 5MB)
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Button
          onClick={handleSubmit}
          disabled={!selectedFile}
          className="w-full"
        >
          <Camera className="mr-2 h-4 w-4" />
          Analyze Nutrition Label
        </Button>
        
        {previewUrl && (
          <Button
            variant="outline"
            onClick={triggerFileInput}
            className="w-full"
          >
            <FileUp className="mr-2 h-4 w-4" />
            Choose a Different Image
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadForm;

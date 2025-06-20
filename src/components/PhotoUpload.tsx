
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Camera } from "lucide-react";

interface PhotoUploadProps {
  currentPhoto?: string;
  onPhotoChange: (photo: string | null) => void;
  className?: string;
}

const PhotoUpload = ({ currentPhoto, onPhotoChange, className = "" }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentPhoto || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file terlalu besar. Maksimal 5MB.");
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert("Hanya file gambar yang diperbolehkan.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onPhotoChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-center">
        <div className="relative">
          {preview ? (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleRemovePhoto}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                 onClick={handleUploadClick}>
              <Camera className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-xs text-gray-500 text-center">Klik untuk upload foto</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleUploadClick}
          className="flex items-center gap-2"
        >
          <Upload className="h-3 w-3" />
          {preview ? "Ganti Foto" : "Upload Foto"}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-gray-500 text-center">
        JPG, PNG, GIF (max 5MB)
      </p>
    </div>
  );
};

export default PhotoUpload;

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const DEFAULT_MEN_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80";

interface UploadWidgetProps {
  value?: string | null;
  onChange?: (url: string, publicId?: string) => void;
  disabled?: boolean;
}

export default function UploadWidget({ value, onChange, disabled }: UploadWidgetProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleOpenWidget = () => {
    if (disabled || uploading) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "myjmmbpz";
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "km09";

    if (typeof window !== "undefined" && window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName,
          uploadPreset,
          sources: ["local", "url", "camera"],
          multiple: false,
          resourceType: "image",
          clientAllowedFormats: ["png", "jpg", "jpeg", "webp", "gif", "svg"],
          maxFileSize: 10000000,
        },
        (error: any, result: any) => {
          if (error) {
            console.error("Cloudinary Widget Error:", error);
            const errMsg = typeof error === "string" ? error : (error?.message || JSON.stringify(error));
            if (errMsg.includes("unsigned") || errMsg.includes("whitelisted")) {
              toast.error(`Upload preset "${uploadPreset}" must be whitelisted for Unsigned uploads in Cloudinary Settings.`);
            }
          }
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            if (onChange && result.info?.secure_url) {
              onChange(result.info.secure_url, result.info.public_id);
            }
          }
        }
      );
      widget.open();
    } else if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDirectFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "myjmmbpz";
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "km09";

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.secure_url) {
        if (onChange) {
          onChange(data.secure_url, data.public_id);
        }
      } else {
        const errorMsg = data.error?.message || "Upload failed";
        if (errorMsg.includes("unsigned") || errorMsg.includes("whitelisted")) {
          toast.error(`Upload preset "${uploadPreset}" must be whitelisted for Unsigned uploads in Cloudinary Settings -> Upload -> Upload Presets.`);
        } else {
          toast.error(errorMsg);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const displayImage = value && value.trim() !== "" ? value : DEFAULT_MEN_AVATAR;

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleDirectFileUpload}
        accept="image/*"
        className="hidden"
      />
      <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-sm flex items-center justify-center shrink-0">
        <img
          src={displayImage}
          alt="User Profile"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_MEN_AVATAR;
          }}
        />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleOpenWidget}
        disabled={disabled || uploading}
        className="flex items-center gap-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-sm font-semibold"
      >
        {uploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 text-amber-500" />
            {value ? "Change Image" : "Upload Image"}
          </>
        )}
      </Button>
    </div>
  );
}
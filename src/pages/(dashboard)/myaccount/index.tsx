import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth-context";
import { BACKEND_BASE_URL } from "@/constants";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Mail, Shield, ToggleLeft, Save, Phone, MessageSquare, MapPin, Home, FileText, Camera } from "lucide-react";
import { toast } from "sonner";
import UploadWidget, { DEFAULT_MEN_AVATAR } from "@/components/Shared/upload/upload-widget";

export default function MyAccount() {
  const { user, refreshSession } = useAuth();
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState("");
  const [imageCldPubId, setImageCldPubId] = useState("");
  const [updating, setUpdating] = useState(false);

  // Fetch account data directly from database endpoint
  const fetchAccountData = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}myaccount`, {
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          const u = result.data;
          if (u.name) setName(u.name);
          if (u.phoneNo) setPhoneNo(u.phoneNo);
          if (u.whatsappNo) setWhatsappNo(u.whatsappNo);
          if (u.location) setLocation(u.location);
          if (u.address) setAddress(u.address);
          if (u.note) setNote(u.note);
          if (u.image) setImage(u.image);
          if (u.imageCldPubId) setImageCldPubId(u.imageCldPubId);
        }
      }
    } catch (err) {
      console.error("Failed to fetch my account details:", err);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.name && !name) setName(user.name);
      if (user.phoneNo && !phoneNo) setPhoneNo(user.phoneNo);
      if ((user.whatsappNo || user.whatsAppNumber) && !whatsappNo) setWhatsappNo(user.whatsappNo || user.whatsAppNumber || "");
      if (user.location && !location) setLocation(user.location);
      if (user.address && !address) setAddress(user.address);
      if (user.note && !note) setNote(user.note);
      if ((user.image || user.img) && !image) setImage(user.image || user.img || "");
      if (user.imageCldPubId && !imageCldPubId) setImageCldPubId(user.imageCldPubId);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || name.trim() === "") {
      toast.error("Name is required");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}myaccount`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          image: image || null,
          imageCldPubId: imageCldPubId || null,
          phoneNo: phoneNo.trim(),
          whatsappNo: whatsappNo.trim(),
          location: location.trim(),
          address: address.trim(),
          note: note.trim(),
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update profile details");
      }

      const responseData = await response.json();
      if (responseData.data) {
        if (responseData.data.image) setImage(responseData.data.image);
        if (responseData.data.imageCldPubId) setImageCldPubId(responseData.data.imageCldPubId);
      }

      await refreshSession();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setUpdating(false);
    }
  };

  const userAvatarSrc = image && image.trim() !== "" ? image : DEFAULT_MEN_AVATAR;

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <Breadcrumb />

      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">My Account</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Manage your personal details, profile picture, role configurations, and contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm h-fit">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-amber-500/40 bg-slate-100 dark:bg-slate-800 shadow-md flex items-center justify-center">
                <img
                  src={userAvatarSrc}
                  alt={user?.name || "User"}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_MEN_AVATAR;
                  }}
                />
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {name || user?.name}
            </CardTitle>
            <CardDescription className="text-slate-400 dark:text-slate-500 text-xs">
              Joined on {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Role</span>
              <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                {user?.role}
              </Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Status</span>
              <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 border-0 font-semibold">
                {user?.userStatus}
              </Badge>
            </div>
            {phoneNo && (
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" /> Phone
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-mono text-xs">{phoneNo}</span>
              </div>
            )}
            {location && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Location
                </span>
                <span className="text-slate-700 dark:text-slate-300 text-xs truncate max-w-[140px]">{location}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="md:col-span-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <User className="h-5 w-5 text-amber-500" /> Account Profile
            </CardTitle>
            <CardDescription className="text-slate-400 dark:text-slate-500 text-xs">
              Update your public display information, profile picture, contact details, and location.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-5">
              {/* Profile Image Section */}
              <div className="space-y-2">
                <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                  <Camera className="h-4 w-4 text-slate-400" /> Profile Picture
                </Label>
                <UploadWidget
                  value={image}
                  onChange={async (url, publicId) => {
                    setImage(url);
                    if (publicId) setImageCldPubId(publicId);
                    try {
                      const response = await fetch(`${BACKEND_BASE_URL}myaccount`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          image: url,
                          imageCldPubId: publicId || null,
                        }),
                        credentials: "include",
                      });
                      if (response.ok) {
                        toast.success("Profile picture updated in database!");
                        await refreshSession();
                      }
                    } catch (err) {
                      console.error("Failed to auto-update profile image:", err);
                    }
                  }}
                  disabled={updating}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 font-semibold text-sm">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={updating}
                  className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 focus-visible:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-slate-400" /> Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-slate-100/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNo" className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-slate-400" /> Phone No
                  </Label>
                  <Input
                    id="phoneNo"
                    type="text"
                    placeholder="+8801700000000"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    disabled={updating}
                    className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsappNo" className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4 text-slate-400" /> WhatsApp No
                  </Label>
                  <Input
                    id="whatsappNo"
                    type="text"
                    placeholder="+8801700000000"
                    value={whatsappNo}
                    onChange={(e) => setWhatsappNo(e.target.value)}
                    disabled={updating}
                    className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 focus-visible:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-slate-400" /> Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={updating}
                  className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 focus-visible:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                  <Home className="h-4 w-4 text-slate-400" /> Address
                </Label>
                <Textarea
                  id="address"
                  rows={2}
                  placeholder="Full physical address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={updating}
                  className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 focus-visible:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note" className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-slate-400" /> Note
                </Label>
                <Textarea
                  id="note"
                  rows={3}
                  placeholder="Additional personal note or details"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={updating}
                  className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 focus-visible:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-slate-400" /> Security Role
                  </Label>
                  <Input
                    value={user?.role || ""}
                    disabled
                    className="bg-slate-100/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm flex items-center gap-1.5">
                    <ToggleLeft className="h-4 w-4 text-slate-400" /> Account Status
                  </Label>
                  <Input
                    value={user?.userStatus || ""}
                    disabled
                    className="bg-slate-100/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={updating}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  {updating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

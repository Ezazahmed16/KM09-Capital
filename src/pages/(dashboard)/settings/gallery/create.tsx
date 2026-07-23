import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
import { CreateView } from "@/components/refine-ui/views/create-view.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useBack } from "@refinedev/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { gallerySchema } from "@/lib/schema";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { ArrowLeft, Image } from "lucide-react";
import { toast } from "sonner";
import UploadWidget from "@/components/Shared/upload/upload-widget.tsx";

const CATEGORIES = [
  "বার্ষিক মিলনমেলা",
  "সদস্য সভা",
  "বিনিয়োগ আয়োজন",
  "সামাজিক উদ্যোগ",
];

export default function GalleryCreate() {
  const back = useBack();

  const form = useForm({
    resolver: zodResolver(gallerySchema),
    refineCoreProps: {
      resource: "gallery",
      action: "create",
      redirect: "list",
    },
    defaultValues: {
      title: "",
      subtitle: "",
      category: "বার্ষিক মিলনমেলা",
      image: "",
      imageCldPubId: "",
      date: "",
      location: "",
      description: "",
    },
  });

  const { refineCore } = form;
  const { onFinish, formLoading } = refineCore as any;

  const onSubmit = async (values: any) => {
    try {
      await onFinish(values);
      toast.success("New gallery item created successfully!");
    } catch (error: any) {
      console.error("Create Gallery Error", error);
      toast.error(error.message || "Failed to create gallery item.");
    }
  };

  return (
    <CreateView className="class-view space-y-6">
      <Breadcrumb />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title text-2xl font-bold tracking-tight">Add New Gallery Photo</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Upload website gallery slider & photo content (SuperAdmin Only)
          </p>
        </div>
        <Button variant="outline" onClick={back} className="gap-2 shrink-0 cursor-pointer">
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </Button>
      </div>

      <Separator />

      <div className="max-w-4xl mx-auto">
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm">
          <CardHeader className="bg-slate-50/80 dark:bg-slate-900/50 pb-4 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Image className="h-5 w-5 text-amber-500" />
              <span>Gallery Details & Cloudinary Image Upload</span>
            </CardTitle>
            <CardDescription className="text-xs">Complete title, details, category & image upload</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Cloudinary Image Upload */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-semibold text-sm">Gallery Image (Cloudinary Upload)</FormLabel>
                      <FormControl>
                        <UploadWidget
                          value={field.value}
                          onChange={(url, publicId) => {
                            field.onChange(url);
                            if (publicId) {
                              form.setValue("imageCldPubId", publicId);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5 sm:col-span-2">
                        <FormLabel className="font-semibold text-sm">Photo / Event Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. KM09 Capital Annual Assembly 2026"
                            {...field}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Subtitle */}
                  <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-sm">Subtitle (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Annual General Assembly 2026"
                            {...field}
                            value={field.value ?? ""}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500 font-mono text-xs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-sm">Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger className="w-full focus:ring-amber-500 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-sm">Event Date</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 15 January, 2026"
                            {...field}
                            value={field.value ?? ""}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-sm">Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Dhaka, Bangladesh"
                            {...field}
                            value={field.value ?? ""}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5 sm:col-span-2">
                        <FormLabel className="font-semibold text-sm">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter event or photo description..."
                            {...field}
                            value={field.value ?? ""}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500 min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button type="button" variant="outline" onClick={back} className="px-6 cursor-pointer">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={formLoading}
                    className="px-6 cursor-pointer bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md"
                  >
                    {formLoading ? "Saving..." : "Save Gallery Item"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  );
}

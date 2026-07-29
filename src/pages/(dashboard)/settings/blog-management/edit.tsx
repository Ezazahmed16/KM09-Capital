import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
import { EditView } from "@/components/refine-ui/views/edit-view.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useBack } from "@refinedev/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { blogSchema } from "@/lib/schema";
import { useEffect } from "react";
import { useParams } from "react-router";
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
import { ArrowLeft, BookOpen, Image } from "lucide-react";
import { toast } from "sonner";
import UploadWidget from "@/components/Shared/upload/upload-widget.tsx";

const CATEGORIES = [
  "সঞ্চয় ও বিনিয়োগ",
  "যৌথ ব্যবসা",
  "প্রযুক্তি ও লেজার",
  "রিয়েল এস্টেট",
  "সামাজিক কল্যাণ",
  "আইন ও সমবায় নীতি",
];

export default function BlogEdit() {
  const back = useBack();
  const { id } = useParams<{ id: string }>();

  const form = useForm({
    resolver: zodResolver(blogSchema),
    refineCoreProps: {
      resource: "blog-management",
      id: id,
      action: "edit",
      redirect: "list",
    },
    defaultValues: {
      title: "",
      subtitle: "",
      category: "সঞ্চয় ও বিনিয়োগ",
      readTime: "৫ মিনিট পঠিত",
      image: "",
      imageCldPubId: "",
      date: "",
      description: "",
      fullContent: "",
      authorName: "Ezaz Ahmed",
      authorRole: "Managing Director",
      authorAvatar: "",
    },
  });

  const { refineCore } = form;
  const { onFinish, formLoading, queryResult } = refineCore as any;
  const rawData = queryResult?.data?.data || queryResult?.data;

  useEffect(() => {
    if (rawData) {
      form.reset({
        title: rawData.title || "",
        subtitle: rawData.subtitle || "",
        category: rawData.category || "সঞ্চয় ও বিনিয়োগ",
        readTime: rawData.readTime || "৫ মিনিট পঠিত",
        image: rawData.image || "",
        imageCldPubId: rawData.imageCldPubId || "",
        date: rawData.date || "",
        description: rawData.description || "",
        fullContent: rawData.fullContent || "",
        authorName: rawData.authorName || "Ezaz Ahmed",
        authorRole: rawData.authorRole || "Managing Director",
        authorAvatar: rawData.authorAvatar || "",
      });
    }
  }, [rawData]);

  const onSubmit = async (values: any) => {
    try {
      await onFinish(values);
      toast.success("Blog article updated successfully!");
    } catch (error: any) {
      console.error("Update Blog Error", error);
      toast.error(error.message || "Failed to update blog article.");
    }
  };

  return (
    <EditView className="class-view space-y-6">
      <Breadcrumb />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title text-2xl font-bold tracking-tight">Edit Blog Article</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Modify blog details, cover image, and article text (SuperAdmin Only)
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
              <BookOpen className="h-5 w-5 text-amber-500" />
              <span>Blog Article Editor</span>
            </CardTitle>
            <CardDescription className="text-xs">Update article title, category, image, and full content</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Cloudinary Cover Image Upload */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-semibold text-sm">Cover Image (Cloudinary Upload)</FormLabel>
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
                        <FormLabel className="font-semibold text-sm">Article Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. স্মার্ট সঞ্চয় ও সমবায় উদ্যোগে আর্থিক নিরাপত্তা নিশ্চিতকরণ"
                            {...field}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500 font-bold"
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
                        <FormLabel className="font-semibold text-sm">Subtitle (English / Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Smart Savings & Cooperative Financial Security"
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

                  {/* Read Time */}
                  <FormField
                    control={form.control}
                    name="readTime"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-sm">Estimated Read Time</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. ৫ মিনিট পঠিত"
                            {...field}
                            value={field.value ?? ""}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500"
                          />
                        </FormControl>
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
                        <FormLabel className="font-semibold text-sm">Publication Date</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. ২০ জুলাই, ২০২৬"
                            {...field}
                            value={field.value ?? ""}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Author Name */}
                  <FormField
                    control={form.control}
                    name="authorName"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-sm">Author Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Ezaz Ahmed"
                            {...field}
                            value={field.value ?? ""}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Author Role */}
                  <FormField
                    control={form.control}
                    name="authorRole"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="font-semibold text-sm">Author Role</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Managing Director"
                            {...field}
                            value={field.value ?? ""}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Summary Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5 sm:col-span-2">
                        <FormLabel className="font-semibold text-sm">Summary Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter short summary for blog cards..."
                            {...field}
                            value={field.value ?? ""}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500 min-h-[90px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Full Content */}
                  <FormField
                    control={form.control}
                    name="fullContent"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5 sm:col-span-2">
                        <FormLabel className="font-semibold text-sm">Full Article Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter detailed article text and paragraphs..."
                            {...field}
                            value={field.value ?? ""}
                            className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500 min-h-[220px]"
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
                    {formLoading ? "Saving..." : "Update Blog Article"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </EditView>
  );
}

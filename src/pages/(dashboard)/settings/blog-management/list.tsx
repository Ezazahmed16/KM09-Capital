import { ListView } from "@/components/refine-ui/views/list-view.tsx";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx";
import { Plus, Edit, Trash2, Calendar, Clock, Loader2, Search, BookOpen, User } from "lucide-react";
import { useList, useDelete, useNavigation } from "@refinedev/core";
import { BlogItem } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import { DEFAULT_MEN_AVATAR } from "@/components/Shared/upload/upload-widget";

export default function BlogList() {
    const { create, edit } = useNavigation();
    const { mutate: deleteMutate } = useDelete();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { result, query } = useList<BlogItem>({
        resource: "blog-management",
        pagination: { mode: "off" },
    });

    const allItems = result?.data || [];
    const isLoading = query?.isLoading;

    const items = allItems.filter((item: BlogItem) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            item.title?.toLowerCase().includes(q) ||
            item.category?.toLowerCase().includes(q) ||
            item.authorName?.toLowerCase().includes(q)
        );
    });

    const handleDelete = () => {
        if (!deleteId) return;
        deleteMutate(
            {
                resource: "blog-management",
                id: deleteId,
            },
            {
                onSuccess: () => {
                    toast.success("Blog post deleted successfully!");
                    setDeleteId(null);
                },
                onError: (err: any) => {
                    toast.error(err.message || "Failed to delete blog post.");
                    setDeleteId(null);
                },
            }
        );
    };

    return (
        <ListView className="class-view space-y-6">
            <Breadcrumb />

            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="page-title text-2xl font-bold tracking-tight">Blog Management</h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage & publish website blog articles (SuperAdmin Only)
                    </p>
                </div>
                <Button
                    onClick={() => create("blog-management")}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold gap-2 cursor-pointer shadow-md shrink-0"
                >
                    <Plus className="size-4" />
                    <span>Create New Blog</span>
                </Button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-3 bg-white dark:bg-[#0b1e33]/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-md">
                <Search className="size-4 text-slate-400 shrink-0" />
                <Input
                    placeholder="Search blogs by title, category, author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0 bg-transparent p-0 text-sm"
                />
            </div>

            {/* Data Table */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1e33]/70 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                        <TableRow>
                            <TableHead className="w-16">Cover</TableHead>
                            <TableHead>Title & Category</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Date & Read Time</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="size-5 animate-spin text-amber-500" />
                                        <span>Loading blogs...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : items.length > 0 ? (
                            items.map((item: BlogItem) => (
                                <TableRow key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                                    <TableCell>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="size-12 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <p className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-1">
                                                {item.title}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[11px]">
                                                    {item.category}
                                                </Badge>
                                                {item.subtitle && (
                                                    <span className="text-xs font-mono text-slate-400 truncate max-w-[200px]">
                                                        {item.subtitle}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-xs">
                                            <img
                                                src={item.authorAvatar || DEFAULT_MEN_AVATAR}
                                                alt={item.authorName || "Author"}
                                                className="size-7 rounded-full object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                                            />
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-slate-200">{item.authorName || "Ezaz Ahmed"}</p>
                                                <p className="text-[10px] text-slate-400">{item.authorRole || "Managing Director"}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                                        {item.date && (
                                            <div className="flex items-center gap-1">
                                                <Calendar className="size-3 text-amber-500 shrink-0" />
                                                <span>{item.date}</span>
                                            </div>
                                        )}
                                        {item.readTime && (
                                            <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                                <Clock className="size-3 text-slate-400 shrink-0" />
                                                <span>{item.readTime}</span>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => edit("blog-management", item.id)}
                                                className="h-8 w-8 p-0 cursor-pointer"
                                            >
                                                <Edit className="size-4 text-slate-600 dark:text-slate-300" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setDeleteId(item.id)}
                                                className="h-8 w-8 p-0 cursor-pointer text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                                    No blog posts found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Confirmation Alert */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete Blog Post</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to permanently delete this blog article?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </ListView>
    );
}

// import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  EyeOff,
  FolderTree,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Category } from "@/types/category";
import { categoryServices } from "@/services/category.service";


export default async function ManageCategoriesPage() {
  const { data } = await categoryServices.getAllCategories();  
  const { data: categories, meta } = data;

//   const [categories, setCategories] = useState<Category[]>(initialCategories);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(
//     null,
//   );
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     isActive: true,
//   });

//   // Filter categories based on search
//   const filteredCategories = categories.filter(
//     (cat) =>
//       cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       cat.description?.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   // Generate slug from name
//   const generateSlug = (name: string) => {
//     return name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/(^-|-$)/g, "");
//   };

//   // Handle form input change
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle add category
//   const handleAddCategory = () => {
//     if (!formData.name.trim()) {
//       toast.error("Category name is required");
//       return;
//     }

//     const newCategory: Category = {
//       id: Date.now().toString(),
//       name: formData.name,
//       slug: generateSlug(formData.name),
//       description: formData.description,
//       isActive: formData.isActive,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       itemCount: 0,
//     };

//     setCategories((prev) => [newCategory, ...prev]);
//     toast.success("Category added successfully");
//     setIsAddDialogOpen(false);
//     setFormData({ name: "", description: "", isActive: true });
//   };

//   // Handle edit category
//   const handleEditCategory = () => {
//     if (!selectedCategory) return;
//     if (!formData.name.trim()) {
//       toast.error("Category name is required");
//       return;
//     }

//     const updatedCategories = categories.map((cat) =>
//       cat.id === selectedCategory.id
//         ? {
//             ...cat,
//             name: formData.name,
//             slug: generateSlug(formData.name),
//             description: formData.description,
//             isActive: formData.isActive,
//             updatedAt: new Date(),
//           }
//         : cat,
//     );

//     setCategories(updatedCategories);
//     toast.success("Category updated successfully");
//     setIsEditDialogOpen(false);
//     setSelectedCategory(null);
//   };

//   // Handle delete category
//   const handleDeleteCategory = () => {
//     if (!selectedCategory) return;

//     const updatedCategories = categories.filter(
//       (cat) => cat.id !== selectedCategory.id,
//     );
//     setCategories(updatedCategories);
//     toast.success("Category deleted successfully");
//     setIsDeleteDialogOpen(false);
//     setSelectedCategory(null);
//   };

//   // Open edit dialog with category data
//   const openEditDialog = (category: Category) => {
//     setSelectedCategory(category);
//     setFormData({
//       name: category.name,
//       description: category.description || "",
//       isActive: category.isActive,
//     });
//     setIsEditDialogOpen(true);
//   };

//   // Open delete dialog
//   const openDeleteDialog = (category: Category) => {
//     setSelectedCategory(category);
//     setIsDeleteDialogOpen(true);
//   };

//   // Toggle category status
//   const toggleCategoryStatus = (category: Category) => {
//     const updatedCategories = categories.map((cat) =>
//       cat.id === category.id
//         ? { ...cat, isActive: !cat.isActive, updatedAt: new Date() }
//         : cat,
//     );
//     setCategories(updatedCategories);
//     toast.success(
//       `${category.name} ${!category.isActive ? "activated" : "deactivated"}`,
//     );
//   };

  return (
    <></>
    // <div className="space-y-6 p-6">
    //   {/* Header */}
    //   <div className="flex items-center justify-between">
    //     <div>
    //       <h1 className="text-3xl font-bold tracking-tight">
    //         Manage Categories
    //       </h1>
    //       <p className="text-muted-foreground">
    //         Create and manage food categories for your platform
    //       </p>
    //     </div>
    //     <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
    //       <DialogTrigger asChild>
    //         <Button>
    //           <Plus className="mr-2 h-4 w-4" />
    //           Add New Category
    //         </Button>
    //       </DialogTrigger>
    //       <DialogContent>
    //         <DialogHeader>
    //           <DialogTitle>Add New Category</DialogTitle>
    //           <DialogDescription>
    //             Create a new category for food items. Click save when you're
    //             done.
    //           </DialogDescription>
    //         </DialogHeader>
    //         <div className="space-y-4 py-4">
    //           <div className="space-y-2">
    //             <Label htmlFor="name">Category Name</Label>
    //             <Input
    //               id="name"
    //               name="name"
    //               placeholder="e.g., Pizza, Burgers, Sushi"
    //               value={formData.name}
    //               onChange={handleInputChange}
    //             />
    //           </div>
    //           <div className="space-y-2">
    //             <Label htmlFor="description">Description</Label>
    //             <Textarea
    //               id="description"
    //               name="description"
    //               placeholder="Brief description of the category"
    //               value={formData.description}
    //               onChange={handleInputChange}
    //               rows={3}
    //             />
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <Switch
    //               id="isActive"
    //               checked={formData.isActive}
    //               onCheckedChange={(checked) =>
    //                 setFormData((prev) => ({ ...prev, isActive: checked }))
    //               }
    //             />
    //             <Label htmlFor="isActive">Active</Label>
    //           </div>
    //         </div>
    //         <DialogFooter>
    //           <Button
    //             variant="outline"
    //             onClick={() => setIsAddDialogOpen(false)}
    //           >
    //             Cancel
    //           </Button>
    //           <Button onClick={handleAddCategory}>Save Category</Button>
    //         </DialogFooter>
    //       </DialogContent>
    //     </Dialog>
    //   </div>

    //   {/* Search and Filter */}
    //   <div className="flex items-center gap-4">
    //     <div className="relative flex-1 max-w-sm">
    //       <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    //       <Input
    //         placeholder="Search categories..."
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //         className="pl-10"
    //       />
    //     </div>
    //   </div>

    //   {/* Categories Table */}
    //   <Card>
    //     <CardContent className="p-0">
    //       <Table>
    //         <TableHeader>
    //           <TableRow>
    //             <TableHead>Name</TableHead>
    //             <TableHead>Description</TableHead>
    //             <TableHead>Items</TableHead>
    //             <TableHead>Status</TableHead>
    //             <TableHead>Created</TableHead>
    //             <TableHead className="text-right">Actions</TableHead>
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //           {filteredCategories.length === 0 ? (
    //             <TableRow>
    //               <TableCell
    //                 colSpan={6}
    //                 className="text-center py-8 text-muted-foreground"
    //               >
    //                 No categories found
    //               </TableCell>
    //             </TableRow>
    //           ) : (
    //             filteredCategories.map((category) => (
    //               <TableRow key={category.id}>
    //                 <TableCell className="font-medium">
    //                   {category.name}
    //                 </TableCell>
    //                 <TableCell className="max-w-xs truncate">
    //                   {category.description || "—"}
    //                 </TableCell>
    //                 <TableCell>
    //                   <Badge variant="secondary">
    //                     {category.itemCount} items
    //                   </Badge>
    //                 </TableCell>
    //                 <TableCell>
    //                   <Badge
    //                     variant={category.isActive ? "default" : "secondary"}
    //                     className={
    //                       category.isActive
    //                         ? "bg-green-100 text-green-800 hover:bg-green-100"
    //                         : "bg-gray-100 text-gray-800 hover:bg-gray-100"
    //                     }
    //                   >
    //                     {category.isActive ? "Active" : "Inactive"}
    //                   </Badge>
    //                 </TableCell>
    //                 <TableCell>
    //                   {category.createdAt.toLocaleDateString()}
    //                 </TableCell>
    //                 <TableCell className="text-right">
    //                   <DropdownMenu>
    //                     <DropdownMenuTrigger asChild>
    //                       <Button variant="ghost" size="icon">
    //                         <MoreHorizontal className="h-4 w-4" />
    //                       </Button>
    //                     </DropdownMenuTrigger>
    //                     <DropdownMenuContent align="end">
    //                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                       <DropdownMenuItem
    //                         onClick={() => openEditDialog(category)}
    //                       >
    //                         <Edit className="mr-2 h-4 w-4" />
    //                         Edit
    //                       </DropdownMenuItem>
    //                       <DropdownMenuItem
    //                         onClick={() => toggleCategoryStatus(category)}
    //                       >
    //                         {category.isActive ? (
    //                           <>
    //                             <EyeOff className="mr-2 h-4 w-4" />
    //                             Deactivate
    //                           </>
    //                         ) : (
    //                           <>
    //                             <Eye className="mr-2 h-4 w-4" />
    //                             Activate
    //                           </>
    //                         )}
    //                       </DropdownMenuItem>
    //                       <DropdownMenuSeparator />
    //                       <DropdownMenuItem
    //                         onClick={() => openDeleteDialog(category)}
    //                         className="text-red-600"
    //                       >
    //                         <Trash2 className="mr-2 h-4 w-4" />
    //                         Delete
    //                       </DropdownMenuItem>
    //                     </DropdownMenuContent>
    //                   </DropdownMenu>
    //                 </TableCell>
    //               </TableRow>
    //             ))
    //           )}
    //         </TableBody>
    //       </Table>
    //     </CardContent>
    //   </Card>

    //   {/* Edit Dialog */}
    //   <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
    //     <DialogContent>
    //       <DialogHeader>
    //         <DialogTitle>Edit Category</DialogTitle>
    //         <DialogDescription>
    //           Update category information. Click save when you're done.
    //         </DialogDescription>
    //       </DialogHeader>
    //       <div className="space-y-4 py-4">
    //         <div className="space-y-2">
    //           <Label htmlFor="edit-name">Category Name</Label>
    //           <Input
    //             id="edit-name"
    //             name="name"
    //             value={formData.name}
    //             onChange={handleInputChange}
    //           />
    //         </div>
    //         <div className="space-y-2">
    //           <Label htmlFor="edit-description">Description</Label>
    //           <Textarea
    //             id="edit-description"
    //             name="description"
    //             value={formData.description}
    //             onChange={handleInputChange}
    //             rows={3}
    //           />
    //         </div>
    //         <div className="flex items-center space-x-2">
    //           <Switch
    //             id="edit-isActive"
    //             checked={formData.isActive}
    //             onCheckedChange={(checked) =>
    //               setFormData((prev) => ({ ...prev, isActive: checked }))
    //             }
    //           />
    //           <Label htmlFor="edit-isActive">Active</Label>
    //         </div>
    //       </div>
    //       <DialogFooter>
    //         <Button
    //           variant="outline"
    //           onClick={() => setIsEditDialogOpen(false)}
    //         >
    //           Cancel
    //         </Button>
    //         <Button onClick={handleEditCategory}>Save Changes</Button>
    //       </DialogFooter>
    //     </DialogContent>
    //   </Dialog>

    //   {/* Delete Confirmation Dialog */}
    //   <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
    //     <DialogContent>
    //       <DialogHeader>
    //         <DialogTitle>Delete Category</DialogTitle>
    //         <DialogDescription>
    //           Are you sure you want to delete "{selectedCategory?.name}"? This
    //           action cannot be undone.
    //         </DialogDescription>
    //       </DialogHeader>
    //       <DialogFooter>
    //         <Button
    //           variant="outline"
    //           onClick={() => setIsDeleteDialogOpen(false)}
    //         >
    //           Cancel
    //         </Button>
    //         <Button variant="destructive" onClick={handleDeleteCategory}>
    //           Delete
    //         </Button>
    //       </DialogFooter>
    //     </DialogContent>
    //   </Dialog>
    // </div>
  );
}

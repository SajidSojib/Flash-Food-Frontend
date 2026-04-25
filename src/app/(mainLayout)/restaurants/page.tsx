"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  Eye,
  Search,
  Filter,
  Star,
  Clock,
  Flame,
  IndianRupee,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Dummy menu data
const menuItems = [
  {
    id: "1",
    providerId: "39761495-6134-433e-b7a0-023dd42fea6b",
    name: "Dam Biryani Full Plate",
    description:
      "This chicken dum biryani recipe is a no fail recipe and will give an awesome dum biryani each time.",
    price: 250,
    ingredients: [
      "2 cups basmati rice (preferably aged rice)",
      "2 to 2 ½ litres water",
      "1 tsp shahi jeera",
      "1 bay leaf",
      "2 inch cinnamon (thin)",
    ],
    categories: ["indian", "biryani", "spicy"],
    images: [
      "https://i.ibb.co/xt5Pt7Z0/unnamed.jpg",
      "https://i.ibb.co/RkQWjWCx/Dum-Briyani-Vismai-food.jpg",
      "https://i.ibb.co/gLRbGf2R/images.jpg",
    ],
    rating: 4.5,
    prepTime: "45 min",
    calories: 650,
    isAvailable: true,
    isVegetarian: false,
  },
  {
    id: "2",
    providerId: "39761495-6134-433e-b7a0-023dd42fea6b",
    name: "Butter Chicken",
    description:
      "Tender chicken cooked in a rich, creamy tomato gravy with aromatic Indian spices.",
    price: 320,
    ingredients: [
      "500g chicken",
      "2 tbsp butter",
      "1 cup cream",
      "2 onions",
      "4 tomatoes",
    ],
    categories: ["indian", "chicken", "creamy"],
    images: [
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
    ],
    rating: 4.8,
    prepTime: "30 min",
    calories: 580,
    isAvailable: true,
    isVegetarian: false,
  },
  {
    id: "3",
    providerId: "39761495-6134-433e-b7a0-023dd42fea6b",
    name: "Paneer Tikka Masala",
    description:
      "Grilled paneer cubes simmered in a rich and flavorful tomato-onion gravy.",
    price: 280,
    ingredients: [
      "250g paneer",
      "1 cup yogurt",
      "2 onions",
      "3 tomatoes",
      "spices",
    ],
    categories: ["indian", "vegetarian", "paneer"],
    images: [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc9?w=500",
    ],
    rating: 4.6,
    prepTime: "25 min",
    calories: 450,
    isAvailable: true,
    isVegetarian: true,
  },
  {
    id: "4",
    providerId: "39761495-6134-433e-b7a0-023dd42fea6b",
    name: "Garlic Naan",
    description:
      "Soft and fluffy Indian bread topped with fresh garlic and butter.",
    price: 60,
    ingredients: ["2 cups flour", "4 garlic cloves", "2 tbsp butter", "yogurt"],
    categories: ["indian", "bread", "vegetarian"],
    images: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    ],
    rating: 4.3,
    prepTime: "15 min",
    calories: 180,
    isAvailable: true,
    isVegetarian: true,
  },
  {
    id: "5",
    providerId: "39761495-6134-433e-b7a0-023dd42fea6b",
    name: "Gulab Jamun",
    description:
      "Soft, spongy milk solids balls soaked in rose-flavored sugar syrup.",
    price: 120,
    ingredients: [
      "1 cup milk powder",
      "2 tbsp flour",
      "sugar syrup",
      "rose water",
    ],
    categories: ["indian", "dessert", "sweet"],
    images: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    ],
    rating: 4.7,
    prepTime: "20 min",
    calories: 320,
    isAvailable: true,
    isVegetarian: true,
  },
  {
    id: "6",
    providerId: "39761495-6134-433e-b7a0-023dd42fea6b",
    name: "Chicken Shawarma",
    description:
      "Marinated chicken wrapped in soft pita bread with garlic sauce and vegetables.",
    price: 180,
    ingredients: ["chicken thighs", "pita bread", "garlic sauce", "vegetables"],
    categories: ["middle eastern", "chicken", "wrap"],
    images: [
      "https://images.unsplash.com/photo-1599487488175-3e8f6e8a3b3f?w=500",
    ],
    rating: 4.4,
    prepTime: "15 min",
    calories: 520,
    isAvailable: true,
    isVegetarian: false,
  },
];

// All unique categories from menu items
const allCategories = Array.from(
  new Set(menuItems.flatMap((item) => item.categories)),
).sort();

export default function BrowseMenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 6;

  // Filter and sort logic (you can replace with your own)
  const filteredItems = menuItems
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        item.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // default: popular
    });

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const toggleCart = (itemId: string) => {
    setCartItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-4 py-8 min-h-screen pt-20 sm:pt-25">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl text-center font-bold gradient-text ">
            Browse Menu
          </h1>
          <p className="text-muted-foreground mt-1 text-center">
            Discover delicious dishes from our kitchen
          </p>
        </div>

        {/* Cart Summary */}
        <div className="flex items-center gap-3 bg-card p-3 rounded-lg  shadow-sm border">
          <div className="relative">
            <ShoppingCart className="h-5 w-5 text-primary" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
          <span className="text-sm font-medium">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-xl p-6 shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by dish name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="relative">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory !== "all") && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Category: {selectedCategory}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => setSelectedCategory("all")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Menu Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : paginatedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {!item.isAvailable && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="destructive" className="text-sm">
                      Currently Unavailable
                    </Badge>
                  </div>
                )}
                {/* Category Tags */}
                <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                  {item.categories.slice(0, 2).map((cat) => (
                    <Badge key={cat} variant="secondary" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                  {item.categories.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.categories.length - 2}
                    </Badge>
                  )}
                </div>
                {/* Vegetarian Badge */}
                {item.isVegetarian && (
                  <Badge className="absolute top-2 right-2 bg-green-600">
                    🥬 Veg
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold line-clamp-1">
                    {item.name}
                  </CardTitle>
                  <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-2">
                {/* Quick Info */}
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    <span>{item.calories} cal</span>
                  </div>
                </div>

                {/* Ingredients Preview */}
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium text-foreground">Main: </span>
                  {item.ingredients.slice(0, 2).join(", ")}
                  {item.ingredients.length > 2 && "..."}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 pt-2">
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                    <IndianRupee className="h-5 w-5" />
                    {item.price}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => toggleCart(item.id)}
                >
                  <ShoppingCart
                    className={`h-4 w-4 ${
                      cartItems.includes(item.id) ? "fill-primary" : ""
                    }`}
                  />
                </Button>
                <Button className="rounded-full gap-1">
                  <Eye className="h-4 w-4" />
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-muted/30 rounded-lg p-8 max-w-md mx-auto">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(i + 1)}
                className="w-10"
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

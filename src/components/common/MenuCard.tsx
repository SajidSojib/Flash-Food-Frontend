
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Eye, ShoppingBag, Flame, Clock } from "lucide-react";
import { cartServices } from "@/services/cart.service";
import AddToCartButton from "./addToCartButton";

export interface MenuItem {
  id: string;
  providerId: string;
  name: string;
  price: number;
  ingredients: string[];
  description: string;
  images: string[];
  categories: { name: string }[];
  rating: number;
  totalOrdered: number;
  isAvailable: boolean;
}

interface Props {
  item: MenuItem;
}

export default async function MenuCard({ item }: Props) {
  const {data} = await cartServices.getMyCart();

  return (
    <Card className="group overflow-hidden pt-0 rounded-2xl border bg-card shadow-sm hover:shadow-primary hover:shadow-md transition-all duration-300 border-none">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.images?.[0] || "/placeholder.jpg"}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Categories */}
        <div className="absolute top-2 right-2 flex gap-1 flex-wrap">
          {item.categories.slice(0, 2).map((cat, index) => (
            <Badge key={index} variant="secondary">
              {cat.name}
            </Badge>
          ))}
          {item.categories.length > 2 && (
            <Badge variant="secondary">+{item.categories.length - 2}</Badge>
          )}
        </div>

        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-semibold">
            Not Available
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-4 space-y-3 pt-0 pb-2">
        {/* Title + Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold leading-tight line-clamp-1">
            {item.name}
          </h3>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {item.rating}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        <div className="flex gap-5 mt-4">
          {/* Orders */}
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <ShoppingBag className="w-4 h-4" />
            {item.totalOrdered} sold
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Flame className="w-4 h-4" />
            500 cal
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-4 h-4" />
            30 min
          </p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-1 text-2xl font-bold text-primary">
            <span className="text-lg sm:text-2xl font-bold text-primary">
              ৳ {item.price}
            </span>
          </div>
        </div>
        <AddToCartButton cartItems={data.cartItems} id={item.id}></AddToCartButton>
        <Button className="rounded-full sm:gap-1">
          <Eye />
          <span className="hidden sm:inline">Details</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

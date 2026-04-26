// app/menus/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { menuServices } from "@/services/menu.service";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  Phone,
  Globe,
  ShoppingCart,
  Bike,
  ChefHat,
  Truck,
  Users,
  Heart,
  Share2,
  CheckCircle,
  Clock,
  Store,
  Plus,
  Minus,
  Leaf,
  Flame,
  Award,
} from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/common/addToCartButton";

export const dynamicParams = false;

export async function generateStaticParams() {
  const { data } = await menuServices.getAllMenus(
    { limit: "10" },
    { revalidate: 20 },
  );

  return data.data.map((menu: any) => ({
    id: menu.id,
  }));
}

const MenuDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: menu } = await menuServices.getMenuById(id);

  if (!menu) {
    notFound();
  }

  // Calculate average rating
  const avgRating =
    menu.reviews?.length > 0
      ? menu.reviews.reduce(
          (acc: number, review: any) => acc + review.rating,
          0,
        ) / menu.reviews.length
      : menu.rating || 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-(--breakpoint-xl) mx-auto p-6 pt-20 sm:pt-24">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="relative h-100 md:h-125 rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src={menu.images?.[0]}
                alt={menu.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

              {menu.isAvailable ? (
                <Badge className="absolute top-4 left-4 gap-1  bg-green-500 hover:bg-green-600">
                  <CheckCircle className="h-3 w-3" />
                  Available Now
                </Badge>
              ) : (
                <Badge variant="destructive" className="absolute top-4 left-4">
                  Currently Unavailable
                </Badge>
              )}

              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-sm hover:bg-accent rounded-full h-10 w-10"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-sm hover:bg-accent rounded-full h-10 w-10"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Thumbnails */}
            {menu.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {menu.images.slice(1, 5).map((image: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative h-24 rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition ring-2 ring-transparent hover:ring-primary"
                  >
                    <Image src={image} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl text-primary font-bold mb-4">
                  About this dish
                </h2>
                <p className="text-muted-foreground mb-6">{menu.description}</p>

                <Separator className="my-6" />

                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  Ingredients
                </h3>

                <div className="flex flex-wrap gap-2">
                  {menu.ingredients?.map((i: string, idx: number) => (
                    <Badge key={idx} variant="secondary">
                      {i}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-xl flex text-muted-foreground flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-primary" />
                    ~650 Calories
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    20-25 min
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-primary" />
                    Fresh
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            {menu.reviews?.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-500 dark:text-yellow-200 fill-yellow-500" />
                      Customer Reviews
                    </h2>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {menu.reviews.length}{" "}
                      {menu.reviews.length === 1 ? "Review" : "Reviews"}
                    </Badge>
                  </div>

                  {/* Rating Summary */}
                  <div className="flex items-center gap-4 mb-6 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-xl">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-200">
                        {avgRating.toFixed(1)}
                      </div>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(avgRating)
                                ? "text-yellow-500 fill-yellow-500 dark:text-yellow-200 dark:fill-yellow-200"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs mt-1">Overall Rating</div>
                    </div>
                    <Separator orientation="vertical" className="h-12" />
                    <div>
                      <div className="text-2xl font-semibold">
                        {menu.totalOrdered}
                      </div>
                      <div className="text-xs">Total Orders</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {menu.reviews.map((review: any, idx: number) => (
                      <div key={idx} className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10 ring-2 ring-orange-200">
                            <AvatarImage src={review.user.image || undefined} />
                            <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                              {review.user.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                              <span className="font-semibold">
                                {review.user.name}
                              </span>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "text-yellow-500 fill-yellow-500 dark:text-yellow-200 dark:fill-yellow-200"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="">{review.comment}</p>
                          </div>
                        </div>
                        {idx < menu.reviews.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6 space-y-6 sticky top-24">
                <div className="mb-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <h1 className="text-2xl md:text-3xl font-bold">
                      {menu.name}
                    </h1>
                    <div className="text-3xl font-bold text-primary bg-clip-text">
                      ${menu.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {menu.categories?.map((category: string, idx: number) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-orange-100 text-orange-700 border-0"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>

                  {/* Rating & Orders Summary */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">
                        {avgRating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground">
                        ({menu.reviews?.length || 0} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ShoppingCart className="h-4 w-4 text-orange-500" />
                      <span className="font-semibold">{menu.totalOrdered}</span>
                      <span className="text-muted-foreground">orders</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-4 text-sm">
                  <span>⭐ {menu.rating}</span>
                  <span>{menu.totalOrdered} orders</span>
                </div>

                <AddToCartButton id={menu.id} />

                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-green-600 dark:text-green-200" />
                    <span className="text-sm">
                      Estimated Delivery
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-200">
                    20-30 min
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Provider */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-red-500">
                    {menu.provider?.logo ? (
                      <Image
                        src={menu.provider.logo}
                        alt={menu.provider.restaurantName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Store className="h-6 w-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {menu.provider?.restaurantName}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Award className="h-3 w-3" />
                      <span className="text-muted-foreground">
                        Premium Partner
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground  mb-4">
                  {menu.provider?.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 ">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="text-muted-foreground">
                      {menu.provider?.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <Phone className="h-4 w-4 text-orange-500" />
                    <span className="text-muted-foreground">
                      {menu.provider?.phone}
                    </span>
                  </div>
                  {menu.provider?.website && (
                    <div className="flex items-center gap-2 ">
                      <Globe className="h-4 w-4 text-orange-500" />
                      <Link
                        href={menu.provider.website}
                        className="text-primary hover:underline"
                      >
                        {menu.provider.website}
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Bike className="h-4 w-4 text-orange-500" />
                    <span>
                      Delivery Fee: ৳
                      {menu.provider?.deliveryFee?.toFixed(2) || "0"}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Minimum Order</span>
                  <span className="font-semibold text-muted-foreground">
                    $10
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailsPage;

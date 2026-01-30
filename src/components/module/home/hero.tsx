import { Search, MapPin, Star, Clock, ChefHat, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full max-w-7xl mx-auto p-6 pb-12 pt-28 sm:pt-45 bg-background">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Hero Left */}
        <div className="flex flex-col gap-3 sm:gap-8">
          <div className="space-y-2 sm:space-y-4">
            <Badge
              className="px-4 py-1.5 bg-primary/10 text-primary text-[8px] sm:text-xs font-bold uppercase tracking-widest rounded-full"
              variant="outline"
            >
              Premium Delivery Service
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight text-foreground">
              Gourmet experiences,{" "}
              <span className="gradient-text">delivered</span> to your door
            </h1>

            <p className="text-sm sm:text-lg text-muted-foreground max-w-[500px]">
              Curated meals from the cities finest chefs, delivered with
              clinical precision and artistic flair.
            </p>
          </div>

          {/* Glass Search Bar */}
          <Card className="glass dark:glass-dark p-2 rounded-2xl flex items-center gap-2 shadow-xl border">
            <CardContent className="p-0 w-full flex items-center gap-2">
              <div className="pl-4 flex items-center gap-2 text-muted-foreground flex-1">
                <MapPin className="h-5 w-5" />
                <Input
                  className="bg-transparent border-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm md:text-base w-full placeholder:text-muted-foreground"
                  placeholder="Enter your cravings"
                />
              </div>
              <Button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 whitespace-nowrap">
                <Search className="h-5 w-5" />
                Find Food
              </Button>
            </CardContent>
          </Card>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 sm:h-6 sm:w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary fill-primary" />
              </div>
              <span className="text-[10px] sm:text-sm font-medium text-foreground">
                5-star rated
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>
              <span className="text-[10px] sm:text-sm font-medium text-foreground">
                20min delivery
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <ChefHat className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>
              <span className="text-[10px] sm:text-sm font-medium text-foreground">
                500+ <span className="hidden sm:inline">Gourmet</span> partners
              </span>
            </div>
          </div>
        </div>

        {/* Hero Right: Interactive Carousel Mockup */}
        <div className="relative group">
          <div className="relative border-2 border-border w-full h-full overflow-y-hidden aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60"
              alt="High quality gourmet pasta dish close up"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Floating Notification Card */}
          <Card className="absolute -top-6 -right-6 glass dark:glass-dark p-4 rounded-2xl shadow-2xl flex items-center gap-4 border max-w-[280px]">
            <CardContent className="p-0 flex items-center gap-4">
              <div className="size-10 rounded-xl relative overflow-hidden border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&auto=format&fit=crop"
                  alt="Miniature image of sushi roll"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  Just Ordered
                </p>
                <p className="text-sm font-bold truncate text-foreground">
                  Premium Sushi Platter
                </p>
                <p className="text-[11px] text-muted-foreground">
                  2 mins ago in Chelsea
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Tracker Card */}
          <Card className="absolute -bottom-10 -left-6 glass dark:glass-dark p-6 rounded-2xl shadow-2xl border">
            <CardContent className="p-0">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full border-4 border-primary/20 p-1">
                  <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                    <Bike className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Rapid Tracker
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Courier is arriving in 4m
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

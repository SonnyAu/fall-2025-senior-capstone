"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Heart, TrendingUp, Star, MapPin, Clock, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function VotingView() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [voted, setVoted] = useState(false);

  const suggestions = [
    {
      name: "Florilège",
      type: "French-Japanese Fusion",
      price: "$$$",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      description: "Innovative French-Japanese cuisine in an intimate setting. Experience the perfect blend of French techniques and Japanese ingredients in a cozy, modern atmosphere.",
      aiMatch: 92,
      features: ["Outdoor Seating", "Craft Cocktails", "Tasting Menu"],
      distance: "2.3 km",
      reviews: 1247,
    },
    {
      name: "Tapas Molecular Bar",
      type: "Molecular Gastronomy",
      price: "$$$$",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
      description: "Avant-garde dining experience with only 8 seats. Watch the chef create culinary art right before your eyes in this exclusive, intimate setting.",
      aiMatch: 88,
      features: ["Chef's Counter", "Wine Pairing", "Reservation Only"],
      distance: "1.8 km",
      reviews: 892,
    },
  ];

  const handleVote = (liked: boolean) => {
    setVoted(true);
    setTimeout(() => {
      setVoted(false);
      if (currentIndex < suggestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        router.push("/dashboard");
      }
    }, 800);
  };

  const current = suggestions[currentIndex];

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-b from-background to-muted/20">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-10 animate-fade-in-up">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="-ml-4 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              ← Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="rounded-full bg-card/80 backdrop-blur-sm border-border text-foreground px-5 py-2 font-semibold shadow-sm"
            >
              <span className="text-primary">{currentIndex + 1}</span>
              <span className="mx-2 text-muted-foreground">/</span>
              <span>{suggestions.length}</span>
            </Badge>
          </div>
        </div>

        <Card className="overflow-hidden border border-border bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 animate-fade-in-up-delayed">
          {/* Image */}
          <div className="relative h-[500px] overflow-hidden group">
            <img
              src={current.image || "/placeholder.svg"}
              alt={current.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute top-6 right-6 flex flex-col gap-3">
              <Badge className="bg-gradient-to-r from-primary to-primary/90 backdrop-blur-md text-primary-foreground border-0 px-6 py-3 text-base font-bold rounded-full shadow-xl">
                <Sparkles className="w-5 h-5 mr-2" />
                {current.aiMatch}% AI Match
              </Badge>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-background/90 backdrop-blur-md text-foreground border-0 px-4 py-2 rounded-full shadow-lg">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  {current.distance}
                </Badge>
                <Badge className="bg-background/90 backdrop-blur-md text-foreground border-0 px-4 py-2 rounded-full shadow-lg">
                  <Users className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  {current.reviews} reviews
                </Badge>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3 text-foreground">
                  {current.name}
                </h2>
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-muted-foreground text-lg font-medium">
                    {current.type}
                  </p>
                  <span className="text-muted-foreground">•</span>
                  <p className="text-muted-foreground text-lg font-medium">
                    {current.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-br from-primary/10 to-primary/5 px-6 py-3 rounded-full border border-primary/20 shadow-sm">
                <Star className="w-5 h-5 fill-primary text-primary" />
                <span className="font-bold text-xl text-foreground">
                  {current.rating}
                </span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {current.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mb-10">
              {current.features.map((feature, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="px-5 py-2.5 rounded-full border-primary/30 bg-gradient-to-br from-primary/5 to-primary/0 text-foreground font-medium shadow-sm hover:border-primary/50 transition-all"
                >
                  {feature}
                </Badge>
              ))}
            </div>

            {/* Voting Buttons */}
            <div className="flex gap-4">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 py-8 text-lg rounded-2xl border-2 border-border hover:border-destructive/50 hover:bg-destructive/5 text-foreground hover:text-destructive transition-all bg-card/50 backdrop-blur-sm font-semibold hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => handleVote(false)}
                disabled={voted}
              >
                Pass
              </Button>
              <Button
                size="lg"
                className="flex-1 py-8 text-lg rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all font-semibold hover:scale-[1.02] active:scale-[0.98] group"
                onClick={() => handleVote(true)}
                disabled={voted}
              >
                <Heart className={`w-5 h-5 mr-2 ${voted ? "fill-primary-foreground" : ""} group-hover:scale-110 transition-transform`} />
                Vote Yes
              </Button>
            </div>

            {/* Group Votes */}
            <div className="mt-8 p-6 bg-gradient-to-br from-muted/80 to-muted/50 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Group votes so far:
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <Avatar className="border-2 border-background w-9 h-9 shadow-sm hover:scale-110 transition-transform">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-bold">
                        SK
                      </AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background w-9 h-9 shadow-sm hover:scale-110 transition-transform">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-bold">
                        MJ
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="font-bold text-foreground text-lg">
                    2/4 voted yes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-8 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-primary/30 rounded-2xl shadow-lg animate-fade-in-up-delayed">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Your votes help our AI understand your group's preferences better. Keep voting to get more personalized recommendations!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

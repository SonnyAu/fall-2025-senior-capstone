"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, ChevronRight, MapPin, Users, TrendingUp, Star, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export function GroupDashboardView() {
  const router = useRouter();

  const members = [
    {
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ME",
    },
    {
      name: "Sarah",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SK",
    },
    {
      name: "Mike",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MJ",
    },
    {
      name: "Emma",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-b from-background to-muted/20">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 animate-fade-in-up">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Tokyo Adventure Squad
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Badge className="bg-gradient-to-r from-primary/15 to-primary/5 text-primary border-primary/30 rounded-full px-5 py-2 text-sm font-semibold shadow-sm">
                🍽️ Restaurants
              </Badge>
              <Badge className="bg-gradient-to-r from-secondary/15 to-secondary/5 text-secondary border-secondary/30 rounded-full px-5 py-2 text-sm font-semibold shadow-sm">
                🇯🇵 Tokyo
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">
              Discover amazing restaurants together
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="rounded-full border-border hover:border-primary/50 bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-all"
            >
              New Theme
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-border hover:border-primary/50 bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-all"
            >
              <Users className="w-4 h-4 mr-2" />
              Invite More
            </Button>
          </div>
        </div>

        <Card className="p-8 mb-8 bg-card/80 backdrop-blur-sm border-border rounded-3xl shadow-lg hover:shadow-xl transition-all animate-fade-in-up-delayed">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {members.map((member, i) => (
                  <Avatar
                    key={i}
                    className="border-3 border-background w-14 h-14 shadow-md hover:scale-110 transition-transform cursor-pointer"
                  >
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold text-sm">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <div className="font-bold text-foreground text-xl flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {members.length} Members
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  All active now
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl font-bold text-foreground mb-1">24</div>
              <div className="text-sm text-muted-foreground font-medium">Places voted</div>
            </div>
          </div>
        </Card>

        <Card className="p-10 mb-10 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border-primary/30 rounded-3xl shadow-lg hover:shadow-xl transition-all animate-fade-in-up-delayed">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 shadow-md">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-bold text-foreground">
                  AI Learning Progress
                </h3>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                Based on your group's votes, we're learning you prefer modern
                fusion restaurants with outdoor seating and craft cocktails.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-background/40 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary via-primary/90 to-secondary rounded-full shadow-sm animate-progress" />
                </div>
                <span className="text-lg font-bold text-foreground min-w-[3rem]">
                  75%
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Button
          size="lg"
          className="w-full py-8 text-lg rounded-3xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all mb-12 group animate-fade-in-up-delayed"
          onClick={() => router.push("/vote")}
        >
          <span className="flex items-center justify-center gap-3">
            <Heart className="w-5 h-5" />
            Start Voting on New Places
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>

        <div className="space-y-6 animate-fade-in-up-delayed">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Recent Votes
            </h2>
            <Badge variant="outline" className="rounded-full px-4 py-1.5">
              <MapPin className="w-3 h-3 mr-1.5" />
              Tokyo
            </Badge>
          </div>

          {[
            {
              name: "Sushi Saito",
              votes: 4,
              total: 4,
              rating: 4.9,
              image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
              type: "Traditional Japanese",
              price: "$$$",
            },
            {
              name: "Narisawa",
              votes: 3,
              total: 4,
              rating: 4.8,
              image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
              type: "Modern French-Japanese",
              price: "$$$$",
            },
            {
              name: "Den",
              votes: 2,
              total: 4,
              rating: 4.7,
              image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
              type: "Innovative Japanese",
              price: "$$$",
            },
          ].map((place, i) => (
            <Card
              key={i}
              className="p-6 bg-card/80 backdrop-blur-sm border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 rounded-3xl group overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={place.image || "/placeholder.svg"}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                    <span className="text-xs font-semibold text-foreground">{place.rating}</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                          {place.name}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <span>{place.type}</span>
                          <span>•</span>
                          <span>{place.price}</span>
                        </p>
                      </div>
                      <Badge
                        variant={
                          place.votes === place.total ? "default" : "secondary"
                        }
                        className={`rounded-full px-5 py-2 font-semibold ${
                          place.votes === place.total
                            ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary border-primary/30 shadow-sm"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 mr-1.5 ${place.votes === place.total ? "fill-primary" : ""}`} />
                        {place.votes}/{place.total}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                    <div className="flex -space-x-2">
                      {members.slice(0, place.votes).map((member, j) => (
                        <Avatar
                          key={j}
                          className="border-2 border-background w-9 h-9 shadow-sm hover:scale-110 transition-transform"
                        >
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-bold">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      {place.votes === place.total ? "All voted yes!" : `${place.votes} voted yes`}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

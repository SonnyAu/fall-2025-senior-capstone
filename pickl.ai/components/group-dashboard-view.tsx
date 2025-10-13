"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, ChevronRight } from "lucide-react";
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
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                Tokyo Adventure Squad
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1.5">
                🍽️ Restaurants
              </Badge>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20 rounded-full px-4 py-1.5">
                🇯🇵 Tokyo
              </Badge>
            </div>
            <p className="text-muted-foreground">
              This session is focused on restaurants
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-full border-border hover:border-foreground/30 bg-card text-foreground"
            >
              New Theme Session
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-border hover:border-foreground/30 bg-card text-foreground"
            >
              Invite More
            </Button>
          </div>
        </div>

        <Card className="p-8 mb-8 bg-card border border-border rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {members.map((member, i) => (
                  <Avatar
                    key={i}
                    className="border-2 border-background w-12 h-12"
                  >
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/15 text-primary font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <div className="font-semibold text-foreground text-lg">
                  {members.length} Members
                </div>
                <div className="text-sm text-muted-foreground">
                  All active now
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground">24</div>
              <div className="text-sm text-muted-foreground">Places voted</div>
            </div>
          </div>
        </Card>

        <Card className="p-10 mb-10 bg-gradient-to-br from-primary/8 to-secondary/8 border-primary/20 rounded-3xl">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                AI Learning Progress
              </h3>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                Based on your group's votes, we're learning you prefer modern
                fusion restaurants with outdoor seating and craft cocktails.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 bg-background/60 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary rounded-full" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  75%
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Button
          size="lg"
          className="w-full py-8 text-lg rounded-3xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all mb-12"
          onClick={() => router.push("/vote")}
        >
          <span className="flex items-center gap-3">
            Start Voting on New Places
            <ChevronRight className="w-6 h-6" />
          </span>
        </Button>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-8 text-foreground">
            Recent Votes
          </h2>

          {[
            {
              name: "Sushi Saito",
              votes: 4,
              total: 4,
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              name: "Narisawa",
              votes: 3,
              total: 4,
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              name: "Den",
              votes: 2,
              total: 4,
              image: "/placeholder.svg?height=200&width=300",
            },
          ].map((place, i) => (
            <Card
              key={i}
              className="p-6 bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 rounded-3xl"
            >
              <div className="flex gap-6">
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
                  className="w-36 h-36 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1.5 text-foreground">
                        {place.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Traditional Japanese • $$$
                      </p>
                    </div>
                    <Badge
                      variant={
                        place.votes === place.total ? "default" : "secondary"
                      }
                      className={`rounded-full px-4 py-1.5 ${
                        place.votes === place.total
                          ? "bg-primary/15 text-primary border-primary/20"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {place.votes}/{place.total} votes
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-5">
                    <div className="flex -space-x-2">
                      {members.slice(0, place.votes).map((member, j) => (
                        <Avatar
                          key={j}
                          className="border-2 border-background w-8 h-8"
                        >
                          <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      voted yes
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

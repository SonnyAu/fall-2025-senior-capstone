"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight, Users, MapPin, Heart } from "lucide-react";
import Link from "next/link";

export function HomeView() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-primary/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-secondary/8 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              AI-Powered Group Travel
            </span>
          </div>

          {/* Hero Title */}
          <div className="space-y-6">
            <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-bold text-balance leading-[0.95] tracking-tight text-foreground">
              Discover
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Together
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed font-light">
              Create groups, vote on places, and let AI learn your collective
              taste for unforgettable experiences
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/create-group">
              <Button
                size="lg"
                className="text-base px-12 py-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Create a Group
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-12 py-8 rounded-full border-2 border-foreground/20 hover:border-foreground/40 bg-card/50 backdrop-blur-sm hover:bg-card text-foreground transition-all hover:scale-[1.02]"
            >
              Join Existing Group
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="pt-20 flex items-center justify-center gap-16 opacity-40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">
                  Active Groups
                </div>
              </div>
            </div>

            <div className="w-px h-12 bg-border" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </div>
            </div>

            <div className="w-px h-12 bg-border" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">1M+</div>
                <div className="text-sm text-muted-foreground">
                  Places Voted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
    </div>
  );
}

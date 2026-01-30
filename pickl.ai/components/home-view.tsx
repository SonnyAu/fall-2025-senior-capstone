"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight, Users, MapPin, Heart, Plane, Globe } from "lucide-react";
import Link from "next/link";

export function HomeView() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[140px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[100px]" />
      </div>

      {/* Travel-themed grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating travel icons */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <Plane className="absolute top-20 left-10 w-8 h-8 text-primary/20 rotate-12 animate-float" />
        <Globe className="absolute top-40 right-20 w-10 h-10 text-secondary/20 animate-float-delayed" />
        <MapPin className="absolute bottom-40 left-20 w-9 h-9 text-primary/15 animate-float" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 backdrop-blur-md shadow-sm animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">
              AI-Powered Group Travel Planning
            </span>
          </div>

          {/* Enhanced Hero Title */}
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-bold text-balance leading-[0.95] tracking-tight text-foreground">
              Discover
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent animate-gradient">
                Together
              </span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed font-light">
              Plan your perfect trip with friends. Vote on places, discover hidden gems, and let AI curate experiences tailored to your group's taste.
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-up-delayed">
            <Link href="/create-group">
              <Button
                size="lg"
                className="text-base px-12 py-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] group"
              >
                Start Planning
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-12 py-8 rounded-full border-2 border-foreground/20 hover:border-foreground/40 bg-card/80 backdrop-blur-sm hover:bg-card text-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Join a Group
            </Button>
          </div>

          {/* Enhanced Stats */}
          <div className="pt-24 flex flex-wrap items-center justify-center gap-12 md:gap-16 animate-fade-in-up-delayed">
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground font-medium">
                  Active Groups
                </div>
              </div>
            </div>

            <div className="w-px h-16 bg-border/50" />

            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/15 to-secondary/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <MapPin className="w-7 h-7 text-secondary" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground font-medium">Cities Worldwide</div>
              </div>
            </div>

            <div className="w-px h-16 bg-border/50" />

            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-foreground">1M+</div>
                <div className="text-sm text-muted-foreground font-medium">
                  Places Discovered
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
}

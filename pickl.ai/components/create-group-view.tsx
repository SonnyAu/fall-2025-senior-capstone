"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronRight, Plus, X, Search, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CreateGroupView() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [detectedLocation, setDetectedLocation] = useState<string>("tokyo");
  const [isChangingLocation, setIsChangingLocation] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");

  const topics = [
    { id: "restaurants", label: "Restaurants", icon: "🍽️", description: "Fine dining & local eats" },
    { id: "bars", label: "Bars & Clubs", icon: "🍸", description: "Nightlife & cocktails" },
    { id: "cafes", label: "Cafes", icon: "☕", description: "Coffee & brunch spots" },
    { id: "attractions", label: "Attractions", icon: "🎭", description: "Museums & landmarks" },
    { id: "shopping", label: "Shopping", icon: "🛍️", description: "Markets & boutiques" },
    { id: "nightlife", label: "Nightlife", icon: "🌙", description: "Bars, clubs & events" },
  ];

  const locations = [
    { id: "tokyo", label: "Tokyo", flag: "🇯🇵", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop" },
    { id: "london", label: "London", flag: "🇬🇧", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" },
    { id: "paris", label: "Paris", flag: "🇫🇷", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop" },
    { id: "nyc", label: "New York", flag: "🇺🇸", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop" },
    { id: "barcelona", label: "Barcelona", flag: "🇪🇸", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop" },
    { id: "dubai", label: "Dubai", flag: "🇦🇪", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop" },
  ];

  const getLocationDetails = (id: string) =>
    locations.find((loc) => loc.id === id);
  const currentLocation = getLocationDetails(detectedLocation);

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-b from-background to-muted/20">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-16 animate-fade-in-up">
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 -ml-4 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            >
              ← Back
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground text-balance">
                Create Your Group
              </h1>
            </div>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Plan your perfect adventure. Set up your travel group and start discovering amazing places together.
          </p>
        </div>

        <div className="space-y-12 animate-fade-in-up-delayed">
          {/* Group Name */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-sm">
            <div className="space-y-4">
              <label className="text-base font-semibold text-foreground flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Group Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g., Tokyo Adventure Squad"
                className="w-full px-6 py-4 bg-background border border-border rounded-2xl text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
              />
              <p className="text-sm text-muted-foreground">
                Give your group a memorable name that reflects your adventure
              </p>
            </div>
          </Card>

          {/* Your Location */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-sm">
            <div className="space-y-4">
              <label className="text-base font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Your Location
              </label>

              {!isChangingLocation ? (
                <Card className="p-6 bg-gradient-to-br from-primary/8 via-primary/5 to-secondary/5 border-primary/20 rounded-2xl hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center shadow-sm">
                        <MapPin className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-4xl">
                            {currentLocation?.flag}
                          </span>
                          <span className="text-2xl font-bold text-foreground">
                            {currentLocation?.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          Detected from your device
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsChangingLocation(true)}
                      className="rounded-full border-border hover:border-primary/50 bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-all"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Change
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {locations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => {
                          setDetectedLocation(location.id);
                          setIsChangingLocation(false);
                        }}
                        className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                          detectedLocation === location.id
                            ? "border-primary bg-primary/10 shadow-lg scale-105"
                            : "border-border bg-card hover:border-primary/40 hover:shadow-md hover:scale-[1.02]"
                        }`}
                      >
                        <div className="aspect-[4/3] relative">
                          <img
                            src={location.image}
                            alt={location.label}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="text-3xl mb-1">{location.flag}</div>
                            <div className="font-semibold text-foreground text-lg">
                              {location.label}
                            </div>
                          </div>
                          {detectedLocation === location.id && (
                            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsChangingLocation(false)}
                    className="w-full text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Choose Your Theme */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="text-base font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Choose Your Theme
                </label>
                <p className="text-sm text-muted-foreground">
                  Select what you want to explore. One theme per session - create new groups for different themes.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                      selectedTopic === topic.id
                        ? "border-primary bg-gradient-to-br from-primary/15 to-primary/5 shadow-lg scale-105"
                        : "border-border bg-card hover:border-primary/40 hover:shadow-md"
                    }`}
                  >
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                      {topic.icon}
                    </div>
                    <div className="font-semibold text-foreground text-lg mb-1">
                      {topic.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {topic.description}
                    </div>
                    {selectedTopic === topic.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Invite Members */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-sm">
            <div className="space-y-4">
              <label className="text-base font-semibold text-foreground flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" />
                Invite Members
              </label>
              <p className="text-sm text-muted-foreground">
                Add friends to your group so they can vote on places too
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="friend@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && emailInput) {
                      setInvitedEmails([...invitedEmails, emailInput]);
                      setEmailInput("");
                    }
                  }}
                  className="flex-1 px-6 py-4 bg-background border border-border rounded-2xl text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
                />
                <Button
                  size="lg"
                  variant="outline"
                  className="px-6 rounded-2xl border-border hover:border-primary/50 bg-card/80 backdrop-blur-sm text-foreground hover:bg-card transition-all"
                  onClick={() => {
                    if (emailInput && !invitedEmails.includes(emailInput)) {
                      setInvitedEmails([...invitedEmails, emailInput]);
                      setEmailInput("");
                    }
                  }}
                  disabled={!emailInput || invitedEmails.includes(emailInput)}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              {invitedEmails.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 p-4 bg-muted/50 rounded-2xl border border-border">
                  {invitedEmails.map((email, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="px-4 py-2.5 text-sm rounded-full bg-background border-border text-foreground flex items-center gap-2 shadow-sm"
                    >
                      {email}
                      <button
                        onClick={() =>
                          setInvitedEmails(
                            invitedEmails.filter((_, idx) => idx !== i)
                          )
                        }
                        className="hover:text-destructive transition-colors ml-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Create Button */}
          <Button
            size="lg"
            className="w-full py-8 text-lg rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            onClick={() => router.push("/dashboard")}
            disabled={!selectedTopic || !groupName.trim()}
          >
            <span className="flex items-center justify-center gap-2">
              Create Group & Start Exploring
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

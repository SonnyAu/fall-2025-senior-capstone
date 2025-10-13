"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronRight, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CreateGroupView() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [detectedLocation, setDetectedLocation] = useState<string>("tokyo");
  const [isChangingLocation, setIsChangingLocation] = useState(false);
  const [invitedEmails, setInvitedEmails] = useState<string[]>([
    "sarah@email.com",
    "mike@email.com",
  ]);
  const [emailInput, setEmailInput] = useState("");

  const topics = [
    { id: "restaurants", label: "Restaurants", icon: "🍽️" },
    { id: "bars", label: "Bars & Clubs", icon: "🍸" },
    { id: "cafes", label: "Cafes", icon: "☕" },
    { id: "attractions", label: "Attractions", icon: "🎭" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "nightlife", label: "Nightlife", icon: "🌙" },
  ];

  const locations = [
    { id: "tokyo", label: "Tokyo", flag: "🇯🇵" },
    { id: "london", label: "London", flag: "🇬🇧" },
    { id: "paris", label: "Paris", flag: "🇫🇷" },
    { id: "nyc", label: "New York", flag: "🇺🇸" },
    { id: "barcelona", label: "Barcelona", flag: "🇪🇸" },
    { id: "dubai", label: "Dubai", flag: "🇦🇪" },
  ];

  const getLocationDetails = (id: string) =>
    locations.find((loc) => loc.id === id);
  const currentLocation = getLocationDetails(detectedLocation);

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 -ml-4 text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              ← Back
            </Button>
          </Link>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-foreground text-balance">
            Create Your Group
          </h1>
          <p className="text-lg text-muted-foreground">
            Set up your travel group in a few simple steps
          </p>
        </div>

        <div className="space-y-12">
          {/* Group Name */}
          <div className="space-y-4">
            <label className="text-base font-semibold text-foreground">
              Group Name
            </label>
            <input
              type="text"
              placeholder="e.g., Tokyo Adventure Squad"
              className="w-full px-6 py-4 bg-card border border-border rounded-2xl text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
            />
          </div>

          {/* Your Location */}
          <div className="space-y-4">
            <label className="text-base font-semibold text-foreground">
              Your Location
            </label>

            {!isChangingLocation ? (
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-3xl">
                          {currentLocation?.flag}
                        </span>
                        <span className="text-xl font-semibold text-foreground">
                          {currentLocation?.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Detected from your device
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsChangingLocation(true)}
                    className="rounded-full border-border hover:border-foreground/30 bg-card text-foreground"
                  >
                    Change
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => {
                        setDetectedLocation(location.id);
                        setIsChangingLocation(false);
                      }}
                      className={`p-5 rounded-2xl border-2 transition-all duration-200 ${
                        detectedLocation === location.id
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                      }`}
                    >
                      <div className="text-3xl mb-2">{location.flag}</div>
                      <div className="font-medium text-foreground">
                        {location.label}
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

          {/* Choose Your Theme */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <label className="text-base font-semibold text-foreground">
                  Choose Your Theme
                </label>
                <p className="text-sm text-muted-foreground mt-1.5">
                  One theme per session - create new groups for different themes
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`p-5 rounded-2xl border-2 transition-all duration-200 ${
                    selectedTopic === topic.id
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                  }`}
                >
                  <div className="text-3xl mb-2">{topic.icon}</div>
                  <div className="font-medium text-foreground">
                    {topic.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Invite Members */}
          <div className="space-y-4">
            <label className="text-base font-semibold text-foreground">
              Invite Members
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-6 py-4 bg-card border border-border rounded-2xl text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
              />
              <Button
                size="lg"
                variant="outline"
                className="px-6 rounded-2xl border-border hover:border-foreground/30 bg-card text-foreground"
                onClick={() => {
                  if (emailInput) {
                    setInvitedEmails([...invitedEmails, emailInput]);
                    setEmailInput("");
                  }
                }}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            {invitedEmails.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {invitedEmails.map((email, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="px-4 py-2 text-sm rounded-full bg-muted border-border text-foreground flex items-center gap-2"
                  >
                    {email}
                    <button
                      onClick={() =>
                        setInvitedEmails(
                          invitedEmails.filter((_, idx) => idx !== i)
                        )
                      }
                      className="hover:text-foreground/70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Create Button */}
          <Button
            size="lg"
            className="w-full py-7 text-base rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => router.push("/dashboard")}
            disabled={!selectedTopic}
          >
            Create Group & Start Exploring
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

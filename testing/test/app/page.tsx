"use client"

import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./styles.module.css"
import puter from "@heyputer/puter.js";

// ─── Constants ────────────────────────────────────────────────────────────────
const EMOJI_MAP = {
  Italian: "🍝", Pizza: "🍕", Mexican: "🌮", Sushi: "🍣", Japanese: "🍱",
  Thai: "🍜", Indian: "🍛", Chinese: "🥢", American: "🍔", BBQ: "🥩",
  Seafood: "🦞", Mediterranean: "🥙", French: "🥐", Korean: "🥘",
  Vietnamese: "🍲", Greek: "🫒", Burgers: "🍔", default: "🍽️"
};

function getEmoji(cuisine) {
  for (const [k, v] of Object.entries(EMOJI_MAP)) {
    if (cuisine?.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return EMOJI_MAP.default;
}

function genCode() {
  return Math.random().toString(36).slice(2, 7).toUpperCase();
}

function parseRestaurants(text) {
  return text.split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .map((line, i) => {
      // Format: "Name - Cuisine - Description" or "Name, Cuisine" or just "Name"
      const parts = line.split(/[-,]/).map(p => p.trim());
      return {
        id: `r${i}`,
        name: parts[0] || line,
        cuisine: parts[1] || "Restaurant",
        description: parts[2] || `A great ${parts[1] || "dining"} experience.`,
        tags: parts.slice(3).filter(Boolean),
      };
    });
}

// ─── Persistent storage helpers ───────────────────────────────────────────────
async function saveRoom(code, data) {
  try { await window.storage.set(`room:${code}`, JSON.stringify(data), true); } catch {}
}

async function loadRoom(code) {
  try {
    const r = await window.storage.get(`room:${code}`, true);
    return r ? JSON.parse(r.value) : null;
  } catch { return null; }
}

// ─── LLM: pick next restaurant ────────────────────────────────────────────────
async function pickNextRestaurant(rejected, voteHistory, remaining) {
  if (remaining.length === 0) return null;
  if (remaining.length === 1) return remaining[0];
  console.log(remaining.map((r, i) => `${i + 1}. ${r}`).join("\n"))
  const prompt = `You are helping a group decide where to eat.

Restaurants already voted for: ${
  voteHistory.join("\n")
}

Restaurants already rejected: ${
  rejected.join("\n")
}

Remaining restaurants not yet voted on:
${remaining.map((r, i) => `${i + 1}. ${r}`).join("\n")}

Based on the voting patterns so far, which restaurant from the remaining list should be presented next to maximize the chance of reaching consensus quickly? Consider: show restaurants similar to ones getting high approval, and avoid showing ones similar to those getting rejected.

Reply with ONLY the restaurant name, exactly as written above. Nothing else. DO NOT ADD INDEXES`;

console.log(prompt);

  try {
    // const resp = await fetch("https://api.anthropic.com/v1/messages", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     model: "claude-sonnet-4-20250514",
    //     max_tokens: 50,
    //     messages: [{ role: "user", content: prompt }]
    //   })
    // });
    // const data = await resp.json();
    const res = await puter.ai.chat(prompt, {model: 'claude-sonnet-4-6'})
    // console.log(res);
    // console.log(res.message?.content[0].text);
    const data = res.message?.content.toString();
    // const name = data.content?.map(b => b.text || "").join("").trim();
    const name = res.message?.content[0].text;
    console.log(name);
    const match = remaining.find(r => r.split(" - ")[0] === name);
    return match || remaining[0];
  } catch {
    return remaining[0];
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | create | join | host | vote | waiting | winner
  const [roomCode, setRoomCode] = useState("");
  const [userName, setUserName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [restaurantText, setRestaurantText] = useState(
    `La Victoria Taqueria - Popular late-night Mexican spot famous for orange sauce.\nIguanas Burritozilla - Massive burritos and student-friendly combo deals.\nAngelou’s Mexican Grill - Casual Mexican plates and tacos at good prices.\nTaqueria Tlaquepaque - Authentic Mexican dishes with generous portions.\nTacos El Compa - Street-style tacos and quick bites.\nSpartan Taco Truck - Affordable taco truck near campus.\nCampus Burgers - Budget burger joint known for low prices.\nThe Halal Guys - Fast casual platters and gyros.\nFalafel Drive-In - Legendary falafel and banana shakes.\nNick the Greek - Gyros, bowls, and Greek street food.\nIke’s Love & Sandwiches - Large sandwich menu with vegetarian options.\nSubway - Build-your-own sandwiches and value meals.\nTOGO’S - West Coast sandwich chain with hearty subs.\nLee’s Sandwiches - Vietnamese banh mi and coffee drinks.\nBanh Mi Oven - Fresh Vietnamese sandwiches and rice plates.\nPho Passion - Casual pho and noodle soups.\nPho 24 - Affordable Vietnamese noodle shop.\nKing Eggroll - Chinese takeout and combo plates.\nPanda Express - Fast Chinese-American classics.\nJade China - Budget-friendly Chinese dishes.\nHome Eat - Authentic regional Chinese cuisine.\nLittle Chef - Casual Chinese comfort food.\nRamen Hajime - Rich broth ramen and rice bowls.\nOrenchi Ramen - Popular ramen shop with bold flavors.\nSumi Sushi - Affordable sushi rolls and lunch specials.\nCha Cha Sushi - Creative sushi at reasonable prices.\nPoki Bowl - Customizable poke bowls.\nSpoonfish Poke - Fresh Hawaiian-style poke.\nChipotle - Burritos and bowls with fast service.\nQDOBA - Mexican grill with free queso options.\nTaco Bell - Budget tacos and value menu items.\nMcDonald’s - Classic fast food burgers and fries.\nBurger King - Flame-grilled burgers and combo meals.\nJack in the Box - Late-night fast food variety.\nCarl’s Jr. - Charbroiled burgers and chicken sandwiches.\nFive Guys - Customizable burgers and fresh fries.\nIn-N-Out Burger - California favorite burgers and shakes.\nThe Habit Burger Grill - Chargrilled burgers and salads.\nSmashburger - Smashed-style burgers and fries.\nChick-fil-A - Chicken sandwiches and waffle fries.\nRaising Cane’s - Chicken tenders and signature sauce.\nWingstop - Affordable wings with multiple flavors.\nBuffalo Wild Wings - Casual wings and sports bar vibe.\nBlaze Pizza - Fast-fired customizable pizzas.\nMOD Pizza - Build-your-own personal pizzas.\nPizza My Heart - California-style pizza slices.\nDomino’s - Budget pizza delivery and carryout.\nLittle Caesars - Hot-and-ready value pizzas.\nRound Table Pizza - Classic chain pizza and combos.\nSlice of Homage - Creative regional-style pizzas.\nPasta Market - Casual Italian pasta dishes.\nOlive Garden - Italian chain with unlimited breadsticks.\nIl Fornaio - Italian meals and lunch specials.\nOriginal Joe’s - Classic Italian-American comfort food.\nThe Old Spaghetti Factory - Affordable pasta and family meals.\nPanera Bread - Soups, salads, and sandwiches.\nCorner Bakery Café - Breakfast and lunch café options.\nStarbucks - Coffee, breakfast sandwiches, pastries.\nPeet’s Coffee - Strong coffee and light bites.\nNirvana Soul - Local coffee shop with waffles.\nPhilz Coffee - Custom-blended coffee drinks.\nVoyager Craft Coffee - Specialty coffee and breakfast items.\nDunkin’ - Coffee and donuts value combos.\nKrispy Kreme - Donuts and coffee deals.\nParis Baguette - Bakery café with pastries and sandwiches.\n85°C Bakery Cafe - Affordable Asian bakery items.\nMeet Fresh - Taiwanese desserts and shaved ice.\nGong Cha - Bubble tea and milk tea drinks.\nSharetea - Boba tea and fruit teas.\nQuickly - Budget boba and snacks.\nJamba - Smoothies and bowls.\nVitality Bowls - Acai bowls and smoothies.\nPoke House - Fresh poke bowls and salads.\nMendocino Farms - Gourmet sandwiches and salads.\nSweetgreen - Build-your-own salads and bowls.\nCurry Up Now - Indian street food burritos and plates.\nBombay Sandwich Co. - Indian fusion sandwiches and snacks.\nHouse of Bagels - Fresh bagels and breakfast sandwiches.\nCity Bagel - Casual bagel shop and café.\nPaper Moon Coffee - Breakfast and lunch café.\nPoor House Bistro - Cajun comfort food and po’boys.\nThe Farmers Union - American comfort dishes and burgers.\nFirehouse No.1 - Historic gastropub with hearty plates.\nThe Pressroom - Casual California-style meals.\nJackie's Place - Southern BBQ and comfort plates.\nSmoking Pig BBQ - Casual BBQ meats and sides.\nBack A Yard Caribbean - Caribbean jerk plates and sides.\nDia de Pesca - Mexican seafood dishes.\nAqui Cal-Mex - Casual Mexican bowls and margaritas.\nSuper Taqueria - Budget burritos and tacos.\nTogo’s Japantown - Sandwiches and combo meals.\nMinato Japanese Restaurant - Sushi and Japanese comfort dishes.\nMarugame Udon - Budget udon bowls\nPopeye’s Louisiana Kitchen - Fried Chicken Fast Food Chain\nTea Era - Milk Tea and Taiwanese Bento shop\nO2 Valley - Taiwanese Bento shop`
  );
  const [room, setRoom] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [error, setError] = useState("");
  const pollRef = useRef(null);

  // ── Poll room state every 2s when hosting/voting ──
  useEffect(() => {
    if (!roomCode || !["host", "vote", "waiting", "winner"].includes(screen)) return;

    const poll = async () => {
      const fresh = await loadRoom(roomCode);
      if (!fresh) return;
      setRoom(fresh);

      // Check for winner
      if (fresh.winner) {
        setScreen("winner");
        return;
      }

      // If voting: check if there's a new current card for this user
      if (screen === "vote" || screen === "waiting") {
        const myVotes = fresh.votes?.[userName] || {};
        const currentRestaurantId = fresh.currentRestaurantId;
        if (currentRestaurantId && !myVotes[currentRestaurantId]) {
          const card = fresh.restaurants?.find(r => r.id === currentRestaurantId);
          if (card) {
            setCurrentCard(card);
            setScreen("vote");
          }
        } else if (screen === "vote" && currentRestaurantId && myVotes[currentRestaurantId]) {
          setScreen("waiting");
        }
      }
    };

    poll();
    pollRef.current = setInterval(poll, 2000);
    return () => clearInterval(pollRef.current);
  }, [screen, roomCode, userName]);

  // ── Create Room ──
  const handleCreate = async () => {
    if (!userName.trim()) { setError("Enter your name"); return; }
    if (!restaurantText.trim()) { setError("Add some restaurants"); return; }
    setError("");

    const code = genCode();
    const restaurants = parseRestaurants(restaurantText);
    const firstRestaurant = restaurants[0];

    const newRoom = {
      code,
      host: userName.trim(),
      restaurants,
      members: { [userName.trim()]: { joinedAt: Date.now(), votedCount: 0 } },
      votes: {},
      voteHistory: [],
      currentRestaurantId: firstRestaurant.id,
      started: false,
      winner: null,
      createdAt: Date.now(),
    };

    await saveRoom(code, newRoom);
    setRoomCode(code);
    setRoom(newRoom);
    setScreen("host");
  };

  // ── Join Room ──
  const handleJoin = async () => {
    if (!userName.trim()) { setError("Enter your name"); return; }
    if (joinCode.trim().length < 4) { setError("Enter a valid room code"); return; }
    setError("");

    const code = joinCode.trim().toUpperCase();
    const existing = await loadRoom(code);
    if (!existing) { setError("Room not found. Check the code."); return; }

    existing.members[userName.trim()] = { joinedAt: Date.now(), votedCount: 0 };
    await saveRoom(code, existing);

    setRoomCode(code);
    setRoom(existing);

    if (existing.started) {
      const myVotes = existing.votes?.[userName.trim()] || {};
      if (!myVotes[existing.currentRestaurantId]) {
        const card = existing.restaurants?.find(r => r.id === existing.currentRestaurantId);
        setCurrentCard(card);
        setScreen("vote");
      } else {
        setScreen("waiting");
      }
    } else {
      setScreen("waiting");
    }
  };

  // ── Host: Start voting ──
  const handleStart = async () => {
    if (!room) return;
    const updated = { ...room, started: true };
    await saveRoom(roomCode, updated);
    setRoom(updated);
    // Host also votes
    const firstCard = updated.restaurants[0];
    setCurrentCard(firstCard);
    setScreen("vote");
  };

  // ── Vote ──
  const handleVote = async (vote) => {
    const fresh = await loadRoom(roomCode);
    if (!fresh) return;

    const restaurantId = currentCard.id;

    // Record vote
    if (!fresh.votes[userName]) fresh.votes[userName] = {};
    fresh.votes[userName][restaurantId] = vote; // "yes" | "no"

    // Update member progress
    if (fresh.members[userName]) {
      fresh.members[userName].votedCount = Object.keys(fresh.votes[userName]).length;
    }

    // Tally votes for this restaurant
    const memberNames = Object.keys(fresh.members);
    const memberCount = memberNames.length;
    let yesCount = 0, noCount = 0;

    for (const m of memberNames) {
      const v = fresh.votes[m]?.[restaurantId];
      if (v === "yes") yesCount++;
      else if (v === "no") noCount++;
    }

    const allVoted = yesCount + noCount >= memberCount;

    if (allVoted) {
      fresh.voteHistory = [...(fresh.voteHistory || []), {
        id: restaurantId,
        name: currentCard.name,
        yes: yesCount,
        no: noCount,
      }];

      // Check consensus (majority yes)
      if (yesCount > memberCount / 2) {
        fresh.winner = currentCard;
        await saveRoom(roomCode, fresh);
        setRoom(fresh);
        setScreen("winner");
        return;
      }

      // Move to next: AI picks
      const votedIds = new Set(fresh.voteHistory.map(v => v.id));
      const remaining = fresh.restaurants.filter(r => !votedIds.has(r.id));

      if (remaining.length === 0) {
        // No winner found — pick highest approval
        const best = fresh.voteHistory.sort((a, b) => b.yes - a.yes)[0];
        fresh.winner = fresh.restaurants.find(r => r.id === best.id) || fresh.restaurants[0];
        await saveRoom(roomCode, fresh);
        setRoom(fresh);
        setScreen("winner");
        return;
      }

      // Save current state and let AI pick next (host handles this async)
      await saveRoom(roomCode, fresh);
      setRoom(fresh);
      setScreen("waiting");

      // AI picks next (any client who just voted triggers this, but we dedupe via storage)
      setAiThinking(true);
      const next = await pickNextRestaurant(fresh.restaurants, fresh.voteHistory, remaining);
      setAiThinking(false);

      const freshAgain = await loadRoom(roomCode);
      // Only update if still on same round
      if (freshAgain && !freshAgain.winner) {
        freshAgain.currentRestaurantId = next.id;
        await saveRoom(roomCode, freshAgain);
      }
    } else {
      await saveRoom(roomCode, fresh);
      setRoom(fresh);
      setScreen("waiting");
    }
  };

  // ── Helpers for host view ──
  const getRestaurantTally = (restaurantId) => {
    if (!room) return { yes: 0, no: 0, total: 0 };
    const memberNames = Object.keys(room.members || {});
    let yes = 0, no = 0;
    for (const m of memberNames) {
      const v = room.votes?.[m]?.[restaurantId];
      if (v === "yes") yes++;
      else if (v === "no") no++;
    }
    return { yes, no, total: memberNames.length };
  };

  const [vHistory, setVHistory] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  // const [currentVote, setCurrentVote] = useState<string|null>(null);
  const [currentVote, setCurrentVote] = useState<string|null>(null);
  const [remaining, setRemaining] = useState<string[]>(restaurantText.split("\n"))
  // ── Render ──
  return (
    <>
      <div className={styles["app"]}>
        <main>
          <h2>Hi</h2>
          <button className={styles["btn"] + " " + styles["btn-primary"]}
            onClick={async () => {
              const a = await pickNextRestaurant(rejected, vHistory, remaining);
              console.log(restaurantText.split("\n"))
              setCurrentVote(a);
            }}
          >hihi</button>

          { currentVote ? 
            <div>
              {currentVote}
              
              <button className={styles["btn"] + " " + styles["btn-primary"]}
                onClick={async () => {
                  const n = vHistory.concat([currentVote]);
                  const m = remaining.filter((a) => a !== currentVote);
                  const a = await pickNextRestaurant(rejected, n, m);
                  setVHistory(n);
                  setRemaining(m);
                  console.log(m)
                  setCurrentVote(a);
                }}
              >yes</button>

              <button className={styles["btn"] + " " + styles["btn-primary"]}
                onClick={async () => {
                  const b = rejected.concat([currentVote]);
                  const m = remaining.filter((a) => a !== currentVote);
                const a = await pickNextRestaurant(b, vHistory, m);
                console.log(m)
                  setRejected(b);
                  setRemaining(m);
                setCurrentVote(a);

                  // const a = pickNextRestaurant(null, [], restaurantText.split("\n"));
                  // console.log(restaurantText.split("\n"))
                  // setCurrentVote(a);
                }}
              >no</button>
            </div>
            : <></>
          }
        </main>
      </div>
    </>
  );
}

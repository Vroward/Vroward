import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const games = [
    { name: "Apex Legends", slug: "apex-legends", icon: "🎮", uptime: "99.9%" },
    { name: "Arc Raiders", slug: "arc-raiders", icon: "🎮", uptime: "99.8%" },
    { name: "Battlefield 6", slug: "battlefield-6", icon: "🎮", uptime: "99.9%" },
    { name: "Black Ops 7", slug: "black-ops-7", icon: "🎮", uptime: "99.7%" },
    { name: "Counter Strike 2", slug: "counter-strike-2", icon: "🎮", uptime: "99.9%" },
    { name: "DayZ", slug: "dayz", icon: "🎮", uptime: "99.6%" },
    { name: "DMA Firmware", slug: "dma", icon: "🔧", uptime: "99.5%", status: "MAINTENANCE" },
    { name: "Escape from Tarkov", slug: "escape-from-tarkov", icon: "🎮", uptime: "99.8%" },
    { name: "Fortnite", slug: "fortnite", icon: "🎮", uptime: "99.9%" },
    { name: "HWID Spoofer", slug: "hwid-spoofer", icon: "🔧", uptime: "99.9%" },
    { name: "Marvel Rivals", slug: "marvel-rivals", icon: "🎮", uptime: "99.5%" },
    { name: "PUBG", slug: "pubg", icon: "🎮", uptime: "99.8%" },
    { name: "Rainbow Six Siege", slug: "rainbow-six-siege", icon: "🎮", uptime: "99.9%" },
    { name: "Rocket League", slug: "rocket-league", icon: "🎮", uptime: "99.7%" },
    { name: "Rust", slug: "rust", icon: "🎮", uptime: "99.9%" },
    { name: "Valorant", slug: "valorant", icon: "🎮", uptime: "99.9%" },
  ];

  for (const game of games) {
    await prisma.gameStatus.upsert({
      where: { slug: game.slug },
      update: {},
      create: game,
    });
  }

  const incidents = [
    {
      title: "Valorant - Vanguard Update Compatibility",
      description: "Vanguard anti-cheat received a minor update that caused compatibility issues. Hotfix pushed within 2 hours.",
      game: "Valorant",
      status: "RESOLVED",
      severity: "MEDIUM",
    },
    {
      title: "DMA Firmware - Server Maintenance",
      description: "Scheduled server maintenance for DMA firmware distribution servers. Downtime lasted 45 minutes.",
      game: "DMA Firmware",
      status: "RESOLVED",
      severity: "LOW",
    },
    {
      title: "Rust - Game Update 1.25 Patch",
      description: "Major update required significant rework of ESP and aimbot modules. Downtime lasted 6 hours. All subscriptions compensated.",
      game: "Rust",
      status: "RESOLVED",
      severity: "HIGH",
    },
  ];

  for (const incident of incidents) {
    await prisma.incident.create({ data: incident });
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
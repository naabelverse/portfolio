/**
 * ForgeRoom case study.
 *
 * Every claim here is traceable to the repository at
 * https://github.com/naabelverse/ForgeRoom — the module list comes from the
 * README, the model IDs and the config resolution order from
 * lib/utils/constants.dart, and the report schema from
 * lib/models/design_report.dart. Nothing is estimated. Where a fact could not
 * be read out of the code, it is marked TODO(nabil).
 */

import type { StackGroup } from "@/components/ui/primitives";

export const forgeroom = {
  name: "ForgeRoom",
  tagline:
    "Turning a room photo, a description, and three measurements into a design plan someone can actually act on.",

  /** The full stack. The home chapter keeps its own shorter list in site.ts. */
  stack: [
    ["Mobile", ["Flutter", "Dart", "Provider"]],
    ["Backend", ["Node.js", "Express", "MongoDB Atlas", "JWT"]],
    ["AI", ["GPT-4o vision", "Claude"]],
  ] satisfies readonly StackGroup[],

  meta: [
    {
      label: "Role",
      value: "Sole developer across product, mobile, backend and the AI pipeline",
    },
    { label: "Type", value: "Projek Sarjana Muda (PSM), UTHM" },
    // Empty until confirmed; empty values render as nothing.
    { label: "Timeline", value: "" },
    { label: "Status", value: "Alpha testing" },
  ],

  stats: [
    { label: "Dart files", value: "57" },
    { label: "Lines of Dart", value: "~17,900" },
    { label: "API route groups", value: "4" },
    { label: "Commits", value: "50" },
  ],

  problem: {
    title: "The problem",
    paragraphs: [
      "Interior design tools are built for people who already have the vocabulary. They ask for a floor plan, a budget, and a style you can name. First-time homeowners and students renting a room in Malaysia have none of those. They have a phone, a room they're not happy with, and no idea what to search for.",
      "The gap isn't inspiration; Pinterest solves that. The gap is the step after inspiration: what actually goes in this room, at these dimensions, in this style, that I can buy here.",
    ],
  },

  goal: "Take the inputs a person genuinely has: a photo, a sentence, three measurements, and a style they can point at. Then return a specific, buyable plan.",

  modules: [
    {
      index: "01",
      name: "User authentication",
      summary: "Register, log in, stay logged in, recover a lost password.",
      detail:
        "Email and password registration against the Express API, with JWTs issued on login and sent as bearer tokens on every subsequent request. A one-time-code flow over email handles password resets, so a forgotten password doesn't mean a lost design history.",
    },
    {
      index: "02",
      name: "Multi-modal input",
      summary: "A photo, a description, dimensions, and a style, all in one pass.",
      detail:
        "Four input types in a single flow: an image from the camera or gallery, free text, three numeric dimensions, and a categorical style choice from six presets: Minimalist, Scandinavian, Industrial, Tropical, Modern, and Japandi. Dimensions are normalised to metres on the way in, so the rest of the system only ever deals with one unit.",
    },
    {
      index: "03",
      name: "AI design engine",
      summary: "Vision model reads the room; language model writes the plan.",
      detail:
        "GPT-4o analyses the photo and describes what is actually in the room, including the lighting, existing furniture and constraints. That analysis, plus the user's text, dimensions, and style, is composed into a single prompt for Claude, which returns the plan as structured data rather than prose: layout recommendations, a named colour palette with hex values, and decoration ideas.",
    },
    {
      index: "04",
      name: "Furniture recommendation",
      summary: "Real products, not generic advice.",
      detail:
        "The plan is matched against live IKEA product data through the Zyla API Hub, so a recommendation comes with a product, a price, and a link, which is the difference between 'add warm lighting' and something you can put in a basket.",
    },
    {
      index: "05",
      name: "Design output & management",
      summary: "Save it, revisit it, share it.",
      detail:
        "Completed reports are saved per user in MongoDB Atlas and listed in a history screen. Any report can be shared through the device's native share sheet, which is how alpha testers actually passed designs to the people they live with.",
    },
  ],

  architecture: {
    summary:
      "Three tiers and two model calls. The Flutter client owns the flow and the state; the Express API owns identity and persistence; each AI service is individually replaceable, because every one of them has a mock implementation behind the same interface.",
    layers: [
      {
        name: "Flutter client",
        items: [
          "13 screens",
          "Provider state",
          "A service per integration",
          "Mock fallbacks",
        ],
      },
      {
        name: "Express API",
        items: [
          "JWT auth middleware",
          "/api/auth, /api/designs",
          "/api/images, /api/announcements",
          "Mongoose models",
        ],
      },
      {
        name: "Data & AI",
        items: [
          "MongoDB Atlas",
          "GPT-4o (vision)",
          "Claude (plan)",
          "Zyla → IKEA products",
        ],
      },
    ],
  },

  decisions: [
    {
      title: "Two models, two jobs",
      decision:
        "GPT-4o only looks at the photo. Claude only writes the plan. Neither does both.",
      why: "Extraction and generation fail differently. Keeping them separate means a bad room reading is visible in the analysis before it contaminates the plan, and either model can be swapped without touching the other.",
    },
    {
      title: "A structured report, not a wall of text",
      decision:
        "The language model returns typed fields, parsed into a DesignReport model. They cover layout recommendations, a colour palette of name and hex pairs, and decoration ideas.",
      why: "Prose can't be rendered as swatches, saved to a history list, or matched against a product catalogue. Fixing the shape at the model boundary is what makes the rest of the app possible.",
    },
    {
      title: "Every integration has a mock behind it",
      decision:
        "With no API keys present, the vision model, the language model, and the furniture API all fall back to mock responses, and the full flow still runs.",
      why: "An alpha test or a supervisor demo shouldn't depend on a key being live and in quota. The failure I was most likely to hit was the one I designed for first.",
    },
    {
      title: "The client finds its own backend",
      decision:
        "The API base URL resolves in a fixed order: a compile-time --dart-define, then .env, then a platform default, which is 10.0.2.2 on the Android emulator and localhost everywhere else.",
      why: "I was switching between Chrome and an emulator constantly. Editing a config file every time was a step I would eventually forget, so I removed the step instead of trying to remember it.",
    },
    {
      title: "Provider over a heavier state library",
      decision: "Provider, with a notifier per concern.",
      why: "One developer, a linear flow, and no code generation step. State management was never the bottleneck in this project, and something bigger would have added a build step it didn't need.",
    },
    {
      title: "Rebuilding rather than patching",
      decision: "Partway through, I deleted the codebase and rebuilt it leaner.",
      why: "The first version had grown organically until I couldn't hold it in my head or explain it in a supervisor meeting. Starting again with what I'd learned cost less than continuing to work inside something I no longer understood.",
    },
  ],

  challenges: [
    {
      title: "Getting reliable structure out of a language model",
      body: "Early responses were well written and useless. The app needed fields and got paragraphs. The fix was a prompt builder that states the exact schema, and parsing that treats every field as potentially absent, defaulting rather than throwing when the model improvises.",
    },
    {
      title: "A long wait with nothing to look at",
      body: "Two model calls plus a product lookup takes real time, and a spinner over a frozen screen makes that feel broken. The wait became its own screen that reports which stage is running.",
    },
    {
      title: "Depending on a catalogue I don't control",
      body: "Furniture data comes from a third-party API with its own rate limits and outages. Product lookup is isolated behind one service with a mock fallback, so a catalogue failure costs the product links, not the design plan.",
    },
    {
      title: "One number, several units",
      body: "Testers entered dimensions in whatever unit they think in. Values are converted at the boundary and stored in metres, and the report renders a single canonical label, so no downstream code ever has to ask what unit it is holding.",
    },
  ],

  reflection: [
    "What I'd do differently: write the report parser against a fixed schema from day one. I built the UI first and let the data shape follow, which meant rewriting the parsing layer twice as the report grew fields.",
    "What I'd add next: automated tests around the parsing and fallback paths. Those are the parts most likely to break silently, and right now they are the parts I verify by hand.",
    "What surprised me: the mock fallback layer, added as a convenience for demos, became the thing that let me build the entire UI without spending a cent on tokens.",
  ],
  // The first reflection as a one-line code edit, animated under the heading.
  reflectionDiff: { from: "shape = ui()", to: "shape = schema()" },
} as const;

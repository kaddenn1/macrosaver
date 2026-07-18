export type GuideSection = {
  heading: string;
  body: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type Guide = {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  summary: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
};

export const GUIDES: Guide[] = [
  {
    slug: "protein-powder",
    title: "Protein Powder Buying Guide",
    category: "protein",
    categoryLabel: "Protein Powder",
    summary:
      "How to pick a protein powder based on what actually matters — protein per dollar, digestion, and how you'll use it — instead of the sticker price on the tub.",
    sections: [
      {
        heading: "Whey concentrate vs. whey isolate vs. plant protein",
        body: "Whey concentrate is the cheapest option per gram of protein but carries more lactose and fat, which can cause bloating for people who are lactose-sensitive. Whey isolate strips out most of the lactose and fat during processing, so it digests easier and mixes thinner, but usually costs more per serving. Plant proteins (pea, rice, or blends) are the go-to for anyone avoiding dairy, though they often need to be blended from multiple sources to hit a complete amino acid profile."
      },
      {
        heading: "Judge it by cost per gram of protein, not price per tub",
        body: "A $20 tub with small 20g scoops and a $35 tub with generous 30g scoops can land at wildly different value once you do the math. Divide the price by total grams of protein in the container, not by the number of scoops or the sticker price — that's the only number that tells you which tub is actually cheaper to hit your protein target. Every listing on MacroSaver already runs this calculation for you."
      },
      {
        heading: "Check the serving size before you compare flavors",
        body: "Two tubs of the \"same\" protein can have different scoop sizes across flavors or package sizes, which throws off a naive price comparison. Always check grams of protein per serving on the label, not just the flavor name or container size, especially when a brand sells the same product in multiple bag sizes."
      },
      {
        heading: "Mixability and flavor are real, not just marketing",
        body: "A protein powder you don't enjoy drinking is one you'll stop buying, no matter how good the macros look on paper. Isolates and hydrolyzed proteins tend to mix thinner and clump less than concentrates; plant proteins are usually grittier unless blended with a thickener. If you're on the fence between two similarly priced options, the one with better reviews for taste and mixability is usually worth the small premium."
      }
    ],
    faqs: [
      {
        question: "How much protein do I actually need per day?",
        answer: "A common starting range is 0.7–1g of protein per pound of bodyweight for people who train regularly, though needs vary by goal and activity level. Protein powder is meant to fill the gap between what you eat and what you're targeting, not replace whole food entirely."
      },
      {
        question: "Is a more expensive protein powder always better?",
        answer: "Not necessarily. Price differences often come down to processing (isolate vs. concentrate), added ingredients like digestive enzymes, or brand marketing rather than a meaningful difference in muscle-building effect. Compare cost per gram of protein first, then let taste and digestion be the tiebreaker."
      },
      {
        question: "Can I take protein powder if I'm lactose intolerant?",
        answer: "Whey isolate has much of the lactose removed and is tolerated by many people with mild lactose sensitivity, but concentrate typically isn't. If you're strongly lactose intolerant, a plant-based protein sidesteps the issue entirely."
      }
    ]
  },
  {
    slug: "creatine",
    title: "Creatine Buying Guide",
    category: "creatine",
    categoryLabel: "Creatine",
    summary:
      "Creatine is one of the most researched, cheapest-per-serving supplements out there — here's how to buy it without overpaying for the same 5 grams of monohydrate.",
    sections: [
      {
        heading: "Monohydrate is the default for a reason",
        body: "Creatine monohydrate is the form backed by the most research for strength, power output, and muscle performance, and it's almost always the cheapest per gram. Newer forms like creatine HCL or buffered creatine are marketed on claims of better absorption or less bloating, but the evidence for a real performance edge over monohydrate is thin. Unless you have a specific reason to switch, monohydrate is the safe, well-studied, budget-friendly choice."
      },
      {
        heading: "Watch the scoop size, not just the tub price",
        body: "The standard effective dose is about 5g per day, but not every tub's scoop actually measures out 5g — some run smaller to stretch the container into more \"servings.\" A cheaper tub with undersized scoops can cost more per effective dose than a pricier tub with accurate 5g scoops. Check the label's serving size in grams, not just the number of servings claimed."
      },
      {
        heading: "You don't need a loading phase",
        body: "Some labels suggest a \"loading phase\" of 20g/day for the first week to saturate your muscles faster. It works, but it's optional — taking a steady 5g/day gets you to the same saturation point in about 3–4 weeks without the extra cost or GI discomfort some people get from higher doses. If you're not in a rush, skip the loading phase and save the tub."
      },
      {
        heading: "Timing matters less than consistency",
        body: "Unlike pre-workout, creatine doesn't need to be taken right before training to work — it builds up in your muscles over time. Taking it at the same time every day, with or without food, matters more for results than trying to time it around your workout window."
      }
    ],
    faqs: [
      {
        question: "Does creatine cause bloating or water retention?",
        answer: "Creatine draws water into muscle cells, which some people notice as a bit of extra weight or fullness early on — this is not the same as the puffy, under-the-skin bloating some other supplements cause, and it typically levels off after a few weeks."
      },
      {
        question: "Is creatine safe to take every day, long term?",
        answer: "Creatine monohydrate is one of the most studied supplements available, with a long track record of safety at standard doses (around 3–5g/day) in healthy adults. As always, check with a doctor if you have kidney concerns or take other medications."
      },
      {
        question: "Do I need a fancy flavored creatine, or is unflavored fine?",
        answer: "Plain creatine monohydrate has no real flavor and dissolves into most drinks without much fuss. Flavored versions are a convenience premium, not a performance upgrade — unflavored is usually the better per-serving value if you don't mind mixing it into juice or a shake."
      }
    ]
  },
  {
    slug: "pre-workout",
    title: "Pre-Workout Buying Guide",
    category: "pre-workout",
    categoryLabel: "Pre-Workout",
    summary:
      "Pre-workout labels are crowded with proprietary blends and stim claims — here's what to actually look for before you buy a tub.",
    sections: [
      {
        heading: "Start with the stimulant dose, not the flavor",
        body: "Caffeine is the main driver of the \"kick\" in most pre-workouts, typically ranging from 150mg (moderate) to 300mg+ (high-stim) per serving — for reference, a cup of coffee is roughly 95mg. If a label doesn't disclose exact caffeine content per scoop, be cautious, since underdosed or hidden-stim blends make it hard to know what you're actually taking."
      },
      {
        heading: "Know the other key ingredients and what they do",
        body: "Beta-alanine helps buffer muscle fatigue during higher-rep work and is the ingredient behind the harmless tingling ('paresthesia') feeling. Citrulline malate and nitrates (like beetroot extract) support blood flow and pump. L-theanine is often paired with caffeine to smooth out jitters. None of these need to be present for a pre-workout to \"work,\" but they explain why two products at the same caffeine dose can feel different."
      },
      {
        heading: "Stim vs. non-stim options",
        body: "Non-stimulant pre-workouts skip caffeine entirely and lean on pump and endurance ingredients instead — a good option for evening training sessions or anyone sensitive to stimulants. If you already drink coffee before training, a non-stim option avoids stacking caffeine on caffeine."
      },
      {
        heading: "Cost per serving adds up fast with proprietary blends",
        body: "Because pre-workout containers vary a lot in scoops-per-tub, the lowest sticker price isn't always the best deal per workout. Compare cost per serving, not per tub, especially between a 20-serving and a 40-serving container of what looks like the same product."
      }
    ],
    faqs: [
      {
        question: "How long before a workout should I take pre-workout?",
        answer: "Most people take it 20–30 minutes before training to let caffeine and other ingredients kick in. Taking it too close to bedtime workouts can disrupt sleep given caffeine's several-hour half-life."
      },
      {
        question: "Do I need to cycle off pre-workout?",
        answer: "Regular daily use of high-stim pre-workout can build caffeine tolerance, meaning you need more to get the same effect over time. Many people take periodic breaks (a week or two) or rotate in a non-stim option to reset sensitivity."
      },
      {
        question: "Is the tingling feeling from pre-workout dangerous?",
        answer: "That tingling ('paresthesia') is caused by beta-alanine and is a harmless, well-documented side effect, not a sign of a problem. It typically fades within 30–60 minutes."
      }
    ]
  },
  {
    slug: "electrolytes",
    title: "Electrolyte Drink Buying Guide",
    category: "electrolytes",
    categoryLabel: "Electrolytes",
    summary:
      "Not every electrolyte mix is built for the same job — here's how to pick one based on how you actually sweat, train, and eat.",
    sections: [
      {
        heading: "What electrolytes are actually doing",
        body: "Sodium, potassium, and magnesium are the core electrolytes lost through sweat, and they're what your body uses to regulate fluid balance, muscle contractions, and nerve signaling. Plain water rehydrates volume but doesn't replace these minerals — that's the gap electrolyte mixes are designed to fill, particularly after heavy sweating or long training sessions."
      },
      {
        heading: "Match the sodium level to how much you sweat",
        body: "Electrolyte mixes range from lightly flavored low-sodium options to \"hydration multiplier\" style mixes with 500mg+ of sodium per serving. Heavy sweaters, endurance athletes, people training in heat, and those following low-carb or keto diets (which flush sodium faster) generally need the higher end. Casual, shorter workouts usually don't need that much replacement."
      },
      {
        heading: "Sugar content varies more than people expect",
        body: "Some electrolyte mixes use a few grams of sugar to aid absorption, which is genuinely useful during long endurance efforts; others use it mainly for taste, which adds calories without much functional benefit for a 30-minute gym session. Check the sugar line if you're using an electrolyte drink daily rather than just around workouts."
      },
      {
        heading: "Compare cost per serving, not per box",
        body: "Electrolyte products are sold in everything from single-serve packets to bulk tubs, which makes sticker price comparisons misleading. Divide by the number of servings to see the real cost per drink before deciding a box of packets is cheaper than a tub."
      }
    ],
    faqs: [
      {
        question: "Do I need electrolytes if I'm not exercising heavily?",
        answer: "For most people with a normal diet and moderate activity, food already provides enough electrolytes. Electrolyte drinks earn their keep during heavy sweating, illness (vomiting/diarrhea), hot weather, long endurance exercise, or low-carb diets that flush sodium faster than normal."
      },
      {
        question: "What's the difference between electrolyte drinks and sports drinks like Gatorade?",
        answer: "Traditional sports drinks are formulated around sugar for quick energy alongside some electrolytes; dedicated electrolyte mixes usually prioritize sodium/potassium/magnesium ratios with little to no sugar. Which one makes sense depends on whether you need the extra carbs for energy or just the minerals for hydration."
      },
      {
        question: "Can you get too much sodium from electrolyte drinks?",
        answer: "It's possible if you're stacking multiple high-sodium servings on top of a normal diet without heavy sweat losses to offset it. Match your intake to your actual sweat rate and activity level rather than defaulting to the highest-sodium option available."
      }
    ]
  }
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuideByCategory(category: string): Guide | undefined {
  return GUIDES.find((g) => g.category === category);
}

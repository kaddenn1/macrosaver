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
        body: "Whey concentrate generally retains more lactose and fat than whey isolate, while isolate usually costs more per serving. Individual tolerance and product formulations vary, so compare the ingredient list and nutrition label rather than assuming one form will digest or mix better for everyone. Plant-based powders avoid dairy, but their protein sources and amino-acid profiles differ by product."
      },
      {
        heading: "Judge it by cost per gram of protein, not price per tub",
        body: "A lower-priced tub can still cost more per gram of protein when serving sizes and serving counts differ. Price divided by the total labeled grams of protein is one useful value measure; ingredients, dietary needs, taste, and tolerance still matter. MacroSaver calculates this label-based metric where the required data is available."
      },
      {
        heading: "Check the serving size before you compare flavors",
        body: "Two tubs of the \"same\" protein can have different scoop sizes across flavors or package sizes, which throws off a naive price comparison. Always check grams of protein per serving on the label, not just the flavor name or container size, especially when a brand sells the same product in multiple bag sizes."
      },
      {
        heading: "Mixability and flavor are real, not just marketing",
        body: "Taste and texture vary substantially by formula, flavor, and preparation method. Reviews can reveal recurring complaints about clumping or flavor, but they are subjective and should be weighed alongside the label, price, and your own dietary needs."
      }
    ],
    faqs: [
      {
        question: "How much protein do I actually need per day?",
        answer: "Protein needs vary with body size, age, diet, activity, goals, and health status. The NIH resource linked below offers general background, while a clinician or registered dietitian can help set an individual target. Protein powder can supplement a diet; it does not need to replace protein-rich foods."
      },
      {
        question: "Is a more expensive protein powder always better?",
        answer: "Not necessarily. Price differences often come down to processing (isolate vs. concentrate), added ingredients like digestive enzymes, or brand marketing rather than a meaningful difference in muscle-building effect. Compare cost per gram of protein first, then let taste and digestion be the tiebreaker."
      },
      {
        question: "Can I take protein powder if I'm lactose intolerant?",
        answer: "Whey isolate generally contains less lactose than concentrate, but lactose content and individual tolerance vary. A dairy-free powder avoids lactose, though its other ingredients may still matter for allergies or digestive symptoms. Check the label and seek clinical advice for significant reactions."
      }
    ]
  },
  {
    slug: "creatine",
    title: "Creatine Buying Guide",
    category: "creatine",
    categoryLabel: "Creatine",
    summary:
      "How to compare creatine forms, labeled serving sizes, and cost per gram without treating marketing claims as settled evidence.",
    sections: [
      {
        heading: "Monohydrate is the default for a reason",
        body: "Creatine monohydrate is the form most commonly studied for exercise performance and is often inexpensive per gram. Other forms may make absorption or comfort claims, but those claims should be checked against independent evidence. Compare the labeled creatine amount and price, and discuss suitability with a clinician if you have a medical condition or take medication."
      },
      {
        heading: "Watch the scoop size, not just the tub price",
        body: "Serving sizes differ across products, so compare the labeled grams of creatine per serving as well as the serving count. A smaller scoop is not necessarily misleading, but it can make two tubs look more similar than they are. The NIH source below summarizes studied amounts; it is not a personalized dosing recommendation."
      },
      {
        heading: "Understand loading instructions before following them",
        body: "Some products describe a short loading phase, while others use one consistent serving. Research protocols and personal needs are not interchangeable with label marketing, and larger amounts can be harder for some people to tolerate. Follow the product directions and seek professional advice when dosing is uncertain."
      },
      {
        heading: "Timing matters less than consistency",
        body: "Creatine research generally focuses on repeated use rather than an immediate stimulant-like effect. Evidence does not establish one universally best time of day, so convenience and following the labeled directions may be more practical than treating workout timing as essential."
      },
      {
        heading: "Powder, capsules, gummies, or a blended formula",
        body: "Plain powder is often less expensive per gram, while capsules, gummies, and flavored products may charge more for convenience. Blends add ingredients that should be evaluated separately; their presence does not by itself establish a performance advantage. Compare the actual creatine amount, full ingredient list, and cost per serving."
      },
      {
        heading: "Put safety claims in context",
        body: "Creatine is not an anabolic steroid and is also obtained from foods such as meat and fish. Safety findings from studies of healthy participants should not be generalized to every person, dose, product, or duration. Anyone with kidney concerns, pregnancy, or medication questions should get individual medical guidance before use."
      }
    ],
    faqs: [
      {
        question: "Does creatine cause bloating or water retention?",
        answer: "Changes in body water and weight can occur, but the amount and timing vary. The scale cannot show where water is stored, and persistent swelling or other concerning symptoms warrant medical advice rather than an assumption that creatine is the cause."
      },
      {
        question: "Is creatine safe to take every day, long term?",
        answer: "Studies summarized by NIH provide useful safety context, but they do not guarantee that daily, long-term use is appropriate for every person. Discuss use with a clinician if you have kidney concerns, are pregnant, take medication, or plan to use more than the label directs."
      },
      {
        question: "Do I need a fancy flavored creatine, or is unflavored fine?",
        answer: "Plain creatine monohydrate has no real flavor and dissolves into most drinks without much fuss. Flavored versions are a convenience premium, not a performance upgrade — unflavored is usually the better per-serving value if you don't mind mixing it into juice or a shake."
      },
      {
        question: "How long until I actually notice a difference?",
        answer: "Response and timing vary, and some people may notice no obvious subjective change. Training, diet, sleep, the product used, and the outcome being measured all affect what can be observed; creatine does not replace a training program."
      },
      {
        question: "Does creatine work for women, or is it mainly for men?",
        answer: "Creatine is not a men's-only supplement, and research includes women as well as men. That does not make one dose appropriate for everyone; follow the label and consider individual health, body size, pregnancy, and professional advice."
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
        body: "Many pre-workouts use caffeine, and the labeled amount can vary widely. Compare that amount with caffeine from coffee, energy drinks, medication, and other supplements rather than assessing one product in isolation. If the amount is not disclosed, it is harder to judge total intake; the FDA source below provides general caffeine safety context."
      },
      {
        heading: "Know the other key ingredients and what they do",
        body: "Ingredients such as beta-alanine, citrulline, nitrates, and L-theanine are used for different proposed effects, but evidence, studied amounts, and product doses vary. Beta-alanine can cause tingling in some people. Treat front-label claims as a prompt to inspect the full Supplement Facts panel, not as proof that a blend will produce a particular result."
      },
      {
        heading: "Stim vs. non-stim options",
        body: "Products sold as non-stimulant commonly omit caffeine, but the full label still matters because formulas differ. People trying to limit caffeine may prefer them, particularly later in the day. Check all sources of caffeine and other stimulants rather than relying only on a product name."
      },
      {
        heading: "Cost per serving adds up fast with proprietary blends",
        body: "Because pre-workout containers vary a lot in scoops-per-tub, the lowest sticker price isn't always the best deal per workout. Compare cost per serving, not per tub, especially between a 20-serving and a 40-serving container of what looks like the same product."
      }
    ],
    faqs: [
      {
        question: "How long before a workout should I take pre-workout?",
        answer: "Follow the product directions because ingredients absorb at different rates. Caffeine can remain active for hours and may affect sleep, so consider timing, total intake, and personal sensitivity rather than assuming one pre-workout window fits everyone."
      },
      {
        question: "Do I need to cycle off pre-workout?",
        answer: "Caffeine tolerance can develop with regular use, but there is no universal supplement-cycling schedule. Avoid increasing the serving simply to chase the same sensation; review total caffeine intake and discuss persistent fatigue or dependence concerns with a clinician."
      },
      {
        question: "Is the tingling feeling from pre-workout dangerous?",
        answer: "Beta-alanine can cause temporary tingling, but a guide cannot determine the cause of an individual's symptoms. Stop using the product and seek medical help for severe, persistent, or allergy-like symptoms rather than assuming every reaction is expected."
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
        body: "Electrolytes such as sodium and potassium help with fluid balance, nerve signaling, and muscle function. Sweat losses vary substantially by person, conditions, and activity. Water and food meet everyday needs for many people; electrolyte products are one optional way to replace minerals in situations with meaningful losses."
      },
      {
        heading: "Match the sodium level to how much you sweat",
        body: "Sodium per serving varies widely, and a higher number is not automatically better. Needs depend on sweat loss, activity duration, weather, diet, and health conditions. Compare the label with your overall intake, and seek individual guidance when blood pressure, kidney, heart, or medication concerns apply."
      },
      {
        heading: "Sugar content varies more than people expect",
        body: "Sugar content ranges from zero to amounts closer to a traditional sports drink. Carbohydrate can serve as fuel during some prolonged activities, while other buyers may be looking only for minerals and flavor. Check serving size, added sugar, and intended use instead of assuming every electrolyte product serves the same purpose."
      },
      {
        heading: "Compare cost per serving, not per box",
        body: "Electrolyte products are sold in everything from single-serve packets to bulk tubs, which makes sticker price comparisons misleading. Divide by the number of servings to see the real cost per drink before deciding a box of packets is cheaper than a tub."
      }
    ],
    faqs: [
      {
        question: "Do I need electrolytes if I'm not exercising heavily?",
        answer: "Many people can meet routine fluid and electrolyte needs through water and food. Heavy sweating or illness can change those needs, but vomiting, diarrhea, dehydration, or symptoms of an electrolyte imbalance may require medical guidance rather than self-treatment with a supplement."
      },
      {
        question: "What's the difference between electrolyte drinks and sports drinks like Gatorade?",
        answer: "The categories overlap. Some sports drinks contain carbohydrate and modest electrolytes, while some electrolyte mixes contain little sugar and others contain plenty. Compare the actual Nutrition Facts or Supplement Facts panel instead of relying on the product category."
      },
      {
        question: "Can you get too much sodium from electrolyte drinks?",
        answer: "Yes. Multiple servings can add substantial sodium to the rest of a day's diet. More is not inherently more hydrating, and people with blood pressure, kidney, heart, or medication concerns should ask a clinician what intake is appropriate."
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

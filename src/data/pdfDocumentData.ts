export interface DocumentChapter {
  id: string;
  number: number;
  title: string;
  pageRange: string;
  summary: string;
  rules: {
    ruleNo: string;
    title: string;
    explanation: string;
    example?: string;
    takeaway: string;
  }[];
}

export const PDF_DOCUMENT_INFO = {
  title: "Esquire's The New Rules for Men",
  subtitle: "Simplified. Practical. Memorable.",
  tagline: "Timeless advice. Modern man. Better you. Learn It. Apply It. Live It.",
  totalChapters: 11,
  totalRules: "850+ Rules",
  publicationYear: "2026",
  heading: "Here is the result of 2026",
};

export const PDF_CHAPTERS: DocumentChapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'The Opposite Sex',
    pageRange: 'Pages 3 - 25',
    summary: 'Practical principles on dating, genuine communication, building comfort, respect, and letting healthy relationships develop naturally.',
    rules: [
      {
        ruleNo: 'Rule No. 1',
        title: 'When considering uniquely over-the-top ways to propose to your girlfriend, first eliminate all ways that are uniquely over-the-top.',
        explanation: "Don't try too hard to impress with something flashy. A proposal should be emotionally meaningful rather than dramatic.",
        example: 'Instead of renting a helicopter just to impress people, choose a place with genuine personal value, like where you first met.',
        takeaway: 'Simple, sincere, and personal moments are often more memorable than expensive or dramatic ones.'
      },
      {
        ruleNo: 'Rule No. 2',
        title: 'No woman over the age of 17 has ever been thrilled by carnations.',
        explanation: "Thoughtfulness matters far more than grabbing the cheapest or most common gift.",
        example: 'If she loves lilies or roses, buying those shows you pay attention to her personal preferences.',
        takeaway: 'Thoughtfulness matters more than choosing the easiest option.'
      },
      {
        ruleNo: 'Rule No. 4',
        title: "Wait until after the third date to send her that play you've been working on.",
        explanation: "Don't overwhelm someone early in a relationship by sharing very personal creative work immediately.",
        example: "If you've written a novel or screenplay, let her know you first before asking her to read it.",
        takeaway: 'Build comfort and connection before sharing deeply personal things.'
      },
      {
        ruleNo: 'Rule No. 5',
        title: "Wait until after the fifth date if she's become a character in that play you've been working on.",
        explanation: "Don't become emotionally over-invested before the relationship has time to breathe.",
        example: "After just one week of dating, don't start imagining your entire future together.",
        takeaway: 'Let relationships develop naturally.'
      },
      {
        ruleNo: 'Rule No. 6',
        title: "She's going to check your message history.",
        explanation: 'Your messages, digital footprint, and online behavior reflect who you are.',
        example: "If you've been dishonest online, don't expect it to stay hidden forever.",
        takeaway: 'Be honest, transparent, and respectful in your digital life.'
      },
      {
        ruleNo: 'Rule No. 7',
        title: 'Natural Eye Contact in Dating Situations',
        explanation: 'Natural eye contact signals warmth, interest, and grounded confidence without creeping or staring.',
        example: 'Maintain comfortable eye contact during conversation; avoid looking away constantly or staring intently.',
        takeaway: 'Natural eye contact shows confidence and interest.'
      },
      {
        ruleNo: 'Rule No. 9',
        title: "Describing yourself as a 'hot-tub guy' on the first date will not get you laid.",
        explanation: 'Arrogance and bragging produce the opposite effect of what confidence achieves.',
        example: 'Instead of bragging about possessions, have a genuine two-way conversation and ask thoughtful questions.',
        takeaway: 'Quiet confidence is attractive; showing off is not.'
      },
      {
        ruleNo: 'Rule No. 18',
        title: "Swipe right, swipe left: You're missing out on the magic and ambiguity of a meaningful relationship.",
        explanation: 'Constantly judging people on dating apps turns relationships into a game. Real bonds require time and conversation.',
        example: 'You might dismiss an average profile photo, but meeting in real life would reveal humor and shared chemistry.',
        takeaway: 'Real relationships are built through genuine connection, not quick swipes.'
      },
      {
        ruleNo: 'Rule No. 21',
        title: 'If she dances, you dance.',
        explanation: "Participating in your partner's interests shows active support and deepens intimacy.",
        example: "Even if you aren't an expert dancer, getting on the floor for a few minutes shows caring effort.",
        takeaway: 'Small acts of participation show love and solidarity.'
      },
      {
        ruleNo: 'Rule No. 37',
        title: 'Plans. Then, now, forever. Plans.',
        explanation: "Healthy relationships don't survive on emotion alone; they require clear future coordination.",
        example: 'Planning a weekend trip, discussing career timelines, and dividing responsibilities build stability.',
        takeaway: 'A successful relationship grows through shared planning and commitment.'
      }
    ]
  },
  {
    id: 'ch2',
    number: 2,
    title: 'Drinking & Bar Etiquette',
    pageRange: 'Pages 26 - 48',
    summary: 'The art of hospitality, knowing your limits, respecting bartenders, enjoying the atmosphere, and drinking with moderation.',
    rules: [
      {
        ruleNo: 'Rule No. 67',
        title: 'Nobody wants to hear about your hangover.',
        explanation: 'If you chose to drink, accept responsibility without burdening coworkers or friends.',
        example: 'Arriving at work complaining about last night gets old fast. Handle it quietly.',
        takeaway: 'Take responsibility for your choices instead of complaining.'
      },
      {
        ruleNo: 'Rule No. 70',
        title: "\"Drinking\" is everything you do in a bar, including talking, the music, and the people.",
        explanation: 'A great evening is about connection, conversation, and atmosphere, not just alcohol volume.',
        example: 'Spending an evening catching up with close friends while nursing one or two quality drinks.',
        takeaway: 'Enjoy the experience, not just the beverage.'
      },
      {
        ruleNo: 'Rule No. 71',
        title: 'Huge difference between $20 whiskey and $40. Not a huge difference between $40 and $300.',
        explanation: 'Quality rises quickly from bottom-shelf to mid-tier; beyond that, you often pay purely for branding.',
        example: 'A ₹2,000 bottle may taste noticeably smoother than a ₹800 bottle, but a ₹25,000 bottle rarely tastes 10x better.',
        takeaway: "Price and quality don't always scale together."
      },
      {
        ruleNo: 'Rule No. 87',
        title: "Know your drink. Don't let your drink know you.",
        explanation: 'Stay in full control of your faculties and decisions. Alcohol should enhance, never derail.',
        example: 'Knowing when to switch to club soda or water so you wake up sharp the next morning.',
        takeaway: 'Real confidence comes from self-control and moderation.'
      },
      {
        ruleNo: 'Rule No. 94',
        title: 'Appreciate a bartender who chills the extra cocktail in ice.',
        explanation: 'Notice and reward service professionals who pay attention to fine details and craftsmanship.',
        example: 'Leaving a generous tip for a bartender who ensures your drink remains at the perfect temperature.',
        takeaway: 'Excellence is found in the small details.'
      },
      {
        ruleNo: 'Rule No. 106',
        title: 'Water, always.',
        explanation: 'Drinking water alongside alcohol prevents dehydration and keeps your body energized.',
        example: 'Alternating one glass of water for every alcoholic beverage consumed.',
        takeaway: 'Hydration is always a non-negotiable habit.'
      },
      {
        ruleNo: 'Rule No. 110',
        title: 'Leave a little earlier than you want to.',
        explanation: 'End the night on a high note while conversation is pleasant, rather than staying until exhaustion.',
        example: 'Heading home at midnight while energized rather than staying until the lights come up.',
        takeaway: 'Knowing when to exit is the mark of good judgment.'
      }
    ]
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Food & Cooking',
    pageRange: 'Pages 49 - 113',
    summary: 'Mastering the kitchen essentials: carbon steel, browning, seasonal produce, safe marinades, and cooking with care.',
    rules: [
      {
        ruleNo: 'Rule No. 115',
        title: "Give a man carbon steel, cast iron, and kosher salt, and there is nothing he can't cook.",
        explanation: "Master basic tools and quality seasonings rather than buying complicated kitchen gadgets.",
        example: 'A skilled home cook can prepare dozens of memorable meals with just one cast-iron skillet and a chef knife.',
        takeaway: 'Master the fundamentals before chasing gadgets.'
      },
      {
        ruleNo: 'Rule No. 118',
        title: 'Never use raw marinade to baste meat.',
        explanation: 'Marinade that has touched raw meat contains bacteria. Never brush it back onto cooked food without boiling.',
        example: 'Keep aside a portion of fresh sauce before marinating, or discard used marinade safely.',
        takeaway: 'Food safety and hygiene always come first.'
      },
      {
        ruleNo: 'Rule No. 128',
        title: "You have to let things cook. Brown is good.",
        explanation: 'Caramelization creates deep flavor. Constant flipping and moving prevents proper searing.',
        example: 'Leave a steak or chicken undisturbed in the hot pan until a rich golden-brown crust forms.',
        takeaway: 'Patience and heat contact develop flavor.'
      },
      {
        ruleNo: 'Rule No. 130',
        title: 'Wine you cook with should be good enough to drink.',
        explanation: 'Cheap or sour cooking wine degrades food. Use wine you would enjoy having in a glass.',
        example: 'Deglaze a pan with a decent dry white or red table wine rather than preserved salty cooking wine.',
        takeaway: 'Quality ingredients produce quality meals.'
      },
      {
        ruleNo: 'Rule No. 139',
        title: 'The best food comes from quality ingredients with simple preparation.',
        explanation: 'Spend more time sourcing fresh chicken or vegetables and less time over-seasoning.',
        example: 'Fresh in-season tomatoes with coarse salt and extra virgin olive oil taste better than complicated sauces.',
        takeaway: 'Simplicity and quality beat over-complication.'
      },
      {
        ruleNo: 'Rule No. 167',
        title: 'Put a damp paper towel under your cutting board.',
        explanation: 'A sliding cutting board is a kitchen safety hazard. Damp paper towels anchor it securely.',
        example: 'Place a folded damp cloth under the wooden board before chopping vegetables.',
        takeaway: 'Safety starts with a stable workspace.'
      },
      {
        ruleNo: 'Rule No. 199',
        title: 'One great knife is better than a whole set of mediocre ones.',
        explanation: 'An 8-inch high-carbon chef knife handles 90% of prep work with precision and ease.',
        example: 'Invest in one well-balanced Japanese or German chef knife and maintain its edge with a whetstone.',
        takeaway: 'Quality beats quantity.'
      }
    ]
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Working & Professionalism',
    pageRange: 'Pages 114 - 139',
    summary: 'Executive presence, punctuality, interview preparation, leadership by example, and maintaining clear boundaries.',
    rules: [
      {
        ruleNo: 'Rule No. 272',
        title: 'It is never a mistake to dress professionally for an interview.',
        explanation: 'Looking sharp demonstrates respect, seriousness, and intentional preparation for the opportunity.',
        example: 'Even for hands-on roles, neat formal attire creates an immediately positive impression.',
        takeaway: 'You rarely regret being overdressed for an interview.'
      },
      {
        ruleNo: 'Rule No. 274',
        title: "Don't be late. But don't be too early, either. Six minutes max.",
        explanation: 'Arrive punctually. Arriving 30 minutes early inconveniences the interviewer and disrupts their schedule.',
        example: 'Arriving 5 to 7 minutes before the scheduled interview time allows reception check-in without pressure.',
        takeaway: 'Punctuality reflects professional maturity.'
      },
      {
        ruleNo: 'Rule No. 281',
        title: 'Send a thank-you note the same day.',
        explanation: 'Follow up promptly with a sincere, personalized note referencing specific topics discussed.',
        example: 'Emailing a concise 3-line note thanking the panel for their time and reiterating enthusiasm.',
        takeaway: 'Gratitude and promptness help you stand out.'
      },
      {
        ruleNo: 'Rule No. 305',
        title: 'Think before speaking. Add value to the discussion.',
        explanation: "Don't speak simply to fill silence. Ensure your observation adds genuine clarity or momentum.",
        example: 'Listening carefully throughout a strategy meeting and contributing one concise, well-reasoned insight.',
        takeaway: 'Quality of thought matters more than volume of words.'
      },
      {
        ruleNo: 'Rule No. 326',
        title: 'Leadership means acting first: do it yourself, then ask again.',
        explanation: 'True leaders roll up their sleeves and demonstrate the standard rather than waiting for consensus.',
        example: 'Stepping forward to tackle the unglamorous part of a project to inspire team participation.',
        takeaway: 'Leadership means setting the pace through action.'
      },
      {
        ruleNo: 'Rule No. 329',
        title: 'Understand: Everything is your fault.',
        explanation: 'Take complete ownership of team outcomes instead of deflecting blame to subordinates.',
        example: 'When a deliverable slips, analyzing where your guidance was unclear instead of penalizing junior staff.',
        takeaway: 'Accept responsibility before assigning it.'
      }
    ]
  },
  {
    id: 'ch5',
    number: 5,
    title: 'Travel & Mobility',
    pageRange: 'Pages 140 - 166',
    summary: 'Considerate transit etiquette, armrest diplomacy, safety first, and packing for practical comfort.',
    rules: [
      {
        ruleNo: 'Rule No. 338',
        title: "Sensors don't replace your own eyes.",
        explanation: 'Driver-assistance tech assists you; never rely on cameras alone without checking mirrors and blind spots.',
        example: 'Physically looking over your shoulder before changing highway lanes.',
        takeaway: 'Technology assists; attentiveness protects.'
      },
      {
        ruleNo: 'Rule No. 355',
        title: 'The middle-seat passenger gets both armrests.',
        explanation: 'Window gets the view and wall; aisle gets legroom and mobility; middle gets both armrests.',
        example: 'Leaving the inner armrests open for the person caught in the middle seat.',
        takeaway: 'Civil travel depends on shared courtesy.'
      },
      {
        ruleNo: 'Rule No. 362',
        title: 'Treat flight attendants with respect. Please and thank you cost nothing.',
        explanation: 'Crew members manage safety in high-stress environments. Courtesy makes everyone safer.',
        example: 'Making eye contact, thanking the attendant, and following instructions promptly.',
        takeaway: 'Kindness is free—use it often.'
      },
      {
        ruleNo: 'Rule No. 364',
        title: "Just because your seat reclines doesn't mean you should recline it fully in economy.",
        explanation: 'Be mindful of the passenger behind you, their knees, and their laptop screen.',
        example: 'Reclining gently only if necessary on overnight flights after checking with the person behind.',
        takeaway: 'Use shared public space considerately.'
      }
    ]
  },
  {
    id: 'ch6',
    number: 6,
    title: 'Style & Tailoring',
    pageRange: 'Pages 167 - 188',
    summary: 'The ten essential truths of men’s style: fit beats price, respecting your garments, and dressing with intention.',
    rules: [
      {
        ruleNo: 'Rule No. 419',
        title: 'Respect your clothes: hang trousers, roll ties, use shoe trees.',
        explanation: 'Taking proper care of what you own extends garment life by years and keeps you looking sharp.',
        example: 'Inserting cedar shoe trees into leather shoes immediately after taking them off.',
        takeaway: 'Well-maintained garments look better and last longer.'
      },
      {
        ruleNo: 'Rule No. 420',
        title: 'Looking effortless takes effort.',
        explanation: 'Great style is the result of intentional choices in fit, proportions, and fabric weight.',
        example: 'Having trousers hemmed to the exact break for your shoe height.',
        takeaway: 'Good style is intentional.'
      },
      {
        ruleNo: 'Rule No. 426',
        title: 'Fit matters more than price.',
        explanation: 'A ₹5,000 suit that fits your shoulders and waist cleanly looks superior to a ₹50,000 designer suit that bunches.',
        example: 'Visiting a local tailor to alter off-the-rack garments.',
        takeaway: 'Proportion and fit always beat logos.'
      },
      {
        ruleNo: 'Rule No. 429',
        title: 'Trouser length is everything.',
        explanation: 'Pants that puddle around shoes look sloppy; pants that are too short look accidental.',
        example: 'Aiming for a clean slight break where the trouser hem touches the top of the shoe lace.',
        takeaway: 'Precise tailoring elevates any outfit.'
      }
    ]
  },
  {
    id: 'ch7',
    number: 7,
    title: 'Communication & Digital Life',
    pageRange: 'Pages 189 - 223',
    summary: 'Clean language, eliminating corporate buzzwords, listening five times more than talking, and staying calm.',
    rules: [
      {
        ruleNo: 'Rule No. 482',
        title: 'Only text "LOL" if you actually laughed out loud.',
        explanation: 'Say what you mean. Constant empty acronyms degrade the sincerity of communication.',
        example: 'Using emojis or words that honestly match your emotional response.',
        takeaway: 'Mean what you say.'
      },
      {
        ruleNo: 'Rule No. 484',
        title: 'In an argument, the calm person usually appears stronger.',
        explanation: 'Aggression and shouting telegraph insecurity; steady, factual calmness commands authority.',
        example: 'Taking a breath and lowering your vocal pitch when someone raises their voice.',
        takeaway: 'Poise and composure beat rage.'
      },
      {
        ruleNo: 'Rule No. 497',
        title: 'Avoid corporate clichés: "circle back", "reach out", excessive exclamation marks.',
        explanation: 'Clear, direct language communicates competence far better than jargon.',
        example: 'Writing "Following up on our discussion" instead of "Just wanting to circle back with you!!!"',
        takeaway: 'Direct and clean communication is always stylish.'
      },
      {
        ruleNo: 'Rule No. 511',
        title: "You don't have to answer work emails after work hours.",
        explanation: 'Protect your focus, sleep, and family time. Non-emergency emails can wait until morning.',
        example: 'Leaving laptop notifications silenced after 7 PM.',
        takeaway: 'Protect your personal boundaries.'
      }
    ]
  },
  {
    id: 'ch8',
    number: 8,
    title: 'Leisure & Recreation',
    pageRange: 'Pages 224 - 235',
    summary: 'Finding hobbies that build real skill, playing fair, keeping perspective, and avoiding petty battles.',
    rules: [
      {
        ruleNo: 'Rule No. 694',
        title: 'When all hope is lost: Board game.',
        explanation: 'Simple shared analog games cut through boredom and bring groups together.',
        example: 'Pulling out Chess, Carrom, or Scrabble when rain interrupts an outdoor gathering.',
        takeaway: 'Simple activities bring people together.'
      },
      {
        ruleNo: 'Rule No. 713',
        title: "Binge-watching isn't a hobby.",
        explanation: 'Entertainment is passive relaxation; hobbies involve creative participation and developing a craft.',
        example: 'Playing guitar, gardening, carpentry, or cooking over watching 12 consecutive episodes.',
        takeaway: 'Cultivate active passions.'
      },
      {
        ruleNo: 'Rule No. 720',
        title: "If you're over 30 and involved in a street fight, reassess your life.",
        explanation: 'Ego-driven brawls carry legal, physical, and personal liabilities that adults must walk away from.',
        example: 'Walking away from a verbal confrontation in traffic or a public venue.',
        takeaway: 'Maturity means choosing de-escalation.'
      }
    ]
  },
  {
    id: 'ch9',
    number: 9,
    title: 'Grooming & Personal Care',
    pageRange: 'Pages 236 - 249',
    summary: 'Clean hygiene, skin moisturization, beard neckline discipline, and subtle grooming over vanity.',
    rules: [
      {
        ruleNo: 'Rule No. 725',
        title: 'There is no shame in moisturizer.',
        explanation: 'Taking care of your skin prevents cracking, irritation, and premature aging.',
        example: 'Applying a basic unscented moisturizer and sunscreen every morning after washing your face.',
        takeaway: 'Healthy skin is simply good health.'
      },
      {
        ruleNo: 'Rule No. 734',
        title: 'The most important choice is where to end your beard neckline.',
        explanation: 'Trimming along the natural fold above the Adam’s apple defines the jawline cleanly.',
        example: 'Never stop trimming right at the jawline; keep it one finger above the Adam’s apple.',
        takeaway: 'A well-defined neckline makes all the difference.'
      },
      {
        ruleNo: 'Rule No. 750',
        title: 'Hair growth a man must always maintain: eyebrows, nose, ears, neck.',
        explanation: 'Regular attention to stray hairs keeps you looking neat and cared for.',
        example: 'Checking nose and ear hair every Sunday during your grooming routine.',
        takeaway: 'Consistent basic maintenance looks sharp.'
      }
    ]
  },
  {
    id: 'ch10',
    number: 10,
    title: 'Health, Hygiene & Fitness',
    pageRange: 'Pages 250 - 260',
    summary: 'Consistency over workout bragging, listening to your body, planning for longevity, and aging with grace.',
    rules: [
      {
        ruleNo: 'Rule No. 764',
        title: "Nobody cares how many steps you've taken today.",
        explanation: 'Fitness is a personal discipline, not a social media performance.',
        example: 'Exercising consistently without feeling the need to publish every split time or calorie count.',
        takeaway: 'Focus on your health, not validation.'
      },
      {
        ruleNo: 'Rule No. 777',
        title: "You don't start understanding life well until you're forty.",
        explanation: 'Perspective, patience, and true empathy are forged through decades of lived experience.',
        example: 'Listening to advice from older mentors who have weathered market and personal cycles.',
        takeaway: 'Wisdom matures with time.'
      },
      {
        ruleNo: 'Rule No. 787',
        title: "You're gonna wanna age well.",
        explanation: 'Your sleep, cardiovascular fitness, diet, and financial decisions today dictate your mobility at 70.',
        example: 'Investing in mobility training, resistance exercise, and balanced nutrition in your 30s and 40s.',
        takeaway: 'The choices you make today shape how well you age.'
      }
    ]
  },
  {
    id: 'ch11',
    number: 11,
    title: 'Domestic Affairs & Home',
    pageRange: 'Pages 261 - 277',
    summary: 'Teamwork at home, treating partners with respect, being an attentive parent, and leaving a legacy.',
    rules: [
      {
        ruleNo: 'Rule No. 788',
        title: 'There is no honor in fighting over the remote. Particularly if the other person is twelve.',
        explanation: "Don't wage petty battles over household trifles with your family.",
        example: 'Letting your child or partner pick the movie without turning it into a debate.',
        takeaway: 'Harmony matters more than winning small disputes.'
      },
      {
        ruleNo: 'Rule No. 802',
        title: 'Shared household responsibility: cook, clean, shop, repair together.',
        explanation: 'A healthy home is a partnership where both partners contribute to daily chores.',
        example: 'One person cooks while the other clears; grocery runs are a team effort.',
        takeaway: 'A happy home depends on shared responsibility.'
      },
      {
        ruleNo: 'Rule No. 838',
        title: "You will never feel good about winning an argument with your father.",
        explanation: 'Preserving honor, love, and relationship with parents transcends the need to prove a point.',
        example: 'Choosing to listen with respect and let small differences go.',
        takeaway: 'Some relationships matter far more than being right.'
      },
      {
        ruleNo: 'Rule No. 850',
        title: 'Read to children attentively: never while distracted or multitasking.',
        explanation: 'Give your full presence to the young ones in your life. Phones away.',
        example: 'Setting your phone in another room for 20 minutes of uninterrupted bedtime reading.',
        takeaway: 'Your undivided attention is the greatest gift.'
      },
      {
        ruleNo: 'Rule No. 851',
        title: "Really, it's not that hard: do the small, thoughtful things every day.",
        explanation: 'Character and love are demonstrated through daily consistency, kindness, and quiet reliability.',
        example: 'Making morning tea, asking how their day was, and being dependable.',
        takeaway: 'Strong relationships are built through small, consistent acts of care.'
      }
    ]
  }
];

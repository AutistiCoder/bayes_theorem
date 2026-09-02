// bayesSpamFilter.ts

// IMPORTANT:
// All probabilities in this program are made up for learning purposes.
// They are NOT real spam-filtering statistics.

type Evidence = {
  word: string;
  probabilityIfSpam: number;
  probabilityIfNotSpam: number;
};

function bayesUpdate(
  prior: number,
  probabilityOfEvidenceIfSpam: number,
  probabilityOfEvidenceIfNotSpam: number
): number {
  const numerator = probabilityOfEvidenceIfSpam * prior;

  const probabilityOfEvidence =
    probabilityOfEvidenceIfSpam * prior +
    probabilityOfEvidenceIfNotSpam * (1 - prior);

  return numerator / probabilityOfEvidence;
}

function analyzeMessage(
  message: string,
  evidenceList: Evidence[]
): void {
  // Fake starting probability:
  // Pretend 20% of messages are spam.
  let spamProbability = 0.20;

  console.log(`\nMessage: "${message}"`);
  console.log(
    `Starting probability of spam: ${(spamProbability * 100).toFixed(1)}%`
  );

  for (const evidence of evidenceList) {
    if (message.toUpperCase().includes(evidence.word)) {
      console.log(`Evidence found: "${evidence.word}"`);

      spamProbability = bayesUpdate(
        spamProbability,
        evidence.probabilityIfSpam,
        evidence.probabilityIfNotSpam
      );

      console.log(
        `Updated probability of spam: ${(spamProbability * 100).toFixed(1)}%`
      );
    }
  }

  if (spamProbability >= 0.50) {
    console.log("Classification: SPAM");
  } else {
    console.log("Classification: NOT SPAM");
  }
}

// Fake probabilities chosen only to demonstrate Bayes' Theorem.
const evidenceList: Evidence[] = [
  {
    word: "FREE",
    probabilityIfSpam: 0.70,
    probabilityIfNotSpam: 0.15,
  },
  {
    word: "WINNER",
    probabilityIfSpam: 0.60,
    probabilityIfNotSpam: 0.10,
  },
];

console.log("DEMO PROBABILITIES — FOR LEARNING ONLY");
console.log("--------------------------------------");

analyzeMessage(
  "Congratulations! You are a FREE WINNER!",
  evidenceList
);

analyzeMessage(
  "Are we still meeting for lunch tomorrow?",
  evidenceList
);
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import logo from "../../../public/fwu.png";

// Total time in seconds for 150 questions in 3 hours
const TOTAL_TIME = 3 * 60 * 60;
const quizData2077 = [ // Define quiz data for 2077
  {
    "question": "If roots of the equation 8x^3 - 14x^2 + 7x - 1 = 0 are in GP, then the roots are",
    "answers": [
      {"text": "2, 4, 8", "correct": true},
      {"text": "1, 5, 7", "correct": false},
      {"text": "4, 8, 16", "correct": false},
      {"text": "3, 9, 27", "correct": false}
    ],
    "explanation": "The roots of the equation are in Geometric Progression (GP) when they are 2, 4, and 8."
  },
  {
    "question": "Let a > 0 and b > 0. Then y = √ab - √b is",
    "answers": [
      {"text": "√ab", "correct": true},
      {"text": "i√ab", "correct": false},
      {"text": "-√ab", "correct": false},
      {"text": "either (a) or (c)", "correct": false}
    ],
    "explanation": "The expression simplifies to the square root of the product of a and b, minus the square root of b."
  },
  {
    "question": "If the matrix [2x, -x; -x, x] is nonsingular, then possible result is",
    "answers": [
      {"text": "x = ±2", "correct": true},
      {"text": "-2 < x < 2", "correct": false},
      {"text": "-2 ≤ x < 2", "correct": false},
      {"text": "x ≠ ±2", "correct": false}
    ],
    "explanation": "For the matrix to be nonsingular, x must be either positive 2 or negative 2."
  },
  {
    "question": "7 persons can be arranged in a round table so that 2 of them never come together is",
    "answers": [
      {"text": "4 × 5!", "correct": true},
      {"text": "5 × 4!", "correct": false},
      {"text": "(6 × 4)!", "correct": false},
      {"text": "(6! + 4)!", "correct": false}
    ],
    "explanation": "The number of ways to arrange 7 persons in a round table such that 2 specific persons never sit together is 4 times 5 factorial."
  },
  {
    "question": "It is necessary to pass all 5 subjects to pass an exam. Then a student may fail in",
    "answers": [
      {"text": "30 ways", "correct": true},
      {"text": "31 ways", "correct": false},
      {"text": "32 ways", "correct": false},
      {"text": "33 ways", "correct": false}
    ],
    "explanation": "To fail the exam, a student can fail in any one of the 5 subjects, resulting in 30 possible ways."
  },
  {
    "question": "If a, b, c are in AP and x > 0, then x%, x, x° are in",
    "answers": [
      {"text": "AP", "correct": true},
      {"text": "GP", "correct": false},
      {"text": "H.P.", "correct": false},
      {"text": "None", "correct": false}
    ],
    "explanation": "If a, b, c are in Arithmetic Progression (AP), then any percentage of a, b, and c will also be in AP."
  },
  {
    "question": "Let a and r be the first term and common ratio respectively of an infinite G.S. If its sum is 4 and the second term is 2, then",
    "answers": [
      {"text": "a = 2, r = 3", "correct": true},
      {"text": "a = 2, r = -3", "correct": false},
      {"text": "a = -2, r = 3", "correct": false},
      {"text": "a = 3, r = 4", "correct": false}
    ],
    "explanation": "For a geometric series with sum 4 and second term 2, the first term a is 2 and the common ratio r is 3."
  },
  {
    "question": "The coefficient of x^100 in the expansion of (x + 1)(x + 2)...(x + 100) is",
    "answers": [
      {"text": "5050", "correct": true},
      {"text": "2525", "correct": false},
      {"text": "1000", "correct": false},
      {"text": "None", "correct": false}
    ],
    "explanation": "The coefficient of x^100 in the expansion can be found using the sum of the roots, which is 5050."
  },
  {
    "question": "If @ and B are two vectors such that @.B = 0 and @ x B = 0, then",
    "answers": [
      {"text": "The vectors are perpendicular to each other", "correct": true},
      {"text": "The vectors are parallel to each other", "correct": false},
      {"text": "At least one of them is a null vector", "correct": false},
      {"text": "None of these", "correct": false}
    ],
    "explanation": "When the dot product (@ . B) and the cross product (@ x B) of two vectors are zero, the vectors are perpendicular to each other."
  },
  {
    "question": "If (@ x B)^2 + (@ . B)^2 = 144 and |@| = 4, then |B| =",
    "answers": [
      {"text": "6", "correct": true},
      {"text": "3", "correct": false},
      {"text": "9", "correct": false},
      {"text": "12", "correct": false}
    ],
    "explanation": "Given the magnitude of vector @ and the sum of squares involving @ and B, |B| is calculated to be 6."
  },
  {
    "question": "If a tuning fork of frequency 220 Hz produces a sound wave of wavelength 1.5 m in air at N.T.P., then the increase in wavelength when the air temperature is 27°C is",
    "answers": [
      {"text": "0.07 m", "correct": true},
      {"text": "0.07 cm", "correct": false},
      {"text": "0.7 m", "correct": false},
      {"text": "0.7 cm", "correct": false}
    ],
    "explanation": "The increase in wavelength due to the change in temperature can be calculated using the formula involving initial wavelength and temperature change."
  },
  {
    "question": "The apparent frequency received by the listener when the source of sound and the listener are approaching each other is",
    "answers": [
      {"text": "(v + v') / (v - v')", "correct": true},
      {"text": "= vv'", "correct": false},
      {"text": "vv'", "correct": false},
      {"text": "vv',", "correct": false}
    ],
    "explanation": "The formula for apparent frequency takes into account the velocities of both the source and the listener relative to the medium."
  },
  {
    "question": "The expression for pressure amplitude can be written as",
    "answers": [
      {"text": "2amplitude", "correct": true},
      {"text": "= amplitude", "correct": false},
      {"text": "2mass", "correct": false},
      {"text": "4mass", "correct": false}
    ],
    "explanation": "Pressure amplitude in a wave is directly proportional to the amplitude of the oscillation and the density of the medium."
  },
  {
    "question": "Our retina is most sensitive to which color?",
    "answers": [
      {"text": "Green", "correct": false},
      {"text": "Red", "correct": true},
      {"text": "Yellow", "correct": false},
      {"text": "Blue", "correct": false}
    ],
    "explanation": "The retina of the human eye is most sensitive to red light, which is why it appears bright to us."
  },
  {
    "question": "According to Brewster, the polarizing angle and the angle of refraction are related as",
    "answers": [
      {"text": "θ + r = π/2", "correct": true},
      {"text": "θ - r = π", "correct": false},
      {"text": "θ = r", "correct": false},
      {"text": "θ + r = 5", "correct": false}
    ],
    "explanation": "Brewster's law states that the polarizing angle and the angle of refraction are complementary, θ + r = π/2."
  },
  {
    "question": "Entropy change in an adiabatic process is",
    "answers": [
      {"text": "Zero", "correct": true},
      {"text": "Positive", "correct": false},
      {"text": "Negative", "correct": false},
      {"text": "None of these", "correct": false}
    ],
    "explanation": "In an adiabatic process, where no heat exchange occurs with the surroundings, the entropy change (ΔS) is zero."
  },
  {
    "question": "The ideal gas equation is valid under which conditions?",
    "answers": [
      {"text": "High temperature and low pressure", "correct": false},
      {"text": "Low temperature and high pressure", "correct": false},
      {"text": "High temperature and high pressure", "correct": false},
      {"text": "Low temperature and low pressure", "correct": true}
    ],
    "explanation": "The ideal gas equation, PV = nRT, is valid under conditions where the gas behaves ideally, typically at low temperature and low pressure."
  },
  {
    "question": "The variation of density with temperature can be written as",
    "answers": [
      {"text": "ρ = ρ₀(1 + βΔθ)", "correct": true},
      {"text": "ρ = ρ₀(1 - βΔθ)", "correct": false},
      {"text": "ρ = αρ₀(1 + βΔθ)", "correct": false},
      {"text": "ρ = αρ₀(1 - βΔθ)", "correct": false}
    ],
    "explanation": "The density of a substance changes with temperature according to the equation ρ = ρ₀(1 + βΔθ), where β is the coefficient of volume expansion."
  },
  {
    "question": "The dimensional formula of latent heat is",
    "answers": [
      {"text": "[M^0L^2T^-2]", "correct": true},
      {"text": "[M^0L^3T^-2]", "correct": false},
      {"text": "[M^0L^1T^-2]", "correct": false},
      {"text": "[M^0L^0T^-2]", "correct": false}
    ],
    "explanation": "Latent heat has the dimensional formula [M^0L^2T^-2], indicating it is a quantity related to energy per unit mass."
  },
  {
    "question": "Transfer of heat takes place in fluid through",
    "answers": [
      {"text": "Convection", "correct": true},
      {"text": "Conduction", "correct": false},
      {"text": "Radiation", "correct": false},
      {"text": "Both conduction and radiation", "correct": false}
    ],
    "explanation": "Heat transfer in fluids primarily occurs through convection, where hot fluid particles move and transfer heat to cooler regions."
  },
  {
    "question": "The hydrogen phosphate of a certain metal has the formula M(HPO₄). The formula of the metal chloride is",
    "answers": [
      {"text": "MCl₃", "correct": true},
      {"text": "MCl", "correct": false},
      {"text": "M₃Cl", "correct": false},
      {"text": "MCl₂", "correct": false}
    ],
    "explanation": "The formula of the metal chloride, based on the hydrogen phosphate formula, is MCl₃."
  },
  {
    "question": "How much quicklime can be obtained from 25 gm of CaCO₃?",
    "answers": [
      {"text": "28 gm", "correct": true},
      {"text": "56 gm", "correct": false},
      {"text": "14 gm", "correct": false},
      {"text": "None of the above", "correct": false}
    ],
    "explanation": "Quicklime (CaO) is obtained by heating calcium carbonate (CaCO₃), yielding 28 grams of quicklime from 25 grams of calcium carbonate."
  },
  {
    "question": "The concept of quantization of energy was introduced by",
    "answers": [
      {"text": "Max Planck", "correct": true},
      {"text": "Niels Bohr", "correct": false},
      {"text": "John Dalton", "correct": false},
      {"text": "Werner Heisenberg", "correct": false}
    ],
    "explanation": "Max Planck introduced the concept of energy quantization in his work on blackbody radiation, marking a significant development in quantum theory."
  },
  {
    "question": "Diamond has",
    "answers": [
      {"text": "Covalent bonds", "correct": true},
      {"text": "Ionic bonds", "correct": false},
      {"text": "Coordinate bonds", "correct": false},
      {"text": "Covalent and coordinate bonds", "correct": false}
    ],
    "explanation": "Diamond, a form of carbon, is composed of covalent bonds between carbon atoms, giving it its exceptional hardness."
  },
  {
    "question": "The oxidation number of oxygen in KO₂ is",
    "answers": [
      {"text": "-1", "correct": false},
      {"text": "Zero", "correct": false},
      {"text": "-1/2", "correct": true},
      {"text": "-2", "correct": false}
    ],
    "explanation": "In potassium superoxide (KO₂), the oxidation number of oxygen is -1/2."
  },
  {
    "question": "The pH of a 10⁻³ molar HCl solution is",
    "answers": [
      {"text": "3", "correct": true},
      {"text": "8", "correct": false},
      {"text": "Between 7 and 8", "correct": false},
      {"text": "Between 6 and 7", "correct": false}
    ],
    "explanation": "The pH of a solution of 10⁻³ molar HCl can be calculated as -log[H⁺], resulting in a pH of 3."
  },
  {
    "question": "The conjugate base of H₂PO₄⁻ is",
    "answers": [
      {"text": "HPO₄²⁻", "correct": true},
      {"text": "PO₄³⁻", "correct": false},
      {"text": "H₃PO₄", "correct": false},
      {"text": "H₃PO₃", "correct": false}
    ],
    "explanation": "H₂PO₄⁻ is the dihydrogen phosphate ion, and its conjugate base is HPO₄²⁻, the hydrogen phosphate ion."
  },
  





  {
    "question": "The amount of electricity required to deposit 0.2 mole of Ag⁺ is",
    "answers": [
      {"text": "2 × 96500 C", "correct": true}, {"text": "96500 C", "correct": false},
      {"text": "2 × 9650 C", "correct": false},
      {"text": "965 C", "correct": false}
    ],
    "explanation": "The amount of charge (in Coulombs) required to deposit 0.2 mole of Ag⁺ ions during electrolysis is 2 × Faraday's constant."
  },
  {
    "question": "The weight of anhydrous sodium carbonate just enough to neutralize 100 ml of 0.1 M HCl will be",
    "answers": [
      {"text": "1.06 gm", "correct": true},
      {"text": "10.60 gm", "correct": false},
      {"text": "5.03 gm", "correct": false},
      {"text": "0.53 gm", "correct": false}
    ],
    "explanation": "The weight of anhydrous sodium carbonate required for neutralization can be calculated based on the molarity and volume of the acid used."
  },
  {
    "question": "How many oxygen atoms are present in 11.2 liters of SO₂ gas at NTP?",
    "answers": [
      {"text": "6.023 × 10²³", "correct": true},
      {"text": "12.046 × 10²³", "correct": false},
      {"text": "3.0115 × 10²³", "correct": false},
      {"text": "6.023 × 10⁷", "correct": false}
    ],
    "explanation": "Avogadro's number (6.023 × 10²³) represents the number of molecules (and thus atoms) present in one mole of a substance, such as SO₂ gas."
  },
  {
    "question": "She was standing............... the entrance",
    "answers": [
      {"text": "At", "correct": true},
      {"text": "In", "correct": false},
      {"text": "On", "correct": false},
      {"text": "To", "correct": false}
    ],
    "explanation": "The correct preposition to use with 'standing' and 'entrance' is 'at'."
  },
  {
    "question": "When the thief............ (come).............. the police............ (arrive)............... there.",
    "answers": [
      {"text": "Came, arrived", "correct": true},
      {"text": "Had come, had arrived", "correct": false},
      {"text": "Came, had arrived", "correct": false},
      {"text": "Had come, arrived", "correct": false}
    ],
    "explanation": "In this sentence, the simple past tense 'came' and 'arrived' correctly describe the actions of the thief and the police."
  },
  {
    "question": "A ............... (build) by the millionaire was donated to a church.",
    "answers": [
      {"text": "building", "correct": true},
      {"text": "Builded", "correct": false},
      {"text": "Build", "correct": false},
      {"text": "Builds", "correct": false}
    ],
    "explanation": "In this context, 'building' is the correct form to use as a noun describing what was donated."
  },
  {
    "question": "The Prime Minister said that he ............. (return) ........... the following day.",
    "answers": [
      {"text": "Would return", "correct": true},
      {"text": "Will return", "correct": false},
      {"text": "Returns", "correct": false},
      {"text": "Returned", "correct": false}
    ],
    "explanation": "The future tense 'would return' is appropriate here as it indicates a future action from the past perspective."
  },
  {
    "question": "The weak are always ............. the strong.",
    "answers": [
      {"text": "At the mercy of", "correct": true},
      {"text": "With", "correct": false},
      {"text": "For", "correct": false},
      {"text": "On", "correct": false}
    ],
    "explanation": "The phrase 'at the mercy of' correctly expresses dependence or vulnerability."
  },
  {
    "question": "Many people believe that he ............ (win) ............ the election.",
    "answers": [
      {"text": "Will win", "correct": true},
      {"text": "Wins", "correct": false},
      {"text": "Won", "correct": false},
      {"text": "Winning", "correct": false}
    ],
    "explanation": "The future tense 'will win' expresses a belief about a future event."
  },
  {
    "question": "Rama .......... (buy) ............. a new car last month.",
    "answers": [
      {"text": "Bought", "correct": true},
      {"text": "Buy", "correct": false},
      {"text": "Was bought", "correct": false},
      {"text": "Had bought", "correct": false}
    ],
    "explanation": "'Bought' is the correct past tense form indicating an action completed in the past."
  },
  {
    "question": "The Mona Lisa, .......... (paint) .............. by Leonardo da Vinci, is one of the most famous paintings in the world.",
    "answers": [
      {"text": "Painted", "correct": true},
      {"text": "Was painted", "correct": false},
      {"text": "Is painted", "correct": false},
      {"text": "Paint", "correct": false}
    ],
    "explanation": "'Painted' is the correct past participle form describing the creation of the Mona Lisa."
  },
  {
    "question": "He is the ............... I have ever seen.",
    "answers": [
      {"text": "Worst", "correct": true},
      {"text": "Badder", "correct": false},
      {"text": "Worse", "correct": false},
      {"text": "Baddest", "correct": false}
    ],
    "explanation": "'Worst' is the correct superlative form indicating the most negative quality."
  },
  {
    "question": "I met him ............. Paris.",
    "answers": [
      {"text": "In", "correct": true},
      {"text": "On", "correct": false},
      {"text": "At", "correct": false},
      {"text": "For", "correct": false}
    ],
    "explanation": "'In' is used to indicate a location within a city or country."
  },
  {
    "question": "He was born .............. a poor family.",
    "answers": [
      {"text": "In", "correct": true},
      {"text": "On", "correct": false},
      {"text": "At", "correct": false},
      {"text": "For", "correct": false}
    ],
    "explanation": "'In' is used to indicate the origin or environment in which someone was born."
  },
  {
    "question": "The street was filled .............. people.",
    "answers": [
      {"text": "With", "correct": true},
      {"text": "By", "correct": false},
      {"text": "Of", "correct": false},
      {"text": "For", "correct": false}
    ],
    "explanation": "'With' is used to indicate a condition or state of being filled."
  },
  {
    "question": "The room is furnished ............. modern furniture.",
    "answers": [
      {"text": "With", "correct": true},
      {"text": "By", "correct": false},
      {"text": "Of", "correct": false},
      {"text": "For", "correct": false}
    ],
    "explanation": "'With' is used to indicate the presence of something."
  },
  {
    "question": "I am tired ............ waiting.",
    "answers": [
      {"text": "Of", "correct": true},
      {"text": "For", "correct": false},
      {"text": "At", "correct": false},
      {"text": "From", "correct": false}
    ],
    "explanation": "'Of' is used to indicate a feeling or condition resulting from an action or state."
  },
  {
    "question": "She is fond ............. playing the guitar.",
    "answers": [
      {"text": "Of", "correct": true},
      {"text": "For", "correct": false},
      {"text": "At", "correct": false},
      {"text": "From", "correct": false}
    ],
    "explanation": "'Of' is used to indicate a liking or preference for something."
  },
  {
    "question": "She apologized ............. her mistake.",
    "answers": [
      {"text": "For", "correct": true},
      {"text": "To", "correct": false},
      {"text": "Of", "correct": false},
      {"text": "At", "correct": false}
    ],
    "explanation": "'For' is used to indicate the reason or cause for an action or state."
  },
  {
    "question": "He is accused .............. theft.",
    "answers": [
      {"text": "Of", "correct": true},
      {"text": "For", "correct": false},
      {"text": "With", "correct": false},
      {"text": "In", "correct": false}
    ],
    "explanation": "'Of' is used to indicate the action or crime one is accused of committing."
  },
  {
    "question": "He insisted ............. his innocence.",
    "answers": [
      {"text": "On", "correct": true},
      {"text": "In", "correct": false},
      {"text": "At", "correct": false},
      {"text": "For", "correct": false}
    ],
    "explanation": "'On' is used to indicate a strong assertion or belief in something."
  },
  {
    "question": "I agree ............. you on that point.",
    "answers": [
      {"text": "With", "correct": true},
      {"text": "To", "correct": false},
      {"text": "On", "correct": false},
      {"text": "At", "correct": false}
    ],
    "explanation": "'With' is used to indicate agreement or conformity with someone or something."
  },
  {
    "question": "She is confident .............. her ability to succeed.",
    "answers": [
      {"text": "In", "correct": true},
      {"text": "Of", "correct": false},
      {"text": "On", "correct": false},
      {"text": "At", "correct": false}
    ],
    "explanation": "'In' is used to indicate trust or belief in one's own ability."
  },
  {
    "question": "He succeeded ............. his efforts.",
    "answers": [
      {"text": "In", "correct": true},
      {"text": "Of", "correct": false},
      {"text": "On", "correct": false},
      {"text": "At", "correct": false}
    ],
    "explanation": "'In' is used to indicate achieving success as a result of one's efforts."
  },
  {
    "question": "The project depends ............. timely completion of the funding.",
    "answers": [
      {"text": "On", "correct": true},
      {"text": "In", "correct": false},
      {"text": "At", "correct": false},
      {"text": "For", "correct": false}
    ],
    "explanation": "'On' is used to indicate reliance or dependence on something for a particular outcome."
  },
  {
    "question": "He prides himself .............. his knowledge of history.",
    "answers": [
      {"text": "On", "correct": true},
      {"text": "In", "correct": false},
      {"text": "At", "correct": false},
      {"text": "For", "correct": false}
    ],
    "explanation": "'On' is used to indicate taking satisfaction or feeling proud of something."
  },{
    "question": "The tag question of 'come here' is...................",
    "answers": [
      {"text": "Will you?", "correct": true},
      {"text": "do you?", "correct": false},
      {"text": "shall you?", "correct": false},
      {"text": "won't you?", "correct": false}
    ],
    "explanation": "The tag question for 'come here' is 'Will you?'"
  },
  {
    "question": "The opposite of 'qualify’ is...................",
    "answers": [
      {"text": "unqualify", "correct": false},
      {"text": "disqualify", "correct": true},
      {"text": "misqualify", "correct": false},
      {"text": "nonqualify", "correct": false}
    ],
    "explanation": "The opposite of 'qualify' is 'disqualify'."
  },
  {
    "question": "Do you mind if [...........0..0.0.8.. here?",
    "answers": [
      {"text": "sit", "correct": false},
      {"text": "will sit", "correct": false},
      {"text": "have sit", "correct": false},
      {"text": "sat", "correct": true}
    ],
    "explanation": "The correct form is 'Do you mind if I sit here?'"
  },
  {
    "question": "The tag question for 'I am running a shop nowadays’ is ...................",
    "answers": [
      {"text": "amn't I?", "correct": false},
      {"text": "are I", "correct": false},
      {"text": "aren't I", "correct": true},
      {"text": "none of these", "correct": false}
    ],
    "explanation": "The tag question for 'I am running a shop nowadays' is 'aren't I?'"
  },
  {
    "question": "The past participle of 'seek' is ..............",
    "answers": [
      {"text": "Seeked", "correct": false},
      {"text": "had seeked", "correct": false},
      {"text": "sought", "correct": true},
      {"text": "none of these", "correct": false}
    ],
    "explanation": "The past participle of 'seek' is 'sought'."
  },
  {
    "question": "Carmen................ when she was only four.",
    "answers": [
      {"text": "was dying", "correct": false},
      {"text": "died", "correct": true},
      {"text": "had died", "correct": false},
      {"text": "dies", "correct": false}
    ],
    "explanation": "Carmen 'died' when she was only four."
  },
  {
    "question": "The initial sound in the word 'czech' is realized as the initial sound in ....................",
    "answers": [
      {"text": "size", "correct": false},
      {"text": "chain", "correct": false},
      {"text": "zinc", "correct": true},
      {"text": "cell", "correct": false}
    ],
    "explanation": "The initial sound in the word 'czech' is realized as the initial sound in 'zinc'."
  },
  {
    "question": "The final consonant in the word 'vase' is the same as the medial consonant in................",
    "answers": [
      {"text": "raiser", "correct": false},
      {"text": "closure", "correct": true},
      {"text": "bazaar", "correct": false},
      {"text": "motion", "correct": false}
    ],
    "explanation": "The final consonant in the word 'vase' is the same as the medial consonant in 'closure'."
  },
  {
    "question": "The number of syllables is 4 in the word... .................",
    "answers": [
      {"text": "Society", "correct": false},
      {"text": "chocolate", "correct": true},
      {"text": "Zoological", "correct": false},
      {"text": "respected", "correct": false}
    ],
    "explanation": "The word 'chocolate' has 4 syllables."
  },
  {
    "question": "The word ............ 0.2.04. is stressed on the third syllable",
    "answers": [
      {"text": "respectable", "correct": true},
      {"text": "accidental", "correct": false},
      {"text": "happily", "correct": false},
      {"text": "temporariness", "correct": false}
    ],
    "explanation": "The word 'respectable' is stressed on the third syllable."
  },
  {
    "question": "The set A = {x:x ER, x* = 16 and 2x = 6} equals ......",
    "answers": [
      {"text": "{4, 3}", "correct": true},
      {"text": "{-4, 4, 3}", "correct": false},
      {"text": "{3}", "correct": false},
      {"text": "null set", "correct": false}
    ],
    "explanation": "The set A = {x: x ∈ ℝ, x² = 16 and 2x = 6} equals {4, 3}."
  },
  {
    "question": "The range of the function f(x) = x² - 6x + 7 is",
    "answers": [
      {"text": "(-∞, -2)", "correct": false},
      {"text": "(-2, 3)", "correct": true},
      {"text": "(∞, ∞)", "correct": false},
      {"text": "[-2, 0)", "correct": false}
    ],
    "explanation": "The range of the function f(x) = x² - 6x + 7 is (-2, 3)."
  },
  {
    "question": "In any triangle ABC, if sin A: sin B: sin C = 1:2:3 and b = 4, then the perimeter of the triangle is",
    "answers": [
      {"text": "8", "correct": false},
      {"text": "10", "correct": true},
      {"text": "12", "correct": false},
      {"text": "14", "correct": false}
    ],
    "explanation": "Given sin A: sin B: sin C = 1:2:3 and b = 4, the perimeter of the triangle is 10."
  },
  {
    "question": "If cos²x + cos²y = 1, then x² + y² =",
    "answers": [
      {"text": "0", "correct": true},
      {"text": "1", "correct": false},
      {"text": "2", "correct": false},
      {"text": "3", "correct": false}
    ],
    "explanation": "If cos²x + cos²y = 1, then x² + y² = 0."
  },
  {
    "question": "The general solution of tanθ tan2θ = 1 is",
    "answers": [
      {"text": "π/5", "correct": false},
      {"text": "3π/4", "correct": true},
      {"text": "4π/3", "correct": false},
      {"text": "π", "correct": false}
    ],
    "explanation": "The general solution of tanθ tan2θ = 1 is 3π/4."
  },
  {
    "question": "The equation of the straight line through the point (1, 2) whose distance from the point (3, 1) has the greatest possible value is",
    "answers": [
      {"text": "y = 2x", "correct": false},
      {"text": "y = x", "correct": false},
      {"text": "y = -2x", "correct": false},
      {"text": "y = -x", "correct": true}
    ],
    "explanation": "The equation of the straight line through (1, 2) with the greatest distance to (3, 1) is y = -x."
  },
  {
    "question": "The equation ax² + 3xy - 7y² = 0 represents two straight lines inclined at an angle θ if a =",
    "answers": [
      {"text": "5", "correct": true},
      {"text": "7", "correct": false},
      {"text": "±5", "correct": false},
      {"text": "-7", "correct": false}
    ],
    "explanation": "The equation ax² + 3xy - 7y² = 0 represents two straight lines inclined at an angle θ if a = 5."
  },{
    "question": "The tag question of 'come here' is...................",
    "answers": [
      {"text": "Will you?", "correct": true},
      {"text": "do you?", "correct": false},
      {"text": "shall you?", "correct": false},
      {"text": "won't you?", "correct": false}
    ],
    "explanation": "The tag question for 'come here' is 'Will you?'"
  },
  {
    "question": "The opposite of 'qualify’ is...................",
    "answers": [
      {"text": "unqualify", "correct": false},
      {"text": "disqualify", "correct": true},
      {"text": "misqualify", "correct": false},
      {"text": "nonqualify", "correct": false}
    ],
    "explanation": "The opposite of 'qualify' is 'disqualify'."
  },
  {
    "question": "Do you mind if [...........0..0.0.8.. here?",
    "answers": [
      {"text": "sit", "correct": false},
      {"text": "will sit", "correct": false},
      {"text": "have sit", "correct": false},
      {"text": "sat", "correct": true}
    ],
    "explanation": "The correct phrase is 'Do you mind if I sat here?'"
  },
  {
    "question": "The tag question for 'I am running a shop nowadays’ is ...................",
    "answers": [
      {"text": "amn't I?", "correct": false},
      {"text": "are I", "correct": false},
      {"text": "aren't I", "correct": true},
      {"text": "none of these", "correct": false}
    ],
    "explanation": "The tag question for 'I am running a shop nowadays' is 'aren't I?'"
  },
  {
    "question": "The past participle of 'seek' is ...................",
    "answers": [
      {"text": "Seeked", "correct": false},
      {"text": "had seeked", "correct": false},
      {"text": "sought", "correct": true},
      {"text": "none of these", "correct": false}
    ],
    "explanation": "The past participle of 'seek' is 'sought'."
  },
  {
    "question": "Carmen................ when she was only four",
    "answers": [
      {"text": "was dying", "correct": false},
      {"text": "died", "correct": true},
      {"text": "had died", "correct": false},
      {"text": "dies", "correct": false}
    ],
    "explanation": "The correct form is 'Carmen died when she was only four.'"
  },
  {
    "question": "The initial sound in the word 'czech' is realized as the initial sound in ...................",
    "answers": [
      {"text": "size", "correct": false},
      {"text": "chain", "correct": true},
      {"text": "zinc", "correct": false},
      {"text": "cell", "correct": false}
    ],
    "explanation": "The initial sound in 'czech' is similar to the initial sound in 'chain'."
  },
  {
    "question": "The final consonant in the word ‘vase’ is the same as the medial consonant in...................",
    "answers": [
      {"text": "raiser", "correct": false},
      {"text": "closure", "correct": true},
      {"text": "bazaar", "correct": false},
      {"text": "motion", "correct": false}
    ],
    "explanation": "The final consonant in 'vase' is the same as the medial consonant in 'closure'."
  },
  {
    "question": "The number of syllables is 4 in the word... ...................",
    "answers": [
      {"text": "Society", "correct": false},
      {"text": "chocolate", "correct": false},
      {"text": "Zoological", "correct": true},
      {"text": "respected", "correct": false}
    ],
    "explanation": "The word 'Zoological' has 4 syllables."
  },
  {
    "question": "The word ............ 0.2.04. is stressed on the third syllable",
    "answers": [
      {"text": "respectable", "correct": true},
      {"text": "accidental", "correct": false},
      {"text": "happily", "correct": false},
      {"text": "temporariness", "correct": false}
    ],
    "explanation": "The word 'respectable' is stressed on the third syllable."
  },{
    "question": "The set A = {x:x ∈ ℝ, x* = 16 and 2x = 6} equals ......",
    "answers": [
      {"text": "{4, 3}", "correct": true},
      {"text": "{-4, 4, 3}", "correct": false},
      {"text": "{3}", "correct": false},
      {"text": "null set", "correct": false}
    ],
    "explanation": "The set A = {x ∈ ℝ : x* = 16 and 2x = 6} equals {4, 3}."
  },
  {
    "question": "The range of the function f(x) = x² — 6x + 7 is ......",
    "answers": [
      {"text": "(-∞, -2)", "correct": false},
      {"text": "(-2, 3)", "correct": true},
      {"text": "(∞, ∞)", "correct": false},
      {"text": "[-2, 0)", "correct": false}
    ],
    "explanation": "The range of the function f(x) = x² — 6x + 7 is (-2, 3)."
  },
  {
    "question": "In any triangle ABC, if sin A: sin B: sin C = 1:2:3 and b = 4, then the perimeter of the triangle is ......",
    "answers": [
      {"text": "8", "correct": true},
      {"text": "10", "correct": false},
      {"text": "12", "correct": false},
      {"text": "14", "correct": false}
    ],
    "explanation": "Given sin A: sin B: sin C = 1:2:3 and b = 4, the perimeter of the triangle is 8."
  },
  {
    "question": "If cos²x + cos²y = 1, then x² + y² = ......",
    "answers": [
      {"text": "0", "correct": false},
      {"text": "1", "correct": true},
      {"text": "2", "correct": false},
      {"text": "3", "correct": false}
    ],
    "explanation": "From cos²x + cos²y = 1, we have x² + y² = 1."
  },
  {
    "question": "The general solution of tanθ tan2θ = 1 is ......",
    "answers": [
      {"text": "π/4 + nπ", "correct": true},
      {"text": "6nπ", "correct": false},
      {"text": "4nπ", "correct": false},
      {"text": "0", "correct": false}
    ],
    "explanation": "The general solution of tanθ tan2θ = 1 is θ = π/4 + nπ, where n is any integer."
  },
  {
    "question": "The equation of the straight line through the point (1, 2) whose distance from the point (3, 1) has the greatest possible value is ......",
    "answers": [
      {"text": "y = -2x", "correct": true},
      {"text": "y = 2x", "correct": false},
      {"text": "y = x", "correct": false},
      {"text": "y = -x", "correct": false}
    ],
    "explanation": "The equation of the straight line through (1, 2) with the greatest possible distance from (3, 1) is y = -2x."
  },
  {
    "question": "The equation ax² + 3xy - 7y² = 0 represents two straight lines inclined at an angle θ if a = ......",
    "answers": [
      {"text": "5", "correct": true},
      {"text": "7", "correct": false},
      {"text": "±5", "correct": false},
      {"text": "-7", "correct": false}
    ],
    "explanation": "The equation ax² + 3xy - 7y² = 0 represents two straight lines inclined at an angle θ if a = 5."
  },
  {
    "question": "If the circles x² + y² - 9 = 0 and x² + y² + 2ax + 2y + 1 = 0 touch each other externally, then the value of a is ......",
    "answers": [
      {"text": "-3", "correct": true},
      {"text": "0", "correct": false},
      {"text": "-5", "correct": false},
      {"text": "<", "correct": false}
    ],
    "explanation": "For external touching of circles, the value of a = -3."
  },
  {
    "question": "If a focal chord of the parabola y² = ax is 2x - y - 8 = 0, then the equation of the directrix is ......",
    "answers": [
      {"text": "x = -16", "correct": false},
      {"text": "x = 16", "correct": true},
      {"text": "x = 4", "correct": false},
      {"text": "x = -4", "correct": false}
    ],
    "explanation": "The focal chord 2x - y - 8 = 0 of the parabola y² = ax gives the directrix equation x = 16."
  },
  {
    "question": "The equation 10p² - 5 = 0 represents an ellipse if ......",
    "answers": [
      {"text": "p > 4", "correct": true},
      {"text": "p < 4", "correct": false},
      {"text": "4 < p", "correct": false},
      {"text": "p < -4", "correct": false}
    ],
    "explanation": "For the equation 10p² - 5 = 0 to represent an ellipse, p must be greater than 4."
  },{
    "question": "C4H3 on ozonolysis gives propanone and methanal. The compound is",
    "answers": [
        {"text": "2-methyl-2-butene", "correct": true},
        {"text": "1-butene", "correct": false},
        {"text": "2-butene", "correct": false},
        {"text": "2-methylpropene", "correct": false}
    ],
    "explanation": "C4H3 on ozonolysis giving propanone and methanal suggests the presence of a methyl group on the second carbon atom, hence the compound is 2-methyl-2-butene."
},
{
    "question": "Which one of the following has highest electronegativity?",
    "answers": [
        {"text": "N", "correct": false},
        {"text": "Cl", "correct": true},
        {"text": "O", "correct": false},
        {"text": "F", "correct": false}
    ],
    "explanation": "Chlorine (Cl) has the highest electronegativity among the options provided."
},
{
    "question": "Iron belongs to which block of the periodic table?",
    "answers": [
        {"text": "d-block", "correct": true},
        {"text": "f-block", "correct": false},
        {"text": "s-block", "correct": false},
        {"text": "p-block", "correct": false}
    ],
    "explanation": "Iron (Fe) belongs to the d-block of the periodic table."
},
{
    "question": "The metallic character in moving from left to right in a period in the periodic table",
    "answers": [
        {"text": "increases", "correct": false},
        {"text": "remains constant", "correct": false},
        {"text": "first decreases then increases", "correct": true},
        {"text": "decreases", "correct": false}
    ],
    "explanation": "Metallic character generally decreases from left to right across a period, but it shows a slight increase after reaching a minimum due to the transition from highly electropositive metals to less electropositive metals."
},
{
    "question": "Which one of the following has the smallest radius?",
    "answers": [
        {"text": "S", "correct": true},
        {"text": "Cr", "correct": false},
        {"text": "Ca", "correct": false},
        {"text": "K", "correct": false}
    ],
    "explanation": "Sulfur (S) has the smallest atomic radius among the options provided."
},
{
    "question": "'x' gm of an element gave 'y' gm of its oxide. The equivalent weight of the element is...",
    "answers": [
        {"text": "(y-x)", "correct": false},
        {"text": "(y-x)/2", "correct": true},
        {"text": "2(y-x)", "correct": false},
        {"text": "x/y", "correct": false}
    ],
    "explanation": "Equivalent weight is defined as the weight of an element which combines with or displaces 1.008 parts by weight of hydrogen or 8 parts by weight of oxygen. Here, (y-x)/2 represents the equivalent weight of the element."
},
{
    "question": "Ammonia can be dried by...",
    "answers": [
        {"text": "Conc. H2SO4", "correct": false},
        {"text": "CaO", "correct": false},
        {"text": "P2O5", "correct": true},
        {"text": "anhydrous CaCl2", "correct": false}
    ],
    "explanation": "Phosphorus pentoxide (P2O5) is commonly used to dry ammonia gas."
},
{
    "question": "When Zinc reacts with cold and very dilute HNO3 it produces...",
    "answers": [
        {"text": "NO2", "correct": false},
        {"text": "NH4NO3", "correct": true},
        {"text": "H2", "correct": false},
        {"text": "NO", "correct": false}
    ],
    "explanation": "Zinc reacts with cold and very dilute nitric acid to produce ammonium nitrate (NH4NO3)."
},
{
    "question": "Which one of the following turns lead acetate paper black?",
    "answers": [
        {"text": "H2S", "correct": true},
        {"text": "SO2", "correct": false},
        {"text": "SO3", "correct": false},
        {"text": "CO2", "correct": false}
    ],
    "explanation": "Hydrogen sulfide (H2S) turns lead acetate paper black due to the formation of lead sulfide (PbS), which is black."
},
{
    "question": "Washing Soda on heating evolves...",
    "answers": [
        {"text": "CO2", "correct": false},
        {"text": "CO", "correct": true},
        {"text": "H2O", "correct": false},
        {"text": "C2O3", "correct": false}
    ],
    "explanation": "Washing soda (sodium carbonate, Na2CO3) on heating decomposes to give sodium oxide (Na2O), carbon dioxide (CO2), and water vapor (H2O)."
},
{
    "question": "Copper pyrites are concentrated by:",
    "answers": [
        {"text": "Electromagnetic method", "correct": false},
        {"text": "Gravity method", "correct": false},
        {"text": "Froth-floatation method", "correct": true},
        {"text": "All of the above methods", "correct": false}
    ],
    "explanation": "Copper pyrites are concentrated by froth-floatation method, which takes advantage of the differences in surface properties of copper sulfide and gangue minerals."
}
];



const Mock3 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [timer, setTimer] = useState(TOTAL_TIME);

  useEffect(() => {
    let countdown;
    if (timer > 0 && !showScore) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }

    return () => clearInterval(countdown);
  }, [timer, showScore]);

  const handleAnswerOptionClick = (correct, text) => {
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedAnswer(text);
    const correctAnswer = quizData2077[currentQuestion].answers.find(
      (answer) => answer.correct
    ).text;
    setCorrectAnswer(correctAnswer);
    setTimeout(() => {
      handleNextQuestion();
    }, 5000); // wait for 1 second before moving to the next question
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData2077.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setTimer(TOTAL_TIME);
  };

  return (
    <>
      <div className="container mx-auto text-center mt-20 p-4">
        <div className="header mb-4">
          <img src={logo} alt="University Logo" className="mx-auto w-32 h-auto mb-4" />
          <h1 className="text-2xl font-bold">FAR WESTERN UNIVERSITY</h1>
          <h2 className="text-xl">Faculty of Engineering</h2>
          <h3 className="text-lg">Mahendranagar, Kanchanpur, Nepal</h3>
          <h3 className="text-lg">BE Entrance Examination</h3>
        </div>
        <div className="exam-info mb-4">
          <p className="text-lg"><strong>Full Marks: 150</strong></p>
          <p className="text-lg"><strong>Time: 3 hours</strong></p>
        </div>
        <div className="instructions text-left mx-auto w-full">
          <p className="font-bold">Attempt all questions:</p>
          <p className="mb-2">Read the following questions and Click down the correct option <strong>a, b, c,</strong> or <strong>d</strong> in the answer sheet provided. In section I each question carries <strong>1 (one) mark</strong> and in section II each question carries <strong>2 (two) marks</strong>.</p>
        </div>
      </div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex justify-center items-center bg-gray-100 p-4 text-gray-800">
          <div className="w-full max-w-4xl">
            {showScore ? (
              <div className="text-center">
                <h4 className="text-2xl font-bold mt-12 w-full">Quiz Completed</h4>
                <h5 className="text-xl mb-4">
                  You scored {score} out of {quizData2077.length}
                </h5>
                <div className="mt-4 text-left">
                  {quizData2077.map((question, index) => (
                    <div key={index} className="mb-4">
                      <h6 className="text-lg">{question.question}</h6>
                      <p className="text-sm text-gray-800">
                        {question.explanation}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  className="px-4 py-2 mt-4 bg-purple-500 hover:bg-purple-600 text-white rounded"
                  onClick={handleRestartQuiz}
                >
                  Restart Quiz
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <h5 className="text-xl mb-2">
                    Question {currentQuestion + 1}/{quizData2077.length}
                  </h5>
                  <p className="text-base mb-2">
                    {quizData2077[currentQuestion].question}
                  </p>
                  <p className="text-sm text-red-600">
                    Time remaining: {Math.floor(timer / 60)} minutes {timer % 60} seconds
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {quizData2077[currentQuestion].answers.map(
                    (answerOption, index) => (
                      <button
                        key={index}
                        className={`w-full px-4 py-2 rounded ${
                          selectedAnswer === answerOption.text
                            ? answerOption.correct
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-red-500 hover:bg-red-600 text-white"
                            : correctAnswer === answerOption.text
                              ? "bg-green-500 text-white"
                              : "bg-purple-500 hover:bg-purple-600 text-white"
                        }`}
                        onClick={() =>
                          handleAnswerOptionClick(
                            answerOption.correct,
                            answerOption.text
                          )
                        }
                        disabled={selectedAnswer !== null}
                      >
                        {answerOption.text}
                      </button>
                    )
                  )}
                </div>
                <div className="mt-20 flex justify-between">
                  <button
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded disabled:bg-gray-400"
                    onClick={handleRestartQuiz}
                  >
                    Restart Quiz
                  </button>
                  <button
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded disabled:bg-gray-400"
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Mock3;

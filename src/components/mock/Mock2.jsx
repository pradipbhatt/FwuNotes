import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import logo from "../../../public/fwu.png";

// Total time in seconds for 150 questions in 3 hours
const TOTAL_TIME = 3 * 60 * 60;
const quizData2077 = [
  {
    "question": "The angle between the vectors a = i + j + k and b = i - j + k is",
    "answers": [
      { "text": "cos^-1(1/4)", "correct": false },
      { "text": "cos^-1(1/3)", "correct": true },
      { "text": "cos^-1(1/2)", "correct": false },
      { "text": "cos^-1(1/sqrt(3))", "correct": false }
    ],
    "explanation": "The angle between two vectors can be found using the dot product formula."
  },
  {
    "question": "If a = i + j - k and b = i - j + k then the magnitude of the vector 2a + 3b is",
    "answers": [
      { "text": "sqrt(3)", "correct": false },
      { "text": "9", "correct": false },
      { "text": "3", "correct": false },
      { "text": "3sqrt(3)", "correct": true }
    ],
    "explanation": "Calculate 2a + 3b and then find the magnitude of the resulting vector."
  },
  {
    "question": "If A = [[1, 2], [3, 4]] and B = [[5, 6], [7, 8]], then the matrix AB is equal to",
    "answers": [
      { "text": "[[19, 22], [43, 50]]", "correct": true },
      { "text": "[[23, 34], [31, 46]]", "correct": false },
      { "text": "[[39, 54], [47, 68]]", "correct": false },
      { "text": "[[21, 28], [45, 60]]", "correct": false }
    ],
    "explanation": "Matrix multiplication is done by taking the dot product of rows and columns."
  },
  {
    "question": "A square matrix A is said to be a singular matrix if",
    "answers": [
      { "text": "|A| = 1", "correct": false },
      { "text": "|A| = 0", "correct": true },
      { "text": "|A| ≠ 1", "correct": false },
      { "text": "|A| > 1", "correct": false }
    ],
    "explanation": "A singular matrix is one that does not have an inverse, which happens if its determinant is zero."
  },
  {
    "question": "The value of i + i^2 + i^3 is",
    "answers": [
      { "text": "2i - 1", "correct": false },
      { "text": "2i + 1", "correct": false },
      { "text": "-1", "correct": true },
      { "text": "1", "correct": false }
    ],
    "explanation": "i is the imaginary unit where i^2 = -1."
  },
  {
    "question": "The product of the roots of the equation 3x^2 - 2x + 1 is",
    "answers": [
      { "text": "1", "correct": false },
      { "text": "-1", "correct": true },
      { "text": "2", "correct": false },
      { "text": "-2", "correct": false }
    ],
    "explanation": "For a quadratic equation ax^2 + bx + c = 0, the product of the roots is c/a."
  },
  {
    "question": "If a, b, c are in GP. then a^2, b^2, c^2 are in",
    "answers": [
      { "text": "AP", "correct": false },
      { "text": "GP", "correct": true },
      { "text": "HP", "correct": false },
      { "text": "AGP", "correct": false }
    ],
    "explanation": "If numbers are in geometric progression, their squares are also in geometric progression."
  },
  {
    "question": "In how many ways can 8 guests and a host be seated at a circular table?",
    "answers": [
      { "text": "7!", "correct": true },
      { "text": "8!", "correct": false },
      { "text": "9!", "correct": false },
      { "text": "10!", "correct": false }
    ],
    "explanation": "For circular permutations, the number of ways to arrange n people is (n-1)!"
  },
  {
    "question": "If n is a positive integer, then how many terms are there in the expansion of (x + a)^n?",
    "answers": [
      { "text": "n-1", "correct": false },
      { "text": "n", "correct": false },
      { "text": "n+1", "correct": true },
      { "text": "n^2", "correct": false }
    ],
    "explanation": "The binomial expansion of (x + a)^n has (n + 1) terms."
  },
  {
    "question": "The value of 1 + 1/1! + 1/2! + 1/3! is",
    "answers": [
      { "text": "e", "correct": false },
      { "text": "e + 1", "correct": false },
      { "text": "e - 2", "correct": false },
      { "text": "e - 1", "correct": true }
    ],
    "explanation": "This is a partial sum of the series for e, which starts as 1 + 1/1! + 1/2! + 1/3!..."
  },
  {
    "question": "Apparent frequency received by a listener when the source of sound and listener are approaching each other is",
    "answers": [
      { "text": "(v + vr) / (v - vs)", "correct": false },
      { "text": "(v - vr) / (v + vs)", "correct": false },
      { "text": "(v + vr) / (v + vs)", "correct": true },
      { "text": "(v - vr) / (v - vs)", "correct": false }
    ],
    "explanation": "The Doppler effect formula for sound approaching the listener is used."
  },
  {
    "question": "At same temperature and pressure, velocity of sound is highest in",
    "answers": [
      { "text": "hydrogen", "correct": true },
      { "text": "oxygen", "correct": false },
      { "text": "nitrogen", "correct": false },
      { "text": "carbon dioxide", "correct": false }
    ],
    "explanation": "Velocity of sound is inversely proportional to the square root of the molecular mass."
  },
  {
    "question": "Expression for lateral shift is",
    "answers": [
      { "text": "t sin(i - r) / cos(r)", "correct": true },
      { "text": "t sin(i + r) / cos(r)", "correct": false },
      { "text": "t sin(r - i) / cos(r)", "correct": false },
      { "text": "t sin(i - r) / sin(r)", "correct": false }
    ],
    "explanation": "Lateral shift is the perpendicular distance between the incident ray and emergent ray."
  },
  {
    "question": "When light travels from air into water",
    "answers": [
      { "text": "frequency decreases", "correct": false },
      { "text": "frequency increases", "correct": false },
      { "text": "wavelength increases", "correct": false },
      { "text": "wavelength decreases", "correct": true }
    ],
    "explanation": "When light enters a denser medium, its speed and wavelength decrease."
  },
  {
    "question": "When Young's double slit experiment is carried inside water with same geometry, fringe width",
    "answers": [
      { "text": "increases", "correct": false },
      { "text": "decreases", "correct": true },
      { "text": "remains same", "correct": false },
      { "text": "first increases and then decreases", "correct": false }
    ],
    "explanation": "Fringe width is directly proportional to the wavelength, which decreases in water."
  },
  {
    "question": "At 0°C, kinetic energy of gas molecule is",
    "answers": [
      { "text": "zero", "correct": false },
      { "text": "negative", "correct": false },
      { "text": "positive", "correct": true },
      { "text": "none of these", "correct": false }
    ],
    "explanation": "Kinetic energy of gas molecules is always positive as long as temperature is above absolute zero."
  },
  {
    "question": "Two bodies will be in thermal equilibrium when they have same",
    "answers": [
      { "text": "heat energy", "correct": false },
      { "text": "specific heat capacity", "correct": false },
      { "text": "temperature", "correct": true },
      { "text": "thermal conductivity", "correct": false }
    ],
    "explanation": "Thermal equilibrium is achieved when two bodies reach the same temperature."
  },
  {
    "question": "Isobaric process takes place at constant",
    "answers": [
      { "text": "pressure", "correct": true },
      { "text": "volume", "correct": false },
      { "text": "temperature", "correct": false },
      { "text": "none of these", "correct": false }
    ],
    "explanation": "An isobaric process occurs at a constant pressure."
  },
  {
    "question": "Ideal gas is considered under",
    "answers": [
      { "text": "high pressure and high temperature", "correct": false },
      { "text": "high pressure and low temperature", "correct": false },
      { "text": "low pressure and low temperature", "correct": false },
      { "text": "low pressure and high temperature", "correct": true }
    ],
    "explanation": "Ideal gas behavior is most closely approximated at low pressure and high temperature."
  },
  {
    "question": "Entropy change during adiabatic process is",
    "answers": [
      { "text": "zero", "correct": true },
      { "text": "positive", "correct": false },
      { "text": "negative", "correct": false },
      { "text": "infinite", "correct": false }
    ],
    "explanation": "In an adiabatic process, there is no heat exchange, so entropy remains constant."
  },
  {
    "question": "Hardness of water is due to",
    "answers": [
      { "text": "Sodium bicarbonate", "correct": false },
      { "text": "Calcium carbonate", "correct": true },
      { "text": "Potassium carbonate", "correct": false },
      { "text": "Magnesium chloride", "correct": true }
    ],
    "explanation": "Hard water contains high levels of calcium and magnesium ions."
  },
  {
    "question": "Haber's process is used for the manufacture of",
    "answers": [
      { "text": "Nitrogen", "correct": false },
      { "text": "Ammonia", "correct": true },
      { "text": "Hydrogen", "correct": false },
      { "text": "Nitric oxide", "correct": false }
    ],
    "explanation": "The Haber process synthesizes ammonia from nitrogen and hydrogen gases."
  },
  {
    "question": "Which of the following is an amorphous form of Sulphur?",
    "answers": [
      { "text": "Rhombic", "correct": false },
      { "text": "Monoclinic", "correct": false },
      { "text": "Milk of Sulphur", "correct": true },
      { "text": "Beta Sulphur", "correct": false }
    ],
    "explanation": "Amorphous sulfur forms include milk of sulfur, which lacks a crystalline structure."
  },
  {
    "question": "__________ changes the starch emulsion into blue-black color",
    "answers": [
      { "text": "Fluorine", "correct": false },
      { "text": "Chlorine", "correct": false },
      { "text": "Bromine", "correct": false },
      { "text": "Iodine", "correct": true }
    ],
    "explanation": "Iodine reacts with starch to produce a blue-black color."
  },
  {
    "question": "Tincture of iodine is",
    "answers": [
      { "text": "KI", "correct": false },
      { "text": "KI + I2", "correct": false },
      { "text": "KI + I2 + C2H5OH", "correct": true },
      { "text": "KI + I2 + Ti", "correct": false }
    ],
    "explanation": "Tincture of iodine is an antiseptic solution consisting of iodine dissolved in ethanol."
  },
  {
    "question": "Haematite is an ore of",
    "answers": [
      { "text": "Iron", "correct": true },
      { "text": "Copper", "correct": false },
      { "text": "Silver", "correct": false },
      { "text": "Magnesium", "correct": false }
    ],
    "explanation": "Haematite is a primary ore of iron."
  },
  {
    "question": "When brine solution is saturated with ammonia in the presence of carbon dioxide gas, the resulting products is/are",
    "answers": [
      { "text": "Ammonium bicarbonate", "correct": true },
      { "text": "Sodium bicarbonate", "correct": false },
      { "text": "Ammonium bicarbonate or sodium bicarbonate", "correct": false },
      { "text": "Ammonium bicarbonate and sodium bicarbonate", "correct": false }
    ],
    "explanation": "The Solvay process produces ammonium bicarbonate when brine and ammonia are reacted with carbon dioxide."
  },
  {
    "question": "Steel is an alloy of iron containing _________ percent of carbon with possibly traces of phosphorus, sulphur, and silicon.",
    "answers": [
      { "text": "2 to 4", "correct": false },
      { "text": "0.2 to 2", "correct": true },
      { "text": "0.02 to 0.2", "correct": false },
      { "text": "0.002 to 0.02", "correct": false }
    ],
    "explanation": "Steel typically contains 0.2 to 2 percent carbon, which gives it its hardness and strength."
  },
  {
    "question": "Blistering of blister copper is due to",
    "answers": [
      { "text": "Inherent property", "correct": false },
      { "text": "Dissolved gas molecules", "correct": false },
      { "text": "Escaping of dissolved gas from molten mass", "correct": true },
      { "text": "The presence of oxide moieties", "correct": false }
    ],
    "explanation": "Blister copper gets its name from the blisters formed on its surface due to escaping gas."
  },{
    "question": "Which of the following compound shows thermochromic property?",
    "answers": [
        {"text": "FeO", "correct": false},
        {"text": "CuO", "correct": false},
        {"text": "Na2O", "correct": false},
        {"text": "ZnO", "correct": true}
    ],
    "explanation": "Zinc oxide (ZnO) exhibits thermochromic properties, changing color with temperature."
},
{
    "question": "Had she run away, she ...... by police?",
    "answers": [
        {"text": "Won't be caught", "correct": false},
        {"text": "Wouldn’t have been caught", "correct": true},
        {"text": "Wouldn’t be caught", "correct": false},
        {"text": "Will be caught", "correct": false}
    ],
    "explanation": "The correct answer 'Wouldn’t have been caught' indicates a hypothetical past condition and its consequence."
},
{
    "question": "Which of the following word has different vowel sound than the rest?",
    "answers": [
        {"text": "Pear", "correct": false},
        {"text": "Pair", "correct": false},
        {"text": "Care", "correct": true},
        {"text": "Rare", "correct": false}
    ],
    "explanation": "The word 'Care' has a different vowel sound (/eə/) compared to 'Pear', 'Pair', and 'Rare'."
},
{
    "question": "Which of the following is true for the word ‘Collection’?",
    "answers": [
        {"text": "It contains three syllables and the first syllable is stressed.", "correct": false},
        {"text": "It contains four syllables and the second syllable is stressed", "correct": true},
        {"text": "It contains three syllables and the second syllable is stressed.", "correct": false},
        {"text": "It contains four syllables and the last syllable is stressed.", "correct": false}
    ],
    "explanation": "The word 'Collection' has four syllables ('col-lec-tion') and the stress is on the second syllable."
},
{
    "question": "My boss visits the office ............ the morning.",
    "answers": [
        {"text": "at", "correct": true},
        {"text": "on", "correct": false},
        {"text": "in", "correct": false},
        {"text": "with", "correct": false}
    ],
    "explanation": "The correct preposition to use with 'morning' in this context is 'at'."
},
{
    "question": "Tam running out ... ........money so I could not pay your debt this month.",
    "answers": [
        {"text": "up", "correct": false},
        {"text": "of", "correct": true},
        {"text": "with", "correct": false},
        {"text": "in", "correct": false}
    ],
    "explanation": "The phrase 'running out of money' means to exhaust one's supply of money."
},
{
    "question": "Which of the following is the appropriate adjective pattern?",
    "answers": [
        {"text": "attractive new Japanese car", "correct": true},
        {"text": "new attractive Japanese car", "correct": false},
        {"text": "Japanese new attractive car", "correct": false},
        {"text": "attractive Japanese new car", "correct": false}
    ],
    "explanation": "The correct adjective pattern in English is usually 'opinion-size-age-shape-color-origin-material-purpose', so 'attractive new Japanese car' is correct."
},
{
    "question": "No one told me that ......... 's going to be a party.",
    "answers": [
        {"text": "it", "correct": false},
        {"text": "there", "correct": true},
        {"text": "here", "correct": false},
        {"text": "where", "correct": false}
    ],
    "explanation": "The correct pronoun to use to refer to an event or situation that is happening is 'there'."
},
{
    "question": "Which of the following is the plural form of word crisis?",
    "answers": [
        {"text": "crisises", "correct": false},
        {"text": "crisis", "correct": false},
        {"text": "crises", "correct": true},
        {"text": "crisisses", "correct": false}
    ],
    "explanation": "The plural form of 'crisis' is 'crises'."
},
{
    "question": "Don’t put off making a decision. Which of the formal word can replace the underlined word in the sentence?",
    "answers": [
        {"text": "solve", "correct": false},
        {"text": "calculate", "correct": false},
        {"text": "organize", "correct": false},
        {"text": "postpone", "correct": true}
    ],
    "explanation": "To 'put off' means to postpone or delay something, so 'postpone' is the appropriate formal word."
},
{
    "question": "You should not wake someone up when they're.............. walking.",
    "answers": [
        {"text": "might", "correct": false},
        {"text": "dream", "correct": false},
        {"text": "day", "correct": false},
        {"text": "sleep", "correct": true}
    ],
    "explanation": "The correct phrase is 'sleepwalking', indicating someone is walking while still asleep."
},
{
    "question": "I am interested in. I don’t want to study it, ..........",
    "answers": [
        {"text": "however", "correct": false},
        {"text": "though", "correct": false},
        {"text": "although", "correct": false},
        {"text": "even though", "correct": true}
    ],
    "explanation": "The correct phrase to indicate contrast between being interested and not wanting to study is 'even though'."
},
{
    "question": "Identify the correct order of the determiners in the sentence.",
    "answers": [
        {"text": "All our many hopes were kept alive by her encouraging words.", "correct": true},
        {"text": "Our many all hopes were kept alive by her encouraging words.", "correct": false},
        {"text": "Many all our hopes were kept alive by her encouraging words.", "correct": false},
        {"text": "Our all many hopes were kept alive by her encouraging words.", "correct": false}
    ],
    "explanation": "The correct order of determiners is 'All our many hopes', indicating the specific hopes."
},
{
    "question": "Both the China institute and the Brooklyn Museum .......... Asian art.",
    "answers": [
        {"text": "are", "correct": true},
        {"text": "has", "correct": false},
        {"text": "is", "correct": false},
        {"text": "have", "correct": false}
    ],
    "explanation": "When referring to two separate entities ('China institute' and 'Brooklyn Museum'), use the plural verb 'are'."
},
{
    "question": "Most people in Argentina ................. Spanish.",
    "answers": [
        {"text": "to speak", "correct": false},
        {"text": "speak", "correct": true},
        {"text": "speaking", "correct": false},
        {"text": "speaks", "correct": false}
    ],
    "explanation": "The correct form is 'speak' as it refers to a plural subject ('most people')."
},
{
    "question": "Dr. Murray Salby, a well-known climatologist, .......... a paper about the causes of global warming.",
    "answers": [
        {"text": "are writing", "correct": false},
        {"text": "write", "correct": false},
        {"text": "writes", "correct": false},
        {"text": "is writing", "correct": true}
    ],
    "explanation": "The singular subject 'Dr. Murray Salby' requires the singular verb 'is writing'."
},
{
    "question": "The search engine BackRub............... Google in 1998.",
    "answers": [
        {"text": "became", "correct": true},
        {"text": "becomes", "correct": false},
        {"text": "become", "correct": false},
        {"text": "was becoming", "correct": false}
    ],
    "explanation": "The correct verb form for the past tense of 'become' in this context is 'became'."
},
{
    "question": "In his youth he was practically rolling in money. The underlined idiom is closest to the meaning:",
    "answers": [
        {"text": "spending more than his income", "correct": false},
        {"text": "wasting a lot of money", "correct": false},
        {"text": "Very rich", "correct": true},
        {"text": "borrowing money liberally", "correct": false}
    ],
    "explanation": "The idiom 'rolling in money' means to be very rich or have a lot of money."
},
{
    "question": "I don’t want to stifle your creativity, but your ideas for the brochure are too complicated. Let's try to make it very simple. The underlined word is closest to the meaning:",
    "answers": [
        {"text": "to let go of something", "correct": false},
        {"text": "to prevent something form happening", "correct": true},
        {"text": "to support something strongly", "correct": false},
        {"text": "to make something clear", "correct": false}
    ],
    "explanation": "To 'stifle' someone's creativity means to prevent it from developing or expressing freely."
},
{
    "question": "Which of the following is the correct sentence?",
    "answers": [
        {"text": "Rohan I was wondering where, the cookies were.", "correct": false},
        {"text": "Rohan I was wondering where the cookies, were.", "correct": false},
        {"text": "Rohan, I was wondering where the cookies were.", "correct": true},
        {"text": "Rohan I was wondering, where the cookies were.", "correct": false}
    ],
    "explanation": "The correct sentence structure includes a comma after 'Rohan' to separate the introductory clause."
},
{
    "question": "The passive of 'do not waste the time.' Is..........",
    "answers": [
        {"text": "Let the time be not wasted.", "correct": false},
        {"text": "Let not the time be wasted.", "correct": true},
        {"text": "Let the time not wasted.", "correct": false},
        {"text": "Let the time not be wasted.", "correct": false}
    ],
    "explanation": "The correct passive construction is 'Let not the time be wasted.' to retain the negative sense."
},{
  "question": "If A and B are two sets having 5 and 17 elements respectively and 2 elements are common. How many elements are there in the set A U B?",
  "answers": [
      {"text": "3", "correct": false},
      {"text": "15", "correct": false},
      {"text": "20", "correct": true},
      {"text": "12", "correct": false}
  ],
  "explanation": "The union of sets A and B includes all unique elements from both sets, considering the common elements only once."
},
{
  "question": "If a function f(x) is defined by f(x) = — then the value of f(—1) is",
  "answers": [
      {"text": "1", "correct": true},
      {"text": "0", "correct": false},
      {"text": "-1", "correct": false},
      {"text": "a", "correct": false}
  ],
  "explanation": "Substitute x = -1 into the function f(x) = -x to find f(-1) = -(-1) = 1."
},
{
  "question": "If sin @ = 1. Then the general value of @ are given by",
  "answers": [
      {"text": "nπ + (-1)", "correct": false},
      {"text": "nπ", "correct": true},
      {"text": "nw + >", "correct": false},
      {"text": "nz — .", "correct": false}
  ],
  "explanation": "For sin θ = 1, θ can take values of the form θ = nπ where n is an integer."
},
{
  "question": "The value of sin^7 x + cos^-7 x is",
  "answers": [
      {"text": "1", "correct": true},
      {"text": "x", "correct": false},
      {"text": "()5", "correct": false},
      {"text": "2", "correct": false}
  ],
  "explanation": "The sum of sin^7 x and cos^-7 x equals 1 for all values of x."
},
{
  "question": "In any triangle if tan A + tan B + tan C = 6 and tan A tan B = 3. Then the value of tan A + tan B is...",
  "answers": [
      {"text": "4", "correct": true},
      {"text": "2", "correct": false},
      {"text": "3", "correct": false},
      {"text": "9", "correct": false}
  ],
  "explanation": "Given tan A + tan B + tan C = 6 and tan A tan B = 3, tan A + tan B = 4."
},
{
  "question": "If the lines 3x + 4y = 9 and 4x + ky = 5 are perpendicular then what will be the value of k?",
  "answers": [
      {"text": "3", "correct": false},
      {"text": "−3", "correct": true},
      {"text": "4", "correct": false},
      {"text": "−4", "correct": false}
  ],
  "explanation": "For two lines to be perpendicular, the product of their slopes must equal -1. Here, k = -3 satisfies this condition."
},
{
  "question": "The condition for a homogenous equation ax^2 + 2hxy + by^2 = 0 to represent a real and coincident lines is ......",
  "answers": [
      {"text": "h^2 − ab = 0", "correct": true},
      {"text": "h^2 − ab > 0", "correct": false},
      {"text": "h^2 − ab < 0", "correct": false},
      {"text": "h^2 = ab", "correct": false}
  ],
  "explanation": "For a homogeneous equation representing real and coincident lines, the condition h^2 − ab = 0 must be satisfied."
},
{
  "question": "The centre of the circle x^2 + y^2 − 2x + 6y + 18 = 0 is......",
  "answers": [
      {"text": "(1, -3)", "correct": false},
      {"text": "(−1, 3)", "correct": false},
      {"text": "(1, 3)", "correct": true},
      {"text": "(−1, −3)", "correct": false}
  ],
  "explanation": "To find the center of a circle given by the equation (x − h)^2 + (y − k)^2 = r^2, the center is (h, k)."
},
{
  "question": "If e denotes the eccentricity of the parabola x^2 − 4x − 8y + 12 = 0. Then the value of e is.....",
  "answers": [
      {"text": "<1", "correct": true},
      {"text": "≈0", "correct": false},
      {"text": "1", "correct": false},
      {"text": ">1", "correct": false}
  ],
  "explanation": "The eccentricity e of a parabola is less than 1 when it opens upwards or downwards."
},
{
  "question": "If the direction ratios of a line are 4, 5, 6. Then its direction cosines are ..........",
  "answers": [
      {"text": "± 8", "correct": false},
      {"text": "± 2", "correct": false},
      {"text": "± 4", "correct": true},
      {"text": "± 6", "correct": false}
  ],
  "explanation": "Direction cosines (l, m, n) of a line with direction ratios (a, b, c) are given by l = a/sqrt(a^2 + b^2 + c^2), m = b/sqrt(a^2 + b^2 + c^2), n = c/sqrt(a^2 + b^2 + c^2)."
},
{
  "question": "The value of lim x tan(x) as x approaches 0 is......",
  "answers": [
      {"text": "-1", "correct": false},
      {"text": "0", "correct": true},
      {"text": "1", "correct": false},
      {"text": "does not exist", "correct": false}
  ],
  "explanation": "The limit of x tan(x) as x approaches 0 is 0."
},
{
  "question": "The derivative of cos^-1 x is......",
  "answers": [
      {"text": "1", "correct": false},
      {"text": "0", "correct": false},
      {"text": "1/x", "correct": false},
      {"text": "-1/sqrt(1-x^2)", "correct": true}
  ],
  "explanation": "The derivative of cos^-1 x (arccos x) with respect to x is -1/sqrt(1-x^2)."
},
{
  "question": "The value of ∫y dx is ....",
  "answers": [
      {"text": "1", "correct": false},
      {"text": "0", "correct": true},
      {"text": "-1", "correct": false},
      {"text": "2", "correct": false}
  ],
  "explanation": "The integral of a function y with respect to x, without specific limits, results in 0 for any function y."
},
{
  "question": "If the function f(x) = 4x^2 + 2x + 3 has a local minima at x = x0, then the value of x0 is",
  "answers": [
      {"text": "1", "correct": false},
      {"text": "-1", "correct": false},
      {"text": "0", "correct": false},
      {"text": "-1/4", "correct": true}
  ],
  "explanation": "For a local minima of a function f(x), the derivative f'(x) must be 0 and the second derivative f''(x) must be positive."
},
{
  "question": "The area bounded by the lines y = x, x = 1 and the x axis is",
  "answers": [
      {"text": "1", "correct": false},
      {"text": "2", "correct": true},
      {"text": "0", "correct": false},
      {"text": "∞", "correct": false}
  ],
  "explanation": "The area bounded by y = x, x = 1, and the x-axis is a right triangle with base 1 and height 1, giving an area of 1/2 * 1 * 1 = 1/2."
},
{
  "question": "If velocity, force and time are taken as fundamental units then dimensional formula of mass is...",
  "answers": [
      {"text": "[FT] [err]", "correct": false},
      {"text": "[FT2]", "correct": true},
      {"text": "[FT2]", "correct": false},
      {"text": "[FT77]", "correct": false}
  ],
  "explanation": "Using dimensional analysis, the dimensional formula of mass [M] can be derived from velocity [LT^-1], force [MLT^-2], and time [T]."
},
{
  "question": "Angle between A=(i + 4j − 5k) and B=(i − 4j − 5k) is",
  "answers": [
      {"text": "0°", "correct": false},
      {"text": "30°", "correct": false},
      {"text": "60°", "correct": true},
      {"text": "90°", "correct": false}
  ],
  "explanation": "The angle between two vectors A and B is given by cos θ = (A ⋅ B) / (|A| |B|)."
},
{
  "question": "A lift with mass 1500kg supported by string is moving upward with acceleration 1.8m/s². The tension in the string is...",
  "answers": [
      {"text": "1770N", "correct": false},
      {"text": "17700N", "correct": true},
      {"text": "15000N", "correct": false},
      {"text": "16000N", "correct": false}
  ],
  "explanation": "The tension in the string supporting the lift is equal to the sum of the gravitational force mg and the force due to acceleration ma, where m is the mass and a is the acceleration."
},
{
  "question": "If angular velocity of earth increases then value of g at poles.....",
  "answers": [
      {"text": "increases", "correct": false},
      {"text": "decreases", "correct": false},
      {"text": "remains same", "correct": true},
      {"text": "none of these", "correct": false}
  ],
  "explanation": "The value of acceleration due to gravity g at the poles remains approximately the same if the angular velocity of the Earth changes."
},
{
  "question": "Time period T of simple pendulum inside lift moving upward with acceleration g/2 becomes...",
  "answers": [
      {"text": "(√3/2)T", "correct": false},
      {"text": "(1/2)T", "correct": false},
      {"text": "(√3)T", "correct": true},
      {"text": "T", "correct": false}
  ],
  "explanation": "The time period T of a simple pendulum depends on the effective acceleration due to gravity g. Inside a lift accelerating upward with acceleration g/2, the effective g is reduced to g - g/2 = g/2."
},{
  "question": "Young’s modulus for perfectly plastic body is...",
  "answers": [
      {"text": "0", "correct": false},
      {"text": "1", "correct": false},
      {"text": "∞", "correct": false},
      {"text": "some finite value", "correct": true}
  ],
  "explanation": "Young's modulus measures the stiffness of a material. For a perfectly plastic body, it deforms indefinitely under stress, indicating it has no elastic modulus (Young's modulus) but can sustain a yield stress indefinitely, hence a finite value."
},
{
  "question": "An ice berg of density 0.929 g/cc is floating in water of density 1.03 g/cc. The percentage volume of iceberg outside water is...",
  "answers": [
      {"text": "11%", "correct": true},
      {"text": "72%", "correct": false},
      {"text": "79%", "correct": false},
      {"text": "89%", "correct": false}
  ],
  "explanation": "The volume of iceberg outside water is determined by the ratio of their densities. Given densities, the iceberg displaces 10.64% of its volume above water, leaving 89.36% submerged, so 11% is above water."
},
{
  "question": "Ratio of specific charge of electron to that of beta-particle is...",
  "answers": [
      {"text": "1:3", "correct": false},
      {"text": "1:1", "correct": false},
      {"text": "2:1", "correct": false},
      {"text": "4:1", "correct": true}
  ],
  "explanation": "The specific charge (charge-to-mass ratio) of an electron is much greater than that of a beta-particle (electron emitted from a nucleus). Therefore, the ratio of their specific charges is 4:1."
},
{
  "question": "The ratio of frequency of electron in third orbit to second orbit is...",
  "answers": [
      {"text": "2:3", "correct": false},
      {"text": "4:5", "correct": false},
      {"text": "4:9", "correct": true},
      {"text": "6:5", "correct": false}
  ],
  "explanation": "The frequency of an electron in a Bohr orbit is inversely proportional to the square of the principal quantum number (n). Therefore, the ratio of frequencies in the third orbit (n=3) to the second orbit (n=2) is 9:4."
},
{
  "question": "Nuclear density increases with...",
  "answers": [
      {"text": "increase in mass number", "correct": false},
      {"text": "increase in atomic number", "correct": true},
      {"text": "increase in number of protons", "correct": false},
      {"text": "none of these", "correct": false}
  ],
  "explanation": "Nuclear density increases with an increase in atomic number due to more protons packed in the nucleus, increasing the attractive nuclear force relative to the repulsive electromagnetic force."
},
{
  "question": "A radioactive element has half-life 15 years. The fraction will decayed in 30 years is...",
  "answers": [
      {"text": "1:2", "correct": false},
      {"text": "2:3", "correct": false},
      {"text": "3:4", "correct": true},
      {"text": "4:5", "correct": false}
  ],
  "explanation": "Radioactive decay follows an exponential decay law. In 30 years (double the half-life), 3/4 of the original substance will have decayed, leaving 1/4 remaining."
},
{
  "question": "Discharging equation of capacitor is...",
  "answers": [
      {"text": "I = I₀e^(-t/RC)", "correct": false},
      {"text": "I = I₀e^(-t/RC)", "correct": false},
      {"text": "q = q₀e^(-t/RC)", "correct": true},
      {"text": "I = I₀e^(-t/RC)", "correct": false}
  ],
  "explanation": "During discharging, the charge q on the capacitor decreases exponentially over time t with resistance R and capacitance C, governed by q = q₀e^(-t/RC), where q₀ is the initial charge."
},
{
  "question": "Vector form of Biot-Savart law is...",
  "answers": [
      {"text": "dB = µ₀I (dl x r) / (4πr²)", "correct": false},
      {"text": "dB = µ₀I (dl x r) / (4πr²)", "correct": false},
      {"text": "dB = µ₀I (dl x r) / (4πr²)", "correct": false},
      {"text": "dB = µ₀I (dl x r) / (4πr²)", "correct": true}
  ],
  "explanation": "The Biot-Savart law describes the magnetic field dB created by a current I flowing through a differential element dl at distance r from the point of observation. The correct vector form is dB = µ₀I (dl x r) / (4πr²)."
},
{
  "question": "When two bulbs rated 40W, 220V and 60W, 220V are connected in parallel with 220V supply,...",
  "answers": [
      {"text": "40W will glow brighter than 60W bulb", "correct": false},
      {"text": "60W will glow brighter than 40W bulb", "correct": false},
      {"text": "both bulbs glow equally brighter", "correct": true},
      {"text": "both bulbs burn out", "correct": false}
  ],
  "explanation": "In parallel connection, bulbs of different wattages but same voltage ratings glow equally bright as each receives the full voltage supply independently."
},
{
  "question": "Peak and r.m.s. value of A.C. are related as...",
  "answers": [
      {"text": "Lp = 70.7% Lrms", "correct": false},
      {"text": "Lp = 63.7% Lrms", "correct": true},
      {"text": "Lp = 67.7% Lrms", "correct": false},
      {"text": "Lp = 67.3% Lrms", "correct": false}
  ],
  "explanation": "The peak value (Lp) of an AC waveform is 1.414 times the RMS (root mean square) value (Lrms). Mathematically, Lp = √2 Lrms ≈ 63.7% Lrms."
},
{
  "question": "Chloride of a metal ‘M’ is MCl₃. The salt of the metal when treated with concentrated nitric acid is...",
  "answers": [
      {"text": "M₃N", "correct": false},
      {"text": "M₃NO₃", "correct": true},
      {"text": "M₄NO₃", "correct": false},
      {"text": "M(NO₃)₄", "correct": false}
  ],
  "explanation": "Concentrated nitric acid oxidizes metal chlorides to form nitrate salts. Hence, MCl₃ reacts with concentrated nitric acid to form M₃NO₃."
},
{
  "question": "Which of the following set of quantum number designation (in the order of n, l, m, s) is incorrectly expressed?",
  "answers": [
      {"text": "4, 2, 1, +1/2", "correct": false},
      {"text": "4, 2, 1, -1/2", "correct": false},
      {"text": "4, 2, 1, 0", "correct": false},
      {"text": "4, 3, 1, +1/2", "correct": true}
  ],
  "explanation": "Quantum numbers n (principal), l (azimuthal), m (magnetic), and s (spin) must adhere to specific rules: 0 ≤ l < n, -l ≤ m ≤ l, and s = ±1/2. Hence, the set 4, 3, 1, +1/2 violates the azimuthal quantum number rule."
},
{
  "question": "Which of the following compound has exact numbers of valence electrons as much as demanded by octet rules?",
  "answers": [
      {"text": "AlCl₃", "correct": true},
      {"text": "SiCl₄", "correct": false},
      {"text": "PCl₅", "correct": false},
      {"text": "SF₆", "correct": false}
  ],
  "explanation": "AlCl₃ has 6 valence electrons in Al (group 13) and 7 electrons in each Cl, adhering to the octet rule for stable electronic configurations."
},
{
  "question": "Complete reduction of one mole permanganate ions in acidic medium is possible by... mole of electrons.",
  "answers": [
      {"text": "5", "correct": true},
      {"text": "3", "correct": false},
      {"text": "2", "correct": false},
      {"text": "1", "correct": false}
  ],
  "explanation": "Permanganate ions (MnO₄⁻) in acidic medium undergo reduction to Mn²⁺. Each MnO₄⁻ requires 5 moles of electrons to complete reduction to Mn²⁺."
},
{
  "question": "The number of atoms present in 0.1 mol of water is...",
  "answers": [
      {"text": "3", "correct": false},
      {"text": "0.3", "correct": false},
      {"text": "0.3Nₐ", "correct": false},
      {"text": "0.1Nₐ", "correct": true}
  ],
  "explanation": "One mole of water (H₂O) contains 6.022 × 10²³ molecules. Therefore, 0.1 mole of water contains 6.022 × 10²² molecules, corresponding to 3.011 × 10²³ atoms."
},
{
  "question": "4 gram of a metal displaces 10.8 g of silver from silver nitrate solution. The equivalent weight of the metal is...",
  "answers": [
      {"text": "108", "correct": true},
      {"text": "40", "correct": false},
      {"text": "4", "correct": false},
      {"text": "10.8", "correct": false}
  ],
  "explanation": "Equivalent weight is the mass of a substance that reacts with 1 mole of hydrogen ions (H⁺) or 1 mole of electrons. For the given reaction, 4g metal displaces 10.8g silver, so equivalent weight = (4g / 0.037 moles) = 108g/mol."
},
{
  "question": "5A current was passed into a voltameter containing copper sulphate solution for 15 minutes. Assuming 50% efficacy of the process, the amount of copper deposited during the process is...",
  "answers": [
      {"text": "1.480 g", "correct": false},
      {"text": "0.740 g", "correct": true},
      {"text": "0.370 g", "correct": false},
      {"text": "2.960 g", "correct": false}
  ],
  "explanation": "The amount of substance deposited during electrolysis is directly proportional to the quantity of electricity passed through the solution. Given conditions and 50% efficiency, 0.740g of copper is deposited."
},
{
  "question": "Solubility of calcium carbonate is 3.049 × 10⁻⁴. What is the solubility product of that salt?",
  "answers": [
      {"text": "9.3 × 10⁰", "correct": false},
      {"text": "3.049 × 10⁻⁴", "correct": false},
      {"text": "3.049 × 10⁷", "correct": true},
      {"text": "3.049 × 10¹⁶", "correct": false}
  ],
  "explanation": "Solubility product (Ksp) is the product of the dissolved ion concentrations of a sparingly soluble salt at equilibrium. Given solubility, Ksp for CaCO₃ is 3.049 × 10⁻⁴."
},
{
  "question": "What is the mass of calcium carbonate required to neutralize 40 mL of seminormal HCl solution?",
  "answers": [
      {"text": "8g", "correct": true},
      {"text": "4g", "correct": false},
      {"text": "2g", "correct": false},
      {"text": "1g", "correct": false}
  ],
  "explanation": "Calcium carbonate (CaCO₃) reacts with hydrochloric acid (HCl) based on their stoichiometry. For seminormal HCl (0.5N), 40mL requires 8g CaCO₃ to neutralize."
},
{
  "question": "10 mL of decinormal ammonium hydroxide was mixed with 20 mL of 0.05M hydrochloric acid. The pH of the resulting solution after mixing is...",
  "answers": [
      {"text": "7", "correct": false},
      {"text": "Less than 7", "correct": true},
      {"text": "More than 7", "correct": false},
      {"text": "Amphoteric", "correct": false}
  ],
  "explanation": "Ammonium hydroxide (NH₄OH) is a weak base, and HCl is a strong acid. Mixing leads to an acidic solution due to excess H⁺ ions from HCl, resulting in a pH less than 7."
},
{
  "question": "Pyrrole consists of .......... as a heteroatom",
  "answers": [
      {"text": "N", "correct": true},
      {"text": "S", "correct": false},
      {"text": "O", "correct": false},
      {"text": "P", "correct": false}
  ],
  "explanation": "Pyrrole is a five-membered aromatic heterocycle with one nitrogen (N) atom in its ring structure, which contributes to its aromaticity and reactivity."
},
{
  "question": "Functional group of ester and acid chloride are..........respectively.",
  "answers": [
      {"text": "HCOOR and RCOCI", "correct": false},
      {"text": "-C=O and -COCI", "correct": false},
      {"text": "-CO₂ and -CO", "correct": false},
      {"text": "-CO₂R and -COCl", "correct": true}
  ],
  "explanation": "Esters have the functional group -COO-R, where R is an alkyl or aryl group, while acid chlorides have the functional group -COCl. These groups define their chemical and physical properties."
},
{
  "question": "Which of the following pair of organic compounds show functional isomerism?",
  "answers": [
      {"text": "Alcohol and aldehyde", "correct": false},
      {"text": "Alcohol and ether", "correct": false},
      {"text": "Ether and aldehyde", "correct": false},
      {"text": "Aldehyde and ester", "correct": true}
  ],
  "explanation": "Functional isomerism occurs when organic compounds have the same molecular formula but differ in the functional groups they contain. Aldehydes (-CHO) and esters (-COOR) exhibit functional isomerism."
},
{
  "question": "............... are more likely to be obtained on heating a product formed upon introducing streams of ozone into an alkene solution in organic medium.",
  "answers": [
      {"text": "Aldehyde", "correct": false},
      {"text": "Ketone", "correct": true},
      {"text": "Aldehyde and ketone", "correct": false},
      {"text": "Aldehyde or ketone or mixture of both", "correct": false}
  ],
  "explanation": "Ozonolysis of alkenes in organic solvents typically yields a mixture of aldehydes and ketones, depending on the structure of the alkene and reaction conditions."
},
{
  "question": "Sodium benzoate upon heating in presence of sodalime gives.... as a major product.",
  "answers": [
      {"text": "Benzene", "correct": true},
      {"text": "Toluene", "correct": false},
      {"text": "Benzoic acid", "correct": false},
      {"text": "Azobenzene", "correct": false}
  ],
  "explanation": "Heating sodium benzoate (NaC₇H₅O₂) with sodalime (a mixture of sodium hydroxide and calcium oxide) induces decarboxylation, converting it to benzene."
},
{
  "questions": [
    {
      "question": "It is estimated that over one million people volunteer overseas each year. Many of these volunteers travel thousands of miles to other countries all across Africa, Asia, and Latin America. They experience foreign cultures and visit beautiful places. However, volunteering in a foreign country is not just for the fun of international travel. In fact, people volunteer overseas for several important reasons.\n\nOne of the main reasons people volunteer overseas is to give back to those in need. For example, many volunteers travel to poorer countries where people don’t have basic conveniences that are found in other countries. Some build wells to give small villages access to clean water. Others set up medical clinics so people can get treatment for common illnesses like the flu. Many of these volunteers come from countries with good schools and they want to give others the same educational opportunities. Overall, these volunteers feel they have a responsibility to people who deserve the same opportunities they have back home.\n\nSecond of all, many volunteers feel that travelling overseas can improve their job skills. These volunteers can add their international experiences to their resumes. This is important because many companies today are looking for employees who have a global perspective. Volunteering overseas also teaches people how to work effectively on a team, which helps when applying for future jobs. Learning about teamwork in a foreign setting will make these volunteers stand out from the crowd when they apply for jobs.\n\nA third reason people volunteer in foreign countries is because they want to immerse themselves in a foreign culture. Living in another country is one of the most rewarding experiences a person can have. Being a part of a new culture for even a short period of time will bring these volunteers a sense of belonging and a deeper level of understanding of how people live on other parts of the world.\n\nIn addition to experiencing the new country, volunteers also get time away from their modern, fast-paced lifestyles back home. The majority of volunteers come from Canada, the United States, and the United Kingdom, where people are often rushing around and feeling stressed. When these volunteers spend time in a country with a slower pace of life, they feel less stress and can enjoy a different lifestyle. This shows that volunteering abroad can be good for both the mind and the body.\n\nOverseas volunteers don’t just travel for fun. They travel with a purpose. All these volunteers travel because they want to help others in some way. At the same time, they are gaining valuable work and life experiences. It's hard to ask for anything more than that.",
      "answers": [
        {"text": "they could know how people work.", "correct": false},
        {"text": "they can work with minimum facilities like them.", "correct": false},
        {"text": "they can provide some assistance to them.", "correct": true},
        {"text": "they can learn survival skills.", "correct": false}
      ],
      "explanation": "Volunteers often travel to poorer countries to offer assistance and support, providing basic necessities and helping to improve living conditions."
    },
    {
      "question": "Which of the following is not associated with contributing to improving the job skills of the volunteers?",
      "answers": [
        {"text": "It adds skills to their CV.", "correct": false},
        {"text": "It increases their teamwork spirit.", "correct": false},
        {"text": "It makes them aware of the global perspective.", "correct": false},
        {"text": "It helps them learn the foreign culture.", "correct": true}
      ],
      "explanation": "While learning about foreign cultures is an enriching experience, it is not directly associated with improving job skills in terms of CV enhancement, teamwork, or global awareness."
    },
    {
      "question": "The word ‘conveniences’ in the second paragraph is closest in meaning to:",
      "answers": [
        {"text": "amenities", "correct": true},
        {"text": "ease", "correct": false},
        {"text": "communicable", "correct": false},
        {"text": "transportable", "correct": false}
      ],
      "explanation": "In the context provided, 'conveniences' refers to basic amenities or comforts that people in wealthier countries often take for granted but are lacking in poorer regions."
    },
    {
      "question": "The phrasal verb 'stand out' in the third paragraph can be replaced by:",
      "answers": [
        {"text": "to be effective", "correct": false},
        {"text": "to be much better than others", "correct": true},
        {"text": "to show", "correct": false},
        {"text": "to prove", "correct": false}
      ],
      "explanation": "'Stand out' means to be noticeably better or more successful than others, which aligns with the phrase 'to be much better than others'."
    },
    {
      "question": "Why do volunteers often feel they have a responsibility to people in poorer countries?",
      "answers": [
        {"text": "Because they want to learn survival skills.", "correct": false},
        {"text": "Because they want to immerse themselves in a foreign culture.", "correct": false},
        {"text": "Because they want to give back and provide opportunities.", "correct": true},
        {"text": "Because they want to enjoy beautiful places in Africa, Asia, and Latin America.", "correct": false}
      ],
      "explanation": "Volunteers often feel a responsibility to help improve living conditions and provide opportunities to those in need in poorer countries."
    },
    {
      "question": "What does volunteering overseas teach volunteers in terms of job skills?",
      "answers": [
        {"text": "How to enjoy a slower pace of life.", "correct": false},
        {"text": "How to build medical clinics.", "correct": false},
        {"text": "How to add international experiences to their resumes.", "correct": true},
        {"text": "How to travel across Africa, Asia, and Latin America.", "correct": false}
      ],
      "explanation": "Volunteering overseas helps volunteers enhance their resumes with international experiences, which is valuable in today's job market."
    }
  ]
}
];

const Mock2 = () => {
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

export default Mock2;

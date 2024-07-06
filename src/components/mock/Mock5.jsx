import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import logo from "../../../public/fwu.png";

// Total time in seconds for 150 questions in 3 hours
const TOTAL_TIME = 3 * 60 * 60;
const quizData2077 = [ // Define quiz data for 2077
  {
    "question": "The value of & for which one root of the equation 5x^2 - kx + 3 = 0 will be 3 is",
    "answers": [
        {"text": "5", "correct": false},
        {"text": "3", "correct": false},
        {"text": "0", "correct": false},
        {"text": "16", "correct": true}
    ],
    "explanation": "For one root of the quadratic equation to be 3, using Vieta's formulas, we find k = 16."
},
{
    "question": "The value of the determinant |2 2 2 \\ 1 7 8 \\ 5 10 15| is",
    "answers": [
        {"text": "1", "correct": true},
        {"text": "0", "correct": false},
        {"text": "2", "correct": false},
        {"text": "111", "correct": false}
    ],
    "explanation": "The value of the determinant is calculated as 2*(7*15 - 8*10) - 1*(2*15 - 5*8) = 1."
},
{
    "question": "The amplitude (argument) of the complex number -3 - 3i is",
    "answers": [
        {"text": "135°", "correct": false},
        {"text": "45°", "correct": true},
        {"text": "225°", "correct": false},
        {"text": "315°", "correct": false}
    ],
    "explanation": "The argument of the complex number -3 - 3i is atan(-3/-3), which simplifies to atan(1) = 45°."
},
{
    "question": "If A is a square matrix then A + A' (where A' is transpose of A) is",
    "answers": [
        {"text": "asymmetric matrix", "correct": false},
        {"text": "a skew symmetric matrix", "correct": true},
        {"text": "neither a symmetric matrix nor a skew symmetric matrix", "correct": false},
        {"text": "nothing can be said about it", "correct": false}
    ],
    "explanation": "If A is a square matrix, A + A' results in a skew symmetric matrix due to the property that (A + A')^T = A + A'."
},
{
    "question": "The number of ways in which 7 different colored beads be strung on a necklace is",
    "answers": [
        {"text": "7", "correct": false},
        {"text": "180", "correct": false},
        {"text": "5040", "correct": true},
        {"text": "360", "correct": false}
    ],
    "explanation": "The number of ways to arrange 7 beads in a circular necklace is (7-1)! = 6!, which equals 5040."
},
{
    "question": "The sum of the infinite series 1 + e + e^2 + e^3 + ... is",
    "answers": [
        {"text": "2", "correct": false},
        {"text": "5", "correct": false},
        {"text": "3", "correct": false},
        {"text": "doesn't exist", "correct": true}
    ],
    "explanation": "The sum of an infinite geometric series with ratio e (>1) does not converge; hence, the sum doesn't exist."
},
{
    "question": "If Co, Ci, Co, Ca, ..., Cn are coefficients of successive terms in the expansion of (1+x)^n, then the value of C1 + Co + C3 + ... + Cn is",
    "answers": [
        {"text": "2^n", "correct": true},
        {"text": "2^(n-1)", "correct": false},
        {"text": "2^n-1", "correct": false},
        {"text": "2^n+1", "correct": false}
    ],
    "explanation": "In the binomial expansion (1+x)^n, the sum of all coefficients is 2^n."
},
{
    "question": "Out of the following quantities, the quantity representing e is",
    "answers": [
        {"text": "1 + 1/1! + 1/2! + 1/3! + ...", "correct": true},
        {"text": "1 - 1/1! + 1/2! - 1/3! + ...", "correct": false},
        {"text": "1 + 1/2 + 1/3 + 1/4 + ...", "correct": false},
        {"text": "lim(n->∞) (1 + 1/n)^n", "correct": false}
    ],
    "explanation": "The series 1 + 1/1! + 1/2! + 1/3! + ... converges to the mathematical constant e."
},
{
    "question": "The angle between the vectors i - 2j + 5k and 3i + j - 7k is",
    "answers": [
        {"text": "30°", "correct": false},
        {"text": "45°", "correct": true},
        {"text": "90°", "correct": false},
        {"text": "135°", "correct": false}
    ],
    "explanation": "The angle θ between two vectors A and B is given by cos(θ) = (A • B) / (|A| |B|). Calculate the dot product and magnitudes to find cos(θ), then find θ."
},
{
    "question": "The unit vector in the direction of the vector 2i + 6j + 3k is",
    "answers": [
        {"text": "(2i + 6j + 3k) / √49", "correct": false},
        {"text": "(2i + 6j + 3k) / √62", "correct": false},
        {"text": "(2i + 6j + 3k) / √74", "correct": true},
        {"text": "(2i + 6j + 3k) / √86", "correct": false}
    ],
    "explanation": "To find the unit vector, divide the vector by its magnitude. Magnitude = √(2^2 + 6^2 + 3^2)."
},
{
    "question": "Mass of ice that can be melted at 0°C by 3360J of heat energy is",
    "answers": [
        {"text": "1g", "correct": false},
        {"text": "10g", "correct": false},
        {"text": "100g", "correct": true},
        {"text": "1000g", "correct": false}
    ],
    "explanation": "The specific heat capacity of ice is used to determine the mass melted, q = mcΔT, where q is the heat added, m is the mass, and ΔT is the temperature change."
},
{
    "question": "If a gas in a cylinder is heated by 8°C then pressure increases by 1%. The initial temperature of gas is",
    "answers": [
        {"text": "327°C", "correct": false},
        {"text": "427°C", "correct": false},
        {"text": "527°C", "correct": true},
        {"text": "627°C", "correct": false}
    ],
    "explanation": "Use the gas law equation to calculate the initial temperature of the gas before heating."
},
{
    "question": "Factor by which r.m.s. speed of a particular gas molecule increases when temperature is increased from 100°C to 200°C is",
    "answers": [
        {"text": "1.13", "correct": false},
        {"text": "1.31", "correct": true},
        {"text": "1.03", "correct": false},
        {"text": "1.33", "correct": false}
    ],
    "explanation": "The r.m.s. speed of gas molecules is proportional to the square root of temperature. Calculate the ratio of r.m.s. speeds at two temperatures."
},
{
    "question": "Whole amount of heat supplied is used to increase internal energy of gas during",
    "answers": [
        {"text": "isothermal process", "correct": false},
        {"text": "isobaric process", "correct": false},
        {"text": "isochoric process", "correct": true},
        {"text": "adiabatic process", "correct": false}
    ],
    "explanation": "In an isochoric process, no work is done by or on the system, so all supplied heat increases the internal energy of the gas."
},
{
    "question": "Efficiency of petrol engine is given as",
    "answers": [
        {"text": "1 - (Q2 / Q1)", "correct": false},
        {"text": "1 - (Q1 / Q2)", "correct": false},
        {"text": "1 - (Q2 / Q1)", "correct": false},
        {"text": "1 - (Q1 / Q2)", "correct": true}
    ],
    "explanation": "The efficiency of a petrol engine is given by the ratio of work output to the heat input."
},
{
    "question": "Source of sound and listener are moving in the same direction with the same speed. The apparent frequency received by the listener is",
    "answers": [
        {"text": "greater than the frequency of the source", "correct": false},
        {"text": "less than the frequency of the source", "correct": false},
        {"text": "equal to the frequency of the source", "correct": true},
        {"text": "none of these", "correct": false}
    ],
    "explanation": "When both source and listener move towards each other with the same velocity, the apparent frequency remains equal to the actual frequency of the source."
},
{
    "question": "A ray of light incident on a transparent medium of refractive index 1.5 at the polarizing angle. The angle of refraction is",
    "answers": [
        {"text": "tan^-1(1.5)", "correct": true},
        {"text": "tan^-1(1.5) - 90°", "correct": false},
        {"text": "tan(1.5) + 90°", "correct": false},
        {"text": "90° - tan(1.5)", "correct": false}
    ],
    "explanation": "The polarizing angle is the angle of incidence where the angle of refraction is 90°."
},
{
    "question": "Snell’s law is not valid for",
    "answers": [
        {"text": "grazing incidence", "correct": true},
        {"text": "oblique incidence", "correct": false},
        {"text": "normal incidence", "correct": false},
        {"text": "grazing emergence", "correct": false}
    ],
    "explanation": "Snell's law describes the refraction of light at boundaries, but for grazing incidence, it does not provide a valid angle."
},
{
    "question": "During dispersion of light by a prism, the order of colors in the spectrum from bottom to top is",
    "answers": [
        {"text": "VIBGYOR", "correct": true},
        {"text": "VIBGOYR", "correct": false},
        {"text": "VBIGYOR", "correct": false},
        {"text": "VIGBYOR", "correct": false}
    ],
    "explanation": "The colors in the spectrum from lowest to highest frequency are Violet, Indigo, Blue, Green, Yellow, Orange, and Red."
},
{
    "question": "At constant temperature, the velocity of sound in air is",
    "answers": [
        {"text": "directly proportional to change in pressure", "correct": false},
        {"text": "inversely proportional to change in pressure", "correct": false},
        {"text": "independent of change in pressure", "correct": true},
        {"text": "directly proportional to the square of change in pressure", "correct": false}
    ],
    "explanation": "The velocity of sound in air depends only on temperature, not on pressure changes."
},
{
    "question": "Formation of ammonia by the combination of hydrogen and nitrogen is an example of",
    "answers": [
        {"text": "synthesis reaction", "correct": true},
        {"text": "isomerisation reaction", "correct": false},
        {"text": "decomposition reaction", "correct": false},
        {"text": "displacement reaction", "correct": false}
    ],
    "explanation": "Synthesis reactions involve the combination of two or more substances to form a new compound."
},
{
    "question": "Who gave the nuclear model of atoms?",
    "answers": [
        {"text": "Dalton", "correct": false},
        {"text": "Thomson", "correct": false},
        {"text": "Rutherford", "correct": true},
        {"text": "Neils Bohr", "correct": false}
    ],
    "explanation": "Rutherford proposed the nuclear model of the atom based on his gold foil experiment."
},
{
    "question": "The correct ground state electronic configuration of Chromium is",
    "answers": [
        {"text": "[Ar] 3d^4 4s^2", "correct": false},
        {"text": "[Ar] 3d^6 4s^1", "correct": false},
        {"text": "[Ar] 3d^5 4s^1", "correct": false},
        {"text": "[Ar] 3d^5 4s^1", "correct": true}
    ],
    "explanation": "Chromium's ground state electronic configuration is [Ar] 3d^5 4s^1."
},
{
    "question": "Azimuthal quantum number of the last electron of 11 Na is",
    "answers": [
        {"text": "1", "correct": false},
        {"text": "2", "correct": true},
        {"text": "3", "correct": false},
        {"text": "0", "correct": false}
    ],
    "explanation": "The azimuthal quantum number (l) for sodium (Na) is option 2"
  },
  {
    "question": "The value of & for which one root of the equation 5x^2 - kx + 3 = 0 will be 3 is",
    "answers": [
        {"text": "5", "correct": false},
        {"text": "3", "correct": false},
        {"text": "0", "correct": false},
        {"text": "16", "correct": true}
    ],
    "explanation": "For one root of the quadratic equation to be 3, using Vieta's formulas, we find k = 16."
},
{
    "question": "The value of the determinant |2 2 2 \\ 1 7 8 \\ 5 10 15| is",
    "answers": [
        {"text": "1", "correct": true},
        {"text": "0", "correct": false},
        {"text": "2", "correct": false},
        {"text": "111", "correct": false}
    ],
    "explanation": "The value of the determinant is calculated as 2*(7*15 - 8*10) - 1*(2*15 - 5*8) = 1."
},
{
    "question": "The amplitude (argument) of the complex number -3 - 3i is",
    "answers": [
        {"text": "135°", "correct": false},
        {"text": "45°", "correct": true},
        {"text": "225°", "correct": false},
        {"text": "315°", "correct": false}
    ],
    "explanation": "The argument of the complex number -3 - 3i is atan(-3/-3), which simplifies to atan(1) = 45°."
},
{
    "question": "If A is a square matrix then A + A' (where A' is transpose of A) is",
    "answers": [
        {"text": "asymmetric matrix", "correct": false},
        {"text": "a skew symmetric matrix", "correct": true},
        {"text": "neither a symmetric matrix nor a skew symmetric matrix", "correct": false},
        {"text": "nothing can be said about it", "correct": false}
    ],
    "explanation": "If A is a square matrix, A + A' results in a skew symmetric matrix due to the property that (A + A')^T = A + A'."
},
{
    "question": "The number of ways in which 7 different colored beads can be strung on a necklace is",
    "answers": [
        {"text": "7", "correct": false},
        {"text": "180", "correct": false},
        {"text": "5040", "correct": true},
        {"text": "360", "correct": false}
    ],
    "explanation": "The number of ways to arrange 7 beads in a circular necklace is (7-1)! = 6!, which equals 5040."
},
{
    "question": "The sum of the infinite series 1 + e + e^2 + e^3 + ... is",
    "answers": [
        {"text": "2", "correct": false},
        {"text": "5", "correct": false},
        {"text": "3", "correct": false},
        {"text": "doesn't exist", "correct": true}
    ],
    "explanation": "The sum of an infinite geometric series with ratio e (>1) does not converge; hence, the sum doesn't exist."
},
{
    "question": "If Co, Ci, Co, Ca, ..., Cn are coefficients of successive terms in the expansion of (1+x)^n, then the value of C1 + Co + C3 + ... + Cn is",
    "answers": [
        {"text": "2^n", "correct": true},
        {"text": "2^(n-1)", "correct": false},
        {"text": "2^n-1", "correct": false},
        {"text": "2^n+1", "correct": false}
    ],
    "explanation": "In the binomial expansion (1+x)^n, the sum of all coefficients is 2^n."
},
{
    "question": "Out of the following quantities, the quantity representing e is",
    "answers": [
        {"text": "1 + 1/1! + 1/2! + 1/3! + ...", "correct": true},
        {"text": "1 - 1/1! + 1/2! - 1/3! + ...", "correct": false},
        {"text": "1 + 1/2 + 1/3 + 1/4 + ...", "correct": false},
        {"text": "lim(n->∞) (1 + 1/n)^n", "correct": false}
    ],
    "explanation": "The series 1 + 1/1! + 1/2! + 1/3! + ... converges to the mathematical constant e."
},
{
    "question": "The angle between the vectors i - 2j + 5k and 3i + j - 7k is",
    "answers": [
        {"text": "30°", "correct": false},
        {"text": "45°", "correct": true},
        {"text": "90°", "correct": false},
        {"text": "135°", "correct": false}
    ],
    "explanation": "The angle θ between two vectors A and B is given by cos(θ) = (A • B) / (|A| |B|). Calculate the dot product and magnitudes to find cos(θ), then find θ."
},
{
    "question": "The unit vector in the direction of the vector 2i + 6j + 3k is",
    "answers": [
        {"text": "(2i + 6j + 3k) / √49", "correct": false},
        {"text": "(2i + 6j + 3k) / √62", "correct": false},
        {"text": "(2i + 6j + 3k) / √74", "correct": true},
        {"text": "(2i + 6j + 3k) / √86", "correct": false}
    ],
    "explanation": "To find the unit vector, divide the vector by its magnitude. Magnitude = √(2^2 + 6^2 + 3^2)."
},
{
    "question": "Mass of ice that can be melted at 0°C by 3360J of heat energy is",
    "answers": [
        {"text": "1g", "correct": false},
        {"text": "10g", "correct": false},
        {"text": "100g", "correct": true},
        {"text": "1000g", "correct": false}
    ],
    "explanation": "The specific heat capacity of ice is used to determine the mass melted, q = mcΔT, where q is the heat added, m is the mass, and ΔT is the temperature change."
},
{
    "question": "If a gas in a cylinder is heated by 8°C then pressure increases by 1%. The initial temperature of the gas is",
    "answers": [
        {"text": "327°C", "correct": false},
        {"text": "427°C", "correct": false},
        {"text": "527°C", "correct": true},
        {"text": "627°C", "correct": false}
    ],
    "explanation": "Use the gas law equation to calculate the initial temperature of the gas before heating."
},
{
    "question": "Factor by which r.m.s. speed of a particular gas molecule increases when temperature is increased from 100°C to 200°C is",
    "answers": [
        {"text": "1.13", "correct": false},
        {"text": "1.31", "correct": true},
        {"text": "1.03", "correct": false},
        {"text": "1.33", "correct": false}
    ],
    "explanation": "The r.m.s. speed of gas molecules is proportional to the square root of temperature. Calculate the ratio of r.m.s. speeds at two temperatures."
},
{
    "question": "Whole amount of heat supplied is used to increase internal energy of gas during",
    "answers": [
        {"text": "isothermal process", "correct": false},
        {"text": "isobaric process", "correct": false},
        {"text": "isochoric process", "correct": true},
        {"text": "adiabatic process", "correct": false}
    ],
    "explanation": "In an isochoric process, no work is done by or on the system, so all supplied heat increases the internal energy of the gas."
},
{
    "question": "Efficiency of a petrol engine is given as",
    "answers": [
        {"text": "1 - (Q2 / Q1)", "correct": false},
        {"text": "1 - (Q1 / Q2)", "correct": false},
        {"text": "1 - (Q2 / Q1)", "correct": false},
        {"text": "1 - (Q1 / Q2)", "correct": true}
    ],
    "explanation": "The efficiency of a petrol engine is given by the ratio of work output (Q2) to heat input (Q1). Efficiency = 1 - (Q1 / Q2)."
},
{
  "question": "It is I who ................... right",
  "answers": [
      {"text": "is", "correct": false},
      {"text": "am", "correct": true},
      {"text": "be", "correct": false},
      {"text": "none of these", "correct": false}
  ],
  "explanation": "The correct form is 'It is I who am right.'"
},
{
  "question": "He as well as his sisters .................. non-veg food.",
  "answers": [
      {"text": "eat", "correct": false},
      {"text": "eating", "correct": false},
      {"text": "eats", "correct": true},
      {"text": "to eat", "correct": false}
  ],
  "explanation": "When 'as well as' connects subjects, the verb agrees with the first subject."
},
{
  "question": "The passive of 'Go there’ is",
  "answers": [
      {"text": "You should go there", "correct": false},
      {"text": "You are ordered to go there", "correct": false},
      {"text": "Come here", "correct": false},
      {"text": "You are requested to go there", "correct": true}
  ],
  "explanation": "The passive form of an imperative sentence like 'Go there' involves using 'be' + past participle, and maintaining the meaning."
},
{
  "question": "I shall provide ..................... your education",
  "answers": [
      {"text": "with", "correct": true},
      {"text": "an", "correct": false},
      {"text": "to", "correct": false},
      {"text": "for", "correct": false}
  ],
  "explanation": "The correct preposition to use with 'provide' in this context is 'with'."
},
{
  "question": "Which of the following is correct?",
  "answers": [
      {"text": "I, you and he are friends", "correct": false},
      {"text": "You, he and I are friends", "correct": true},
      {"text": "I, he and you are friends", "correct": false},
      {"text": "He, you and I are friends", "correct": false}
  ],
  "explanation": "When listing individuals in a sentence, the correct order is 'You, he and I'."
},
{
  "question": "The more he labours, the ...................... he progresses",
  "answers": [
      {"text": "little", "correct": false},
      {"text": "less", "correct": true},
      {"text": "a little", "correct": false},
      {"text": "least", "correct": false}
  ],
  "explanation": "The correct comparative form is 'the less he progresses'."
},
{
  "question": "Everything that .................. is not gold.",
  "answers": [
      {"text": "is glittering", "correct": false},
      {"text": "glitters", "correct": true},
      {"text": "glitter", "correct": false},
      {"text": "none of these", "correct": false}
  ],
  "explanation": "The phrase 'All that glitters is not gold' indicates that appearances can be deceiving."
},
{
  "question": "They as well as he ............... hard.",
  "answers": [
      {"text": "works", "correct": false},
      {"text": "work", "correct": true},
      {"text": "working", "correct": false},
      {"text": "has worked", "correct": false}
  ],
  "explanation": "When 'as well as' connects subjects, the verb agrees with the first subject."
},
{
  "question": "\"Ram said, ‘what's your name?'\" is in",
  "answers": [
      {"text": "indirect speech form", "correct": true},
      {"text": "direct speech form", "correct": false},
      {"text": "passive form", "correct": false},
      {"text": "active form", "correct": false}
  ],
  "explanation": "Indirect speech (reported speech) transforms the original statement into a different form while preserving its meaning."
},
{
  "question": "When I reached there, Ram...................",
  "answers": [
      {"text": "Ram played", "correct": false},
      {"text": "Ram was playing", "correct": true},
      {"text": "Ram lays", "correct": false},
      {"text": "Ram has been playing", "correct": false}
  ],
  "explanation": "The past continuous tense 'was playing' is used to describe an ongoing action in the past."
},
{
  "question": "The sentence 'It surprises me' can be turned into passive as:",
  "answers": [
      {"text": "It is surprised by me", "correct": false},
      {"text": "I am surprised at it", "correct": true},
      {"text": "I was surprised by it", "correct": false},
      {"text": "none of these", "correct": false}
  ],
  "explanation": "In the passive voice, the object of the active sentence becomes the subject, and the verb is changed to a form of 'be' + past participle."
},
{
  "question": "He investigated ...................... the matter.",
  "answers": [
      {"text": "in", "correct": false},
      {"text": "on", "correct": false},
      {"text": "into", "correct": true},
      {"text": "at", "correct": false}
  ],
  "explanation": "The correct preposition to use with 'investigated' when describing the scope or focus of the investigation is 'into'."
},
{
  "question": "'Please, set your watch’ is an example of:",
  "answers": [
      {"text": "request", "correct": true},
      {"text": "order", "correct": false},
      {"text": "recommendation", "correct": false},
      {"text": "none of these", "correct": false}
  ],
  "explanation": "The sentence 'Please, set your watch' is a polite request."
},
{
  "question": "Either you or he ............ my money",
  "answers": [
      {"text": "steal", "correct": false},
      {"text": "steals", "correct": true},
      {"text": "stealing", "correct": false},
      {"text": "do steal", "correct": false}
  ],
  "explanation": "When 'either...or' connects subjects, the verb agrees with the subject closest to the verb."
},
{
  "question": "The antonym of 'Self-centered' is",
  "answers": [
      {"text": "Selfish", "correct": false},
      {"text": "Other-centered", "correct": true},
      {"text": "egoist", "correct": false}
  ],
  "explanation": "The opposite of 'self-centered' is someone who focuses on others, hence 'other-centered'."
},
{
  "question": "The synonym of 'Acute' is",
  "answers": [
      {"text": "tolerable", "correct": false},
      {"text": "intolerable", "correct": false},
      {"text": "mild", "correct": false},
      {"text": "sharp", "correct": true}
  ],
  "explanation": "'Acute' can be synonymous with 'sharp', especially in describing angles or senses."
},
{
  "question": "The word 'Whine' means",
  "answers": [
      {"text": "sleep", "correct": false},
      {"text": "complain", "correct": true},
      {"text": "criticize", "correct": false}
  ],
  "explanation": "To 'whine' is to complain or protest in a childish or annoying manner."
},
{
  "question": "The correct pronunciation of 'precis' is",
  "answers": [
      {"text": "/presis/", "correct": true},
      {"text": "/prisais/", "correct": false},
      {"text": "/presi:/", "correct": false}
  ],
  "explanation": "The correct pronunciation of 'precis' is /presis/."
},
{
  "question": "Which of the following pairs of words has the same vowel?",
  "answers": [
      {"text": "shed-shade", "correct": false},
      {"text": "put-but", "correct": true},
      {"text": "they-key", "correct": false}
  ],
  "explanation": "Both 'put' and 'but' have the same vowel sound /ʊ/."
},
{
  "question": "Sweater is made................... wool.",
  "answers": [
      {"text": "with", "correct": false},
      {"text": "of", "correct": true},
      {"text": "in", "correct": false}
  ],
  "explanation": "A 'sweater' is typically made 'of' wool, indicating its material composition."
},
{
  "question": "The quantity = ab sinc is also equal to...............",
  "answers": [
      {"text": "(a) ", "correct": false},
      {"text": "(b) s(s-a)(s-b)(s-c)", "correct": true},
      {"text": "(c) Scavosb", "correct": false},
      {"text": "(d) <2 +207?a’ +2a’h? —a* —b* —c*", "correct": false}
  ],
  "explanation": "This formula represents the area of a triangle using its sides."
},
{
  "question": "If tan'x+tan' y+tan'!z= > then the quantity xy + yz+zx is equal to ........",
  "answers": [
      {"text": "(a) 0", "correct": false},
      {"text": "(b) 1", "correct": true},
      {"text": "(c) ¥+y4+Z", "correct": false},
      {"text": "(d) none of these", "correct": false}
  ],
  "explanation": "This is a trigonometric identity involving angles x, y, and z."
},
{
  "question": "The limiting value of sin 5x4 7x when x > 0 Is...",
  "answers": [
      {"text": "(a) 5", "correct": false},
      {"text": "(b) 0", "correct": false},
      {"text": "(c) 1", "correct": false},
      {"text": "(d) doesn't exist", "correct": true}
  ],
  "explanation": "As x approaches infinity, sin(5x) / (5x + sin(7x)) does not approach a finite value."
},
{
  "question": "The value of & when x =at*, y=2al i8 ...",
  "answers": [
      {"text": "(a) ;", "correct": false},
      {"text": "(b) ‘", "correct": false},
      {"text": "(c) t", "correct": true},
      {"text": "(d)", "correct": false}
  ],
  "explanation": "This likely refers to a variable in a mathematical context where 't' might represent a parameter."
},
{
  "question": "A function f(x) becomes maximum at a point x = c if",
  "answers": [
      {"text": "(a) /\"(©)=0 and /\"(c) =0", "correct": false},
      {"text": "(b) /'(c)=0 and f\"(c)>0", "correct": true},
      {"text": "(c) f(c)=0 and f'(c) <0", "correct": false},
      {"text": "(d) fc) #0 and f\"(c)=0", "correct": false}
  ],
  "explanation": "At a maximum point, the first derivative is zero and the second derivative is negative."
},
{
  "question": "The value of f POMS Oo) de i8 occ.",
  "answers": [
      {"text": "(a) nf foo} +k b", "correct": false},
      {"text": "(b) infork", "correct": false},
      {"text": "(c) Lor +k", "correct": false},
      {"text": "(d) or sk", "correct": true}
  ],
  "explanation": "This seems to involve a specific mathematical expression or formula where 'or sk' is the correct choice."
},
{
  "question": "The area bounded by the curve x* -3y+5=0, the ordinate x = 1, the ordinate x = 3 and x-axis is..",
  "answers": [
      {"text": "(a) 2 sq. units", "correct": false},
      {"text": "(b) 6 sq. units", "correct": true},
      {"text": "(c) ” sq. units", "correct": false},
      {"text": "(d) 10 sq. units", "correct": false}
  ],
  "explanation": "This involves finding the area under a curve bounded by specific coordinates."
},
{
  "question": "If A= {1, 2, 3} and B= {3, 4, 5} then AA Bis ....",
  "answers": [
      {"text": "(a) {1, 2, 3, 4, 5}", "correct": true},
      {"text": "(b) {35", "correct": false},
      {"text": "(c) {1, 2, 4, 5}", "correct": false},
      {"text": "(d) 6", "correct": false}
  ],
  "explanation": "This represents the union of sets A and B, containing all unique elements from both sets."
},
{
  "question": "If f(x) =2x? —3x+1, then the value of feat IS ...",
  "answers": [
      {"text": "(a) 4x + 2h-3", "correct": false},
      {"text": "(b) 2x + 4h -3", "correct": true},
      {"text": "(c) 4x -2h +3", "correct": false},
      {"text": "(d) 4x — 2h —3", "correct": false}
  ],
  "explanation": "This involves calculating the derivative of the given function f(x) to find its slope at a given point."
},
{
  "question": "The combined equation of the bisectors of the angles between coordinate axes is...",
  "answers": [
      {"text": "(a) x -y*? =0", "correct": false},
      {"text": "(b) x° +3 =0", "correct": false},
      {"text": "(c) YP -y?=1", "correct": false},
      {"text": "(d) x+y? =1", "correct": true}
  ],
  "explanation": "This represents the combined equation of the bisectors of the angles between the coordinate axes."
},
{
  "question": "The condition that the line k+my+n=0 may be a normal to the circle x+y? t2ert2frta =O is...",
  "answers": [
      {"text": "(a) gl+mf+n=0", "correct": true},
      {"text": "(b) gl-mf+n=0", "correct": false},
      {"text": "(c) n=gl+mf", "correct": false},
      {"text": "(d) n= gl-mf", "correct": false}
  ],
  "explanation": "This describes the condition under which a line may be perpendicular (normal) to a given circle."
},
{
  "question": "The eccentricity of the ellipse V5 3 5 5 is...",
  "answers": [
      {"text": "(a) 5", "correct": false},
      {"text": "(b) i", "correct": false},
      {"text": "(c) 9", "correct": false},
      {"text": "(d) 3", "correct": true}
  ],
  "explanation": "Eccentricity of an ellipse is a measure of its shape, calculated as the square root of (1 - b^2/a^2) where a and b are semi-major and semi-minor axes respectively."
},
{
  "question": "If the coordinates of the extremities of the latus rectum of a parabola are (5, 4) and (15, 8) then the coordinates of its focus are.................",
  "answers": [
      {"text": "(a) (6, 8)", "correct": false},
      {"text": "(b) (10, 5)", "correct": true},
      {"text": "(c) (10, 6)", "correct": false},
      {"text": "(d) (4, 15)", "correct": false}
  ],
  "explanation": "The focus of a parabola is located a distance equal to 1/4 of the latus rectum away from the vertex along the axis of symmetry."
},
{
  "question": "If a, f, y are the direction angles of a line, then the value of sin² a +sin² f+sin² y is",
  "answers": [
      {"text": "(a) 0", "correct": false},
      {"text": "(b) 2", "correct": false},
      {"text": "(c) 3", "correct": false},
      {"text": "(d) 1", "correct": true}
  ],
  "explanation": "This evaluates the sum of the squares of the sine of the direction angles of a line."
},
{
  "question": "The solution of the equation sinx+cosx =2 is...",
  "answers": [
      {"text": "(a) x=na+ Cn\"", "correct": false},
      {"text": "(b) x=2nz +5", "correct": false},
      {"text": "(c) x=na +>", "correct": false},
      {"text": "(d) doesn't exist", "correct": true}
  ],
  "explanation": "There is no real solution for the equation sinx + cosx = 2."
},
{
  "question": "Taking force, length and time as fundamental quantities, dimensional formula of density is......",
  "answers": [
      {"text": "(a) [FLT]", "correct": false},
      {"text": "(b) [FP r?]", "correct": true},
      {"text": "(c) [err?]", "correct": false},
      {"text": "(d) |FL“7?|", "correct": false}
  ],
  "explanation": "Density (mass per unit volume) is dimensionally represented as [M L^-3 T^0], where M, L, and T are dimensions of mass, length, and time respectively."
},
{
  "question": "If A=(i +47 +5k) and B=(xi +47 —5k) are perpendiculars then value of vxis...............",
  "answers": [
      {"text": "(a) 3", "correct": false},
      {"text": "(b) -3", "correct": false},
      {"text": "(c) 4", "correct": false},
      {"text": "(d) 5", "correct": true}
  ],
  "explanation": "The dot product of vectors A and B will be zero if they are perpendicular, allowing you to solve for 'x'."
},
{
  "question": "The maximum speed with which car can take turn safely on level curved road is.......",
  "answers": [
      {"text": "(a) wre", "correct": false},
      {"text": "(b) rg", "correct": false},
      {"text": "(c) rg tan d", "correct": true},
      {"text": "(d) Jug", "correct": false}
  ],
  "explanation": "This relates to the maximum safe speed a car can maintain on a curved road, considering centripetal force."
},
{
  "question": "A body having S.H.M. has maximum velocity 10cms™! and maximum acceleration 15cms”. Its time period will be................",
  "answers": [
      {"text": "(a)", "correct": false},
      {"text": "(b)", "correct": false},
      {"text": "(c)", "correct": false},
      {"text": "(d)", "correct": true}
  ],
  "explanation": "The time period of a simple harmonic motion (SHM) is related to its maximum velocity and acceleration."
},
{
  "question": "During upward motion of lift with acceleration 2ms~”, spring balance shows a _ reading of for a body of mass 2kg suspended on it.",
  "answers": [
      {"text": "(a) 16N", "correct": true},
      {"text": "(b) 20N", "correct": false},
      {"text": "(c) 24N", "correct": false},
      {"text": "(d) 28N", "correct": false}
  ],
  "explanation": "The apparent weight of a body in an accelerating lift is given by W = mg + ma, where m is the mass of the body, g is the acceleration due to gravity, and a is the acceleration of the lift."
},
{
  "question": "Acceleration of body rolling down an inclined plane is...............",
  "answers": [
      {"text": "g sinθ / 2", "correct": true},
      {"text": "g sinθ", "correct": false},
      {"text": "g sinθ / 2", "correct": true},
      {"text": "1", "correct": false}
  ],
  "explanation": "The acceleration of a body rolling without slipping down an inclined plane is (g sinθ) / (1 + k^2/r^2) where k is the radius of gyration."
},
{
  "question": "If force required to increase the length of wire by 4mm is 20N then force required to increase the length of wire by 6mm is..................",
  "answers": [
      {"text": "25N", "correct": false},
      {"text": "30N", "correct": true},
      {"text": "35N", "correct": false},
      {"text": "40N", "correct": false}
  ],
  "explanation": "Force required to stretch a wire is directly proportional to the extension in length. So, for 6mm extension, the force required is (6/4) * 20N = 30N."
},
{
  "question": "Energy stored in an inductor of 100mH carrying a current of 1A is...............",
  "answers": [
      {"text": "0.05J", "correct": false},
      {"text": "0.5J", "correct": false},
      {"text": "0.13J", "correct": true},
      {"text": "0.01J", "correct": false}
  ],
  "explanation": "Energy stored in an inductor is given by (1/2)LI^2, where L is the inductance and I is the current. For L=100mH and I=1A, the energy is 0.5 * 0.1 * 1^2 = 0.05J."
},
{
  "question": "Vector form of Biot-Savart law is.....",
  "answers": [
      {"text": "B = (μ0 / 4π) * (I dl × r̂) / r^2", "correct": true},
      {"text": "E = (μ0 / 4π) * (I dl × r̂) / r^2", "correct": false},
      {"text": "a = F/m", "correct": false},
      {"text": "p = m * v", "correct": false}
  ],
  "explanation": "The Biot-Savart law gives the magnetic field B created by a current-carrying segment."
},
{
  "question": "Uniform wire having resistance ‘R’ is stretched to double of its original length. The new resistance of wire becomes......",
  "answers": [
      {"text": "R/2", "correct": false},
      {"text": "2R", "correct": false},
      {"text": "R/4", "correct": false},
      {"text": "4R", "correct": true}
  ],
  "explanation": "Resistance of a wire is directly proportional to its length and inversely proportional to its cross-sectional area. Doubling the length increases the resistance by a factor of 4."
},
{
  "question": "Force between two charges in air is 20N. If medium with dielectric constant 2 is introduced between them then force will be..........",
  "answers": [
      {"text": "10N", "correct": true},
      {"text": "5N", "correct": false},
      {"text": "20N", "correct": false},
      {"text": "40N", "correct": false}
  ],
  "explanation": "Force between two charges in a medium is reduced by a factor equal to the dielectric constant of the medium."
},
{
  "question": "Accelerating potential “V’ and velocity ‘v’ of electron are related as.....",
  "answers": [
      {"text": "v ∝ V", "correct": true},
      {"text": "v ∝ √V", "correct": true},
      {"text": "v ∝ V^2", "correct": false},
      {"text": "v ∝ 1/V", "correct": false}
  ],
  "explanation": "Velocity of an electron is proportional to the square root of the accelerating potential V."
},
{
  "question": "The relation between half life and decay constant is........",
  "answers": [
      {"text": "λ = ln(2) / T₁/₂", "correct": true},
      {"text": "λ = ln(2) / T₁/₂", "correct": true},
      {"text": "λ = 2 / T₁/₂", "correct": false},
      {"text": "λ = 1 / (T₁/₂ ln(2))", "correct": false}
  ],
  "explanation": "The decay constant λ is inversely proportional to the half-life T₁/₂ of a radioactive substance."
},
{
  "question": "Radius ‘R’ of nucleus is related with its mass number ‘A’ as............",
  "answers": [
      {"text": "R = R₀ A^(1/3)", "correct": true},
      {"text": "R = R₀ A", "correct": false},
      {"text": "R = R₀ A^(2/3)", "correct": false},
      {"text": "R = R₀ A^2", "correct": false}
  ],
  "explanation": "The radius of a nucleus is proportional to the cube root of its mass number A."
},
{
  "question": "Isotopes and isobars are examples of...",
  "answers": [
      {"text": "isotopes", "correct": true},
      {"text": "isobars", "correct": false},
      {"text": "isotones", "correct": false},
      {"text": "mirror nuclei", "correct": false}
  ],
  "explanation": "Isotopes have the same number of protons but different numbers of neutrons, while isobars have different numbers of protons and neutrons but the same mass number."
},
{
  "question": "Bordeaux is the mixture of........",
  "answers": [
      {"text": "CuSO₄ and ZnSO₄", "correct": false},
      {"text": "CuSO₄ and Ca(OH)₂", "correct": true},
      {"text": "CuSO₄ and HgCl₂", "correct": false},
      {"text": "CuSO₄ and Zn(OH)₂", "correct": false}
  ],
  "explanation": "Bordeaux mixture is a fungicide made of copper sulfate (CuSO₄) and slaked lime (Ca(OH)₂)."
},
{
  "question": "Calamine lotion is used to treat............",
  "answers": [
      {"text": "eye infections", "correct": false},
      {"text": "skin diseases", "correct": true},
      {"text": "baldness", "correct": false},
      {"text": "bodyache", "correct": false}
  ],
  "explanation": "Calamine lotion is used primarily to treat mild skin irritations."
},
{
  "question": "In metallurgical process, the flux used to remove acidic impurities is...........",
  "answers": [
      {"text": "SiO₂", "correct": false},
      {"text": "Na₂CO₃", "correct": false},
      {"text": "NaCl", "correct": false},
      {"text": "CaO", "correct": true}
  ],
  "explanation": "In metallurgy, lime (CaO) is commonly used as a flux to remove acidic impurities."
},
{
  "question": "The process in which 'ore' is heated in absence or limited supply of air below its melting point is...",
  "answers": [
      {"text": "Calcination", "correct": true},
      {"text": "Distillation", "correct": false},
      {"text": "Roasting", "correct": false},
      {"text": "Reduction", "correct": false}
  ],
  "explanation": "Calcination is the process of heating ore in the absence or limited supply of air below its melting point."
},
{
  "question": "The property which regularly increases down the group in periodic table is...",
  "answers": [
      {"text": "Ionization energy", "correct": false},
      {"text": "Electro-negativity", "correct": false},
      {"text": "reducing nature", "correct": true},
      {"text": "electron affinity", "correct": false}
  ],
  "explanation": "Reducing nature increases down the group in the periodic table."
},
{
  "question": "The correct order of increasing radii of the elements Na, Rb, K and Mg is...............",
  "answers": [
      {"text": "Mg<K<Na<Rb", "correct": true},
      {"text": "Mg<Na<K<Rb", "correct": true},
      {"text": "Na<K<Rb<Mg", "correct": false},
      {"text": "Na<Rb<K<Mg", "correct": false}
  ],
  "explanation": "In general, within the same group, atomic radius increases with increasing atomic number."
},
{
  "question": "Oxygen and OZONE ATC...",
  "answers": [
      {"text": "isomers", "correct": false},
      {"text": "isotopes", "correct": false},
      {"text": "isobars", "correct": false},
      {"text": "allotropes", "correct": true}
  ],
  "explanation": "Oxygen (O₂) and ozone (O₃) are allotropes of the element oxygen."
},
{
  "question": "Ammonia gas can be dried OVER...",
  "answers": [
      {"text": "anhydrous CaCl₂", "correct": true},
      {"text": "Conc.H₂SO₄", "correct": false},
      {"text": "P₂O₅", "correct": false},
      {"text": "quick lime", "correct": true}
  ],
  "explanation": "Ammonia gas can be dried using anhydrous CaCl₂ or quick lime (CaO)."
},
{
  "question": "Hot conc. HNO₃ oxidizes phosphorus to...........",
  "answers": [
      {"text": "H₃PO₂", "correct": false},
      {"text": "H₃PO₃", "correct": false},
      {"text": "H₃PO₄", "correct": false},
      {"text": "P₂O₅", "correct": true}
  ],
  "explanation": "Hot concentrated nitric acid oxidizes phosphorus to phosphoric acid (P₂O₅)."
},
{
  "question": "A solution of KBr is treated with each of the following reagent separately. Which of these will liberate Br₂ gas?",
  "answers": [
      {"text": "HI", "correct": false},
      {"text": "Cl₂", "correct": true},
      {"text": "H₂O", "correct": false},
      {"text": "dil. HCl", "correct": false}
  ],
  "explanation": "Chlorine (Cl₂) can oxidize bromide ions (Br⁻) to liberate bromine gas (Br₂)."
},
{
  "question": "The ‘Vital force theory’ was proposed by....................",
  "answers": [
      {"text": "Berzelius", "correct": true},
      {"text": "Wohler", "correct": false},
      {"text": "Dalton", "correct": false},
      {"text": "Avogadro", "correct": false}
  ],
  "explanation": "The vital force theory, which stated that organic compounds could only be synthesized by living organisms, was proposed by Berzelius."
},
{
  "question": "Metamerism is Shown by ............",
  "answers": [
      {"text": "acid halides", "correct": false},
      {"text": "alcohols", "correct": false},
      {"text": "aldehydes", "correct": false},
      {"text": "ethers", "correct": true}
  ],
  "explanation": "Metamerism is a form of isomerism where compounds have the same molecular formula but differ in the distribution of carbon atoms on either side of a functional group, such as ethers."
},
{
  "question": "The IUPAC name of picric acid is ............",
  "answers": [
      {"text": "2,4,6-trinitrotoluene", "correct": false},
      {"text": "2,4,6-tribromotoluene", "correct": false},
      {"text": "2,4,6-trinitrophenol", "correct": true},
      {"text": "2,4,6-trobromophenol", "correct": false}
  ],
  "explanation": "The IUPAC name of picric acid is 2,4,6-trinitrophenol."
},
{
  "question": "Kerosene oil is a mixture of...",
  "answers": [
      {"text": "alkanes", "correct": true},
      {"text": "alkenes", "correct": false},
      {"text": "alkynes", "correct": false},
      {"text": "arenes", "correct": false}
  ],
  "explanation": "Kerosene is primarily a mixture of alkanes."
},
{
  "question": "Which of the following compounds is a heterocyclic compound?",
  "answers": [
      {"text": "Benzene", "correct": false},
      {"text": "pyridine", "correct": true},
      {"text": "cyclopropane", "correct": false},
      {"text": "Naphthalene", "correct": false}
  ],
  "explanation": "Pyridine is a heterocyclic compound as it contains a nitrogen atom in its ring structure."
},
{
  "question": "I want to begin this class on the history of film making with a discussion of a film maker. You have all heard of Walt Disney. No one has ever delighted more children or adults than Disney, the winner of 31 academy awards. Almost everyone has heard of Mickey Mouse and Donald Duck and his other popular characters like Minnie Mouse, Pluto and Goofy. He started creating cartoon animation in 1920, but it was 1928 when his best known character Mickey Mouse came to life. Disney also created the first sound cartoon which he called Steamboat Willie. It was in this cartoon that he introduced Mickey to the public. In 1937 he made movie history again with the first full length cartoon film, Snow White and Seven Dwarfs. In the 1950s Disney, created a series of nature films. He was always planning something. In 1955, he opened Disney land and, 'The magic kingdom' in Anaheim California. Even at his death in 1966 he was planning another massive project, Florida's Walt Disney World. Since his death, the film company has continued to grow and attract the public even producing new cartoons by computer animation. Disney managed to win ............ Academy Awards.",
  "answers": [
      {"text": "28", "correct": false},
      {"text": "29", "correct": false},
      {"text": "30", "correct": false},
      {"text": "31", "correct": true}
  ],
  "explanation": "The passage states that Disney won 31 Academy Awards."
},
{
  "question": "Disney’s best character Mickey Mouse was animated in.....................",
  "answers": [
      {"text": "1929", "correct": false},
      {"text": "1829", "correct": false},
      {"text": "1930", "correct": false},
      {"text": "1928", "correct": true}
  ],
  "explanation": "According to the passage, Mickey Mouse came to life in 1928."
},
{
  "question": "The name of Disney’s first full length film was...........",
  "answers": [
      {"text": "Steamboat Willie", "correct": false},
      {"text": "Disney World", "correct": false},
      {"text": "Mickey Mouse", "correct": false},
      {"text": "Snow White & the Seven Dwarfs", "correct": true}
  ],
  "explanation": "The passage mentions that Disney's first full-length film was 'Snow White and Seven Dwarfs'."
},
{
  "question": "Which of the following was not planned by Disney?",
  "answers": [
      {"text": "Nature film", "correct": false},
      {"text": "Mickey Mouse", "correct": false},
      {"text": "Computerized cartoon", "correct": true},
      {"text": "Disney land", "correct": false}
  ],
  "explanation": "The passage indicates that computerized cartoons were produced after Disney's death."
},
{
  "question": "What is the speaker mainly discussing?",
  "answers": [
      {"text": "The life and time of Walt Disney", "correct": true},
      {"text": "Disney characters", "correct": false},
      {"text": "Disney’s work", "correct": false},
      {"text": "The importance of Disney’s work", "correct": false}
  ],
  "explanation": "The passage focuses on the life and accomplishments of Walt Disney."
},

];

const Mock5 = () => {
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

export default Mock5;

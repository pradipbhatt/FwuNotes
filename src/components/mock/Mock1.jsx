import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import logo from "../../../public/fwu.png";

// Total time in seconds for 150 questions in 3 hours
const TOTAL_TIME = 3 * 60 * 60;
const quizData2077 = [
  {
    "question": "The unit vector along the direction of the vector a is ...",
    "answers": [
      { "text": "1/vector a", "correct": false },
      { "text": "1 / | vector a |", "correct": false },
      { "text": "vector a / | vector a |", "correct": true },
      { "text": "|vector a | / vector a ", "correct": false }
    ],
    "explanation": "The unit vector is a vector with a magnitude of 1 that points in the same direction as the given vector."
  },
  {
    "question": "The angle between the vectors vector a = 3k vector and b vector = √2 i vector + √2 j vector is ....",
    "answers": [
      { "text": "π", "correct": false },
      { "text": "π/4", "correct": false },
      { "text": "π/2", "correct": true },
      { "text": "0", "correct": false }
    ],
    "explanation": "The angle between the two vectors is calculated using the dot product formula."
  },
  {
    "question": "If A is any m x n matrix such that AB and BA are both defined, then B is a matrix of order ...",
    "answers": [
      { "text": "m x m", "correct": false },
      { "text": "n x n", "correct": false },
      { "text": "m x n", "correct": false },
      { "text": "n x m", "correct": true }
    ],
    "explanation": "The order of matrix B must be such that the product AB and BA are both defined."
  },
  {
    "question": "The inverse of a non-singular matrix A is given by ...",
    "answers": [
      { "text": "A^-1", "correct": true },
      { "text": "A^T", "correct": false },
      { "text": "det(A)", "correct": false },
      { "text": "does not exist", "correct": false }
    ],
    "explanation": "The inverse of a non-singular matrix A exists if and only if the determinant of A is non-zero."
  },
  {
    "question": "The value of i^5 + i^7 + i^9 is...",
    "answers": [
      { "text": "-1", "correct": false },
      { "text": "i", "correct": true },
      { "text": "-i", "correct": false },
      { "text": "1", "correct": false }
    ],
    "explanation": "The value is calculated using the properties of imaginary numbers."
  },
  {
    "question": "If two roots of a quadratic equation x^2 + kx + 4 = 0 have same magnitude but opposite sign. Then the value of k is ...",
    "answers": [
      { "text": "0", "correct": false },
      { "text": "2", "correct": true },
      { "text": "4", "correct": false },
      { "text": "1", "correct": false }
    ],
    "explanation": "The roots of the equation can be determined using the quadratic formula."
  },
  {
    "question": "If a, b, c are in H.P., then the value of b is ...",
    "answers": [
      { "text": "2ac / (a+c)", "correct": true },
      { "text": "(a+c)/2", "correct": false }
    ],
    "explanation": "The harmonic progression (H.P.) relationship among a, b, and c provides the value of b."
  },
  {
    "question": "The total number of different words we can form from the word 'BETTER' is ...",
    "answers": [
      { "text": "30", "correct": false },
      { "text": "20", "correct": false },
      { "text": "90", "correct": false },
      { "text": "180", "correct": true }
    ],
    "explanation": "The total number of different words is calculated using permutation and combination formulas considering repeated letters."
  },
  {
    "question": "If n is a positive integer, then how many terms are there in the expansion of (x - a)^n ?",
    "answers": [
      { "text": "n-1", "correct": false },
      { "text": "n+1", "correct": true },
      { "text": "n", "correct": false },
      { "text": "n^2", "correct": false }
    ],
    "explanation": "The number of terms in the expansion is determined by the binomial theorem."
  },
  {
    "question": "The value of 2 + e^a a . is",
    "answers": [
      { "text": "1+e", "correct": true },
      { "text": "e", "correct": false },
      { "text": "2 +e", "correct": false },
      { "text": "e-1", "correct": false }
    ],
    "explanation": "This value involves an exponential function and its series expansion."
  },
  {
    "question": "If the temperature of a patient is 40°C, his temperature on the Fahrenheit scale will be ...",
    "answers": [
      { "text": "72°F", "correct": false },
      { "text": "96°F", "correct": false },
      { "text": "100°F", "correct": false },
      { "text": "104°F", "correct": true }
    ],
    "explanation": "The temperature conversion formula from Celsius to Fahrenheit is used."
  },
  {
    "question": "The coefficient of linear expansion of iron is 0.00001 1/K. An iron rod is 10 m long at 27°C. The length of the rod will be decreased by 1.1 mm when the temperature of the rod changes to...",
    "answers": [
      { "text": "0°C", "correct": true },
      { "text": "10°C", "correct": false },
      { "text": "17°C", "correct": false },
      { "text": "20°C", "correct": false }
    ],
    "explanation": "The length change is calculated using the linear expansion formula."
  },
  {
    "question": "A waterfall is 168 m high. Assuming that half the kinetic energy of the falling water gets converted into heat, the rise in the temperature of water is approximately ....",
    "answers": [
      { "text": "0.1°C", "correct": false },
      { "text": "0.2°C", "correct": false },
      { "text": "0.3°C", "correct": false },
      { "text": "0.4°C", "correct": true }
    ],
    "explanation": "The temperature rise is calculated using the energy conversion principles."
  },
  {
    "question": "A Carnot’s engine works with a source at a temperature of 27°C and a sink at -123°C. Its efficiency is...",
    "answers": [
      { "text": "0.75", "correct": false },
      { "text": "0.4", "correct": true },
      { "text": "0.5", "correct": false },
      { "text": "0.25", "correct": false }
    ],
    "explanation": "The efficiency of a Carnot engine is calculated using the temperatures of the source and the sink."
  },
  {
    "question": "A cooking pot should have ...",
    "answers": [
      { "text": "High specific heat and low conductivity", "correct": false },
      { "text": "High specific heat and high conductivity", "correct": true },
      { "text": "Low specific heat and low conductivity", "correct": false },
      { "text": "Low specific heat and high conductivity", "correct": false }
    ],
    "explanation": "The properties of a good cooking pot are determined by heat transfer principles."
  },
  {
    "question": "If the intensity of sound is doubled, the intensity level will increase by nearly...",
    "answers": [
      { "text": "1 dB", "correct": false },
      { "text": "2 dB", "correct": false },
      { "text": "3 dB", "correct": true },
      { "text": "4 dB", "correct": false }
    ],
    "explanation": "The relationship between intensity and decibel level is used to calculate the increase."
  },
  {
    "question": "If the ratio of amplitudes of two waves is 4:3, then the ratio of maximum and minimum intensity is ....",
    "answers": [
      { "text": "16:9", "correct": true },
      { "text": "1:16", "correct": false },
      { "text": "1:49", "correct": false },
      { "text": "49:1", "correct": false }
    ],
    "explanation": "The ratio of intensities is calculated using the square of the amplitude ratio."
  },
  {
    "question": "A metal plate of area 10 cm² is moved with a velocity of 10 cm/s normal to a magnetic field of strength 1 Wb/m². The induced emf is ...",
    "answers": [
      { "text": "1 V", "correct": false },
      { "text": "0.01 V", "correct": true },
      { "text": "0.1 V", "correct": false },
      { "text": "100 V", "correct": false }
    ],
    "explanation": "The induced emf is calculated using Faraday's law of electromagnetic induction."
  },
  {
    "question": "The basic function of a transformer is to change...",
    "answers": [
      { "text": "Power", "correct": false },
      { "text": "Voltage", "correct": true },
      { "text": "Current", "correct": false },
      { "text": "Energy", "correct": false }
    ],
    "explanation": "A transformer is used to step up or step down voltage."
  },
  {
    "question": "The mass of a proton is approximately ... times the mass of an electron.",
    "answers": [
      { "text": "1840", "correct": true },
      { "text": "840", "correct": false },
      { "text": "184", "correct": false },
      { "text": "280", "correct": false }
    ],
    "explanation": "The mass of a proton compared to an electron is a known physical constant."
  },
  {
    "question": "To travel faster than light, a particle should have ....",
    "answers": [
      { "text": "More energy", "correct": false },
      { "text": "Less energy", "correct": false },
      { "text": "No mass", "correct": true },
      { "text": "More mass", "correct": false }
    ],
    "explanation": "According to relativity, particles with no mass can travel at the speed of light."
  },
  {
    "question": "The common ion effect is associated with ...",
    "answers": [
      { "text": "Acid-base equilibria", "correct": true },
      { "text": "Redox reactions", "correct": false },
      { "text": "Precipitation reactions", "correct": false },
      { "text": "Electrolysis", "correct": false }
    ],
    "explanation": "The common ion effect affects solubility and acid-base equilibria."
  },
  {
    "question": "The number of unpaired electrons in Cr³⁺ ion is...",
    "answers": [
      { "text": "3", "correct": false },
      { "text": "4", "correct": false },
      { "text": "5", "correct": true },
      { "text": "6", "correct": false }
    ],
    "explanation": "The electron configuration of Cr³⁺ determines the number of unpaired electrons."
  },
  {
    "question": "The equivalent weight of KMnO₄ (molecular weight M) in acidic medium is ...",
    "answers": [
      { "text": "M/5", "correct": true },
      { "text": "M/3", "correct": false },
      { "text": "M/2", "correct": false },
      { "text": "M", "correct": false }
    ],
    "explanation": "The equivalent weight is calculated based on the change in oxidation state in the reaction."
  },
  {
    "question": "The number of atoms present in 0.1 mol of SO₂ is ...",
    "answers": [
      { "text": "6.02 x 10²²", "correct": false },
      { "text": "12.04 x 10²²", "correct": true },
      { "text": "3.01 x 10²²", "correct": false },
      { "text": "9.03 x 10²²", "correct": false }
    ],
    "explanation": "The number of atoms is calculated using Avogadro's number."
  },
  {
    "question": "The solubility of AgCl will be minimum in ...",
    "answers": [
      { "text": "Water", "correct": false },
      { "text": "Dilute HCl", "correct": true },
      { "text": "Saturated NaCl solution", "correct": false },
      { "text": "Ammonia", "correct": false }
    ],
    "explanation": "The solubility product principle and common ion effect are applied."
  },
  {
    "question": "Which is a covalent compound?",
    "answers": [
      { "text": "NaCl", "correct": false },
      { "text": "CaO", "correct": false },
      { "text": "NH₃", "correct": true },
      { "text": "K₂SO₄", "correct": false }
    ],
    "explanation": "Covalent compounds are formed by sharing of electrons."
  },
  {
    "question": "Which one is correct?",
    "answers": [
      { "text": "The pH of acid may be zero", "correct": true },
      { "text": "pOH of acid may be 4.74", "correct": false },
      { "text": "pH of weak base may be 13.5", "correct": false },
      { "text": "pH meter cannot measure the pH of weak acid", "correct": false }
    ],
    "explanation": "The pH of strong acids can be zero or very low."
  },
  {
    "question": "You should not interfere ... ...... other people’s affairs.",
    "options": [
      {"text": "for", "correct": false},
      {"text": "in", "correct": true},
      {"text": "at", "correct": false},
      {"text": "none of these", "correct": false}
    ],
    "explanation": "The correct phrase is 'interfere in'."
  },
  {
    "question": "SZ. JUN seescessecvsess all praise is a wise girl.",
    "options": [
      {"text": "who", "correct": true},
      {"text": "whom", "correct": false},
      {"text": "whose", "correct": false},
      {"text": "which", "correct": false}
    ],
    "explanation": "The correct relative pronoun to refer to a person is 'who'."
  },
  {
    "question": "The plural of proof is...",
    "options": [
      {"text": "proof", "correct": false},
      {"text": "proves", "correct": false},
      {"text": "proofs", "correct": true},
      {"text": "proves", "correct": false}
    ],
    "explanation": "The plural of 'proof' is 'proofs'."
  },
  {
    "question": "I’m a bit tired. I think ...",
    "options": [
      {"text": "P'dtakerest", "correct": false},
      {"text": "I ‘Il take rest", "correct": false},
      {"text": "[must take rest", "correct": false},
      {"text": "I rest", "correct": true}
    ],
    "explanation": "The correct expression is 'I rest'."
  },
  {
    "question": "All... glitters is not gold.",
    "options": [
      {"text": "which", "correct": false},
      {"text": "who", "correct": false},
      {"text": "whose", "correct": false},
      {"text": "that", "correct": true}
    ],
    "explanation": "The correct phrase is 'All that glitters is not gold'."
  },
  {
    "question": "He as well as his friends........... English.",
    "options": [
      {"text": "to speak", "correct": false},
      {"text": "speaks", "correct": true},
      {"text": "speak", "correct": false},
      {"text": "speaking", "correct": false}
    ],
    "explanation": "The verb agrees with 'he' when 'as well as' is used."
  },
  {
    "question": "Which of the following nouns is singular?",
    "options": [
      {"text": "cattle", "correct": false},
      {"text": "people", "correct": false},
      {"text": "vermin", "correct": false},
      {"text": "bacterium", "correct": true}
    ],
    "explanation": "'Bacterium' is singular."
  },
  {
    "question": "The passive voice of the sentence “we admire the brave” is.....",
    "options": [
      {"text": "The brave is admired", "correct": false},
      {"text": "The brave are being admired", "correct": false},
      {"text": "The brave are admired", "correct": true},
      {"text": "We are admired", "correct": false}
    ],
    "explanation": "In passive voice, the subject of the active sentence becomes the object."
  },
  {
    "question": "The indirect speech of the sentence “She said, 'You had better start, Rita.'” is... ..",
    "options": [
      {"text": "She told to better start.", "correct": false},
      {"text": "She advised Rita to start.", "correct": true},
      {"text": "She said to Rita to start.", "correct": false},
      {"text": "She said Rita had better start.", "correct": false}
    ],
    "explanation": "Indirect speech reports what someone else has said using appropriate reporting verbs."
  },
  {
    "question": "If I were you, I... 0.00...",
    "options": [
      {"text": "would have replied", "correct": false},
      {"text": "would have been replied", "correct": false},
      {"text": "would reply", "correct": true},
      {"text": "will reply", "correct": false}
    ],
    "explanation": "Conditional sentences use 'would' for hypothetical situations."
  },
  {
    "question": "Einstein discovered that the Universe ..........",
    "options": [
      {"text": "expanded", "correct": false},
      {"text": "expands", "correct": false},
      {"text": "is expanding", "correct": true},
      {"text": "have expanded", "correct": false}
    ],
    "explanation": "Present continuous ('is expanding') is used for ongoing actions or states."
  },
  {
    "question": "Slow and steady .................the race.",
    "options": [
      {"text": "win", "correct": false},
      {"text": "wins", "correct": true},
      {"text": "won", "correct": false},
      {"text": "winning", "correct": false}
    ],
    "explanation": "The phrase 'slow and steady' requires a singular verb ('wins')."
  },
  {
    "question": "Things once................+..can’t be returned.",
    "options": [
      {"text": "sell", "correct": false},
      {"text": "to sell", "correct": false},
      {"text": "have sold", "correct": false},
      {"text": "sold", "correct": true}
    ],
    "explanation": "The correct form is 'sold'."
  },
  {
    "question": "He goes to visit his aunt once in a blue moon; she lives in a remote village. The underlined idiom means:",
    "options": [
      {"text": "most often", "correct": false},
      {"text": "only once", "correct": false},
      {"text": "very rarely", "correct": true},
      {"text": "fortnightly", "correct": false}
    ],
    "explanation": "The idiom 'once in a blue moon' means very rarely."
  },
  {
    "question": "It is To.....mo wrong.",
    "options": [
      {"text": "who does", "correct": false},
      {"text": "that does", "correct": true},
      {"text": "who do", "correct": false},
      {"text": "who has done", "correct": false}
    ],
    "explanation": "The correct phrase is 'It is that wrong.'"
  },
  {
    "question": "Many Nepali children are deprived............ decent education.",
    "options": [
      {"text": "from", "correct": false},
      {"text": "of", "correct": true},
      {"text": "by", "correct": false},
      {"text": "for", "correct": false}
    ],
    "explanation": "The correct preposition with 'deprived' is 'of'."
  },
  {
    "question": "The antonym of ‘reliable’ is......",
    "options": [
      {"text": "Dependable", "correct": false},
      {"text": "Trustworthy", "correct": false},
      {"text": "Unreliable", "correct": true},
      {"text": "Irreliable", "correct": false}
    ],
    "explanation": "The antonym of 'reliable' is 'unreliable'."
  },
  {
    "question": "I will have her ....................the phone.",
    "options": [
      {"text": "to cook", "correct": false},
      {"text": "answer", "correct": false},
      {"text": "to answer", "correct": true},
      {"text": "answered", "correct": false}
    ],
    "explanation": "The correct phrase is 'have her answer the phone'."
  },
  {
    "question": "The word “green” has the same vowel sound as the word....",
    "options": [
      {"text": "bring", "correct": false},
      {"text": "peace", "correct": false},
      {"text": "kill", "correct": false},
      {"text": "head", "correct": true}
    ],
    "explanation": "The words 'green' and 'head' have the same vowel sound."
  },
  {
    "question": "In the word “Police”, the stress falls on .....",
    "options": [
      {"text": "the first syllable", "correct": false},
      {"text": "the second syllable", "correct": true},
      {"text": "both the syllables", "correct": false},
      {"text": "no syllable", "correct": false}
    ],
    "explanation": "The stress in the word 'Police' falls on the second syllable."
  },
  {
    "question": "The total number of non-empty proper subsets of the set A = {1,2,3} is ...",
    "options": [
      {"text": "3", "correct": false},
      {"text": "8", "correct": true},
      {"text": "6", "correct": false},
      {"text": "1", "correct": false}
    ],
    "explanation": "The set {1, 2, 3} has 8 non-empty proper subsets."
  },
  {
    "question": "If a function f(x) is defined by f(x) = x/x : then the value of f(—1) is ...",
    "options": [
      {"text": "1", "correct": true},
      {"text": "0", "correct": false},
      {"text": "-1", "correct": false},
      {"text": "-2", "correct": false}
    ],
    "explanation": "The function f(x) = x/x simplifies to f(x) = 1 for all x ≠ 0."
  },
  {
    "question": "If tan @ tan 2 @ = 1 .Then the general value of @ are given by ...",
    "options": [
      {"text": "(nw +1)^2", "correct": false},
      {"text": "(2n +1)^2", "correct": true},
      {"text": "(2n^4+1)^2", "correct": false},
      {"text": "(nw +1)^2", "correct": false}
    ],
    "explanation": "The general solution for tan @ tan 2 @ = 1 is (2n + 1)π, where n is an integer."
  },
  {
    "question": "The value of sin-1 x + cos-1 x is.....",
    "options": [
      {"text": "1", "correct": false},
      {"text": "1", "correct": false},
      {"text": "=", "correct": true},
      {"text": "i", "correct": false}
    ],
    "explanation": "sin-1 x + cos-1 x = π/2 for all x in the interval [-1, 1]."
  },
  {
    "question": "In any triangle if tan A + tan B + tan C = 6 and tan A tan B = 2. Then the value of tan A + tan B is......",
    "options": [
      {"text": "3", "correct": true},
      {"text": "2", "correct": false},
      {"text": "4", "correct": false},
      {"text": "9", "correct": false}
    ],
    "explanation": "tan A + tan B + tan C = tan A + tan B + tan(π - A - B) = 6, and tan A tan B = 2."
  },
  {
    "question": "If the lines 2x + 3y = 9 and 3x + ky = 5 are perpendicular then what will be the value of k?",
    "options": [
      {"text": "2", "correct": false},
      {"text": "1", "correct": false},
      {"text": "-1", "correct": false},
      {"text": "-2", "correct": true}
    ],
    "explanation": "Two lines are perpendicular if the product of their slopes is -1."
  },
  {
    "question": "If two lines represented by ax2 + 2hxy + by2 = 0 are parallel then....",
    "options": [
      {"text": "h^2—ab=0", "correct": false},
      {"text": "h^2 — ab >0", "correct": false},
      {"text": "h^2—ab <0", "correct": false},
      {"text": "h^2 — ab ≠0", "correct": true}
    ],
    "explanation": "For two lines to be parallel, the discriminant h^2 - ab must be zero."
  },
  {
    "question": "The distance from the origin to the centre of the circle which touches the x axis and y axis at (1,0) and (0,1) respectively is ...... '",
    "options": [
      {"text": "1", "correct": false},
      {"text": "2", "correct": true},
      {"text": "√2", "correct": false},
      {"text": "—√2", "correct": false}
    ],
    "explanation": "The radius of the circle touching x-axis and y-axis at given points is 2 units."
  },
  {
    "question": "If e denotes the eccentricity of the hyperbola. Then the value of e Is... ...",
    "options": [
      {"text": "<1", "correct": true},
      {"text": "i", "correct": false},
      {"text": "1", "correct": false},
      {"text": ">1", "correct": false}
    ],
    "explanation": "Eccentricity 'e' of a hyperbola is always less than 1."
  },
  {
    "question": "The direction cosine of the normal to the plane 2x + y + 3z — 5 = 0 are......",
    "options": [
      {"text": "2.4", "correct": false},
      {"text": "3", "correct": false},
      {"text": "0", "correct": false},
      {"text": "±√(2/14)", "correct": true}
    ],
    "explanation": "The direction cosine of the normal to the plane can be found using the coefficients of x, y, and z in the plane equation."
  },
  {
    "question": "The value of lim x→0 sin(1/x) is .......",
    "options": [
      {"text": "-1", "correct": false},
      {"text": "0", "correct": true},
      {"text": "1", "correct": false},
      {"text": "does not exist", "correct": false}
    ],
    "explanation": "As x approaches 0, sin(1/x) oscillates between -1 and 1, so its limit does not exist."
  },
  {
    "question": "The derivative of log|x| with respect to x for x < 0 is ....",
    "options": [
      {"text": "1", "correct": false},
      {"text": "0", "correct": false},
      {"text": "-1", "correct": true},
      {"text": "2", "correct": false}
    ],
    "explanation": "The derivative of log|x| for x < 0 is -1/x."
  },
  {
    "question": "The value of ∫ dx / (1 + x^2) is .......",
    "options": [
      {"text": "1", "correct": true},
      {"text": "0", "correct": false},
      {"text": "-1", "correct": false},
      {"text": "2", "correct": false}
    ],
    "explanation": "The integral of dx / (1 + x^2) is arctan(x), and its definite integral from -∞ to ∞ is π."
  },
  {
    "question": "The graph of the function y = 4x^2 + 2x + 3 is concave ...",
    "options": [
      {"text": "upward", "correct": true},
      {"text": "downward", "correct": false},
      {"text": "rightward", "correct": false},
      {"text": "leftward", "correct": false}
    ],
    "explanation": "The function y = 4x^2 + 2x + 3 is a quadratic function with a positive leading coefficient, indicating it opens upwards."
  },
  {
    "question": "If Ix — lke is ...",
    "options": [
      {"text": "0", "correct": false},
      {"text": "1", "correct": false},
      {"text": "2", "correct": true},
      {"text": "3", "correct": false}
    ],
    "explanation": "The absolute value of the difference |x - k| is a linear function with a slope of 1 and a vertex at x = k."
  },
  {
    "question": "When some detergent is added to water, the surface tension ......",
    "options": [
      {"text": "remains unaffected", "correct": false},
      {"text": "increases", "correct": false},
      {"text": "decreases", "correct": true},
      {"text": "may increase or decrease", "correct": false}
    ],
    "explanation": "Detergents reduce surface tension by disrupting the cohesive forces between water molecules."
  },
  {
    "question": "If P represents pressure, c represents speed of light and Q represents energy striking a unit area per second, then non-zero integers x, y, and z, such that P*Q*c^z is dimensionless, are.......",
    "options": [
      {"text": "x=1, y=1, z=-1", "correct": false},
      {"text": "x=1, y=-1, z=1", "correct": false},
      {"text": "x=-1, y=1, z=1", "correct": true},
      {"text": "x=1, y=1, z=1", "correct": false}
    ],
    "explanation": "For the expression P*Q*c^z to be dimensionless, the exponents x, y, and z must sum to zero."
  },
  {
    "question": "When two bodies move towards each other with constant speeds, the distance between them decreases at the rate of 6 m/s. If they move in the same direction with the same speeds, the distance between them increases at the rate of 4 m/s. Their speeds are....",
    "options": [
      {"text": "5 m/s and 1 m/s", "correct": false},
      {"text": "3 m/s and 3 m/s", "correct": true},
      {"text": "4 m/s and 2 m/s", "correct": false},
      {"text": "2 m/s and 4 m/s", "correct": false}
    ],
    "explanation": "The relative speed when moving towards each other is the sum of their speeds, and when moving in the same direction, it is the difference."
  },
  {
    "question": "The displacement of a body of mass 2 kg as a function of time is given by x = 2t^2 + 5, where x is in meter and t in seconds. The increase in its kinetic energy, one second after the start of motion is ...",
    "options": [
      {"text": "8 J", "correct": false},
      {"text": "16 J", "correct": true},
      {"text": "32 J", "correct": false},
      {"text": "64 J", "correct": false}
    ],
    "explanation": "Kinetic energy increase can be found using the formula KE = 0.5 * m * v^2, where v is the velocity derived from the displacement equation."
  },
  {
    "question": "A weightless thread can bear tension up to 3.7 kg weight. A stone of mass 500 gm is tied to it and revolved in a circular path of radius 4m in a vertical plane. If g = 10 m/s², the maximum angular velocity of the stone will be...",
    "options": [
      {"text": "4 radians/sec", "correct": false},
      {"text": "16 radians/sec", "correct": true},
      {"text": "√21 radians/sec", "correct": false},
      {"text": "2 radians/sec", "correct": false}
    ],
    "explanation": "Maximum angular velocity (ω) is given by ω = √(g / r), where g is the acceleration due to gravity and r is the radius of the circular path."
  },
  {
    "question": "Two springs fixed at one end are stretched by 5 cm and 10 cm respectively, when masses 0.5 kg and 1 kg are suspended at their lower ends. When displaced slightly from their mean positions and released they will oscillate with time periods in the ratio...",
    "options": [
      {"text": "1:2", "correct": false},
      {"text": "√2:1", "correct": false},
      {"text": "2:1", "correct": true},
      {"text": "1:2", "correct": false}
    ],
    "explanation": "The time period of oscillation for a spring-mass system is inversely proportional to the square root of the mass attached."
  },
  {
    "question": "The following four wires are made of the same material. Which of these will have the largest extension when the same tension is applied?",
    "options": [
      {"text": "Length = 50 cm, diameter = 0.5 mm", "correct": false},
      {"text": "Length = 100 cm, diameter = 1 mm", "correct": false},
      {"text": "Length = 200 cm, diameter = 2 mm", "correct": true},
      {"text": "Length = 400 cm, diameter = 3 mm", "correct": false}
    ],
    "explanation": "The extension of a wire under tension is inversely proportional to its cross-sectional area, which is related to its diameter."
  },
  {
    "question": "An electron of charge e coulomb passes through a potential difference of V volts. Its energy in joules will be ...",
    "options": [
      {"text": "Ve", "correct": false},
      {"text": "eV", "correct": true},
      {"text": "e/V", "correct": false},
      {"text": "V", "correct": false}
    ],
    "explanation": "The energy gained by an electron passing through a potential difference V is given by eV."
  },
  {
    "question": "The electric intensity E, current density j and conductivity σ are related as ...",
    "options": [
      {"text": "j = σE", "correct": true},
      {"text": "j = E/σ", "correct": false},
      {"text": "jE = σ", "correct": false},
      {"text": "j = σ/E", "correct": false}
    ],
    "explanation": "Current density (j) is directly proportional to the electric intensity (E) and conductivity (σ)."
  },
  {
    "question": "Two resistors of 500 ohm and 300 ohm are connected in series with a battery of emf 20V. A voltmeter of resistance 500 ohm is used to measure the p. d. across the 500 ohm resistor. The error in the measurement is ............",
    "options": [
      {"text": "14V", "correct": false},
      {"text": "24V", "correct": false},
      {"text": "3.4V", "correct": true},
      {"text": "4.4V", "correct": false}
    ],
    "explanation": "The error due to the voltmeter is caused by its own internal resistance affecting the voltage drop across the resistor."
  },
  {
    "question": "A 60 W bulb operates on 220 V supply. The current flowing through the bulb is ...........",
    "options": [
      {"text": "11/3 amp", "correct": true},
      {"text": "3/11 amp", "correct": false},
      {"text": "3 amp", "correct": false},
      {"text": "6 amp", "correct": false}
    ],
    "explanation": "Current (I) can be calculated using the formula I = P / V, where P is power and V is voltage."
  },
  {
    "question": "The photoelectric work function of metal is 1 eV. Light of wavelength 3000 Angstrom falls on it. The photoelectrons will come out with approximate speed equal to .......",
    "options": [
      {"text": "10 m/s", "correct": false},
      {"text": "10^7 m/s", "correct": true},
      {"text": "10^6 m/s", "correct": false},
      {"text": "10^5 m/s", "correct": false}
    ],
    "explanation": "The speed of photoelectrons ejected is given by v = √(2E_k / m), where E_k is the kinetic energy and m is the mass of the electron."
  },
  {
    "question": "A potential difference of 42 kV is used in an X-ray tube to accelerate electrons. The maximum frequency of X- radiations produced is .......",
    "options": [
      {"text": "10^6 Hz", "correct": false},
      {"text": "10^7 Hz", "correct": false},
      {"text": "10^8 Hz", "correct": true},
      {"text": "10^9 Hz", "correct": false}
    ],
    "explanation": "The maximum frequency of X-rays produced is related to the energy of the electrons and can be calculated using the formula f_max = eV / h, where e is the electron charge, V is the potential difference, and h is Planck's constant."
  },
  {
    "question": "If 20 gm of a radioactive substance reduces to 10 gm in 4 minutes, then in what time will 80 gm of the same substance reduce to 10 gm?",
    "options": [
      {"text": "8 min", "correct": false},
      {"text": "12 min", "correct": true},
      {"text": "16 min", "correct": false},
      {"text": "20 min", "correct": false}
    ],
    "explanation": "Radioactive decay follows an exponential decay model, so the time taken is proportional to the natural logarithm of the ratio of initial to final mass."
  },
  {
    "question": "In a p type semiconductor the majority charge carriers are ........",
    "options": [
      {"text": "Electrons", "correct": false},
      {"text": "Holes", "correct": true},
      {"text": "Neutrons", "correct": false},
      {"text": "Protons", "correct": false}
    ],
    "explanation": "In a p-type semiconductor, holes (positive charge carriers) are the majority carriers."
  },
  {
    "question": "The amount of charge to deposit 24 g of Mg from MgCl2 solution is ....",
    "options": [
      {"text": "1 F", "correct": false},
      {"text": "2 F", "correct": false},
      {"text": "96500 C", "correct": true},
      {"text": "48250 C", "correct": false}
    ],
    "explanation": "The amount of charge (Q) required to deposit a given mass of a substance during electrolysis can be calculated using Faraday's law of electrolysis."
  },
  {
    "question": "The number of unpaired electrons in Cr3+ ion are... ....",
    "options": [
      {"text": "6", "correct": false},
      {"text": "2", "correct": true},
      {"text": "3", "correct": false},
      {"text": "1", "correct": false}
    ],
    "explanation": "Cr3+ ion has two unpaired electrons according to its electronic configuration."
  },
  {
    "question": "The equivalent weight of KMnO4 (molecular weight M) in acidic medium is ........",
    "options": [
      {"text": "M/5", "correct": false},
      {"text": "M/3", "correct": true},
      {"text": "M/2", "correct": false},
      {"text": "M", "correct": false}
    ],
    "explanation": "The equivalent weight of KMnO4 in acidic medium is one-third of its molecular weight."
  },
  {
    "question": "The number of atoms present in 0.1 mol of SO3 is .......",
    "options": [
      {"text": "3", "correct": false},
      {"text": "3Nₐ", "correct": true},
      {"text": "0.3Nₐ", "correct": false},
      {"text": "0.1Nₐ", "correct": false}
    ],
    "explanation": "One mole of SO3 contains Avogadro's number (Nₐ) of molecules, so 0.1 mol contains 0.1 * Nₐ atoms."
  },
  {
    question: "The view was wonderful. If .......... a camera with me, I would have taken some photographs.",
    answers: [
      { text: "I’d had", correct: true },
      { text: "I would have", correct: false },
      { text: "I would have had", correct: false },
      { text: "I had", correct: false }
    ],
    explanation: "The correct answer is 'I’d had,' which is the correct past perfect tense for the hypothetical situation presented."
  },
  {
    "question": "The solubility of AgCl will be minimum in",
    "options": [
      {"text": "0.01 M NaCl", "correct": true},
      {"text": "0.01 M CaCl2", "correct": false},
      {"text": "Pure water", "correct": false},
      {"text": "0.001 M AgNO3", "correct": false}
    ],
    "explanation": "According to the common ion effect, the solubility of a sparingly soluble salt like AgCl decreases in the presence of a common ion (Cl⁻ in this case)."
  },
  {
    "question": "Which is a covalent compound?",
    "options": [
      {"text": "HCl", "correct": true},
      {"text": "NaCl", "correct": false},
      {"text": "MgCl2", "correct": false},
      {"text": "NaHCO3", "correct": false}
    ],
    "explanation": "Covalent compounds are formed by sharing of electrons between atoms, typical of molecular substances."
  },
  {
    "question": "Which one is correct?",
    "options": [
      {"text": "pH of acid may be zero", "correct": false},
      {"text": "pOH of acid may be 4.74", "correct": false},
      {"text": "pH of weak base may be 13.5", "correct": false},
      {"text": "pH meter cannot measure the pH of weak acid", "correct": true}
    ],
    "explanation": "pH meters are generally not sensitive enough to accurately measure the pH of weak acids or bases."
  },
  {
    "question": "The mass of pure marble required to neutralize 40 mL of 0.5 M HCl solution is...",
    "options": [
      {"text": "2 g", "correct": false},
      {"text": "4 g", "correct": false},
      {"text": "8 g", "correct": true},
      {"text": "1 g", "correct": false}
    ],
    "explanation": "The amount of marble needed is calculated based on the stoichiometry of the reaction between HCl and CaCO3 in marble."
  },
  {
    "question": "The correct order of acidic strength is ........",
    "options": [
      {"text": "HI > HBr > HCl > HF", "correct": false},
      {"text": "HI < HBr < HCl < HF", "correct": false},
      {"text": "HI > HBr = HCl > HF", "correct": true},
      {"text": "HI > HBr > HCl = HF", "correct": false}
    ],
    "explanation": "Acidic strength increases with decreasing pKa values, where pKa is related to the strength of the acid."
  },
  {
    "question": "Which element has a higher tendency to lose electrons?",
    "options": [
      {"text": "K", "correct": true},
      {"text": "Be", "correct": false},
      {"text": "S", "correct": false},
      {"text": "F", "correct": false}
    ],
    "explanation": "Potassium (K) has a lower ionization energy compared to the other elements listed, indicating a higher tendency to lose electrons."
  },
  {
    "question": "A heteroatom in pyrrole is ......",
    "options": [
      {"text": "N", "correct": true},
      {"text": "S", "correct": false},
      {"text": "O", "correct": false},
      {"text": "P", "correct": false}
    ],
    "explanation": "Pyrrole is a five-membered aromatic heterocyclic compound containing nitrogen (N) as the heteroatom."
  },
  {
    "question": "Possible functional isomers of C2H4O2 are ....",
    "options": [
      {"text": "Aldehyde and ketone", "correct": false},
      {"text": "Carboxylic acid and ester", "correct": true},
      {"text": "Ester and acid anhydride", "correct": false},
      {"text": "Acid anhydride and carboxylic acid", "correct": false}
    ],
    "explanation": "Functional isomers have the same molecular formula but different functional groups."
  },
  {
    "question": "Which is an aromatic compound?",
    "options": [
      {"text": "Acetic acid", "correct": false},
      {"text": "Acetone", "correct": false},
      {"text": "Furan", "correct": true},
      {"text": "Formaldehyde", "correct": false}
    ],
    "explanation": "Furan is an aromatic heterocyclic compound with a five-membered ring containing one oxygen atom."
  },
  {
    "question": "What is the chemical formula of aspirin?",
    "options": [
      {"text": "C7H6O2", "correct": false},
      {"text": "C9H8O4", "correct": true},
      {"text": "CH3COOH", "correct": false},
      {"text": "C6H12O6", "correct": false}
    ],
    "explanation": "Aspirin, also known as acetylsalicylic acid, has the chemical formula C9H8O4."
  },
  {
    "question": "Which gas is produced when limestone is heated strongly?",
    "options": [
      {"text": "Oxygen", "correct": false},
      {"text": "Carbon dioxide", "correct": true},
      {"text": "Hydrogen", "correct": false},
      {"text": "Nitrogen", "correct": false}
    ],
    "explanation": "When limestone (calcium carbonate, CaCO3) is heated strongly, it decomposes to form calcium oxide (CaO) and carbon dioxide gas (CO2)."
  },
  {
    "question": "What is the chemical name of quicklime?",
    "options": [
      {"text": "Calcium hydroxide", "correct": false},
      {"text": "Calcium carbonate", "correct": false},
      {"text": "Calcium oxide", "correct": true},
      {"text": "Calcium chloride", "correct": false}
    ],
    "explanation": "Quicklime is the common name for calcium oxide (CaO), which is obtained by heating limestone in a kiln."
  },
  {
    "question": "Which compound is commonly known as 'bleach'?",
    "options": [
      {"text": "Sodium carbonate", "correct": false},
      {"text": "Sodium chloride", "correct": false},
      {"text": "Sodium hypochlorite", "correct": true},
      {"text": "Sodium bicarbonate", "correct": false}
    ],
    "explanation": "Sodium hypochlorite (NaOCl) is commonly known as bleach and is used as a disinfectant and bleaching agent."
  },
  {
    "question": "Which metal is found in Vitamin B12?",
    "options": [
      {"text": "Cobalt", "correct": true},
      {"text": "Iron", "correct": false},
      {"text": "Magnesium", "correct": false},
      {"text": "Zinc", "correct": false}
    ],
    "explanation": "Vitamin B12 (cyanocobalamin) contains cobalt in its chemical structure."
  },
  {
    "question": "What is the main component of natural gas?",
    "options": [
      {"text": "Methane", "correct": true},
      {"text": "Ethane", "correct": false},
      {"text": "Propane", "correct": false},
      {"text": "Butane", "correct": false}
    ],
    "explanation": "Natural gas primarily consists of methane (CH4), which is a simple hydrocarbon."
  },
  {
    "question": "Which gas is known as 'smelling salts'?",
    "options": [
      {"text": "Ammonia", "correct": true},
      {"text": "Carbon dioxide", "correct": false},
      {"text": "Sulfur dioxide", "correct": false},
      {"text": "Methane", "correct": false}
    ],
    "explanation": "Smelling salts typically contain ammonia (NH3), which is used to revive people who have fainted."
  },
  {
    "question": "What is the common name of ethanoic acid?",
    "options": [
      {"text": "Acetone", "correct": false},
      {"text": "Acetic acid", "correct": true},
      {"text": "Ethylene glycol", "correct": false},
      {"text": "Ethanol", "correct": false}
    ],
    "explanation": "Ethanoic acid is commonly known as acetic acid, which is a weak acid used in vinegar."
  }  
];

const Mock1 = () => {
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
        <Footer />
      </div>
    </>
  );
};

export default Mock1;

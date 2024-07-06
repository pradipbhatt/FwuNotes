import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import logo from "../../../public/fwu.png";

// Total time in seconds for 150 questions in 3 hours
const TOTAL_TIME = 3 * 60 * 60;
const quizData2077 = [ // Define quiz data for 2077
  {
    "question": "The value of the determinant | w w2 1 | is",
    "answers": [
        {"text": "|", "correct": false},
        {"text": "w", "correct": true},
        {"text": "w^2", "correct": false},
        {"text": "0", "correct": false}
    ],
    "explanation": "The value of the determinant | w w2 1 | is w, as it is the value obtained by subtracting the product of the elements in the downward diagonal from the product of the elements in the upward diagonal."
},
{
    "question": "If A and B are square matrices of same order then inverse of AB is",
    "answers": [
        {"text": "A'B!", "correct": false},
        {"text": "I", "correct": true},
        {"text": "B'A", "correct": false},
        {"text": "BA", "correct": false}
    ],
    "explanation": "The inverse of the product of two square matrices A and B is equal to the product of their inverses in reverse order, i.e., (AB)^(-1) = B^(-1) * A^(-1)."
},
{
    "question": "The multiplicative inverse of the complex number (p, q) is",
    "answers": [
        {"text": "(p/q)", "correct": false},
        {"text": "(q/p)", "correct": false},
        {"text": "(q, -p)", "correct": true},
        {"text": "(p, q)", "correct": false}
    ],
    "explanation": "The multiplicative inverse of the complex number (p, q) is (-q, p). This is derived based on the definition where the product of a complex number and its multiplicative inverse is equal to (1, 0), the multiplicative identity."
},
{
    "question": "The condition that both roots of the equation px^2 + qx + r = 0 are of opposite signs is",
    "answers": [
        {"text": "p + r = 0", "correct": false},
        {"text": "p and r must be of opposite signs", "correct": false},
        {"text": "p, q, r must be of same sign", "correct": false},
        {"text": "q = 0", "correct": true}
    ],
    "explanation": "For both roots of the quadratic equation px^2 + qx + r = 0 to be of opposite signs, the coefficient of the linear term (q) must be zero."
},
{
    "question": "Which of the following statements is false?",
    "answers": [
        {"text": "the harmonic mean of any two unequal positive real numbers is smaller than their geometric mean", "correct": false},
        {"text": "sum of an infinite geometric series exists only when its common ratio is numerically less than one", "correct": false},
        {"text": "the sum of the cubes of first n natural numbers is equal to the square of their sum", "correct": true},
        {"text": "if p, q, r form a G.P. then, p^n, q^n, r^n (where n is a non zero real number) also form a G.P.", "correct": false}
    ],
    "explanation": "The statement 'the sum of the cubes of first n natural numbers is equal to the square of their sum' is false. In fact, the sum of the cubes of the first n natural numbers is equal to the square of the sum of these numbers multiplied by the sum itself."
},
{
    "question": "There are four questions in a question paper. In how many ways can a candidate solve one or more questions?",
    "answers": [
        {"text": "4", "correct": false},
        {"text": "15", "correct": true},
        {"text": "1", "correct": false},
        {"text": "16", "correct": false}
    ],
    "explanation": "The total number of ways in which a candidate can solve one or more questions out of four is given by 2^4 - 1 = 15."
},
{
    "question": "If C0, C1, C2, ..., Cn are binomial coefficients in the expansion of (1 + x)^n, then the value of C0 + C4 + ... + Cn is",
    "answers": [
        {"text": "(2n)!", "correct": false},
        {"text": "n!", "correct": true},
        {"text": "(2n)! / n!", "correct": false},
        {"text": "n", "correct": false}
    ],
    "explanation": "The sum of binomial coefficients in the expansion of (1 + x)^n taken at every alternate term starting from 0 to n is equal to 2^n."
},
{
    "question": "The value of log(e) is",
    "answers": [
        {"text": "e^2", "correct": false},
        {"text": "e", "correct": true},
        {"text": "ln 1", "correct": false},
        {"text": "ln 2", "correct": false}
    ],
    "explanation": "log(e) is the natural logarithm of the base 'e', which equals 1."
},
{
    "question": "The unit vector in the direction of a vector a is",
    "answers": [
        {"text": "a", "correct": false},
        {"text": "a / |a|", "correct": true},
        {"text": "a x a", "correct": false},
        {"text": "none of the above", "correct": false}
    ],
    "explanation": "The unit vector in the direction of a vector a is obtained by dividing the vector a by its magnitude |a|."
},
{
    "question": "The vectors a = 2i + 3j + 4k and b = 4i - 5j - 3k are",
    "answers": [
        {"text": "perpendicular to each other", "correct": false},
        {"text": "parallel to each other", "correct": false},
        {"text": "neither parallel nor perpendicular to each other", "correct": true},
        {"text": "make an angle of 60° with each other", "correct": false}
    ],
    "explanation": "Two vectors are neither parallel nor perpendicular to each other if their dot product is not zero and their magnitudes are not equal."
},
{
    "question": "The difference in temperature of 25°C is equivalent to difference of...",
    "answers": [
        {"text": "25°F", "correct": false},
        {"text": "32°F", "correct": true},
        {"text": "45°F", "correct": false},
        {"text": "72°F", "correct": false}
    ],
    "explanation": "The difference in temperature of 25°C is equivalent to a difference of 32°F. The formula for converting Celsius to Fahrenheit temperature difference is Δ°F = Δ°C × 9/5."
},
{
    "question": "A substance takes 3 min to cool from 50°C to 45°C and 5 min to cool from 45°C to 40°C. The time taken to cool from 40°C to 35°C is...",
    "answers": [
        {"text": "7 min", "correct": true},
        {"text": "12 min", "correct": false},
        {"text": "15 min", "correct": false},
        {"text": "18 min", "correct": false}
    ],
    "explanation": "The time taken to cool from 40°C to 35°C can be calculated by the cooling law, and it equals 7 minutes."
},
{
    "question": "The r.m.s. speed of gas molecules of density 1.29 kg/m³ at S.T.P. is...",
    "answers": [
        {"text": "275 m/s", "correct": false},
        {"text": "485 m/s", "correct": false},
        {"text": "670 m/s", "correct": true},
        {"text": "825 m/s", "correct": false}
    ],
    "explanation": "The r.m.s. speed of gas molecules is given by √(3kT / m), where T is the absolute temperature in Kelvin, k is the Boltzmann constant, and m is the mass of the molecule. At STP, the r.m.s. speed is approximately 670 m/s for air."
},
{
    "question": "The first law of thermodynamics for an isochoric process is...",
    "answers": [
        {"text": "dQ = dU", "correct": false},
        {"text": "dQ = dU + dW", "correct": true},
        {"text": "dQ = dW", "correct": false},
        {"text": "dQ = 0", "correct": false}
    ],
    "explanation": "The first law of thermodynamics for an isochoric (constant volume) process states that the change in internal energy (dU) of a system is equal to the heat added to the system (dQ) minus the work done by the system (dW)."
},
{
    "question": "The temperature at which water vapor present in a given sample of air becomes saturated is called...",
    "answers": [
        {"text": "triple point", "correct": false},
        {"text": "freezing point", "correct": false},
        {"text": "dew point", "correct": true},
        {"text": "boiling point", "correct": false}
    ],
    "explanation": "The dew point is the temperature at which air becomes saturated with water vapor and water vapor starts to condense into liquid water."
},
{
    "question": "Four independent waves are expressed as y1 = a1sin(ωt - φ1), y2 = a2sin(2ωt - φ2), y3 = a3cos(ωt - φ3), y4 = a4sin(ωt + φ4). The interference is possible for...",
    "answers": [
        {"text": "y1 & y2", "correct": false},
        {"text": "y3 & y2", "correct": false},
        {"text": "y1 & y4", "correct": true},
        {"text": "not possible for all", "correct": false}
    ],
    "explanation": "Interference between waves depends on their phase difference. Waves y1 and y4 can interfere because they are both sine waves and have a common angular frequency ω, allowing for interference."
},
{
    "question": "A plano-convex lens of material of refractive index 1.6 having a curved surface of radius 60 cm has power...",
    "answers": [
        {"text": "+1 D", "correct": false},
        {"text": "-1 D", "correct": true},
        {"text": "+1.5 D", "correct": false},
        {"text": "+0.5 D", "correct": false}
    ],
    "explanation": "The power of a lens is given by P = (n - 1) * (1/R), where n is the refractive index of the lens material, and R is the radius of curvature of the lens surface. For a plano-convex lens with a curved surface of radius 60 cm and refractive index 1.6, the power is -1 D."
},
{
    "question": "Two progressive waves are represented by the equations y1 = 5sin(2πt - 0.1πx) & y2 = 10sin(2πt - 0.2πx). The ratio of their intensities will be...",
    "answers": [
        {"text": "1:3", "correct": false},
        {"text": "1:4", "correct": true},
        {"text": "1:8", "correct": false},
        {"text": "1:16", "correct": false}
    ],
    "explanation": "Intensity of a wave is proportional to the square of its amplitude. The ratio of intensities of y1 and y2 can be found by squaring the ratio of their amplitudes, which gives 5² / 10² = 1:4."
},
{
    "question": "The phase difference between y1 = a1sin(ωt - kx) & y2 = a2cos(ωt - kx) is...",
    "answers": [
        {"text": "90°", "correct": true},
        {"text": "45°", "correct": false},
        {"text": "180°", "correct": false},
        {"text": "270°", "correct": false}
    ],
    "explanation": "The phase difference between a sine wave and a cosine wave, both having the same angular frequency ω and wave number k, is 90°."
},
{
    "question": "Number of beats heard per second by the waves y1 = a1sin(200πt) & y2 = a2sin(208πt) is...",
    "answers": [
        {"text": "0", "correct": false},
        {"text": "1", "correct": false},
        {"text": "4", "correct": true},
        {"text": "8", "correct": false}
    ],
    "explanation": "The number of beats per second heard when two waves have frequencies close to each other is given by the absolute difference between their frequencies. Here, the beat frequency is |200 - 208| = 8 Hz, so 8 beats per second are heard."
},
{
    "question": "Hydrogen phosphate of a certain metal has the formula MHPO4. The formula of the metal oxide is...",
    "answers": [
        {"text": "M2O", "correct": false},
        {"text": "MO", "correct": false},
        {"text": "M2O3", "correct": true},
        {"text": "M2O4", "correct": false}
    ],
    "explanation": "The formula of the metal oxide corresponding to MHPO4 is M2O3, as hydrogen phosphate (HPO4) has a valency of 3, indicating the metal (M) has a valency of 3."
},
{
    "question": "Magnetic quantum number specifies...",
    "answers": [
        {"text": "Orbital orientation", "correct": true},
        {"text": "Orbital size", "correct": false},
        {"text": "Orbital shape", "correct": false},
        {"text": "Nuclear stability", "correct": false}
    ],
    "explanation": "The magnetic quantum number (m) specifies the orientation of an orbital around the nucleus of an atom. It describes the spatial orientation of the orbital in the presence of an external magnetic field."
},
{
    "question": "The electronic configuration of Fe3+ ion is...",
    "answers": [
        {"text": "[Ar]3d^6", "correct": false},
        {"text": "[Ar]3d^6, 4s^2", "correct": false},
        {"text": "[Ar]3d^5", "correct": true},
        {"text": "[Ar]3d^5, 4s^2", "correct": false}
    ],
    "explanation": "The electronic configuration of Fe3+ ion is [Ar]3d^5, as it loses three electrons to form the Fe3+ ion."
},
{
    "question": "Which of the following species contains a non-directional bond?",
    "answers": [
        {"text": "NH3", "correct": false},
        {"text": "H2O", "correct": false},
        {"text": "CH4", "correct": true},
        {"text": "NaCl", "correct": false}
    ],
    "explanation": "Methane (CH4) contains non-directional bonds because the four hydrogen atoms are arranged symmetrically around the carbon atom, resulting in a tetrahedral structure with no net dipole moment."
},
{
    "question": "When iron or zinc is added in CuSO4 solution, copper is precipitated. It is due to...",
    "answers": [
        {"text": "Ionization of CuSO4", "correct": false},
        {"text": "Hydrolysis of CuSO4", "correct": false},
        {"text": "Reduction of Cu2+ to Cu", "correct": true},
        {"text": "Oxidation of Cu to Cu2+", "correct": false}
    ],
    "explanation": "When iron or zinc is added to a copper sulfate (CuSO4) solution, they displace copper (Cu) from the solution by reducing Cu2+ ions to elemental copper (Cu). This is a redox reaction where iron or zinc acts as a reducing agent."
},
{
    "question": "0.5 g of a metal combines with 140 ml of oxygen at NTP. The equivalent weight of the metal is...",
    "answers": [
        {"text": "9.02", "correct": false},
        {"text": "12.01", "correct": false},
        {"text": "24.03", "correct": true},
        {"text": "20.06", "correct": false}
    ],
    "explanation": "Equivalent weight is defined as the weight of an element which combines with or displaces 1.008 parts by weight of hydrogen or 8 parts by weight of oxygen. Here, the equivalent weight of the metal is calculated based on its reaction with oxygen."
},
{
  "question": "The number of water molecules in one litre of water is",
  "answers": [
      {"text": "3.346 x 10^23", "correct": true},
      {"text": "18 x 1000", "correct": false},
      {"text": "6.023 x 10^23", "correct": false},
      {"text": "6.023 x 10", "correct": false}
  ],
  "explanation": "One mole of water contains approximately 6.023 x 10^23 molecules. Therefore, in one liter of water (which is approximately 1000 grams or 1 kilogram), there are approximately 6.023 x 10^23 / 18 = 3.346 x 10^23 water molecules."
},
{
  "question": "The vapour density of certain gas 'A' is 4 times that of 'B'. The molecular mass of 'A' is 'M', the molecular mass of 'B' is",
  "answers": [
      {"text": "4M", "correct": false},
      {"text": "0.5M", "correct": true},
      {"text": "0.25M", "correct": false},
      {"text": "8M", "correct": false}
  ],
  "explanation": "Vapour density is the density of a gas compared to hydrogen, which is 2. The molecular mass of 'B' is 4 / 4 = 0.5M."
},
{
  "question": "4g of NaOH is dissolved in 1 litre of water. The P\" value of the solution will be",
  "answers": [
      {"text": "14", "correct": false},
      {"text": "13", "correct": true},
      {"text": "12", "correct": false},
      {"text": "11", "correct": false}
  ],
  "explanation": "The pH of a solution of NaOH in water can be calculated using the formula pH = 14 - pOH. Given that NaOH is a strong base, its pOH is equal to -log(4 / 1000), which is approximately 13."
},
{
  "question": "The solubility of AgI in NaI solution is less than that in pure water because",
  "answers": [
      {"text": "AgI forms complex with NaI", "correct": false},
      {"text": "of common ion effect", "correct": true},
      {"text": "Solubility product of AgI is less than that of NaI", "correct": false},
      {"text": "the temperature of the solution decreases", "correct": false}
  ],
  "explanation": "The solubility of a salt decreases in a solution containing a common ion due to the common ion effect, which shifts the equilibrium towards precipitation."
},
{
  "question": "The 'collective noun' used to describe a number of 'cattle' is",
  "answers": [
      {"text": "band", "correct": false},
      {"text": "herd", "correct": true},
      {"text": "army", "correct": false},
      {"text": "crowd", "correct": false}
  ],
  "explanation": "The collective noun used for a group of cattle is 'herd'."
},
{
  "question": "The word 'class' is a .....,......... noun.",
  "answers": [
      {"text": "common", "correct": false},
      {"text": "proper", "correct": false},
      {"text": "collective", "correct": true},
      {"text": "abstract", "correct": false}
  ],
  "explanation": "The word 'class' is a collective noun, as it refers to a group or collection of people or things."
},
{
  "question": "The parts of speech are ................ in number.",
  "answers": [
      {"text": "Six", "correct": false},
      {"text": "Seven", "correct": true},
      {"text": "Eight", "correct": false},
      {"text": "Nine", "correct": false}
  ],
  "explanation": "There are seven parts of speech: noun, pronoun, verb, adjective, adverb, preposition, and conjunction."
},
{
  "question": "A sentence has two parts called...............",
  "answers": [
      {"text": "complement and adverbial", "correct": false},
      {"text": "subject and adverbial", "correct": false},
      {"text": "subject and predicate", "correct": true},
      {"text": "predicate and direct object", "correct": false}
  ],
  "explanation": "A sentence is typically divided into two main parts: the subject (who or what the sentence is about) and the predicate (what the subject is doing or what is being said about the subject)."
},
{
  "question": "The phrase 'the poor' is used as a/n.........",
  "answers": [
      {"text": "adverb", "correct": false},
      {"text": "adjective", "correct": true},
      {"text": "noun", "correct": false},
      {"text": "conjunction", "correct": false}
  ],
  "explanation": "The phrase 'the poor' functions as an adjective, describing a particular group of people."
},
{
  "question": "The words: 'myself, ‘it, 'them', 'that' and 'yours' are ....",
  "answers": [
      {"text": "nouns", "correct": false},
      {"text": "verbals", "correct": false},
      {"text": "pronouns", "correct": true},
      {"text": "determiners", "correct": false}
  ],
  "explanation": "These words ('myself, 'it', 'them', 'that', 'yours') are all pronouns, as they are used to replace nouns or other pronouns."
},
{
  "question": "' What a shame!’ is a/n............. sentence",
  "answers": [
      {"text": "assertive", "correct": false},
      {"text": "interrogative", "correct": false},
      {"text": "imperative", "correct": false},
      {"text": "exclamatory", "correct": true}
  ],
  "explanation": "'What a shame!' is an exclamatory sentence, expressing strong emotion or feeling."
},
{
  "question": "___ honesty is the best policy.",
  "answers": [
      {"text": "An", "correct": true},
      {"text": "A", "correct": false},
      {"text": "The", "correct": false},
      {"text": "None of these", "correct": false}
  ],
  "explanation": "The phrase 'honesty is the best policy' starts with a vowel sound ('o' sound of 'honesty'), so it should be preceded by 'An'."
},
{
  "question": "In 'to boat down the stream', 'boat' is a ............. verb.",
  "answers": [
      {"text": "finite", "correct": false},
      {"text": "non-finite", "correct": true},
      {"text": "static", "correct": false},
      {"text": "participle", "correct": false}
  ],
  "explanation": "In the phrase 'to boat down the stream', 'boat' is a non-finite verb, specifically an infinitive verb used in its base form."
},
{
  "question": "The gap in the sentence 'Ram asked........... what brought him there!' allows the use of .................",
  "answers": [
      {"text": "that", "correct": false},
      {"text": "if", "correct": true},
      {"text": "whether", "correct": false},
      {"text": "no conjunction", "correct": false}
  ],
  "explanation": "The sentence 'Ram asked if what brought him there!' is grammatically correct, where 'if' introduces the clause following the question."
},
{
  "question": "The reported / indirect version of 'Hari said, ' will you have done your assignment by Sunday?’ is ..............",
  "answers": [
      {"text": "Hari asked if he will have done your assignment by Sunday.", "correct": false},
      {"text": "Hari asked if he would have done my assignment by Sunday.", "correct": false},
      {"text": "Hari asked if he would have done his assignment by Sunday.", "correct": true},
      {"text": "Hari asked that he would have done his assignment by Sunday.", "correct": false}
  ],
  "explanation": "In reported speech, the pronouns and verb tenses change according to the context. Here, 'Hari asked if he would have done his assignment by Sunday.' is the correct reported version."
},
{
  "question": "The passive form of 'Let them laugh at her' is",
  "answers": [
      {"text": "Let them be laughed by her", "correct": false},
      {"text": "Let her be laughed at by them", "correct": true},
      {"text": "Let them be laughed at by her", "correct": false},
      {"text": "She let them laugh at her", "correct": false}
  ],
  "explanation": "The passive form of 'Let them laugh at her' is 'Let her be laughed at by them'."
},
{
  "question": "The antonym of 'busy' is .........",
  "answers": [
      {"text": "tired", "correct": false},
      {"text": "free", "correct": true},
      {"text": "active", "correct": false},
      {"text": "occupied", "correct": false}
  ],
  "explanation": "The antonym of 'busy' is 'free', indicating not being engaged or occupied."
},
{
  "question": "The antonym of the word 'reside' is",
  "answers": [
      {"text": "stay", "correct": false},
      {"text": "dwell", "correct": false},
      {"text": "abide", "correct": false},
      {"text": "depart", "correct": true}
  ],
  "explanation": "The antonym of 'reside' is 'depart', meaning to leave or move away from a place."
},
{
  "question": "The word 'adieu' means",
  "answers": [
      {"text": "welcome", "correct": false},
      {"text": "hello", "correct": false},
      {"text": "farewell", "correct": true},
      {"text": "goodbye", "correct": false}
  ],
  "explanation": "The word 'adieu' means farewell, expressing good wishes to someone departing."
},
{
  "question": "The part of a poem that comes after the main poem is called a ................",
  "answers": [
      {"text": "title", "correct": false},
      {"text": "heading", "correct": false},
      {"text": "footnote", "correct": false},
      {"text": "postscript", "correct": true}
  ],
  "explanation": "The part of a poem that comes after the main poem is called a postscript, often used to provide additional information or a concluding remark."
},
{
  "question": "A four-line poem is called a .............",
  "answers": [
      {"text": "quatrain", "correct": true},
      {"text": "couplet", "correct": false},
      {"text": "sonnet", "correct": false},
      {"text": "limerick", "correct": false}
  ],
  "explanation": "A four-line poem is called a quatrain, which can have various rhyme schemes and forms."
},
{
  "question": "A stanza of four lines is called a ..............",
  "answers": [
      {"text": "quatrain", "correct": true},
      {"text": "couplet", "correct": false},
      {"text": "sonnet", "correct": false},
      {"text": "limerick", "correct": false}
  ],
  "explanation": "A stanza of four lines is called a quatrain, which is a common form in poetry."
},
{
  "question": "The writer of the story is the ................",
  "answers": [
      {"text": "composer", "correct": false},
      {"text": "author", "correct": true},
      {"text": "printer", "correct": false},
      {"text": "inspector", "correct": false}
  ],
  "explanation": "The writer of a story is called the author, the person who creates or originates the written work."
},
{
  "question": "The expression 'to make a mountain out of a molehill' means to",
  "answers": [
      {"text": "exaggerate a problem", "correct": true},
      {"text": "ignore a problem", "correct": false},
      {"text": "solve a problem", "correct": false},
      {"text": "create a problem", "correct": false}
  ],
  "explanation": "The expression 'to make a mountain out of a molehill' means to exaggerate a small problem and make it seem larger or more important than it really is."
},
{
  "question": "The value of limₓ→0.9 (2) is",
  "answers": [
      {"text": "1", "correct": false},
      {"text": "2", "correct": false},
      {"text": "0", "correct": true},
      {"text": "∞", "correct": false}
  ],
  "explanation": "The limit of a constant function as x approaches any value is equal to that constant."
},
{
  "question": "The derivative of 2tanh(x) with respect to x is",
  "answers": [
      {"text": "tan(x)", "correct": false},
      {"text": "tanh(x)", "correct": false},
      {"text": "sec²(x)", "correct": false},
      {"text": "sech²(x)", "correct": true}
  ],
  "explanation": "The derivative of tanh(x) is sech²(x)."
},
{
  "question": "The rectangle of greatest area for a given perimeter is",
  "answers": [
      {"text": "a square", "correct": true},
      {"text": "a circle", "correct": false},
      {"text": "an equilateral triangle", "correct": false},
      {"text": "a cylinder", "correct": false}
  ],
  "explanation": "Among shapes with the same perimeter, a square has the maximum area."
},
{
  "question": "The value of f(x) is",
  "answers": [
      {"text": "cos⁻¹(x) + √(1 - x²) + C", "correct": true},
      {"text": "√(1 - x²) - sin⁻¹(x) + C", "correct": false},
      {"text": "√(1 + x²) + cos⁻¹(x) + C", "correct": false},
      {"text": "sin⁻¹(x) - √(1 - x²) + C", "correct": false}
  ],
  "explanation": "This is the integral of √(1 - x²), which is derived using trigonometric substitution."
},
{
  "question": "The area of the region between the curves y = x² and x = y² is",
  "answers": [
      {"text": "0", "correct": false},
      {"text": "1", "correct": true},
      {"text": "e", "correct": false},
      {"text": "2", "correct": false}
  ],
  "explanation": "The area between these curves can be found by setting the equations equal and solving for x."
},
{
  "question": "The relation for the angle of banking, tanθ = a, is",
  "answers": [
      {"text": "numerically correct only", "correct": false},
      {"text": "dimensionally correct only", "correct": false},
      {"text": "both numerically and dimensionally correct", "correct": true},
      {"text": "none of these", "correct": false}
  ],
  "explanation": "The tangent of the angle of banking depends on the velocity, radius of curvature, and gravitational acceleration."
},
{
  "question": "A body of mass m is pulled by a rope which makes angle θ with the horizontal. The coefficient of friction between the body and ground is μ. The tension on the rope to make the body just to move is...",
  "answers": [
      {"text": "mg cosθ", "correct": false},
      {"text": "mg sinθ", "correct": false},
      {"text": "mg cosθ + μmg sinθ", "correct": true},
      {"text": "mg cosθ - μmg sinθ", "correct": false}
  ],
  "explanation": "This involves balancing the forces considering friction and the component of weight along the inclined plane."
},
{
  "question": "A block of mass 400 kg kept on a horizontal surface just begins to move when a force of 100 kg weight is applied. The coefficient of static friction is",
  "answers": [
      {"text": "0.25", "correct": false},
      {"text": "0.5", "correct": false},
      {"text": "0.75", "correct": true},
      {"text": "0.8", "correct": false}
  ],
  "explanation": "Static friction prevents motion until the applied force exceeds the maximum static friction force."
},
{
  "question": "A man holds a body of weight 60 N and walks 7 m along horizontal and then 5 m vertically. The amount of work done by the man is...",
  "answers": [
      {"text": "300 J", "correct": true},
      {"text": "420 J", "correct": false},
      {"text": "720 J", "correct": false},
      {"text": "840 J", "correct": false}
  ],
  "explanation": "Work done is calculated as the product of force (weight) and displacement in the direction of the force."
},
{
  "question": "A cyclist is taking a turn with 18 km/hr along a circular path of radius 15 m. The angle with which he must lean with the vertical is...",
  "answers": [
      {"text": "Tan⁻¹(3)", "correct": false},
      {"text": "Tan⁻¹(2)", "correct": false},
      {"text": "Tan⁻¹(1/2)", "correct": true},
      {"text": "Tan⁻¹(1)", "correct": false}
  ],
  "explanation": "This involves the centripetal force required to keep the cyclist moving in a circular path."
},
{
  "question": "The minimum kinetic energy of a body of mass m on the surface of the earth to reach infinity is...",
  "answers": [
      {"text": "mgR", "correct": false},
      {"text": "∞", "correct": false},
      {"text": "0", "correct": true},
      {"text": "4mgR", "correct": false}
  ],
  "explanation": "The escape velocity is the minimum velocity needed to escape a planet's gravitational pull."
},
{
  "question": "In S.H.M., the velocity of the body when the displacement is half of the amplitude (r) is...",
  "answers": [
      {"text": "0", "correct": false},
      {"text": "r", "correct": false},
      {"text": "√(2r)", "correct": true},
      {"text": "3r/2", "correct": false}
  ],
  "explanation": "The velocity in simple harmonic motion varies sinusoidally with time."
},
{
  "question": "The number of electrons contained in one coulomb of charge is...",
  "answers": [
      {"text": "6.25x10⁸", "correct": true},
      {"text": "1.25x10¹⁰", "correct": false},
      {"text": "6.25x10⁻¹⁰", "correct": false},
      {"text": "6.25x10⁻¹⁸", "correct": false}
  ],
  "explanation": "This relates to the elementary charge and the number of electrons per unit charge."
},
{
  "question": "A parallel plate air capacitor charged by a 10V battery is disconnected and an insulating medium having a dielectric constant 2 is placed between plates. The potential difference becomes...",
  "answers": [
      {"text": "10V", "correct": false},
      {"text": "8V", "correct": true},
      {"text": "5V", "correct": false},
      {"text": "2V", "correct": false}
  ],
  "explanation": "Dielectric materials increase the capacitance of a capacitor."
},
{
  "question": "Correct form of Biot-Savart Law is",
  "answers": [
      {"text": "dB = (µ₀/4π) * I * (dl x r)/r³", "correct": true},
      {"text": "dB = µ₀ * I * (dl x r)/r³", "correct": false},
      {"text": "dB = (4π/µ₀) * I * (dl x r)/r³", "correct": false},
      {"text": "dB = (µ₀/4π) * I * (r x dl)/r³", "correct": false}
  ],
  "explanation": "The Biot-Savart law describes the magnetic field generated by a steady current."
},
{
  "question": "Formula for the quality factor is...",
  "answers": [
      {"text": "Q = 1/(R * C)", "correct": false},
      {"text": "Q = 2π * (Energy stored/Energy dissipated per cycle)", "correct": true},
      {"text": "Q = 2π * (Energy dissipated per cycle/Energy stored)", "correct": false},
      {"text": "Q = R/C", "correct": false}
  ],
  "explanation": "The quality factor relates to the energy stored in an oscillating system compared to the energy dissipated per cycle."
},
{
  "question": "The half-life of radium is 1600 years. The fraction of the sample undecayed after 6400 years is...",
  "answers": [
      {"text": "1/2", "correct": false},
      {"text": "1/4", "correct": true},
      {"text": "1/8", "correct": false},
      {"text": "1/16", "correct": false}
  ],
  "explanation": "Half-life is the time required for half of the radioactive nuclei to decay."
},
{
  "question": "The largest distance between interatomic planes of a crystal is 10.4 Å. The upper limit for the wavelength of X-rays which can be used to study this crystal is...",
  "answers": [
      {"text": "20 Å", "correct": false},
      {"text": "30 Å", "correct": false},
      {"text": "40 Å", "correct": true},
      {"text": "50 Å", "correct": false}
  ],
  "explanation": "X-ray diffraction is used to study crystal structure based on Bragg's law."
},
{
  "question": "Paschen series of the hydrogen atom lies in the... region.",
  "answers": [
      {"text": "ultraviolet", "correct": false},
      {"text": "infra-red", "correct": true},
      {"text": "visible", "correct": false},
      {"text": "ultraviolet or infra-red", "correct": false}
  ],
  "explanation": "The Paschen series involves transitions in the infrared region of the electromagnetic spectrum."
},
{
  "question": "Use of X-rays in Millikan oil’s drop experiment is to...",
  "answers": [
      {"text": "see oil drop", "correct": false},
      {"text": "ionize oil drop", "correct": false},
      {"text": "produce electric field", "correct": false},
      {"text": "move oil drop with uniform velocity", "correct": true}
  ],
  "explanation": "X-rays are used to ionize air molecules near an oil drop, facilitating measurement of its charge."
},
{
  "question": "Temporary and permanent hardness of water can be simultaneously removed by...",
  "answers": [
      {"text": "by boiling", "correct": false},
      {"text": "by Clark's method", "correct": false},
      {"text": "using washing Soda", "correct": true},
      {"text": "by soda-lime process", "correct": false}
  ],
  "explanation": "Washing soda (sodium carbonate) removes both types of water hardness through precipitation."
},
{
  "question": "In Haber's process for the manufacture of ammonia, the catalyst used is...",
  "answers": [
      {"text": "Mo", "correct": false},
      {"text": "Fe", "correct": true},
      {"text": "Pt", "correct": false},
      {"text": "Ni", "correct": false}
  ],
  "explanation": "Iron (Fe) is used as a catalyst in the Haber process to produce ammonia."
},
{
  "question": "Which of the following metals can liberate hydrogen gas on treatment with cold and very dilute HNO₃?",
  "answers": [
      {"text": "Mg", "correct": true},
      {"text": "Zn", "correct": false},
      {"text": "Fe", "correct": false},
      {"text": "Al", "correct": false}
  ],
  "explanation": "Magnesium (Mg) reacts with nitric acid to liberate hydrogen gas."
},
{
  "question": "Which of the following turns lead acetate paper black?",
  "answers": [
      {"text": "SO₂", "correct": false},
      {"text": "SO₃", "correct": false},
      {"text": "H₂S", "correct": true},
      {"text": "CO₂", "correct": false}
  ],
  "explanation": "Hydrogen sulfide (H₂S) reacts with lead acetate to form lead sulfide, which is black."
},
{
  "question": "The poison for the platinum catalyst in the contact process for the manufacture of sulfuric acid is...",
  "answers": [
      {"text": "Sulfur", "correct": false},
      {"text": "Phosphorus", "correct": true},
      {"text": "Carbon", "correct": false},
      {"text": "Arsenic", "correct": false}
  ],
  "explanation": "Phosphorus poisons the platinum catalyst used in the contact process for sulfuric acid production."
},
{
  "question": "Which of the following species is amphoteric in nature?",
  "answers": [
      {"text": "HSO₄⁻", "correct": true},
      {"text": "H₂O₂", "correct": false},
      {"text": "Cr", "correct": false},
      {"text": "CO₃²⁻", "correct": false}
  ],
  "explanation": "Amphoteric species can act as both acids and bases depending on the conditions."
},
{
  "question": "The process in which ore is heated in excess of air below its melting point is known as...",
  "answers": [
      {"text": "calcinations", "correct": false},
      {"text": "roasting", "correct": true},
      {"text": "distillation", "correct": false},
      {"text": "reduction", "correct": false}
  ],
  "explanation": "Roasting involves heating ore in air to convert it into an oxide before reduction."
},
{
  "question": "The purest form of iron is...",
  "answers": [
      {"text": "cast iron", "correct": false},
      {"text": "wrought iron", "correct": true},
      {"text": "steel", "correct": false},
      {"text": "stainless steel", "correct": false}
  ],
  "explanation": "Wrought iron is nearly pure iron with a very low carbon content."
},
{
  "question": "The formula of calamine is...",
  "answers": [
      {"text": "ZnSO₄·7H₂O", "correct": false},
      {"text": "ZnS", "correct": false},
      {"text": "ZnO", "correct": false},
      {"text": "ZnCO₃", "correct": true}
  ],
  "explanation": "Calamine is a mineral form of zinc carbonate (ZnCO₃)."
},
{
  "question": "Washing Soda on heating evolves...",
  "answers": [
      {"text": "CO₂", "correct": false},
      {"text": "CO", "correct": false},
      {"text": "H₂O", "correct": false},
      {"text": "Cl₂O", "correct": true}
  ],
  "explanation": "When heated, washing soda (sodium carbonate) decomposes to form sodium oxide (Na₂O) and carbon dioxide (CO₂)."
},
{
  "question": "Which of the following is not a heterocyclic compound?",
  "answers": [
      {"text": "Benzene", "correct": false},
      {"text": "Furan", "correct": false},
      {"text": "Thiophene", "correct": false},
      {"text": "Pyridine", "correct": false}
  ],
  "explanation": "All options except (a) Benzene are heterocyclic compounds."
},
{
  "question": "IUPAC name of tert-butyl alcohol is",
  "answers": [
      {"text": "butan-1-ol", "correct": false},
      {"text": "butan-2-ol", "correct": false},
      {"text": "2-methylpropan-1-ol", "correct": false},
      {"text": "2-methylpropan-2-ol", "correct": true}
  ],
  "explanation": "The IUPAC name for tert-butyl alcohol is 2-methylpropan-2-ol."
},
{
  "question": "Acetylene reacts with water in the presence of HgSO₄ and dilute H₂SO₄ to give",
  "answers": [
      {"text": "ethanol", "correct": false},
      {"text": "ethane", "correct": false},
      {"text": "ethanal", "correct": true},
      {"text": "propanal", "correct": false}
  ],
  "explanation": "Acetylene (ethyne) reacts to form ethanal (acetaldehyde) under these conditions."
},
{
  "question": "The compound which forms only ethanal upon ozonolysis is",
  "answers": [
      {"text": "but-1-ene", "correct": false},
      {"text": "but-2-ene", "correct": false},
      {"text": "ethene", "correct": false},
      {"text": "propene", "correct": true}
  ],
  "explanation": "Propene (propylene) forms only ethanal upon ozonolysis."
},
{
  "question": "When benzene is treated with ethanoic anhydride in the presence of anhydrous AlCl₃, the compound formed is",
  "answers": [
      {"text": "acetophenone", "correct": false},
      {"text": "benzophenone", "correct": true},
      {"text": "ethylbenzene", "correct": false},
      {"text": "toluene", "correct": false}
  ],
  "explanation": "Benzene reacts with ethanoic anhydride (acetic anhydride) in the Friedel-Crafts acylation reaction catalyzed by AlCl₃ to form benzophenone."
},
{
  "question": "Which of the following would be the best title for the passage?",
  "answers": [
      {"text": "Webster's work", "correct": false},
      {"text": "Webster's dictionaries", "correct": true},
      {"text": "Webster's school", "correct": false},
      {"text": "Webster's life", "correct": false}
  ],
  "explanation": "The passage primarily discusses Noah Webster's dictionaries."
},
{
  "question": "From which publication did Webster earn a lifetime income?",
  "answers": [
      {"text": "An American dictionary of the English language", "correct": false},
      {"text": "A grammatical institute of the English language", "correct": true},
      {"text": "The American spelling book", "correct": false},
      {"text": "Webster's dictionary of the English language", "correct": false}
  ],
  "explanation": "Noah Webster earned a substantial income from his 'A grammatical institute of the English language,' also known as the American speller book."
},
{
  "question": "Why did Webster write a grammatical institute of the English language?",
  "answers": [
      {"text": "He wanted to supplement his income", "correct": false},
      {"text": "In response to the need for truly American textbooks", "correct": true},
      {"text": "The children didn't know how to spell", "correct": false},
      {"text": "He felt that British books were not appropriate for American children", "correct": false}
  ],
  "explanation": "Webster wrote his grammatical institute to provide American-centric textbooks."
},
{
  "question": "What was Webster's purpose in writing an American dictionary of the English language?",
  "answers": [
      {"text": "To respond to the need for new school books", "correct": false},
      {"text": "To demonstrate the distinct development of the English language in America", "correct": true},
      {"text": "To promote spelling forms based upon the British model", "correct": false},
      {"text": "To influence the pronunciation of the English language", "correct": false}
  ],
  "explanation": "Webster aimed to show that American English was evolving with distinct characteristics compared to British English."
},
{
  "question": "Why was Webster famous in English language?",
  "answers": [
      {"text": "He developed new dictionaries", "correct": true},
      {"text": "He developed new words", "correct": false},
      {"text": "He wrote American English book", "correct": false},
      {"text": "He gave some differences between American and British English", "correct": false}
  ],
  "explanation": "Noah Webster achieved fame for his influential dictionaries that helped standardize American English."
},
{
  "question": "The number of electrons contained in one coulomb of charge is",
  "answers": [
      {"text": "6.25x10^18", "correct": false},
      {"text": "1.25x10^18", "correct": false},
      {"text": "6.25x10^19", "correct": false},
      {"text": "6.25x10^18", "correct": true}
  ],
  "explanation": "One coulomb of charge contains approximately 6.25x10^18 electrons."
},
{
  "question": "A parallel plate air capacitor charged by a 10V battery is disconnected and an insulating medium having a dielectric constant of 2 is placed between plates. The potential difference becomes",
  "answers": [
      {"text": "10V", "correct": false},
      {"text": "8V", "correct": false},
      {"text": "5V", "correct": true},
      {"text": "2V", "correct": false}
  ],
  "explanation": "When a dielectric is introduced, the potential difference across the capacitor decreases by the factor of the dielectric constant."
},
{
  "question": "Correct form of Biot-Savart Law is",
  "answers": [
      {"text": "dB = μ0/(4π) * (Idl x r)/r^3", "correct": true},
      {"text": "dB = μ0/(4π) * (Idl x r)/r^2", "correct": false},
      {"text": "dB = μ0/(4π) * (Idl x r^2)/r^3", "correct": false},
      {"text": "dB = μ0/(4π) * (Idl x r^2)/r^2", "correct": false}
  ],
  "explanation": "The correct form of the Biot-Savart Law includes the factor r^3 in the denominator."
},
{
  "question": "Formula for quality factor is",
  "answers": [
      {"text": "Q = ωL/R", "correct": true},
      {"text": "Q = R/ωL", "correct": false},
      {"text": "Q = ωR/L", "correct": false},
      {"text": "Q = L/ωR", "correct": false}
  ],
  "explanation": "The quality factor (Q) of a resonant circuit is given by Q = ωL/R."
},
{
  "question": "The half-life of radium is 1600 years. The fraction of the sample undecayed after 6400 years is",
  "answers": [
      {"text": "1/2", "correct": false},
      {"text": "1/4", "correct": false},
      {"text": "1/8", "correct": false},
      {"text": "1/16", "correct": true}
  ],
  "explanation": "After 6400 years, which is four half-lives, the fraction remaining is (1/2)^4 = 1/16."
},
{
  "question": "The largest distance between interatomic planes of a crystal is 10Å. The upper limit for the wavelength of X-rays which can be used to study this crystal is",
  "answers": [
      {"text": "20Å", "correct": false},
      {"text": "30Å", "correct": false},
      {"text": "40Å", "correct": false},
      {"text": "50Å", "correct": true}
  ],
  "explanation": "The upper limit for the wavelength is twice the largest interplanar distance, which is 20Å."
},
{
  "question": "Paschen series of the hydrogen atom lies in the",
  "answers": [
      {"text": "ultraviolet", "correct": false},
      {"text": "infra-red", "correct": true},
      {"text": "visible", "correct": false},
      {"text": "ultraviolet or infra-red", "correct": false}
  ],
  "explanation": "The Paschen series corresponds to transitions ending at the n=3 level and lies in the infra-red region."
},
{
  "question": "Use of X-rays in Millikan oil drop experiment is to",
  "answers": [
      {"text": "see oil drop", "correct": false},
      {"text": "ionize oil drop", "correct": true},
      {"text": "produce electric field", "correct": false},
      {"text": "move oil drop with uniform velocity", "correct": false}
  ],
  "explanation": "X-rays are used to ionize the oil droplets, allowing them to be manipulated using an electric field."
},
{
  "question": "Temporary and permanent hardness of water can be simultaneously removed",
  "answers": [
      {"text": "by boiling", "correct": false},
      {"text": "by Clark's method", "correct": false},
      {"text": "using washing soda", "correct": true},
      {"text": "by soda-lime process", "correct": false}
  ],
  "explanation": "Washing soda (sodium carbonate) can remove both temporary and permanent hardness of water."
},
{
  "question": "In Haber's process for the manufacture of ammonia, the catalyst used is",
  "answers": [
      {"text": "Mo", "correct": false},
      {"text": "Fe", "correct": true},
      {"text": "Pt", "correct": false},
      {"text": "Ni", "correct": false}
  ],
  "explanation": "Iron (Fe) is the catalyst used in the Haber process for the synthesis of ammonia."
}
];

const Mock4 = () => {
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

export default Mock4;

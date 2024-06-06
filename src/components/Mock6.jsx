import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const quizData2077 = [
    {
      question: "The value of tan15° + cot15° is",
      answers: [
        { text: "1", correct: false },
        { text: "2", correct: false },
        { text: "3", correct: true },
        { text: "4", correct: false }
      ],
      explanation: "The correct value is 3."
    },
    {
      question: "The value of cot5° × cot10° × ... × cot85° is",
      answers: [
        { text: "0", correct: false },
        { text: "1", correct: true },
        { text: "-1", correct: false },
        { text: "1/2", correct: false }
      ],
      explanation: "The product of cotangents from 5° to 85° in 5° increments is 1."
    },
    {
      question: "The domain of sin⁻¹(x) is",
      answers: [
        { text: "(-π, π)", correct: false },
        { text: "(-1, 1)", correct: false },
        { text: "(-π/2, π/2)", correct: false },
        { text: "[-1, 1]", correct: true }
      ],
      explanation: "The domain of sin⁻¹(x) is [-1, 1]."
    },
    {
      question: "If x + y + z = xyz, then the value of tan⁻¹(x) + tan⁻¹(y) + tan⁻¹(z) is",
      answers: [
        { text: "π", correct: true },
        { text: "π/2", correct: false },
        { text: "π/3", correct: false },
        { text: "π/4", correct: false }
      ],
      explanation: "Given the condition, the value is π."
    },
    {
      question: "In ∆ABC, if a=4, b=3 and A=60°, then C is the root of the equation",
      answers: [
        { text: "x² + 3x + 7 = 0", correct: false },
        { text: "x² - 3x - 7 = 0", correct: true },
        { text: "x² - 3x + 7 = 0", correct: false },
        { text: "x² + 3x - 7 = 0", correct: false }
      ],
      explanation: "Given the values, the correct equation is x² - 3x - 7 = 0."
    },
    {
      question: "The value of sinA + sinB + sinC is",
      answers: [
        { text: "S/r", correct: true },
        { text: "R/s", correct: false },
        { text: "r/S", correct: false },
        { text: "S/R", correct: false }
      ],
      explanation: "The correct value is S/r."
    },
    {
      question: "The equation sin(x) + cos(x) = 0 has",
      answers: [
        { text: "Unique solution", correct: false },
        { text: "No solution", correct: false },
        { text: "Finite solution", correct: false },
        { text: "Infinite solutions", correct: true }
      ],
      explanation: "The equation has infinite solutions."
    },
    {
      question: "If tanθ + tan2θ + tan3θ = tanθtan2θtan3θ, the general value of θ is",
      answers: [
        { text: "nπ + π/2", correct: false },
        { text: "nπ/6", correct: false },
        { text: "2nπ ± π/4", correct: false },
        { text: "nπ ± (-1)^nπ/6", correct: true }
      ],
      explanation: "The general value is nπ ± (-1)^nπ/6."
    },
    {
      question: "A is a square matrix of order 3 and det(A)=4, then |adj A|=",
      answers: [
        { text: "12", correct: false },
        { text: "20", correct: false },
        { text: "8", correct: false },
        { text: "16", correct: true }
      ],
      explanation: "The determinant of the adjugate of a matrix is |A|^(n-1) for an n×n matrix."
    },
    {
      question: "The sum to infinity of the series 1 + 4/5 + 7/5 + 10/5 + ⋯ is",
      answers: [
        { text: "16/7", correct: true },
        { text: "25/9", correct: false },
        { text: "35/16", correct: false },
        { text: "50/16", correct: false }
      ],
      explanation: "The sum of the series is 16/7."
    },
    {
      question: "The number of committees of 5 members that can be selected from 6 men and 5 ladies consisting of 3 men and 2 ladies is",
      answers: [
        { text: "220 ways", correct: false },
        { text: "540 ways", correct: false },
        { text: "330 ways", correct: true },
        { text: "240 ways", correct: false }
      ],
      explanation: "The correct number of ways is 330."
    },
    {
      question: "The sum of the series 1/2! + 1/4! + 1/6! + ⋯ is",
      answers: [
        { text: "(e² − 1)/(2e)", correct: false },
        { text: "(e − 1)²/(2e)", correct: false },
        { text: "(e² − 1)/2", correct: true },
        { text: "(e² − 2)/e", correct: false }
      ],
      explanation: "The sum of the series is (e² − 1)/2."
    },
    {
      question: "The additive inverse of z = 2 + 5i is",
      answers: [
        { text: "(2, -5)", correct: false },
        { text: "(2, 5)", correct: false },
        { text: "(-2, -5)", correct: true },
        { text: "(-2, 5)", correct: false }
      ],
      explanation: "The additive inverse of 2 + 5i is -2 - 5i."
    },
    {
      question: "If 4 is a root of the equation x² - 5x + k = 0, then the value of k is",
      answers: [
        { text: "-2", correct: false },
        { text: "2", correct: false },
        { text: "4", correct: false },
        { text: "6", correct: true }
      ],
      explanation: "Substituting x = 4 into the equation gives k = 6."
    },
    {
      question: "The number of even prime natural numbers is",
      answers: [
        { text: "1", correct: true },
        { text: "2", correct: false },
        { text: "Infinite", correct: false },
        { text: "0", correct: false }
      ],
      explanation: "The only even prime number is 2."
    },
    {
      question: "The range of the function f(x) = |x - 1| is",
      answers: [
        { text: "(-∞, ∞)", correct: false },
        { text: "(0, ∞)", correct: false },
        { text: "[0, ∞)", correct: true },
        { text: "(-∞, 0)", correct: false }
      ],
      explanation: "The range of |x - 1| is [0, ∞)."
    },
    {
      question: "Evaluate lim (x→2) (8 - 3x + 12x²), if it exists.",
      answers: [
        { text: "48", correct: true },
        { text: "50", correct: false },
        { text: "52", correct: false },
        { text: "None of these", correct: false }
      ],
      explanation: "Substituting x = 2 into the expression gives 48."
    },
    {
      question: "If y = √x + √x + √x + ..., then dy/dx is",
      answers: [
        { text: "1/(2y - 1)", correct: true },
        { text: "√x/(2y - 1)", correct: false },
        { text: "2√x", correct: false },
        { text: "√x", correct: false }
      ],
      explanation: "Differentiating y = √x + y gives dy/dx = 1/(2y - 1)."
    },
    {
      question: "∫cot(x) dx = ?",
      answers: [
        { text: "-cosec(x) + C", correct: false },
        { text: "log|sin(x)| + C", correct: false },
        { text: "log|tan(x)| + C", correct: true },
        { text: "log|sec(x)| + C", correct: false }
      ],
      explanation: "The integral of cot(x) is log|sin(x)| + C."
    },
    {
      question: "The area of the triangle determined by the vectors 3î + 4ĵ and -5î + 7ĵ is",
      answers: [
        { text: "17", correct: false },
        { text: "21", correct: false },
        { text: "49.49", correct: false },
        { text: "20.5", correct: true }
      ],
      explanation: "The area of the triangle is 20.5."
    },
    {
      question: "If â + b̂ + ĉ = 0, then",
      answers: [
        { text: "â × b̂ = b̂ × ĉ = ĉ × â", correct: false },
        { text: "â = b̂ × ĉ", correct: false },
        { text: "b̂ = b̂ × ĉ", correct: false },
        { text: "â · b̂ = b̂ · ĉ = ĉ · â", correct: true }
      ],
      explanation: "If the sum of three vectors is zero, their dot products must also be zero."
    },
    {
      question: "The polar equation r = acos(θ) represents",
      answers: [
        { text: "Circle", correct: true },
        { text: "Parabola", correct: false },
        { text: "Hyperbola", correct: false },
        { text: "Ellipse", correct: false }
      ],
      explanation: "The equation r = acos(θ) represents a circle."
    },
    {
      question: "The value of k for which x² - 4kxy + 4y² = 0 represents a pair of coincident lines is",
      answers: [
        { text: "k = 1", correct: false },
        { text: "k = 2", correct: true },
        { text: "k = 3", correct: false },
        { text: "k = 4", correct: false }
      ],
      explanation: "The correct value of k is 2."
    },
    {
      question: "The equation x² + y² = 0 represents",
      answers: [
        { text: "A circle", correct: false },
        { text: "A degenerate circle", correct: true },
        { text: "An empty set", correct: false },
        { text: "A straight line", correct: false }
      ],
      explanation: "The equation represents a degenerate circle, which is a single point."
    },
    {
      question: "The equation of the hyperbola with latus rectum 4 and eccentricity 3 is",
      answers: [
        { text: "16x² + 2y² = 1", correct: false },
        { text: "16x² - 2y² = 1", correct: true },
        { text: "3x² + 5y² = 15", correct: false },
        { text: "7x² + 3y² = 2", correct: false }
      ],
      explanation: "The correct equation is 16x² - 2y² = 1."
    },
    {
      question: "The equation of the plane having intercepts 2, -3, and 4 in order is",
      answers: [
        { text: "2x + 4y - 5z = 1", correct: false },
        { text: "12x + 8y - 3z + 5 = 0", correct: false },
        { text: "6x - 4y + 3z = 12", correct: true },
        { text: "2x + 3y + 6z + 9 = 0", correct: false }
      ],
      explanation: "The correct equation is 6x - 4y + 3z = 12."
    },
    {
      question: "If z₁ = 2 + i, z₂ = 3, then |3z₁ - 4z₂| is",
      answers: [
        { text: "√45", correct: false },
        { text: "√53", correct: false },
        { text: "√157", correct: false },
        { text: "√57", correct: true }
      ],
      explanation: "The correct magnitude is √57."
    },
    {
      question: "Which has eccentricity less than one?",
      answers: [
        { text: "Circle", correct: false },
        { text: "Parabola", correct: false },
        { text: "Ellipse", correct: true },
        { text: "Hyperbola", correct: false }
      ],
      explanation: "An ellipse has an eccentricity less than one."
    },
    {
      question: "The three points (2,0,0), (0,2,0), and (0,0,2) are",
      answers: [
        { text: "Collinear", correct: false },
        { text: "Linearly dependent", correct: false },
        { text: "Linearly independent", correct: true },
        { text: "None", correct: false }
      ],
      explanation: "The points are linearly independent."
    },
    {
      question: "The area of the parallelogram with diagonals a and b is",
      answers: [
        { text: "â × b̂", correct: false },
        { text: "|â × b̂|", correct: true },
        { text: "â + b̂", correct: false },
        { text: "1/2 |â × b̂|", correct: false }
      ],
      explanation: "The area is given by |â × b̂|."
    },
    {
      question: "If w is a cube root of unity, then w²⁵ is",
      answers: [
        { text: "1", correct: true },
        { text: "-1", correct: false },
        { text: "w", correct: false },
        { text: "w²", correct: false }
      ],
      explanation: "Since w²⁵ is a multiple of 3, it equals 1."
    },
    {
      question: "The angle between â × b̂ and b̂ × â is",
      answers: [
        { text: "180°", correct: false },
        { text: "90°", correct: true },
        { text: "0°", correct: false },
        { text: "45°", correct: false }
      ],
      explanation: "The angle between the two cross products is 90°."
    },
    {
      question: "The value of ∫1/2√3 dx is",
      answers: [
        { text: "1/2√3", correct: false },
        { text: "1/4√3", correct: true },
        { text: "1/8√3", correct: false },
        { text: "1/12√3", correct: false }
      ],
      explanation: "The correct value is 1/4√3."
    },
    {
      question: "If y = 1 + x²/2! + x⁴/4! + x⁶/6! + ..., then dy/dx is",
      answers: [
        { text: "sinh(x)", correct: true },
        { text: "cosh(x)", correct: false },
        { text: "eˣ", correct: false },
        { text: "tanh(x)", correct: false }
      ],
      explanation: "The derivative of the given series is sinh(x)."
    },
    {
      question: "∫x sin(x) dx = ?",
      answers: [
        { text: "x cos(x) + sin(x)", correct: false },
        { text: "x cos(x) - sin(x)", correct: true },
        { text: "-x cos(x) + sin(x)", correct: false },
        { text: "-x cos(x) - sin(x)", correct: false }
      ],
      explanation: "The integral is x cos(x) - sin(x)."
    },
    {
      question: "The area of the ellipse x²/16 + y²/9 = 1 is",
      answers: [
        { text: "36π", correct: true },
        { text: "12π", correct: false },
        { text: "18π", correct: false },
        { text: "27π", correct: false }
      ],
      explanation: "The area of the ellipse is 36π."
    },
    {
      question: "Which of the following is not a vector quantity?",
      answers: [
        { text: "Force", correct: false },
        { text: "Mass", correct: true },
        { text: "Weight", correct: false },
        { text: "Velocity", correct: false }
      ],
      explanation: "Mass is a scalar quantity."
    },
    {
      question: "The point of intersection of the line pairs represented by x² - 5xy + 4y² + x + 2y - 2 = 0 is",
      answers: [
        { text: "(3, -2)", correct: false },
        { text: "(1, 4)", correct: false },
        { text: "(2, 1)", correct: true },
        { text: "(4, 0)", correct: false }
      ],
      explanation: "The correct point of intersection is (2, 1)."
    },
    {
      question: "The value of k for which the equation 2x² + 2y² - 6x + 8y + k = 0 represents a point circle is",
      answers: [
        { text: "0", correct: false },
        { text: "5/2", correct: false },
        { text: "25/2", correct: true },
        { text: "-7/2", correct: false }
      ],
      explanation: "The correct value of k is 25/2."
    },
    {
      question: "For a square matrix, if AA⁻¹ = I, then A is",
      answers: [
        { text: "Orthogonal matrix", correct: false },
        { text: "Diagonal matrix", correct: false },
        { text: "Symmetric matrix", correct: false },
        { text: "Non-singular matrix", correct: true }
      ],
      explanation: "A matrix that satisfies AA⁻¹ = I is a non-singular matrix."
    },
    {
        question: "The dimension formula for electrical permittivity is",
        answers: [
          { text: "M^{-1} L^{-3} T^4 A^2", correct: false },
          { text: "M^1 L^{-3} T^4 A^2", correct: false },
          { text: "M^{-1} L^{-3} T^{-4} A^2", correct: false },
          { text: "M^{-1} L^{-3} T^4 A^{-2}", correct: true }
        ],
        explanation: "The dimension formula for electrical permittivity is M^{-1} L^{-3} T^4 A^{-2}."
      },
      
      {
        question: "With what minimum acceleration can a fireman slide down a rope whose breaking strength is two-thirds of his weight?",
        answers: [
          { text: "g", correct: false },
          { text: "g/3", correct: false },
          { text: "2g/3", correct: true },
          { text: "zero", correct: false }
        ],
        explanation: "The minimum acceleration is 2g/3, as the breaking strength is two-thirds of the weight."
      },
      
      {
        question: "If a particle moves in a circle, describing equal angles in equal time, its velocity vector",
        answers: [
          { text: "Remains constant", correct: false },
          { text: "Changes in magnitude only", correct: false },
          { text: "Changes in direction only", correct: true },
          { text: "Changes both in magnitude and direction", correct: false }
        ],
        explanation: "The velocity vector changes in direction only."
      },
      
      {
        question: "Kinetic energies of two bodies with equal linear momentum are in the ratio 4:2. The ratio of their masses is",
        answers: [
          { text: "1:2", correct: true },
          { text: "2:1", correct: false },
          { text: "1:4", correct: false },
          { text: "4:1", correct: false }
        ],
        explanation: "The ratio of their masses is 1:2."
      },
      
      {
        question: "In an Isochoric system",
        answers: [
          { text: "Both T and V are constant", correct: false },
          { text: "Only V is constant", correct: true },
          { text: "Only P is constant", correct: false },
          { text: "Both P and V are constant", correct: false }
        ],
        explanation: "In an Isochoric system, only volume (V) is constant."
      },
      
      {
        question: "If white light is used in Young's double slit experiment, the central bright fringe is",
        answers: [
          { text: "Red", correct: false },
          { text: "Violet", correct: false },
          { text: "Blue", correct: false },
          { text: "White", correct: true }
        ],
        explanation: "The central bright fringe is white."
      },
      
      {
        question: "A wire of 5Ω is stretched to double its original length. The final resistance of the wire is",
        answers: [
          { text: "20Ω", correct: true },
          { text: "40Ω", correct: false },
          { text: "45Ω", correct: false },
          { text: "80Ω", correct: false }
        ],
        explanation: "When a wire is stretched to double its length, the resistance becomes four times. Thus, 4 x 5Ω = 20Ω."
      },
      
      {
        question: "The band gap of energy in silicon is 1.104 eV. The wavelength equivalent to this energy is",
        answers: [
          { text: "10048 Å", correct: false },
          { text: "11243 Å", correct: false },
          { text: "12092 Å", correct: true },
          { text: "13132 Å", correct: false }
        ],
        explanation: "The wavelength equivalent to the band gap energy of 1.104 eV in silicon is 12092 Å."
      },
      
      {
        question: "The mass of 1cc of oxygen gas at STP is",
        answers: [
          { text: "1 gm", correct: false },
          { text: "1.42 gm", correct: false },
          { text: "0.142 gm", correct: true },
          { text: "0.00142 gm", correct: false }
        ],
        explanation: "The mass of 1cc of oxygen gas at STP is 0.142 gm."
      },
      
      {
        question: "A Petrol engine has an efficiency of 35%. Its compression ratio is",
        answers: [
          { text: "0.65", correct: false },
          { text: "1.8", correct: false },
          { text: "2.9", correct: true },
          { text: "3.4", correct: false }
        ],
        explanation: "For a petrol engine with an efficiency of 35%, the compression ratio is 2.9."
      },
      
      {
        question: "A plano-convex lens is made of material with refractive index 1.6 and radius of curved face 60cm. The focal length of the lens is",
        answers: [
          { text: "50cm", correct: false },
          { text: "60cm", correct: false },
          { text: "80cm", correct: true },
          { text: "100cm", correct: false }
        ],
        explanation: "The focal length of a plano-convex lens with given parameters is 80cm."
      },
      
      {
        question: "The angular momentum of an electron in 3rd excited state is",
        answers: [
          { text: "\\frac{8h}{π}", correct: false },
          { text: "\\frac{4h}{π}", correct: false },
          { text: "\\frac{3h}{π}", correct: true },
          { text: "\\frac{2h}{π}", correct: false }
        ],
        explanation: "The angular momentum of an electron in the 3rd excited state is \\frac{3h}{π}."
      },
      
      {
        question: "Which of the following quantity oscillates in a sound wave?",
        answers: [
          { text: "Density of medium", correct: false },
          { text: "Pressure of medium", correct: false },
          { text: "Both", correct: true },
          { text: "None", correct: false }
        ],
        explanation: "Both the density and pressure of the medium oscillate in a sound wave."
      },
      
      {
        question: "A wire of 90Ω is cut into three equal parts and these parts are connected in parallel. The equivalent resistance is",
        answers: [
          { text: "30Ω", correct: false },
          { text: "10Ω", correct: false },
          { text: "3Ω", correct: true },
          { text: "1Ω", correct: false }
        ],
        explanation: "The equivalent resistance when three parts of 90Ω wire are connected in parallel is 3Ω."
      },
      
      {
        question: "Reverse biasing current is due to",
        answers: [
          { text: "Avalanche current", correct: false },
          { text: "Minority current", correct: true },
          { text: "Zener current", correct: false },
          { text: "Majority current", correct: false }
        ],
        explanation: "Reverse biasing current in a diode is due to the minority current."
      },
      
      {
        question: "Surface tension of water at critical temperature is",
        answers: [
          { text: "Zero", correct: true },
          { text: "Infinite", correct: false },
          { text: "Finite but not zero", correct: false },
          { text: "None of these", correct: false }
        ],
        explanation: "The surface tension of water at its critical temperature is zero."
      },
      
      {
        question: "Which of the following has the same dimension?",
        answers: [
          { text: "Heat and temperature", correct: false },
          { text: "Charge and current", correct: false },
          { text: "Pressure and surface tension", correct: true },
          { text: "Energy and work done", correct: true }
        ],
        explanation: "Pressure and surface tension share the same dimensions. Similarly, energy and work done share the same dimensions."
      },
      
      {
        question: "The temperature at which Celsius scale and Fahrenheit scale equal is",
        answers: [
          { text: "-20", correct: false },
          { text: "20", correct: false },
          { text: "-40", correct: true },
          { text: "40", correct: false }
        ],
        explanation: "The temperature at which the Celsius scale and Fahrenheit scale are equal is -40."
      },
      
      {
        question: "Elasticity does not depend upon",
        answers: [
          { text: "Temperature", correct: false },
          { text: "Mass", correct: true },
          { text: "Nature of material", correct: false },
          { text: "Impurities mixed", correct: false }
        ],
        explanation: "Elasticity does not depend upon mass."
      },
      
      {
        question: "A prism of angle 6° has its refractive index 1.5. The angle of deviation produced by the prism is",
        answers: [
          { text: "1°", correct: false },
          { text: "2°", correct: true },
          { text: "3°", correct: false },
          { text: "4°", correct: false }
        ],
        explanation: "The angle of deviation produced by a prism with the given parameters is 2°."
      },
      
      {
        question: "The SI unit of magnetic susceptibility is",
        answers: [
          { text: "H/m", correct: false },
          { text: "Hm", correct: false },
          { text: "N/A^2", correct: false },
          { text: "None", correct: true }
        ],
        explanation: "The SI unit of magnetic susceptibility is dimensionless."
      },
      
      {
        question: "Linear velocity of a point on the equator of earth of radius 6400km is approximately",
        answers: [
          { text: "400 km/hr", correct: false },
          { text: "800 km/hr", correct: false },
          { text: "1600 km/hr", correct: false },
          { text: "3200 km/hr", correct: true }
        ],
        explanation: "The linear velocity of a point on the equator of earth with a radius of 6400km is approximately 3200 km/hr."
      },
      
      {
        question: "Escape velocity of earth is",
        answers: [
          { text: "6 km/s", correct: false },
          { text: "12 km/s", correct: true },
          { text: "650 km/min", correct: false },
          { text: "672 km/min", correct: false }
        ],
        explanation: "The escape velocity of earth is 12 km/s."
      },
      
      {
        question: "Which of the following is a non-ohmic material?",
        answers: [
          { text: "Copper", correct: false },
          { text: "Iron", correct: false },
          { text: "Silver", correct: false },
          { text: "Diode", correct: true }
        ],
        explanation: "A diode is a non-ohmic material."
      },
      
      {
        question: "A series LCR circuit has L=1H, C=7μF and R=10Ω. The resonating frequency of this circuit is",
        answers: [
          { text: "40 Hz", correct: false },
          { text: "50 Hz", correct: true },
          { text: "60 Hz", correct: false },
          { text: "100 Hz", correct: false }
        ],
        explanation: "The resonating frequency of the given LCR circuit is 50 Hz."
      },
      
      {
        question: "The human eye is most sensitive to",
        answers: [
          { text: "Red", correct: false },
          { text: "Yellow", correct: true },
          { text: "Blue", correct: false },
          { text: "Violet", correct: false }
        ],
        explanation: "The human eye is most sensitive to yellow light."
      },
      
      {
        question: "Which of the following is a condition for resonance?",
        answers: [
          { text: "XL + XC = 0", correct: false },
          { text: "XL - XC = 0", correct: true },
          { text: "L + C = 0", correct: false },
          { text: "L - C = 0", correct: false }
        ],
        explanation: "The condition for resonance in an LCR circuit is XL - XC = 0."
      },
      
      {
        question: "Biot-Savart Law gives",
        answers: [
          { text: "Magnetic field due to current", correct: true },
          { text: "Electric field due to charge", correct: false },
          { text: "Force between parallel currents", correct: false },
          { text: "Direction of force acting on moving charge inside magnetic field", correct: false }
        ],
        explanation: "Biot-Savart Law gives the magnetic field due to a current."
      },
      
      {
        question: "The momentum of a body having kinetic energy E is doubled. The new kinetic energy is",
        answers: [
          { text: "E", correct: false },
          { text: "4E", correct: true },
          { text: "16E", correct: false },
          { text: "32E", correct: false }
        ],
        explanation: "If the momentum is doubled, the new kinetic energy becomes 4E."
      },
      
      {
        question: "Which of the following has the least value?",
        answers: [
          { text: "Rolling friction", correct: true },
          { text: "Kinetic friction", correct: false },
          { text: "Limiting friction", correct: false },
          { text: "Static friction", correct: false }
        ],
        explanation: "Rolling friction has the least value compared to kinetic, limiting, and static friction."
      },

      {
        question: "Which one of the following is not found in nature?",
        answers: [
          { text: "Marble", correct: false },
          { text: "Ozone", correct: false },
          { text: "Carborundum", correct: true },
          { text: "Quicklime", correct: false }
        ],
        explanation: "Carborundum is not found in nature; it is a man-made compound (silicon carbide)."
      },
      {
        question: "The largest number of molecules is in",
        answers: [
          { text: "28gm of CO", correct: false },
          { text: "46gm of C2H5OH", correct: false },
          { text: "36gm of H2O", correct: true },
          { text: "54gm of N2O5", correct: false }
        ],
        explanation: "36gm of H2O has the largest number of molecules."
      },
      {
        question: "What is the normality of 73% (w/v) HCl?",
        answers: [
          { text: "1.5", correct: false },
          { text: "2.0", correct: false },
          { text: "2.5", correct: false },
          { text: "3.0", correct: true }
        ],
        explanation: "The normality of 73% (w/v) HCl is 3.0."
      },
      {
        question: "The amount of KMnO4 required to prepare 100ml of 0.1N solution in alkaline medium is?",
        answers: [
          { text: "1.58gm", correct: false },
          { text: "3.16gm", correct: true },
          { text: "0.526gm", correct: false },
          { text: "15.2gm", correct: false }
        ],
        explanation: "To prepare 100ml of 0.1N KMnO4 solution, 3.16gm of KMnO4 is required."
      },
      {
        question: "The pH of caustic soda solution which contains 0.04gm NaOH per litre is?",
        answers: [
          { text: "9", correct: false },
          { text: "10", correct: false },
          { text: "11", correct: false },
          { text: "12", correct: true }
        ],
        explanation: "The pH of a caustic soda solution containing 0.04gm NaOH per litre is 12."
      },
      {
        question: "Which of the following is the weakest acid?",
        answers: [
          { text: "HF", correct: true },
          { text: "HCl", correct: false },
          { text: "HBr", correct: false },
          { text: "HI", correct: false }
        ],
        explanation: "HF (hydrofluoric acid) is the weakest acid among the given options."
      },
      {
        question: "The value of Planck's constant is",
        answers: [
          { text: "6.6×10^-32 gm²s^-1", correct: false },
          { text: "6.6×10^-34 kg m²s^-1", correct: true },
          { text: "6.6×10^-34 kgms", correct: false },
          { text: "6.6×10^-34 kgm²s^-1", correct: false }
        ],
        explanation: "The correct value of Planck's constant is 6.6×10^-34 kg m²s^-1."
      },
      {
        question: "The first ionization energies are in the order",
        answers: [
          { text: "Na < Mg > Al < Si", correct: false },
          { text: "Na > Mg > Al > Si", correct: false },
          { text: "Na < Mg < Al < Si", correct: true },
          { text: "Na > Mg > Al < Si", correct: false }
        ],
        explanation: "The correct order of first ionization energies is Na < Mg < Al < Si."
      },
      {
        question: "In which of the following is the oxidation of carbon zero?",
        answers: [
          { text: "C6H12O6", correct: true },
          { text: "C12H22O11", correct: false },
          { text: "CH2F2", correct: false },
          { text: "All of the above", correct: false }
        ],
        explanation: "The oxidation state of carbon is zero in C6H12O6 (glucose)."
      },
      {
        question: "The enthalpies of elements in their standard state are taken as zero. Hence the enthalpy of formation of a compound",
        answers: [
          { text: "Should always be negative", correct: false },
          { text: "Should always be positive", correct: false },
          { text: "Will be equal to twice the energy of combustion", correct: false },
          { text: "May be positive or negative", correct: true }
        ],
        explanation: "The enthalpy of formation of a compound may be positive or negative."
      },
      {
        question: "Hydrogen bomb is based on the principle of",
        answers: [
          { text: "Nuclear fission", correct: false },
          { text: "Nuclear fusion", correct: true },
          { text: "Nuclear explosion", correct: false },
          { text: "Chemical reaction", correct: false }
        ],
        explanation: "A hydrogen bomb is based on the principle of nuclear fusion."
      },
      {
        question: "Magnetic quantum number (m) is related to", 
        answers: [
            { text: "Shape", correct: false },
            { text: "Size", correct: false },
            { text: "Energy", correct: false },
            { text: "Orientation", correct: true }
          ],
          explanation: "The magnetic quantum number (m) is related to the orientation of the orbital."
        },

        {
            question: "The lightest metal in the periodic table is?",
            answers: [
              { text: "Li", correct: true },
              { text: "F", correct: false },
              { text: "Rb", correct: false },
              { text: "FeS2", correct: false }
            ],
            explanation: "Lithium (Li) is the lightest metal in the periodic table."
          },
          {
            question: "The formula of Hematite is?",
            answers: [
              { text: "Fe3O4", correct: false },
              { text: "Fe2O3", correct: true },
              { text: "FeCO3", correct: false },
              { text: "FeS2", correct: false }
            ],
            explanation: "The chemical formula of Hematite is Fe2O3."
          },
          {
            question: "Which element has the highest 1st ionization potential?",
            answers: [
              { text: "B", correct: false },
              { text: "C", correct: false },
              { text: "N", correct: true },
              { text: "O", correct: false }
            ],
            explanation: "Nitrogen (N) has the highest first ionization potential among the given elements."
          },
          {
            question: "Which of the following is the strongest Lewis acid?",
            answers: [
              { text: "Bl3", correct: false },
              { text: "BF3", correct: true },
              { text: "BCl3", correct: false },
              { text: "BBr3", correct: false }
            ],
            explanation: "BF3 (boron trifluoride) is the strongest Lewis acid among the given options."
          },
          {
            question: "Which is false about noble gases?",
            answers: [
              { text: "They have zero electron affinity", correct: false },
              { text: "They are called aerogens", correct: true },
              { text: "They are almost chemically inactive", correct: false },
              { text: "They are also called rare gases", correct: false }
            ],
            explanation: "Noble gases are not called aerogens; they are often referred to as inert or rare gases."
          },
          {
            question: "Addition of Br2 to butane-2 gives",
            answers: [
              { text: "1,4-dibromobutane", correct: false },
              { text: "1,3-dibromobutane", correct: false },
              { text: "1,2-dibromobutane", correct: false },
              { text: "2,3-dibromobutane", correct: true }
            ],
            explanation: "Addition of Br2 to butane-2 results in 2,3-dibromobutane."
          },
          {
            question: "The chemical formula of Epsom salt is",
            answers: [
              { text: "ZnSO4·7H2O", correct: false },
              { text: "MgSO4·7H2O", correct: true },
              { text: "FeSO4·7H2O", correct: false },
              { text: "CuSO4·7H2O", correct: false }
            ],
            explanation: "The chemical formula of Epsom salt is MgSO4·7H2O."
          },
          {
            question: "The number of possible alcoholic isomers for C4H10O is",
            answers: [
              { text: "4", correct: false },
              { text: "3", correct: false },
              { text: "5", correct: true },
              { text: "6", correct: false }
            ],
            explanation: "There are 5 possible alcoholic isomers for the molecular formula C4H10O."
          },
          {
            question: "The synonym of the word 'convene' is",
            answers: [
              { text: "summation", correct: false },
              { text: "adjourn", correct: false },
              { text: "dissemble", correct: false },
              { text: "disperse", correct: false },
              { text: "assemble", correct: true }
            ],
            explanation: "The synonym of 'convene' is 'assemble'."
          },
          {
            question: "The antonym of the word ‘pursue’ is",
            answers: [
              { text: "erase", correct: false },
              { text: "avoid", correct: true },
              { text: "follow", correct: false },
              { text: "oppress", correct: false }
            ],
            explanation: "The antonym of 'pursue' is 'avoid'."
          },
          {
            question: "What an exceptional student this is ..............",
            answers: [
              { text: "!", correct: true },
              { text: "?", correct: false },
              { text: ".", correct: false },
              { text: "_", correct: false }
            ],
            explanation: "The correct punctuation is '!'."
          },
          {
            question: "There is a party ................ Club and it is .......... five.",
            answers: [
              { text: "on, at", correct: false },
              { text: "in, on", correct: false },
              { text: "at, on", correct: true },
              { text: "on, on", correct: false }
            ],
            explanation: "The correct prepositions are 'at' and 'on'."
          },
          {
            question: "Which of the following words doesn’t sound ‘η’?",
            answers: [
              { text: "singer", correct: false },
              { text: "pin", correct: true },
              { text: "tongue", correct: false },
              { text: "string", correct: false }
            ],
            explanation: "The word 'pin' doesn’t contain the ‘η’ sound."
          },
          {
            question: "John said, 'where there is a will there is a way'. Its indirect speech is",
            answers: [
              { text: "John said that where there was a will there was a way.", correct: true },
              { text: "John said where there is a will there is a way.", correct: false },
              { text: "John said where there was a will there was a way.", correct: false },
              { text: "John said what where there is a will there is a way.", correct: false }
            ],
            explanation: "The correct indirect speech is 'John said that where there was a will there was a way.'"
          },
          {
            question: "His performance pleased us. Its passive form is",
            answers: [
              { text: "We are pleased by his performance.", correct: false },
              { text: "We were pleased by his performance.", correct: false },
              { text: "We were pleased with his performance.", correct: true },
              { text: "We were pleased to his performance.", correct: false }
            ],
            explanation: "The correct passive form is 'We were pleased with his performance.'"
          },
          {
            question: "The word 'government' gets its primary stress on its .......... syllable.",
            answers: [
              { text: "1st", correct: true },
              { text: "2nd", correct: false },
              { text: "3rd", correct: false },
              { text: "4th", correct: false }
            ],
            explanation: "The word 'government' gets its primary stress on the 1st syllable."
          },
          {
            question: "Every one of those books..............fiction.",
            answers: [
              { text: "is", correct: true },
              { text: "were", correct: false },
              { text: "has", correct: false },
              { text: "have", correct: false }
            ],
            explanation: "'Every one of those books is fiction.'"
          },
          {
            question: "If she should win the race,........ her.",
            answers: [
              { text: "congratulated", correct: false },
              { text: "congratulate", correct: true },
              { text: "may congratulation", correct: false },
              { text: "would congratulate", correct: false }
            ],
            explanation: "'If she should win the race, congratulate her.'"
          }
          
  ];
  

const Mock2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(60); // 60 seconds for each question

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
    setTimeout(() => {
      handleNextQuestion();
    }, 1000); // wait for 1 second before moving to the next question
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setTimer(60);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData2077.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
      setSelectedAnswer(null);
      setTimer(60);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setTimer(60);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center items-center bg-gray-100 p-4 mt-3 text-gray-800">
        <div className="w-1/2 mt-10">
          {showScore ? (
            <div className="text-center ">
              <h4 className="text-2xl font-bold mt-12 w-full ">Quiz Completed</h4>
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
                className="px-4 py-2 mt-4 bg-orange-500 hover:bg-orange-500 text-white rounded"
                onClick={handleRestartQuiz}
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            <>
            <div className="flex flex-col justify-center items-center mb-4 mt-10">
  <h1 className="text-xl mb-3 text-center">Far Western University</h1>
  <h1 className="text-2xl text-center">School of Engineering</h1>
  <h1 className="text-xl text-center">Mock Test 2079 B</h1>
  {/* <h1 className="text-xl text-center"></h1> */}
  <h5 className="text-xl mb-2 text-center">
    Question {currentQuestion + 1}/{quizData2077.length}
  </h5>
  <p className="text-base mb-2 text-center">
    {quizData2077[currentQuestion].question}
  </p>
  <p className="text-sm text-red-600 text-center">
    Time remaining: {timer} seconds
  </p>
</div>
              <div className="space-y-2">
                {quizData2077[currentQuestion].answers.map(
                  (answerOption, index) => (
                    <button
                      key={index}
                      className={`w-full px-4 py-2 rounded ${
                        selectedAnswer === answerOption.text
                          ? answerOption.correct
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
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
              <div className="mt-4 flex justify-between">
                <button
                  className="w-1/2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded disabled:bg-gray-400"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  className="w-1/2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-gray-400"
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
  );
};

export default Mock2;


import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import logo from "../../../public/fwu.png";

// Total time in seconds for 150 questions in 3 hours
const TOTAL_TIME = 3 * 60 * 60;
const quizData2077 = [ // Define quiz data for 2077
  {
    "question": "If A, B and C are the sets of letters needed to spell the words “STUDENT”, “PREPARE” and “ENGINEER”, then the number of elements in (A ∪ C) ∩ B is ...",
    "answers": [
      {"text": "6", "correct": false},
      {"text": "5", "correct": false},
      {"text": "3", "correct": true},
      {"text": "2", "correct": false}
    ],
    "explanation": "The letters in A are {S, T, U, D, E, N}, in B are {P, R, E, P, A, R, E}, and in C are {E, N, G, I, N, E, E, R}. The union of A and C is {S, T, U, D, E, N, G, I, R} and the intersection with B gives the common elements {E, R}. The number of common elements is 3."
  },
  {
    "question": "Among the following, the logical statement is ...",
    "answers": [
      {"text": "Wish you every success in life.", "correct": false},
      {"text": "May god bless you", "correct": false},
      {"text": "The surface of the sun is very cold.", "correct": true},
      {"text": "Hurray! I passed the entrance exam.", "correct": false}
    ],
    "explanation": "A logical statement is one that can be classified as true or false. 'The surface of the sun is very cold' is a false statement, making it a logical statement."
  },
  {
    "question": "The domain of the function f(x) = √(x - 1) + √(8 - x) is ...",
    "answers": [
      {"text": "[1, 8]", "correct": true},
      {"text": "(-1, 8)", "correct": false},
      {"text": "[1, 8)", "correct": false},
      {"text": "(1, 8)", "correct": false}
    ],
    "explanation": "For the square root functions to be defined, x - 1 ≥ 0 and 8 - x ≥ 0. Therefore, 1 ≤ x ≤ 8. The domain is [1, 8]."
  },
  {
    "question": "A matrix A = (a) m×n is said to be a row matrix if ...",
    "answers": [
      {"text": "m = 1", "correct": true},
      {"text": "n = 1", "correct": false},
      {"text": "m > n", "correct": false},
      {"text": "m < n", "correct": false}
    ],
    "explanation": "A row matrix is a matrix that has only one row. This means m = 1."
  },
  {
    "question": "If A = [1 2 -1; 0 3 2; 0 0 2], then the determinant of adj. A is ...",
    "answers": [
      {"text": "6", "correct": false},
      {"text": "-6", "correct": false},
      {"text": "36", "correct": true},
      {"text": "-36", "correct": false}
    ],
    "explanation": "The determinant of the adjugate (adj. A) is equal to the determinant of A raised to the power of (n-1), where n is the order of the matrix. Here, det(adj. A) = (det A)^(3-1)."
  },
  {
    "question": "The value of (√3 + i/2)^69, where i = √-1, is ...",
    "answers": [
      {"text": "-i", "correct": false},
      {"text": "i", "correct": false},
      {"text": "1", "correct": true},
      {"text": "-1", "correct": false}
    ],
    "explanation": "Using De Moivre's Theorem, (cos θ + i sin θ)^n = cos(nθ) + i sin(nθ). For (√3 + i/2)^69, θ = π/6, and nθ = 69π/6 = 11.5π. This simplifies to cos(11.5π) + i sin(11.5π), which equals 1."
  },
  {
    "question": "If α, β are the roots of the equation x^2 - 2x + 2 = 0, then the value of α^2 + β^2 is ...",
    "answers": [
      {"text": "2", "correct": true},
      {"text": "0", "correct": false},
      {"text": "1", "correct": false},
      {"text": "4", "correct": false}
    ],
    "explanation": "For the quadratic equation ax^2 + bx + c = 0, the sum of the roots α + β = -b/a and the product αβ = c/a. Here, α + β = 2 and αβ = 2. Therefore, α^2 + β^2 = (α + β)^2 - 2αβ = 2^2 - 2*2 = 2."
  },
  {
    "question": "If in an infinite G.P., the first term is equal to twice the sum of the remaining terms, then the common ratio is ...",
    "answers": [
      {"text": "1", "correct": false},
      {"text": "1/2", "correct": true},
      {"text": "1/3", "correct": false},
      {"text": "-1/3", "correct": false}
    ],
    "explanation": "In an infinite geometric progression, a/(1 - r) = 2a. Solving for r gives r = 1/2."
  },
  {
    "question": "The number of three-digit numbers between 200 and 500 with distinct digits using the integers 0, 1, 2, 3, 4, and 5 is ...",
    "answers": [
      {"text": "30", "correct": false},
      {"text": "48", "correct": false},
      {"text": "60", "correct": true},
      {"text": "72", "correct": false}
    ],
    "explanation": "The hundreds digit can be 2, 3, or 4. The tens and units digits must be different from the hundreds digit and each other, giving 60 possible combinations."
  },
  {
    "question": "The coefficient of the 15th and 23rd terms in the expansion of (1 + x)^n are equal. Then n is ...",
    "answers": [
      {"text": "38", "correct": false},
      {"text": "36", "correct": false},
      {"text": "40", "correct": true},
      {"text": "42", "correct": false}
    ],
    "explanation": "For the coefficients of the 15th and 23rd terms to be equal in the binomial expansion of (1 + x)^n, nC14 = nC22. Solving for n gives n = 40."
  },
  {
    "question": "The sum to infinity of the series 1 - log_e 2 + (log_e 2)^2 - (log_e 2)^3 + ... is ...",
    "answers": [
      {"text": "1/2", "correct": true},
      {"text": "-1/2", "correct": false},
      {"text": "2", "correct": false},
      {"text": "-2", "correct": false}
    ],
    "explanation": "The given series is a geometric series with first term a = 1 and common ratio r = -log_e 2. The sum to infinity of a geometric series is a/(1 - r). Substituting the values gives 1/(1 + log_e 2), which simplifies to 1/2."
  },
  {
    "question": "The value of tan^(-1)(tan 3π/4) is ...",
    "answers": [
      {"text": "-π/4", "correct": false},
      {"text": "π/4", "correct": false},
      {"text": "3π/4", "correct": false},
      {"text": "-3π/4", "correct": true}
    ],
    "explanation": "The principal value of the inverse tangent function, tan^(-1), lies between -π/2 and π/2. Since tan(3π/4) = -tan(π/4), tan^(-1)(tan 3π/4) = -3π/4."
  },
  {
    "question": "The principal value of θ which satisfies the equations sin θ = -√3 and cos θ = 1 is ...",
    "answers": [
      {"text": "π/3", "correct": false},
      {"text": "2π/3", "correct": false},
      {"text": "4π/3", "correct": false},
      {"text": "5π/3", "correct": true}
    ],
    "explanation": "The value of θ that satisfies sin θ = -√3 and cos θ = 1 is 5π/3."
  },
  {
    "question": "If sin^(-1) x + cosec^(-1) 5 = π, then x is equal to ...",
    "answers": [
      {"text": "4", "correct": false},
      {"text": "5", "correct": true},
      {"text": "1", "correct": false},
      {"text": "3", "correct": false}
    ],
    "explanation": "Given sin^(-1) x + cosec^(-1) 5 = π, solving the equation gives x = 5."
  },
  {
    "question": "With usual symbols in ∆ABC, the value of r1r2 + r2r3 + r3r1 is equal to ...",
    "answers": [
      {"text": "2s", "correct": false},
      {"text": "s^2", "correct": true},
      {"text": "2s^2", "correct": false},
      {"text": "s", "correct": false}
    ],
    "explanation": "In triangle ABC, the value of r1r2 + r2r3 + r3r1 is equal to s^2."
  },
  {
    "question": "If cot^2 θ = 3, then the general value of θ is ...",
    "answers": [
      {"text": "2nπ ± π/4", "correct": false},
      {"text": "nπ + (-1)^n π/6", "correct": true},
      {"text": "2nπ ± π/3", "correct": false},
      {"text": "nπ ± π/6", "correct": false}
    ],
    "explanation": "The general value of θ when cot^2 θ = 3 is given by nπ + (-1)^n π/6."
  },
  {
    "question": "The point (-4,5) is a vertex of a square and one of its diagonals is 7x - y + 8 = 0. The equation of the other diagonal is ...",
    "answers": [
      {"text": "7x - y + 23 = 0", "correct": false},
      {"text": "x + 7y - 31 = 0", "correct": true},
      {"text": "x - 7y - 31 = 0", "correct": false},
      {"text": "x + 7y + 31 = 0", "correct": false}
    ],
    "explanation": "The equation of the other diagonal can be derived based on the given diagonal and vertex, resulting in x + 7y - 31 = 0."
  },
  {
    "question": "The value of h if the equation 4x^2 + hxy + y^2 = 0 represents two coincident lines is ...",
    "answers": [
      {"text": "±3", "correct": false},
      {"text": "±5", "correct": false},
      {"text": "±4", "correct": true},
      {"text": "±6", "correct": false}
    ],
    "explanation": "For the given quadratic equation to represent two coincident lines, h must be ±4."
  },
  {
    "question": "The length of the tangent from the point (2, -3) to the circle 2x^2 + 2y^2 = 1 is ...",
    "answers": [
      {"text": "5", "correct": false},
      {"text": "5√2", "correct": false},
      {"text": "5/√2", "correct": true},
      {"text": "2√5", "correct": false}
    ],
    "explanation": "The length of the tangent from a point to a circle is given by the formula √(x1^2 + y1^2 - r^2). For the point (2, -3) and circle 2x^2 + 2y^2 = 1, the length is 5/√2."
  },
  {
    "question": "The line 3x - 4y = λ touches the circle x^2 + y^2 - 4x - 8y - 5 = 0 if λ is ...",
    "answers": [
      {"text": "20", "correct": true},
      {"text": "15", "correct": false},
      {"text": "10", "correct": false},
      {"text": "5", "correct": false}
    ],
    "explanation": "The line touches the circle if the perpendicular distance from the center to the line equals the radius. Solving for λ gives λ = 20."
  },
  {
    "question": "The focus of the parabola x^2 + 8y = 0 is at ...",
    "answers": [
      {"text": "(0, -2)", "correct": true},
      {"text": "(0, 2)", "correct": false},
      {"text": "(2, 0)", "correct": false},
      {"text": "(-2, 0)", "correct": false}
    ],
    "explanation": "The focus of the parabola x^2 + 8y = 0, which is in the standard form y = (x^2)/(4a), is at (0, -2)."
  },
  {
    "question": "The eccentricity of the ellipse lies in the interval ...",
    "answers": [
      {"text": "[0,1]", "correct": false},
      {"text": "(0,1]", "correct": true},
      {"text": "[0,1)", "correct": false},
      {"text": "(0,1)", "correct": false}
    ],
    "explanation": "The eccentricity of an ellipse is a number between 0 and 1, excluding 0."
  },
  {
    "question": "The length of the latus rectum of the hyperbola x^2 - y^2 = -1 is ...",
    "answers": [
      {"text": "2a^2/b", "correct": false},
      {"text": "2b^2/a", "correct": true},
      {"text": "b^2/a", "correct": false},
      {"text": "a^2/b", "correct": false}
    ],
    "explanation": "For a hyperbola, the length of the latus rectum is given by 2b^2/a. Here, the equation is x^2 - y^2 = -1, so the length is 2b^2/a."
  },
  {
    "question": "The ratio in which the line joining (2,4,5) and (3,5,-9) is divided by the yz-plane is ...",
    "answers": [
      {"text": "2:3", "correct": false},
      {"text": "3:2", "correct": false},
      {"text": "-2:3", "correct": false},
      {"text": "-3:2", "correct": true}
    ],
    "explanation": "The yz-plane corresponds to x=0. Using the section formula, the ratio is found to be -3:2."
  },
  {
    "question": "The angle between the planes 2x - y + z = 6 and x + y + 2z = 7 is ...",
    "answers": [
      {"text": "π/4", "correct": true},
      {"text": "π/6", "correct": false},
      {"text": "π/3", "correct": false},
      {"text": "π/2", "correct": false}
    ],
    "explanation": "The angle between the planes is given by the dot product of their normal vectors. For these planes, the angle is π/4."
  },
  {
    "question": "The projection of a line segment on the coordinate axes are 12, 4, and 3 respectively. The length of the line segment is ...",
    "answers": [
      {"text": "19", "correct": false},
      {"text": "16", "correct": true},
      {"text": "15", "correct": false},
      {"text": "13", "correct": false}
    ],
    "explanation": "Using the Pythagorean theorem in three dimensions, the length of the line segment is √(12^2 + 4^2 + 3^2) = 16."
  },
  {
    "question": "The value of the limit lim |x-3| / (x-3) as x approaches 3 is ...",
    "answers": [
      {"text": "1", "correct": false},
      {"text": "-1", "correct": false},
      {"text": "0", "correct": false},
      {"text": "does not exist", "correct": true}
    ],
    "explanation": "The limit does not exist because the left-hand limit and right-hand limit are not equal."
  },
  {
    "question": "If the function f(x) = { k cos x ; x ≠ π/2 ; π - 2x/3 ; x = π/2 } be continuous at x = π/2, then k is ...",
    "answers": [
      {"text": "2", "correct": false},
      {"text": "3", "correct": true},
      {"text": "6", "correct": false},
      {"text": "12", "correct": false}
    ],
    "explanation": "For the function to be continuous at x = π/2, we equate the limit of f(x) as x approaches π/2 to the value of f(π/2), solving gives k = 3."
  },
  {
    "question": "If y = x sin^(-1) x + √(1 - x^2), then dy/dx is ...",
    "answers": [
      {"text": "√(1 - x^2)", "correct": false},
      {"text": "-√(1 - x^2)", "correct": false},
      {"text": "sin x / √(1 - x^2)", "correct": true},
      {"text": "sin^(-1) x", "correct": false}
    ],
    "explanation": "Using the product rule and chain rule, dy/dx is found to be sin x / √(1 - x^2)."
  },
  {
    "question": "If f(x) = e^x g(x) and g(0) = 4, g'(0) = 2, then f'(0) is equal to ...",
    "answers": [
      {"text": "1", "correct": false},
      {"text": "2", "correct": false},
      {"text": "3", "correct": false},
      {"text": "6", "correct": true}
    ],
    "explanation": "Using the product rule, f'(x) = e^x g(x) + e^x g'(x). Evaluating at x = 0 gives f'(0) = 6."
  },
  {
    "question": "The side of an expanding square increases at the rate of 1.5 cm/s. The rate of change of its area when the side is 20 cm is ...",
    "answers": [
      {"text": "30 cm²/s", "correct": false},
      {"text": "60 cm²/s", "correct": true},
      {"text": "45 cm²/s", "correct": false},
      {"text": "75 cm²/s", "correct": false}
    ],
    "explanation": "The rate of change of the area A = s^2 is given by dA/dt = 2s ds/dt. When s = 20 cm, the rate is 60 cm²/s."
  },
  {
    "question": "The value of ∫ sec² x √tan x dx is ...",
    "answers": [
      {"text": "2√tan x + c", "correct": false},
      {"text": "2 / √tan x + c", "correct": true},
      {"text": "√tan x + c", "correct": false},
      {"text": "1 / (2√tan x) + c", "correct": false}
    ],
    "explanation": "Using the substitution method, the integral of sec² x √tan x dx is 2 / √tan x + c."
  },
  {
    "question": "The value of ∫ (1 + cos² x) / sin x dx is ...",
    "answers": [
      {"text": "-cot x - 2x + c", "correct": true},
      {"text": "-2 cot x - 2x + c", "correct": false},
      {"text": "-2 cot x - x + c", "correct": false},
      {"text": "-2 cot x + x + c", "correct": false}
    ],
    "explanation": "The integral can be solved using partial fraction decomposition, giving -cot x - 2x + c."
  },
  {
    "question": "The area of the region bounded by the curve y = 2x - x² and the x-axis is ...",
    "answers": [
      {"text": "8/3 sq. units", "correct": true},
      {"text": "4/3 sq. units", "correct": false},
      {"text": "7/3 sq. units", "correct": false},
      {"text": "5/3 sq. units", "correct": false}
    ],
    "explanation": "The area can be found by integrating the function y = 2x - x² between the points where it intersects the x-axis."
  },
  {
    "question": "The order and degree of the differential equation d²y/dx² + (dy/dx)^(1/3) + x^(1/4) = 0 are respectively ...",
    "answers": [
      {"text": "2, 3", "correct": true},
      {"text": "3, 3", "correct": false},
      {"text": "2, 6", "correct": false},
      {"text": "2, 4", "correct": false}
    ],
    "explanation": "The order is the highest derivative and the degree is the power of the highest derivative if it is a polynomial equation in derivatives."
  },
  {
    "question": "The solution of the differential equation (x² + y²) dy/dx = 4 is ...",
    "answers": [
      {"text": "x² + y² = 12x + c", "correct": false},
      {"text": "x² + y² = 3x + c", "correct": true},
      {"text": "x³ + y³ = 4x + c", "correct": false},
      {"text": "x³ + y³ = 12x + c", "correct": false}
    ],
    "explanation": "Solving the differential equation involves separation of variables and integration."
  },
  {
    "question": "OACB is a parallelogram with OC⃗ = a⃗ and AB⃗ = b⃗. Then OA⃗ is equal to ...",
    "answers": [
      {"text": "a⃗ + b⃗", "correct": true},
      {"text": "a⃗ - b⃗", "correct": false},
      {"text": "1/2 (a⃗ - b⃗)", "correct": false},
      {"text": "1/2 (a⃗ + b⃗)", "correct": false}
    ],
    "explanation": "In a parallelogram, the vector from one vertex to the opposite vertex is the sum of the vectors along two adjacent sides."
  },
  {
    "question": "If a⃗ + b⃗ = c⃗ and |a⃗| = 4, |b⃗| = 6, |c⃗| = 8, then the angle between a⃗ and b⃗ is ...",
    "answers": [
      {"text": "π/3", "correct": true},
      {"text": "cos⁻¹(1/3)", "correct": false},
      {"text": "cos⁻¹(1/4)", "correct": false},
      {"text": "π/4", "correct": false}
    ],
    "explanation": "Using the cosine rule for vectors, we can find the angle between a⃗ and b⃗."
  },
  {
    "question": "In a set of observations, the relation between median, the second quartile (Q2), the fifth decile (D5), and the fiftieth percentile (P50) is ...",
    "answers": [
      {"text": "M = Q2 = D5 = P50", "correct": true},
      {"text": "M > Q2 > D5 > P50", "correct": false},
      {"text": "M < Q2 < D5 < P50", "correct": false},
      {"text": "M = 4Q2 = 10D5 = 100P50", "correct": false}
    ],
    "explanation": "By definition, the median, the second quartile, the fifth decile, and the fiftieth percentile are all the same value."
  },
  {
    "question": "From 30 tickets marked with numbers 1 to 30, a ticket is drawn at random. The probability that it will be a multiple of 3 or 4 is ...",
    "answers": [
      {"text": "1/3", "correct": true},
      {"text": "1/6", "correct": false},
      {"text": "1/4", "correct": false},
      {"text": "1/2", "correct": false}
    ],
    "explanation": "Calculate the number of multiples of 3 and 4 in the range 1 to 30 and find the probability."
  },
  {
    "question": "The SI unit of work function of a metal used in the photoelectric effect is ...",
    "answers": [
      {"text": "Joule (J)", "correct": true},
      {"text": "Newton (N)", "correct": false},
      {"text": "Pascal (Pa)", "correct": false},
      {"text": "Hertz (Hz)", "correct": false}
    ],
    "explanation": "The work function is the minimum energy needed to remove an electron from the surface of a metal, measured in Joules."
  },
  {
    "question": "The distance travelled by an object is directly proportional to the time taken. Its acceleration ...",
    "answers": [
      {"text": "becomes zero", "correct": true},
      {"text": "increases", "correct": false},
      {"text": "decreases", "correct": false},
      {"text": "remains constant", "correct": false}
    ],
    "explanation": "If distance is directly proportional to time, the object is moving at a constant speed, implying zero acceleration."
  },
  {
    "question": "A soccer ball is thrown at a 60-degree angle from the ground. It reaches its maximum height in 10 s. Using g = 10 m/s² as the acceleration due to gravity, what is the projected velocity of the object?",
    "answers": [
      {"text": "115.5 m/s", "correct": false},
      {"text": "117 m/s", "correct": true},
      {"text": "120 m/s", "correct": false},
      {"text": "11.55 m/s", "correct": false}
    ],
    "explanation": "Using the vertical motion equation and solving for initial velocity."
  },
  {
    "question": "The centre of mass of a body ...",
    "answers": [
      {"text": "Lies within or outside the body", "correct": true},
      {"text": "Lies always at the geometrical centre", "correct": false},
      {"text": "Lies always inside the body", "correct": false},
      {"text": "Lies always outside the body", "correct": false}
    ],
    "explanation": "The center of mass is the point where the mass of the body is considered to be concentrated and can lie within or outside the physical boundaries of the body."
  },
  {
    "question": "It is difficult to move a cycle with brakes on because ...",
    "answers": [
      {"text": "sliding friction is more than rolling friction", "correct": true},
      {"text": "rolling friction is more than sliding friction", "correct": false},
      {"text": "sliding friction opposes motion on the road", "correct": false},
      {"text": "rolling friction opposes motion on the road", "correct": false}
    ],
    "explanation": "With the brakes on, sliding friction, which is greater than rolling friction, comes into play, making it difficult to move the cycle."
  },
  {
    "question": "A person carrying a box on his head is walking on a level road from one place to another is doing no work. This statement is ...",
    "answers": [
      {"text": "Correct", "correct": true},
      {"text": "Incorrect", "correct": false},
      {"text": "Partially correct", "correct": false},
      {"text": "Cannot say", "correct": false}
    ],
    "explanation": "In the context of physics, work is done when a force causes displacement. If the box is not being displaced vertically, no work is done on the box."
  },
  {
    "question": "A particle moves in a circle of radius 20 cm with a linear speed of 10 m/s. Its angular velocity in rad/s is ...",
    "answers": [
      {"text": "50", "correct": true},
      {"text": "40", "correct": false},
      {"text": "30", "correct": false},
      {"text": "20", "correct": false}
    ],
    "explanation": "Angular velocity (ω) is given by v/r, where v is linear speed and r is the radius."
  },
  {
    "question": "In Hooke’s law, F = -kx, the constant k is called the……",
    "answers": [
      {"text": "Velocity", "correct": false},
      {"text": "Speed constant", "correct": false},
      {"text": "Spring constant", "correct": true},
      {"text": "Time", "correct": false}
    ],
    "explanation": "In Hooke's law, the constant k represents the stiffness of the spring, hence it is called the spring constant."
  },
  {
    "question": "If the moment of inertia of a rotating body is increased then what will be the effect on the angular velocity",
    "answers": [
      {"text": "It will increase", "correct": true},
      {"text": "It will decrease", "correct": false},
      {"text": "There will be no effect", "correct": false},
      {"text": "First increase and then decrease", "correct": false}
    ],
    "explanation": "According to the law of conservation of angular momentum, if moment of inertia increases, angular velocity decreases."
  },
  {
    "question": "Which of the following represents viscosity?",
    "answers": [
      {"text": "Potential energy stored in fluid", "correct": false},
      {"text": "Resistance of fluid motion", "correct": true},
      {"text": "Roughness of the surface", "correct": false},
      {"text": "The pressure difference between the two fluids", "correct": false}
    ],
    "explanation": "Viscosity refers to the resistance of a fluid to motion. It determines how easily a fluid flows."
  },
  {
    "question": "Every temperature measuring instrument makes use of a physical property of a substance in order to measure temperature objectively, which physical property is used by mercury in glass thermometer?",
    "answers": [
      {"text": "Electromotive force", "correct": false},
      {"text": "Resistance of a piece of metal", "correct": false},
      {"text": "Pressure of a fixed mass of gas at constant volume", "correct": false},
      {"text": "Volume of a fixed mass of liquid", "correct": true}
    ],
    "explanation": "Mercury in glass thermometers measure temperature based on the change in volume of mercury with temperature, which is a physical property used for temperature measurement."
  },
  {
    "question": "A metal ball of mass 0.5 kg falls freely from a height of 10 m and bounces to a height of 5.5 m from the ground. If the dissipated energy in this process is absorbed by the ball (specific heat capacity of material = 450 J/ kgC), the rise in its temperature is…………………..",
    "answers": [
      {"text": "0.002°C", "correct": false},
      {"text": "0.2°C", "correct": false},
      {"text": "20°C", "correct": false},
      {"text": "2°C", "correct": true}
    ],
    "explanation": "The rise in temperature can be calculated using the formula ΔT = Energy absorbed / (mass * specific heat capacity). Given the dissipated energy and the specific heat capacity, the rise in temperature is approximately 2°C."
  },
  {
    "question": "A piece of steel has a length of 30 cm at 15°C. At 90°C its length increases by 0.027 cm. Coefficient of linear expansion of steel piece is:",
    "answers": [
      {"text": "6 × 10-6 °C-1", "correct": true},
      {"text": "12 × 10-6 °C-1", "correct": false},
      {"text": "24 × 10-6 °C-1", "correct": false},
      {"text": "36 × 10-6 °C-1", "correct": false}
    ],
    "explanation": "The coefficient of linear expansion can be calculated using the formula: α = ΔL / (L₀ * ΔT), where ΔL is the change in length, L₀ is the original length, and ΔT is the change in temperature."
  },
  {
    "question": "Heat transmission is directly linked with the transport of medium itself, i.e., there is actual motion of heated particles during ……",
    "answers": [
      {"text": "Conduction only", "correct": false},
      {"text": "Convection only", "correct": true},
      {"text": "Radiation only", "correct": false},
      {"text": "Conduction as well as radiation", "correct": false}
    ],
    "explanation": "Convection involves the actual motion of heated particles within a fluid (liquid or gas), transferring heat energy from one place to another."
  },
  {
    "question": "What is the power of the lens, if the far point of a short-sighted eye is 200 cm?",
    "answers": [
      {"text": "-0.5 D", "correct": false},
      {"text": "2 D", "correct": true},
      {"text": "1 D", "correct": false},
      {"text": "-1.5 D", "correct": false}
    ],
    "explanation": "The power of a lens can be calculated using the formula P = 1 / f, where f is the focal length. Since the far point of a short-sighted eye is at 200 cm (focal length), the power of the lens is 1 / 200 = 2 D."
  },
  {
    "question": "The angle of the prism is equal to the angle of minimum deviation for a prism of refractive index 1.5. What is the value of the angle of the prism?",
    "answers": [
      {"text": "41°", "correct": false},
      {"text": "82°", "correct": false},
      {"text": "62°", "correct": true},
      {"text": "31°", "correct": false}
    ],
    "explanation": "For a prism, the angle of minimum deviation (D) is related to the refractive index (n) and the angle of the prism (A) by the formula: n = sin((A + D / 2) / 2) / sin(A / 2). Given n = 1.5 and A = D, solving gives A ≈ 62°."
  },
  {
    "question": "Which ray is the least deviated by a prism?",
    "answers": [
      {"text": "Violet ray", "correct": false},
      {"text": "Green ray", "correct": false},
      {"text": "Red ray", "correct": true},
      {"text": "Yellow ray", "correct": false}
    ],
    "explanation": "Red light, which has a longer wavelength compared to other colors like violet or green, experiences less deviation when passing through a prism."
  },
  {
    "question": "Fringe width in Young’s double slit experiment increases when ……",
    "answers": [
      {"text": "Separation between sources increases", "correct": true},
      {"text": "Distance between source and screen increases", "correct": false},
      {"text": "Wavelength of light decreases", "correct": false},
      {"text": "Do not change", "correct": false}
    ],
    "explanation": "The fringe width (distance between consecutive bright or dark fringes) in Young's double slit experiment increases with the separation between the slits (sources)."
  },
  {
    "question": "Electric lines of force about a negative point charge are …….",
    "answers": [
      {"text": "Radial, inward", "correct": false},
      {"text": "Radial, outward", "correct": true},
      {"text": "Circular, clockwise", "correct": false},
      {"text": "Circular, anticlockwise", "correct": false}
    ],
    "explanation": "Electric lines of force around a negative point charge radiate outward, indicating the direction of the force exerted on a positive charge."
  },
  {
    "question": "A capacitor consists of ………..",
    "answers": [
      {"text": "Two insulators separated by a conductor", "correct": false},
      {"text": "Two conductors separated by an insulator", "correct": true},
      {"text": "Two insulators only", "correct": false},
      {"text": "Two conductors only", "correct": false}
    ],
    "explanation": "A capacitor is typically made up of two conductors (often plates) separated by an insulating material (dielectric), which stores electrical energy."
  },
  {
    "question": "Ohm's law in point form in field theory can be expressed as …..",
    "answers": [
      {"text": "V = RI", "correct": false},
      {"text": "J = E/σ", "correct": false},
      {"text": "J = σE", "correct": false},
      {"text": "R = ρl/A", "correct": true}
    ],
    "explanation": "In field theory, Ohm's law can be expressed as R = ρl/A, where R is resistance, ρ is resistivity, l is length, and A is cross-sectional area."
  },
  {
    "question": "You are given three bulbs of 25, 40 and 60 watt. Which of them has lowest resistance?",
    "answers": [
      {"text": "25 watt bulb", "correct": false},
      {"text": "40 watt bulb", "correct": false},
      {"text": "60 watt bulb", "correct": true},
      {"text": "Information is insufficient", "correct": false}
    ],
    "explanation": "The resistance of a bulb can be indirectly related to its power consumption (wattage). Higher wattage bulbs typically have lower resistance due to higher current flow."
  },
  {
    "question": "Which of the following apparatus construction uses electromagnetic induction?",
    "answers": [
      {"text": "Generator", "correct": true},
      {"text": "Voltmeter", "correct": false},
      {"text": "Galvanometer", "correct": false},
      {"text": "Electric Motor", "correct": false}
    ],
    "explanation": "Generators utilize electromagnetic induction to convert mechanical energy into electrical energy by rotating a coil within a magnetic field."
  },
  {
    "question": "Why DC ammeter can’t measure an alternating current?",
    "answers": [
      {"text": "AC cannot pass through a DC ammeter", "correct": false},
      {"text": "AC changes its direction", "correct": true},
      {"text": "AC is virtual", "correct": false},
      {"text": "The average value of a complete cycle is zero", "correct": false}
    ],
    "explanation": "DC ammeters measure direct current (DC), which flows in one direction only. Alternating current (AC) changes direction periodically, making it unsuitable for measurement by DC ammeters."
  },
  {
    "question": "Two metals A and B have work functions of 2 eV and 5 eV respectively. Which metal has a higher threshold wavelength?",
    "answers": [
      {"text": "Metal A", "correct": false},
      {"text": "Metal B", "correct": true},
      {"text": "Both", "correct": false},
      {"text": "No change in threshold wavelength", "correct": false}
    ],
    "explanation": "The threshold wavelength λ₀ is related to the work function φ by the equation λ₀ = hc / φ, where h is Planck's constant and c is the speed of light. Metal B, with a higher work function, has a lower threshold wavelength."
  },
  {
    "question": "A beam of X-rays is constructively scattered in second order from the surface of NaCl crystal at an angle of 30° and the spacing between layers of atoms in NaCl crystal is 4.5 × 10-10m. The wavelength of X-rays is………….",
    "answers": [
      {"text": "2.25 × 10-10m", "correct": false},
      {"text": "1.25 × 10-10m", "correct": false},
      {"text": "2.50 × 10-10m", "correct": true},
      {"text": "1.50 × 10-10m", "correct": false}
    ],
    "explanation": "For constructive interference in second order, the condition 2d sinθ = nλ is satisfied, where d is the spacing between layers, θ is the angle of incidence, n is the order of interference, and λ is the wavelength of X-rays."
  },
  {
    "question": "The energy gap is much more in silicon than in germanium because ………..",
    "answers": [
      {"text": "It has less number of electrons", "correct": false},
      {"text": "It has high atomic mass number", "correct": false},
      {"text": "Its crystal has much stronger bonds called ionic bonds", "correct": false},
      {"text": "Its valence electrons are more tightly bound to their parent nuclei", "correct": true}
    ],
    "explanation": "Silicon has a larger energy band gap compared to germanium due to stronger covalent bonds between its atoms, resulting in valence electrons being more tightly bound."
  },
  {
    "question": "The decay constant of radium is 4.28 × 10-4 per year. Its half life in years will be………..",
    "answers": [
      {"text": "1240", "correct": false},
      {"text": "1620", "correct": false},
      {"text": "2000", "correct": true},
      {"text": "63", "correct": false}
    ],
    "explanation": "The half-life (T₁/₂) can be calculated using the formula T₁/₂ = ln(2) / λ, where λ is the decay constant. For radium with a decay constant of 4.28 × 10-4 per year, the half-life is approximately 2000 years."
  },
  {
    "question": "Which pair can show the functional isomerism?",
    "answers": [
      {"text": "Alcohol and ether", "correct": false},
      {"text": "Ether and aldehyde", "correct": false},
      {"text": "Alcohol and aldehyde", "correct": true},
      {"text": "Aldehyde and ester", "correct": false}
    ],
    "explanation": "Functional isomers have the same molecular formula but differ in the functional group arrangement. Alcohols (R-OH) and aldehydes (R-CHO) are examples of functional isomers."
  },
  {
    "question": "What is the major product obtained by heating sodium benzoate in presence of sodalime?",
    "answers": [
      {"text": "Benzene", "correct": true},
      {"text": "Toluene", "correct": false},
      {"text": "Benzoic acid", "correct": false},
      {"text": "Azobenzene", "correct": false}
    ],
    "explanation": "Heating sodium benzoate (C₆H₅COONa) with sodalime (NaOH + CaO) results in the decarboxylation reaction, producing benzene (C₆H₆)."
  },
  {
    "question": "Which one is ester?",
    "answers": [
      {"text": "HCOOR", "correct": false},
      {"text": "-C=O", "correct": false},
      {"text": "R-O- C", "correct": true},
      {"text": "-CO2 –", "correct": false}
    ],
    "explanation": "Esters are organic compounds formed by the reaction of carboxylic acids and alcohols, resulting in the functional group R-O-C."
  },
  {
    "question": "Ozonolysis of acetylene gives …….",
    "answers": [
      {"text": "Methanol", "correct": false},
      {"text": "Ethanol", "correct": false},
      {"text": "Ethanedial", "correct": true},
      {"text": "Oxalic acid", "correct": false}
    ],
    "explanation": "Ozonolysis of acetylene (C₂H₂) results in the formation of ethanedial (C₂H₂O₂), also known as glyoxal."
  },
  {
    "question": "The reagent that reacts with both aldehyde and ketone is …………",
    "answers": [
      {"text": "Fehling’s reagent", "correct": true},
      {"text": "Tollen’s reagent", "correct": false},
      {"text": "Schiff’s reagent", "correct": false},
      {"text": "Grignard’s reagent", "correct": false}
    ],
    "explanation": "Fehling's reagent (a mixture of aqueous solutions of copper(II) sulfate and potassium sodium tartrate) reacts with both aldehydes and ketones to form colored precipitates."
  },
  {
    "question": "The synonym of the underlined word in the sentence 'He hardly works' is …….",
    "answers": [
      {"text": "Strenuously", "correct": false},
      {"text": "Scarcely", "correct": true},
      {"text": "Mostly", "correct": false},
      {"text": "Arduously", "correct": false}
    ],
    "explanation": "The word 'hardly' in this context means scarcely or rarely."
  },
  {
    "question": "The expression 'to smell a rat' means………",
    "answers": [
      {"text": "A bad smell", "correct": false},
      {"text": "To misunderstand", "correct": false},
      {"text": "To hide", "correct": false},
      {"text": "To suspect", "correct": true}
    ],
    "explanation": "The idiom 'to smell a rat' means to suspect that something is wrong or suspicious."
  },
  {
    "question": "Hari said, 'I went to Delhi long ago.'",
    "answers": [
      {"text": "Hari said that I went to Delhi long ago.", "correct": false},
      {"text": "Hari said that he had gone to Delhi long before.", "correct": true},
      {"text": "Hari said that he went to Delhi long ago.", "correct": false},
      {"text": "Hari said that I had gone to Delhi long ago.", "correct": false}
    ],
    "explanation": "When reporting a past statement, the tense in the reported speech usually shifts one step back (past simple to past perfect) unless the reported action is still true."
  },
  {
    "question": "Do you imitate others?",
    "answers": [
      {"text": "Are others imitated by you?", "correct": true},
      {"text": "Are others being imitated by you?", "correct": false},
      {"text": "Were others imitated by you?", "correct": false},
      {"text": "Have others been imitated by you?", "correct": false}
    ],
    "explanation": "This question seeks confirmation whether the person imitates others, hence the correct answer is 'Are others imitated by you?'"
  },
  {
    "question": "The phonemic transcription of 'home' is………",
    "answers": [
      {"text": "/ hɔ:m/", "correct": true},
      {"text": "/ hʌʊm/", "correct": false},
      {"text": "/ hoʊm/", "correct": false},
      {"text": "/ həʊm/", "correct": false}
    ],
    "explanation": "The phonetic transcription / hɔ:m/ represents the pronunciation of 'home' using the International Phonetic Alphabet (IPA)."
  },
  {
    "question": "Which one of the following is correctly punctuated?",
    "answers": [
      {"text": "These books are theirs’.", "correct": false},
      {"text": "These books are their’s.", "correct": false},
      {"text": "These books are theirs.", "correct": true},
      {"text": "These books are their.", "correct": false}
    ],
    "explanation": "The possessive pronoun 'theirs' does not require an apostrophe when indicating possession."
  },
  {
    "question": " The greatest enemy of mankind, as people have discovered is not science, but war. Science merely reflects the social forces by which it is surrounded. It is found that when there is peace, science is constructive, and when there is war, science is perverted to destructive ends. The weapons which science gives us do not necessarily create war; these make war increasingly more terrible. Until now, it has brought us to the doorstep of doom. Our main problem, therefore, is not to curb science, but to stop war, to substitute law for force, and international government for anarchy in the relations of one nation with another. That is a job in which everybody must participate, including the scientists. But the bomb of Hiroshima suddenly woke us up to the fact that we have very little time. The hour is late and our work has scarcely begun. Now we are face to face with this urgent question: Can education and tolerance, understanding and creative intelligence run fast enough to keep us abreast with our own mounting capacity to destroy? That is the question which we shall have to answer one way or the other in this generation. Science must help us in the answer, but the main decision lies within ourselves.An appropriate title for the passage would be",
    "answers": [
      {"text": "Science and the new generation", "correct": false},
      {"text": "Science and social forces", "correct": false},
      {"text": "Science and the horrors of war", "correct": true},
      {"text": "Science and world peace", "correct": false}
    ],
    "explanation": "The passage discusses how science, in the context of war, becomes destructive, reflecting on the horrors of war."
  },
  {
    "question": "The expression 'keep us abreast' in the passage means ……",
    "answers": [
      {"text": "prevent from escaping", "correct": false},
      {"text": "hold out a challenge", "correct": false},
      {"text": "keep at a side", "correct": false},
      {"text": "keep side by side", "correct": true}
    ],
    "explanation": "'Keep us abreast' means to stay side by side or keep pace with."
  },
  {
    "question": "According to the writer, the main problem we are faced with is to ……",
    "answers": [
      {"text": "prevent scientists from participating in destructive activities", "correct": false},
      {"text": "abolish war", "correct": true},
      {"text": "stop scientific activities everywhere", "correct": false},
      {"text": "stop science from reflecting social forces", "correct": false}
    ],
    "explanation": "The passage emphasizes the need to stop war and replace it with peaceful international relations."
  },
  {
    "question": "Which of the following statements is not implied in the passage?",
    "answers": [
      {"text": "Science is misused for destructive purposes.", "correct": false},
      {"text": "Neither science nor the weapons it invents add to the horrors of war.", "correct": false},
      {"text": "People needlessly blame science for war.", "correct": true},
      {"text": "The role of science in ensuring world peace is subsidiary to that of man.", "correct": false}
    ],
    "explanation": "The passage does not suggest that people blame science needlessly for war."
  },
  {
    "question": "In Hooke’s law, F = -kx, the constant k is called the……",
    "answers": [
      {"text": "Velocity", "correct": false},
      {"text": "Speed constant", "correct": false},
      {"text": "Spring constant", "correct": true},
      {"text": "Time", "correct": false}
    ],
    "explanation": "In Hooke's law, k is the spring constant which represents the stiffness of the spring."
  },
  {
    "question": "If the moment of inertia of a rotating body is increased then what will be the effect on the angular velocity?",
    "answers": [
      {"text": "It will increase", "correct": false},
      {"text": "It will decrease", "correct": false},
      {"text": "There will be no effect", "correct": false},
      {"text": "First increase and then decrease", "correct": true}
    ],
    "explanation": "When moment of inertia increases, if external torque is constant, angular velocity initially decreases and then stabilizes."
  },
  {
    "question": "Which of the following represents viscosity?",
    "answers": [
      {"text": "Potential energy stored in fluid", "correct": false},
      {"text": "Resistance of fluid motion", "correct": true},
      {"text": "Roughness of the surface", "correct": false},
      {"text": "The pressure difference between the two fluids", "correct": false}
    ],
    "explanation": "Viscosity is the resistance of a fluid to flow."
  },
  {
    "question": "Every temperature measuring instrument makes use of a physical property of a substance in order to measure temperature objectively, which physical property is used by mercury in glass thermometer?",
    "answers": [
      {"text": "Electromotive force", "correct": false},
      {"text": "Resistance of a piece of metal", "correct": false},
      {"text": "Pressure of a fixed mass of gas at constant volume", "correct": false},
      {"text": "Volume of a fixed mass of liquid", "correct": true}
    ],
    "explanation": "Mercury thermometers use the expansion of mercury with temperature to measure temperature."
  },
  {
    "question": "A metal ball of mass 0.5 kg falls freely from a height of 10 m and bounces to a height of 5.5 m from the ground. If the dissipated energy in this process is absorbed by the ball (specific heat capacity of material = 450 J/ kgC), the rise in its temperature is…………………..",
    "answers": [
      {"text": "0.002C", "correct": false},
      {"text": "0.2C", "correct": false},
      {"text": "20C", "correct": false},
      {"text": "2C", "correct": true}
    ],
    "explanation": "The rise in temperature can be calculated using the energy dissipated and the specific heat capacity of the material."
  },
  {
    "question": "A piece of steel has a length of 30 cm at 15°C. At 90°C its length increases by 0.027 cm. Coefficient of linear expansion of steel piece is:",
    "answers": [
      {"text": "6 × 10-6 C-1", "correct": false},
      {"text": "12 × 10-6 C-1", "correct": false},
      {"text": "24 × 10-6 C-1", "correct": true},
      {"text": "36 × 10-6 C-1", "correct": false}
    ],
    "explanation": "The coefficient of linear expansion is calculated based on the change in length and the original length."
  },
  {
    "question": "Heat transmission is directly linked with the transport of medium itself, i.e., there is actual motion of heated particles during ……",
    "answers": [
      {"text": "Conduction only", "correct": false},
      {"text": "Convection only", "correct": true},
      {"text": "Radiation only", "correct": false},
      {"text": "Conduction as well as radiation", "correct": false}
    ],
    "explanation": "Heat is transferred by actual motion of particles in convection."
  },
  {
    "question": "What is the power of the lens, if the far point of a short-sighted eye is 200 cm?",
    "answers": [
      {"text": "-0.5 D", "correct": false},
      {"text": "2 D", "correct": false},
      {"text": "1 D", "correct": true},
      {"text": "-1.5 D", "correct": false}
    ],
    "explanation": "The power of a lens is the reciprocal of the focal length in meters."
  },
  {
    "question": "The angle of the prism is equal to the angle of minimum deviation for a prism of refractive index 1.5. What is the value of the angle of the prism?",
    "answers": [
      {"text": "41", "correct": false},
      {"text": "82", "correct": false},
      {"text": "62", "correct": true},
      {"text": "31", "correct": false}
    ],
    "explanation": "The angle of minimum deviation for a prism is equal to the angle of the prism."
  },
  {
    "question": "Which ray is the least deviated by a prism?",
    "answers": [
      {"text": "Violet ray", "correct": false},
      {"text": "Green ray", "correct": false},
      {"text": "Red ray", "correct": true},
      {"text": "Yellow ray", "correct": false}
    ],
    "explanation": "Red light is least deviated by a prism due to its longer wavelength."
  },
  {
    "question": "Fringe width in Young’s double slit experiment increases when ……",
    "answers": [
      {"text": "Separation between sources increases", "correct": true},
      {"text": "Distance between source and screen increases", "correct": false},
      {"text": "Wavelength of light decreases", "correct": false},
      {"text": "Do not change", "correct": false}
    ],
    "explanation": "Fringe width in double slit interference increases with the increase in separation between sources."
  },
  {
    "question": "Electric lines of force about a negative point charge are …….",
    "answers": [
      {"text": "Radial, inward", "correct": false},
      {"text": "Radial, outward", "correct": true},
      {"text": "Circular, clockwise", "correct": false},
      {"text": "Circular, anticlockwise", "correct": false}
    ],
    "explanation": "Electric field lines around a negative charge extend outward, radially."
  },
  {
    "question": "A capacitor consists of ………..",
    "answers": [
      {"text": "Two insulators separated by a conductor", "correct": false},
      {"text": "Two conductors separated by an insulator", "correct": true},
      {"text": "Two insulators only", "correct": false},
      {"text": "Two conductors only", "correct": false}
    ],
    "explanation": "A capacitor has two conductors (plates) separated by an insulating material (dielectric)."
  },
  {
    "question": "Ohm's law in point form in field theory can be expressed as …..",
    "answers": [
      {"text": "V = RI", "correct": false},
      {"text": "J = E/σ", "correct": false},
      {"text": "J = σE", "correct": true},
      {"text": "R = ρl/A", "correct": false}
    ],
    "explanation": "In field theory, Ohm's law is often expressed as J = σE, where J is the current density, σ is the conductivity, and E is the electric field strength."
  },
  {
    "question": "You are given three bulbs of 25, 40 and 60 watt. Which of them has lowest resistance?",
    "answers": [
      {"text": "25 watt bulb", "correct": false},
      {"text": "40 watt bulb", "correct": false},
      {"text": "60 watt bulb", "correct": true},
      {"text": "Information is insufficient", "correct": false}
    ],
    "explanation": "Power is inversely proportional to resistance (P = V^2 / R), so the 60 watt bulb has the lowest resistance."
  },
  {
    "question": "Which of the following apparatus construction uses electromagnetic induction?",
    "answers": [
      {"text": "Generator", "correct": true},
      {"text": "Voltmeter", "correct": false},
      {"text": "Galvanometer", "correct": false},
      {"text": "Electric Motor", "correct": false}
    ],
    "explanation": "Generators use electromagnetic induction to convert mechanical energy into electrical energy."
  },
  {
    "question": "Why DC ammeter is not suitable to measure the alternating current (AC)?",
    "answers": [
      {"text": "It may show the reading in positive and negative alternation", "correct": false},
      {"text": "It cannot measure the current which changes direction", "correct": true},
      {"text": "It can measure the average value", "correct": false},
      {"text": "None of the above", "correct": false}
    ],
    "explanation": "DC ammeters are designed to measure current in one direction only and do not account for the alternating direction of AC."
  }
];

const Mock7 = () => {
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

export default Mock7;

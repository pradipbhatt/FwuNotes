import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";


const quizData2077 = [ // Define quiz data for 2077
    {
      question: "The value of sin50° + sin10° is:",
      answers: [
        { text: "1", correct: false },
        { text: "0", correct: false },
        { text: "-1", correct: false },
        { text: "2", correct: true }
      ],
      explanation: "The value of sin50° + sin10° is equal to 2 based on trigonometric identities."
    },
    {
      question: "The value of sin a + sin b + sin c in terms of area of triangle is:",
      answers: [
        { text: "∆s / 2R", correct: false },
        { text: "4∆s / abc", correct: false },
        { text: "4∆ / abc", correct: true },
        { text: "4s / abc∆", correct: false }
      ],
      explanation: "The value of sin a + sin b + sin c in terms of the area of a triangle is 4∆ / abc."
    },
    {
      question: "All the values of x satisfying the equation tan(ax) = cot(bx) are given by:",
      answers: [
        { text: "x = nπ + (a+b)π", correct: false },
        { text: "x = nπ - (a+b)π", correct: false },
        { text: "x = nπ / (a+b)", correct: true },
        { text: "x = (2n+1)π / 2(a+b)", correct: false }
      ],
      explanation: "The values of x satisfying the equation tan(ax) = cot(bx) are given by x = nπ / (a+b)."
    },
    {
      question: "In a triangle ABC, the value of a sin(B-C) / (b² - c²) is:",
      answers: [
        { text: "2R", correct: false },
        { text: "1/2R", correct: true },
        { text: "2R²", correct: false },
        { text: "1/2R²", correct: false }
      ],
      explanation: "The value of a sin(B-C) / (b² - c²) in a triangle is 1/2R."
    },
    {
      question: "If (3, 3) lies on the line joining the points (h, 0) and (0, k), then:",
      answers: [
        { text: "h + k = 3", correct: false },
        { text: "hk = 3", correct: false },
        { text: "3h - 3k = 1", correct: false },
        { text: "1/h + 1/k = 1/3", correct: true }
      ],
      explanation: "If (3, 3) lies on the line joining (h, 0) and (0, k), then 1/h + 1/k = 1/3."
    },
    {
      question: "The equation of the straight line in double intercept form is:",
      answers: [
        { text: "bx + ay = ab", correct: false },
        { text: "y = mx + c", correct: false },
        { text: "y - y1 = m(x - x1)", correct: false },
        { text: "y - y1 = (y2 - y1) / (x2 - x1) (x - x1)", correct: true }
      ],
      explanation: "The equation of the straight line in double intercept form is y - y1 = (y2 - y1) / (x2 - x1) (x - x1)."
    },
    {
      question: "The circumcenter of the triangle whose vertices are (2, -1), (1, 2), and (-2, 1) is:",
      answers: [
        { text: "(1/2, 2/3)", correct: false },
        { text: "(-1/2, 3/2)", correct: false },
        { text: "(0, 0)", correct: true },
        { text: "None of the above", correct: false }
      ],
      explanation: "The circumcenter of the triangle with vertices (2, -1), (1, 2), and (-2, 1) is (0, 0)."
    },
    {
      question: "The points of intersection of the lines represented by 3x² – 7xy + 2y² + 9x + 2y - 12 = 0 are:",
      answers: [
        { text: "(2, 3)", correct: false },
        { text: "(3, 2)", correct: false },
        { text: "(-3, 2)", correct: false },
        { text: "(1, 2)", correct: true }
      ],
      explanation: "The points of intersection of the lines represented by the given equation are (1, 2)."
    },
    {
      question: "The angle between the pair of lines represented by x³ – 2xy – cotθ – y² = 0 is:",
      answers: [
        { text: "0", correct: false },
        { text: "π/2", correct: false },
        { text: "tan⁻¹(±2)", correct: false },
        { text: "tan⁻¹(±1/2)", correct: true }
      ],
      explanation: "The angle between the lines represented by the given equation is tan⁻¹(±1/2)."
    },
    {
      question: "Which of the following is the equation of a hyperbola?",
      answers: [
        { text: "x² + 4y² - 4x + 24y + 24 = 0", correct: false },
        { text: "x² + y² - 12x - 6y - 9 = 0", correct: false },
        { text: "x² - 5xy - 4y² + x + 2y - 2 = 0", correct: true },
        { text: "9x² - 16y² - 18x - 64y - 199 = 0", correct: false }
      ],
      explanation: "The equation x² - 5xy - 4y² + x + 2y - 2 = 0 represents a hyperbola."
    },
    {
      question: "The straight lines y = 2x ± 3√5 are always tangent to the circle:",
      answers: [
        { text: "x² + y² = 4", correct: false },
        { text: "x² + y² = 9", correct: false },
        { text: "x² + y² = 25", correct: true },
        { text: "x² + y² = 16", correct: false }
      ],
      explanation: "The lines y = 2x ± 3√5 are always tangent to the circle x² + y² = 25."
    },
    {
      question: "The angle between the lines whose direction ratios are 2, 3, 4 and 1, -2, 1 is:",
      answers: [
        { text: "π/2", correct: false },
        { text: "π/3", correct: false },
        { text: "π/4", correct: false },
        { text: "π/6", correct: true }
      ],
      explanation: "The angle between the lines with given direction ratios is π/6."
    },
    {
      question: "lim x → 2 |x − 2| / (x − 2) is equal to:",
      answers: [
        { text: "1", correct: false },
        { text: "-1", correct: false },
        { text: "0", correct: false },
        { text: "does not exist", correct: true }
      ],
      explanation: "The limit does not exist as |x − 2| / (x − 2) approaches different values from either side of x = 2."
    },
    {
      question: "lim x → 0 sin(x°) / x is equal to:",
      answers: [
        { text: "1", correct: false },
        { text: "π/180", correct: true },
        { text: "180/π", correct: false },
        { text: "none of the above", correct: false }
      ],
      explanation: "lim x → 0 sin(x°) / x is equal to π/180 due to conversion between degrees and radians."
    },
    {
      question: "lim x → a sin(x − a) / (x³ − a³) is equal to:",
      answers: [
        { text: "1/2a", correct: false },
        { text: "2a²", correct: false },
        { text: "1", correct: false },
        { text: "1/3a²", correct: true }
      ],
      explanation: "The limit is 1/3a² using L'Hôpital's rule and algebraic manipulation."
    },
    {
      question: "If ax² + 2hxy + by² = 1, then dy/dx is:",
      answers: [
        { text: "-(ax + by) / (hx + by)", correct: false },
        { text: "-2ax / by", correct: false },
        { text: "-(hx + by) / (ax + by)", correct: true },
        { text: "hx + by", correct: false }
      ],
      explanation: "The derivative dy/dx for the given implicit equation is -(hx + by) / (ax + by)."
    },
    {
      question: "The derivative of f(x) = |x| at x = 0 is:",
      answers: [
        { text: "1", correct: false },
        { text: "0", correct: false },
        { text: "-1", correct: false },
        { text: "none of the above", correct: true }
      ],
      explanation: "The derivative of |x| at x = 0 does not exist because the left-hand and right-hand limits are different."
    },
    {
      question: "The value of ∫ logx dx is equal to:",
      answers: [
        { text: "x logx – x + c", correct: true },
        { text: "logx + x + c", correct: false },
        { text: "2 logx – x + c", correct: false },
        { text: "x²/2 logx – x + c", correct: false }
      ],
      explanation: "The integral of logx with respect to x is x logx – x + c."
    },
    {
      question: "∫ (3x² / (x⁶ + 1)) dx is:",
      answers: [
        { text: "x³ / (x² + 1) + c", correct: false },
        { text: "tan⁻¹(x³) + c", correct: true },
        { text: "sin⁻¹(x³) + c", correct: false },
        { text: "cos⁻¹(x³) + c", correct: false }
      ],
      explanation: "The integral ∫ (3x² / (x⁶ + 1)) dx evaluates to tan⁻¹(x³) + c."
    },
    {
      question: "The maximum value of f(x) = 5 + 4x – x² is:",
      answers: [
        { text: "3", correct: false },
        { text: "6", correct: true },
        { text: "5", correct: false },
        { text: "9", correct: false }
      ],
      explanation: "The maximum value of the quadratic function f(x) = 5 + 4x – x² is 6."
    },
    {
      question: "The solution of the equation dy/dx = (2x + 1) / (5y⁴ + 1) is:",
      answers: [
        { text: "x² + x – y⁵ – y = c", correct: false },
        { text: "2x² + x – 4y³ – y = c", correct: false },
        { text: "x² - x + y⁵ + y = c", correct: true },
        { text: "2x² - x + 4y³ + y = c", correct: false }
      ],
      explanation: "The solution of the differential equation dy/dx = (2x + 1) / (5y⁴ + 1) is x² - x + y⁵ + y = c."
    },
    {
      question: "The area of the ellipse x²/4 + y²/9 = 1 is:",
      answers: [
        { text: "2π", correct: false },
        { text: "4π", correct: false },
        { text: "6π", correct: true },
        { text: "8π", correct: false }
      ],
      explanation: "The area of the ellipse x²/4 + y²/9 = 1 is 6π."
    },
    {
      question: "If a⃗ = 2i⃗ + 3j⃗, then |2a⃗| is:",
      answers: [
        { text: "√13", correct: false },
        { text: "√26", correct: false },
        { text: "2√26", correct: true },
        { text: "2√13", correct: false }
      ],
      explanation: "The magnitude of 2a⃗ is 2√26."
    },
    {
      question: "(a⃗ - b⃗) × (a⃗ + b⃗) is equal to:",
      answers: [
        { text: "0", correct: false },
        { text: "a⃗ × b⃗", correct: false },
        { text: "2(b⃗ × a⃗)", correct: true },
        { text: "|a⃗|² + |b⃗|", correct: false }
      ],
      explanation: "(a⃗ - b⃗) × (a⃗ + b⃗) equals 2(b⃗ × a⃗) based on vector cross product properties."
    },
    {
      question: "The area of a parallelogram whose diagonals are (2, 3, -3) & (2, -3, 3) is:",
      answers: [
        { text: "6√2 sq. units", correct: true },
        { text: "12√2 sq. units", correct: false },
        { text: "6 sq. units", correct: false },
        { text: "12 sq. units", correct: false }
      ],
      explanation: "The area of a parallelogram with given diagonals is 6√2 square units."
    },
    {
      question: "The vectors (2, 1, -1) & (λ, -2, 2) are collinear if the value of λ is:",
      answers: [
        { text: "2", correct: false },
        { text: "4", correct: false },
        { text: "-4", correct: false },
        { text: "-2", correct: true }
      ],
      explanation: "The vectors are collinear if λ = -2."
    },
    {
      question: "If n(U) = 360, n(A) = 240, n(B) = 160, then max. value of n(A ∩ B) is:",
      answers: [
        { text: "360", correct: false },
        { text: "240", correct: true },
        { text: "160", correct: false },
        { text: "300", correct: false }
      ],
      explanation: "The maximum value of n(A ∩ B) is 240."
    },
    {
      question: "Which of the following is false?",
      answers: [
        { text: "|x + y| ≥ |x| + |y|", correct: true },
        { text: "|x − y| ≥ |x| − |y|", correct: false },
        { text: "|x| + |y| ≥ |x + y|", correct: false },
        { text: "None of the above", correct: false }
      ],
      explanation: "The statement |x + y| ≥ |x| + |y| is false because of the triangle inequality, which states that |x + y| ≤ |x| + |y|."
    },
    {
      question: "In how many ways can the letters of the word 'LEADER' be arranged?",
      answers: [
        { text: "360", correct: false },
        { text: "720", correct: false },
        { text: "144", correct: false },
        { text: "3600", correct: true }
      ],
      explanation: "The letters of the word 'LEADER' can be arranged in 3600 ways, calculated as 6! / (2!)."
    },
    {
      question: "If n is an integer, then the solution of |2x - 3| > 4 is:",
      answers: [
        { text: "x > 7/2 or x < -1/2", correct: true },
        { text: "x > 1/2 or x < -7/2", correct: false },
        { text: "-1/2 < x < 7/2", correct: false },
        { text: "-7/2 < x < 1/2", correct: false }
      ],
      explanation: "The inequality |2x - 3| > 4 splits into two inequalities: 2x - 3 > 4 or 2x - 3 < -4, leading to x > 7/2 or x < -1/2."
    },
    {
      question: "The value of the determinant of the matrix \n|1 2 3|\n|4 5 6|\n|7 8 9| is:",
      answers: [
        { text: "0", correct: true },
        { text: "1", correct: false },
        { text: "-1", correct: false },
        { text: "10", correct: false }
      ],
      explanation: "The value of the determinant of the given matrix is 0, as its rows are linearly dependent."
    },
    {
      question: "If A is a 3x3 matrix with |A| = 5, then |3A| is:",
      answers: [
        { text: "45", correct: false },
        { text: "135", correct: false },
        { text: "405", correct: true },
        { text: "15", correct: false }
      ],
      explanation: "If |A| = 5, then |3A| = 3^3 * |A| = 27 * 5 = 135."
    },
    {
      question: "If A = (sin θ -cos θ; cos θ sin θ), then AAT is:",
      answers: [
        { text: "I", correct: true },
        { text: "-I", correct: false },
        { text: "0", correct: false },
        { text: "None of the above", correct: false }
      ],
      explanation: "For A = (sin θ -cos θ; cos θ sin θ), AAT = I, where I is the identity matrix."
    },
    {
      question: "The value of the complex number (3 + 4i)(3 - 4i) is:",
      answers: [
        { text: "25", correct: true },
        { text: "7", correct: false },
        { text: "-7", correct: false },
        { text: "12", correct: false }
      ],
      explanation: "The product of (3 + 4i)(3 - 4i) is 3^2 - (4i)^2 = 9 + 16 = 25."
    },
    {
      question: "The multiplicative inverse of i is:",
      answers: [
        { text: "-i", correct: false },
        { text: "1", correct: false },
        { text: "-1/i", correct: false },
        { text: "-i/|i|²", correct: true }
      ],
      explanation: "The multiplicative inverse of i is 1/i, which simplifies to -i/|i|²."
    },
    {
      question: "The sum of the first n terms of the arithmetic series 2, 5, 8, ... is:",
      answers: [
        { text: "n/2 (3 + (n-1)3)", correct: false },
        { text: "n/2 (4 + (n-1)3)", correct: true },
        { text: "n/2 (5 + (n-1)3)", correct: false },
        { text: "n/2 (6 + (n-1)3)", correct: false }
      ],
      explanation: "The sum of the first n terms of the arithmetic series 2, 5, 8, ... is n/2 [2a + (n-1)d] where a=2 and d=3."
    },
    {
      question: "The roots of the quadratic equation x² + 4x + 4 = 0 are:",
      answers: [
        { text: "-2 and -2", correct: true },
        { text: "2 and 2", correct: false },
        { text: "0 and -4", correct: false },
        { text: "-4 and 0", correct: false }
      ],
      explanation: "The roots of the quadratic equation x² + 4x + 4 = 0 are -2 and -2."
    },
    {
      question: "The equation of the line passing through the point (1, 2) with a slope of 3 is:",
      answers: [
        { text: "y = 3x + 2", correct: false },
        { text: "y = 3x + 1", correct: false },
        { text: "y = 3x - 1", correct: true },
        { text: "y = 3x - 2", correct: false }
      ],
      explanation: "The equation of the line passing through (1, 2) with a slope of 3 is y = 3x - 1."
    },
    {
      question: "If x + 1/x = 3, then x² + 1/x² is equal to:",
      answers: [
        { text: "9", correct: false },
        { text: "7", correct: true },
        { text: "5", correct: false },
        { text: "3", correct: false }
      ],
      explanation: "If x + 1/x = 3, squaring both sides gives x² + 1/x² + 2 = 9, so x² + 1/x² = 7."
    },
    {
      question: "The roots of the equation x⁴ - 16 = 0 are:",
      answers: [
        { text: "2, -2, 4, -4", correct: false },
        { text: "2, -2, i, -i", correct: false },
        { text: "2, -2, 2i, -2i", correct: false },
        { text: "2, -2, 4i, -4i", correct: true }
      ],
      explanation: "The roots of the equation x⁴ - 16 = 0 are 2, -2, 4i, -4i."
    },
    {
      question: "If a polygon has 20 sides, the sum of its interior angles is:",
      answers: [
        { text: "3200°", correct: false },
        { text: "3240°", correct: false },
        { text: "3240", correct: false },
        { text: "3240°", correct: true }
      ],
      explanation: "The sum of the interior angles of a polygon with n sides is (n-2) × 180°, so for 20 sides it is 18 × 180° = 3240°."
    },
    {
      question: "If f(x) = x² + 2x, then f'(x) is:",
      answers: [
        { text: "2x", correct: false },
        { text: "2x + 2", correct: true },
        { text: "2x - 2", correct: false },
        { text: "2", correct: false }
      ],
      explanation: "The derivative f'(x) of the function f(x) = x² + 2x is 2x + 2."
    },
    {
      question: "The solution to the equation log₅(x - 1) = 3 is:",
      answers: [
        { text: "x = 126", correct: false },
        { text: "x = 126", correct: false },
        { text: "x = 126", correct: true },
        { text: "x = 625", correct: false }
      ],
      explanation: "The solution to the equation log₅(x - 1) = 3 is x = 126, since 5³ = 125 + 1 = 126."
    },
    
    {
      question: "A bottom of a pond or lake appears closer than it actually is, and seems to ripple. This 'bending' of light due to the water is defined as:",
      answers: [
        { text: "interference", correct: false },
        { text: "diffraction", correct: false },
        { text: "refraction", correct: true },
        { text: "reflection", correct: false }
      ],
      explanation: "The bending of light as it passes from one medium to another, causing objects to appear closer than they are, is called refraction."
    },
    {
      question: "A person can’t see objects clearly beyond 50cm. The power of the lens to correct the vision is:",
      answers: [
        { text: "+0.5D", correct: false },
        { text: "-0.5D", correct: false },
        { text: "+2D", correct: false },
        { text: "-2D", correct: true }
      ],
      explanation: "The power of a lens required to correct a near point of 50cm (0.5m) is calculated as P = 1/f, where f is the focal length in meters. Hence, P = 1/0.5 = 2D. Since it corrects for nearsightedness, it is negative."
    },
    {
      question: "White light is passed through a prism of angle 5°. If the refractive indices of the red and blue colors are 1.641 and 1.659 respectively, the angle of dispersion will be:",
      answers: [
        { text: "2°", correct: false },
        { text: "0.09°", correct: true },
        { text: "0.9°", correct: false },
        { text: "4°", correct: false }
      ],
      explanation: "The angle of dispersion is the difference in the angles of refraction for red and blue light, which is calculated using the refractive indices and the prism angle."
    },
    {
      question: "The dimensional formula for the Planck's constant is:",
      answers: [
        { text: "M1L2T-1", correct: true },
        { text: "ML2T-1", correct: false },
        { text: "M1L2T2", correct: false },
        { text: "M1L2T-1", correct: false }
      ],
      explanation: "The dimensional formula for Planck's constant, which relates energy and frequency, is M1L2T-1."
    },
    {
      question: "A stone is dropped from the top of the tower. If it covers 24.5m in the last second of its motion, the height of the tower is:",
      answers: [
        { text: "49m", correct: true },
        { text: "44.1m", correct: false },
        { text: "88.4m", correct: false },
        { text: "72m", correct: false }
      ],
      explanation: "Using the equations of motion under gravity, we can calculate the height of the tower given the distance covered in the last second."
    },
    {
      question: "If two masses of 4kg and 16kg are moving with equal kinetic energy, the ratio of their momentum will be:",
      answers: [
        { text: "1:4", correct: false },
        { text: "1:2", correct: true },
        { text: "4:1", correct: false },
        { text: "1:√2", correct: false }
      ],
      explanation: "Given equal kinetic energy, the momentum ratio p is inversely proportional to the square root of their masses, resulting in a 1:2 ratio."
    },
    {
      question: "Time period for a simple pendulum inside a satellite orbiting the earth is:",
      answers: [
        { text: "0", correct: true },
        { text: "infinite", correct: false },
        { text: "1 sec", correct: false },
        { text: "9.8 sec", correct: false }
      ],
      explanation: "In a satellite orbiting the Earth, effective gravity is zero, making the time period of a pendulum infinite."
    },
    {
      question: "A radius of the circular path of a particle is double but its frequency of rotation remains constant. If the initial centripetal force be F, then the final centripetal force will be:",
      answers: [
        { text: "F", correct: false },
        { text: "2F", correct: false },
        { text: "4F", correct: true },
        { text: "F/2", correct: false }
      ],
      explanation: "Centripetal force F = mω²r. Doubling the radius while keeping the frequency constant quadruples the centripetal force."
    },
    {
      question: "A sphere is rolling. The ratio of the rotational energy to total kinetic energy is given by:",
      answers: [
        { text: "7:10", correct: true },
        { text: "2:5", correct: false },
        { text: "10:7", correct: false },
        { text: "2:7", correct: false }
      ],
      explanation: "For a rolling sphere, the rotational energy is 2/5 of the total kinetic energy, resulting in a 7:10 ratio."
    },
    {
      question: "If the liquid doesn’t wet the solid surface, the angle of contact is:",
      answers: [
        { text: "acute", correct: false },
        { text: "obtuse", correct: true },
        { text: "90°", correct: false },
        { text: "0", correct: false }
      ],
      explanation: "If a liquid doesn’t wet the solid surface, the angle of contact is obtuse (>90°)."
    },
    {
      question: "If a wire of Young’s modulus Y, longitudinal strain X is produced, then the value of potential energy stored in its unit volume will be:",
      answers: [
        { text: "YX²", correct: true },
        { text: "2YX²", correct: false },
        { text: "0.5Y²X", correct: false },
        { text: "0.5YX²", correct: true }
      ],
      explanation: "The potential energy stored per unit volume in a strained wire is 0.5YX²."
    },
    {
      question: "1 gm of ice at 0° and 1 gm of steam at 100° are mixed. The resulting temp. is:",
      answers: [
        { text: "0°C", correct: true },
        { text: "230°C", correct: false },
        { text: "50°C", correct: false },
        { text: "100°C", correct: false }
      ],
      explanation: "The heat required to melt 1 gm of ice is equal to the heat released by condensing 1 gm of steam, resulting in 0°C."
    },
    {
      question: "A black body when it is hot emits heat radiation of:",
      answers: [
        { text: "IR wavelength", correct: false },
        { text: "UV wavelength", correct: false },
        { text: "Particular wavelength", correct: false },
        { text: "All wavelengths", correct: true }
      ],
      explanation: "A black body emits heat radiation across all wavelengths when hot."
    },
    {
      question: "A certain mass of gas at 273K is expanded to 81 times its volume under adiabatic condition. If γ=1.25 for the gas, then final temperature is:",
      answers: [
        { text: "0°C", correct: false },
        { text: "-91°C", correct: true },
        { text: "-182°C", correct: false },
        { text: "-235°C", correct: false }
      ],
      explanation: "Using the adiabatic expansion equation, the final temperature can be calculated to be -91°C."
    },
    {
      question: "The frequency of an organ pipe is f. If half part of the organ pipe is dipped into the water, its frequency will be:",
      answers: [
        { text: "f", correct: false },
        { text: "f/2", correct: true },
        { text: "2f", correct: false },
        { text: "f/4", correct: false }
      ],
      explanation: "Dipping half of the organ pipe in water effectively halves its length, doubling its frequency."
    },
    {
      question: "The minimum distance between the source and the reflector, so that an echo is heard is approx. equal to:",
      answers: [
        { text: "10m", correct: false },
        { text: "17m", correct: true },
        { text: "34m", correct: false },
        { text: "50m", correct: false }
      ],
      explanation: "The minimum distance for an echo is about 17 meters."
    },
    {
      question: "Bats detect the obstacles in their path by receiving the reflected ....... Waves:",
      answers: [
        { text: "Infrasonic", correct: false },
        { text: "radio", correct: false },
        { text: "ultrasonic", correct: true },
        { text: "electro-magnetic", correct: false }
      ],
      explanation: "Bats use ultrasonic waves to detect obstacles."
    },
    {
      question: "When the prongs of tuning fork are made thinner, frequency of vibration:",
      answers: [
        { text: "Increases", correct: true },
        { text: "decreases", correct: false },
        { text: "remains constant", correct: false },
        { text: "none of the above", correct: false }
      ],
      explanation: "Thinner prongs increase the frequency of a tuning fork."
    },
    {
      question: "The magnetic field lines inside a coil:",
      answers: [
        { text: "are straight", correct: false },
        { text: "point at the same direction", correct: false },
        { text: "all of above", correct: true },
        { text: "none of the above", correct: false }
      ],
      explanation: "Inside a coil, the magnetic field lines are straight and point in the same direction."
    },
    {
      question: "The electric or magnetic field can’t accelerate:",
      answers: [
        { text: "alpha particle", correct: false },
        { text: "beta particle", correct: false },
        { text: "protons", correct: false },
        { text: "neutrons", correct: true }
      ],
      explanation: "Neutrons are neutral particles and are not affected by electric or magnetic fields."
    },
    {
      question: "Charged particles enter a magnetic field at an angle of 45° with the magnetic field intensity. The path of the particle will be:",
      answers: [
        { text: "straight line", correct: false },
        { text: "a circle", correct: false },
        { text: "an ellipse", correct: false },
        { text: "a helix", correct: true }
      ],
      explanation: "When charged particles enter a magnetic field at an angle, they follow a helical path."
    },
    {
      question: "A toy train set has a resistance of 20.0Ω and uses a current of 250mA. If it ran for 1 hour, what is the power of the train?",
      answers: [
        { text: "1.2W", correct: true },
        { text: "2.2×10²W", correct: false },
        { text: "5.0W", correct: false },
        { text: "4.5×10³W", correct: false }
      ],
      explanation: "Power P = I²R = (0.25)² × 20 = 1.25W, approximated to 1.2W."
    },
    {
      question: "To give an electrically neutral object a positive charge, one must:",
      answers: [
        { text: "add electrons to it", correct: false },
        { text: "remove protons from it", correct: false },
        { text: "remove electrons from it", correct: true },
        { text: "add protons to it", correct: false }
      ],
      explanation: "Removing electrons from an electrically neutral object gives it a positive charge."
    },
    {
      question: "The terminal potential difference when the short circuit is:",
      answers: [
        { text: "E", correct: false },
        { text: "E/3", correct: false },
        { text: "E/2", correct: false },
        { text: "0", correct: true }
      ],
      explanation: "In a short circuit, the terminal potential difference drops to zero."
    },
    {
      question: "How many seconds will it take for 10.0 C of charge to pass through a 12.0 m circuit?",
      answers: [
        { text: "120s", correct: false },
        { text: "100s", correct: false },
        { text: "0.120s", correct: false },
        { text: "0.833s", correct: true }
      ],
      explanation: "Using I = Q/t, where I = V/R and Q = 10.0 C, we find t = 10 / (12.0/0.833) = 0.833s."
    },
    {
      question: "Which voltage source converts chemical energy to electrical energy?",
      answers: [
        { text: "Electrical generator", correct: false },
        { text: "Battery", correct: true },
        { text: "solar cell", correct: false },
        { text: "Electronic power supply", correct: false }
      ],
      explanation: "A battery converts chemical energy to electrical energy."
    },
    {
      question: "A particle of mass 5m at rest decays into two particles of masses 2m and 3m having non-zero velocities. The De Broglie wavelength of particle is:",
      answers: [
        { text: "3/2", correct: true },
        { text: "2/3", correct: false },
        { text: "1/3", correct: false },
        { text: "none of the above", correct: false }
      ],
      explanation: "Using conservation of momentum and De Broglie wavelength formula, we can find the wavelength ratio."
    },
    {
      question: "Which of the following digital logic gates are used to build a single transistor?",
      answers: [
        { text: "AND", correct: false },
        { text: "OR", correct: false },
        { text: "NOT", correct: true },
        { text: "NAND", correct: false }
      ],
      explanation: "A single transistor can be used to build a NOT gate."
    },
    {
      question: "Charge carrier in semiconductor is due to:",
      answers: [
        { text: "electrons and holes", correct: true },
        { text: "electrons only", correct: false },
        { text: "holes only", correct: false },
        { text: "none", correct: false }
      ],
      explanation: "In semiconductors, charge carriers are both electrons and holes."
    },
    {
      question: "Which of the photon of radius has the highest energy?",
      answers: [
        { text: "photon of blue light", correct: false },
        { text: "photon of red light", correct: false },
        { text: "photon of green light", correct: false },
        { text: "photon of violet light", correct: true }
      ],
      explanation: "Among the visible spectrum, violet light photons have the highest energy due to their shortest wavelength."
    },
    {
      question: "What is the formula of copper sulphate crystal?",
      answers: [
        { text: "CuSO4", correct: false },
        { text: "CuSO4.5H2O", correct: true },
        { text: "CuSO4.3H2O", correct: false },
        { text: "CuCO", correct: false }
      ],
      explanation: "The formula of copper sulphate crystal, commonly known as blue vitriol, is CuSO4.5H2O."
    },
    {
      question: "Which of these is both a Bronsted and Lewis acid?",
      answers: [
        { text: "BF3", correct: false },
        { text: "HCL", correct: false },
        { text: "HSO4-", correct: false },
        { text: "NH4+", correct: true }
      ],
      explanation: "NH4+ is both a Bronsted acid (proton donor) and a Lewis acid (electron pair acceptor)."
    },
    {
      question: "The reactive species present in Aqua-regia is:",
      answers: [
        { text: "nascent oxygen", correct: false },
        { text: "nascent hydrogen", correct: false },
        { text: "NO2", correct: false },
        { text: "nascent Cl", correct: true }
      ],
      explanation: "Aqua-regia contains nascent chlorine, which makes it a highly reactive mixture."
    },
    {
      question: "Which of these is the strongest reducing agent?",
      answers: [
        { text: "HF", correct: false },
        { text: "HCL", correct: false },
        { text: "HBr", correct: false },
        { text: "HI", correct: true }
      ],
      explanation: "HI is the strongest reducing agent among the given hydrogen halides due to the weakest bond strength."
    },
    {
      question: "Which of these is an ore of zinc?",
      answers: [
        { text: "siderite", correct: false },
        { text: "malachite", correct: false },
        { text: "franklinite", correct: true },
        { text: "tincal", correct: false }
      ],
      explanation: "Franklinite is a zinc ore, whereas siderite is an iron ore, malachite is a copper ore, and tincal is a boron ore."
    },
    {
      question: "The raw material used in the manufacture of sodium carbonate by Solvay’s process is:",
      answers: [
        { text: "NH3 and CO2", correct: false },
        { text: "NaCl and CO2", correct: false },
        { text: "NaCl, CaCO3 and CO2", correct: true },
        { text: "NaCl, CaCO2 and CO2", correct: false }
      ],
      explanation: "The Solvay process uses NaCl, CaCO3, and CO2 as raw materials to produce sodium carbonate."
    },
    {
      question: "The number(s) orbital in ‘d’ sub-shell is/are:",
      answers: [
        { text: "1", correct: false },
        { text: "2", correct: false },
        { text: "5", correct: true },
        { text: "4", correct: false }
      ],
      explanation: "The 'd' sub-shell contains 5 orbitals."
    },
    {
      question: "The types of bonds present in hydrogen peroxide are:",
      answers: [
        { text: "only covalent", correct: true },
        { text: "covalent & ionic", correct: false },
        { text: "covalent & co-ordinate", correct: false },
        { text: "none of the above", correct: false }
      ],
      explanation: "Hydrogen peroxide (H2O2) contains only covalent bonds between hydrogen and oxygen atoms."
    },
    {
      question: "Nitrous acid is:",
      answers: [
        { text: "reducing agent", correct: false },
        { text: "bleaching agent", correct: false },
        { text: "both a & b", correct: true },
        { text: "none of the above", correct: false }
      ],
      explanation: "Nitrous acid acts as both a reducing and bleaching agent."
    },
    {
      question: "Alkaline KMnO4 is called:",
      answers: [
        { text: "Hoffmann’s reagent", correct: false },
        { text: "Tollen’s reagent", correct: false },
        { text: "Bayer’s reagent", correct: true },
        { text: "group reagent", correct: false }
      ],
      explanation: "Alkaline KMnO4 is known as Bayer’s reagent."
    },
    {
      question: "Unsaturated hydrocarbons contain:",
      answers: [
        { text: "C-C multiple bond", correct: true },
        { text: "C-C single bond", correct: false },
        { text: "covalent bond", correct: false },
        { text: "homogeneous solution", correct: false }
      ],
      explanation: "Unsaturated hydrocarbons have one or more C-C multiple bonds (double or triple bonds)."
    },
    {
      question: "The correct IUPAC name of the compound with molecular formula (CH3)3C-CH3 is:",
      answers: [
        { text: "2, 3-dimethyl butane", correct: false },
        { text: "2, 2-dimethyl propane", correct: true },
        { text: "iso-propane", correct: false },
        { text: "trimethylpropane", correct: false }
      ],
      explanation: "The correct IUPAC name for (CH3)3C-CH3 is 2, 2-dimethyl propane."
    },
    {
      question: "An example of disaccharide is:",
      answers: [
        { text: "sucrose", correct: true },
        { text: "glucose", correct: false },
        { text: "fructose", correct: false },
        { text: "starch", correct: false }
      ],
      explanation: "Sucrose is a disaccharide, while glucose and fructose are monosaccharides, and starch is a polysaccharide."
    },
    {
      question: "Among the amines:",
      answers: [
        { text: "1°amine is most basic", correct: false },
        { text: "2°amine is most basic", correct: true },
        { text: "3°amine is most basic", correct: false },
        { text: "amines are not basic", correct: false }
      ],
      explanation: "2° amines are generally more basic than 1° and 3° amines due to their structure and electronic effects."
    },
    {
      question: "The mean speed of oxygen molecules in air at 25°C is:",
      answers: [
        { text: "482 ms-1", correct: true },
        { text: "444 ms-1", correct: false },
        { text: "14.0 ms-1", correct: false },
        { text: "129 ms-1", correct: false }
      ],
      explanation: "The mean speed of oxygen molecules in air at 25°C is approximately 482 ms-1."
    },
    {
      question: "0.2 gm of a metal gives 68.4 ml of hydrogen measured at NTP on treatment with dilute HCl. The equivalent weight of the metal is:",
      answers: [
        { text: "12", correct: false },
        { text: "32.78", correct: true },
        { text: "36", correct: false },
        { text: "53", correct: false }
      ],
      explanation: "Using the volume of hydrogen gas produced and stoichiometry, the equivalent weight of the metal is calculated to be 32.78."
    },
    {
      question: "The molality of 4% by weight of NaOH solution is:",
      answers: [
        { text: "0.104M", correct: false },
        { text: "0.402M", correct: true },
        { text: "1.04M", correct: false },
        { text: "4.01M", correct: false }
      ],
      explanation: "The molality of a 4% NaOH solution is 0.402M."
    },
    {
      question: "The amount of NaOH required to prepare N/10 solution of sodium hydroxide in 500ml volumetric flask is:",
      answers: [
        { text: "2 gm", correct: true },
        { text: "1 gm", correct: false },
        { text: "20 gm", correct: false },
        { text: "40 gm", correct: false }
      ],
      explanation: "To prepare an N/10 solution of NaOH in 500 ml, 2 gm of NaOH is required."
    },
    {
      question: "The correct order of acidic strength is:",
      answers: [
        { text: "HI>HBr>HCl>HF", correct: true },
        { text: "HI<HBr<HCl<HF", correct: false },
        { text: "HI>HBr=HCl>HF", correct: false },
        { text: "HI>HBr>HCl=HF", correct: false }
      ],
      explanation: "The correct order of acidic strength is HI > HBr > HCl > HF."
    },
    {
      question: "By the action of Cl2 on dry slaked lime:",
      answers: [
        { text: "Ca(ClO)2 and CaCl2", correct: true },
        { text: "Ca(ClO2)2 and CaCl2", correct: false },
        { text: "Ca(ClO2) and CaCl2", correct: false },
        { text: "Ca(ClO) and CaCl2", correct: false }
      ],
      explanation: "The action of Cl2 on dry slaked lime produces Ca(ClO)2 and CaCl2."
    },
    {
      question: "Read the following passage and tick the correct answer:The brain of the average human weighs approx. 14 kg and consists of three main parts cerebrum, thecerebellum and the brain stem. The cerebrum is by far the largest of the three parts, taking up 85% of thebrain by weight. The outside layer of the cerebrum, the cerebral cortex, is a grooved and bumpy surfacecovering the nerve cells beneath. The various sections of the cerebrum are the sensory cortex, which isresponsible for receiving and decoding sensory messages from throughout the body; the motor cortex,which sends action instructions to the skeletal muscles; and the association cortex, which receives,monitors, and processes information. It is in the association cortex that the processes that allow humans tothink take place. The cerebellum, located below the cerebrum in the back part of the skull, is the section ofthe brain that controls balance and posture. The brain steam connects the cerebrum and the spinal cord. It controls various body processes such as breathing and heartbeat.",
      answers: [
        { text: "cerebrum", correct: true },
        { text: "cerebellum", correct: false },
        { text: "cerebral cortex", correct: false },
        { text: "brain stem", correct: false }
      ],
      explanation: "The passage mentions that the cerebrum is the largest part of the brain, taking up 85% of its weight."
    },
    {
      question: "According to the passage, which part of the brain analyzes information?",
      answers: [
        { text: "The sensory cortex", correct: false },
        { text: "The association cortex", correct: true },
        { text: "the cerebellum", correct: false },
        { text: "the brain stem", correct: false }
      ],
      explanation: "The passage indicates that it is in the association cortex where processes allowing humans to think take place, which involves analyzing information."
    },
    {
      question: "What is the author’s main purpose of writing this paragraph?",
      answers: [
        { text: "to describe the function of the parts of the brain.", correct: false },
        { text: "to explain how the brain processes information.", correct: false },
        { text: "to demonstrate the physical composition of the brain.", correct: true },
        { text: "to give examples of human body functions.", correct: false }
      ],
      explanation: "The main purpose of the paragraph is to describe the physical composition of the brain, including its parts and their functions."
    },
    {
      question: "That’s very sad news. If ............ sooner, I would have tried to help.",
      answers: [
        { text: "I know", correct: false },
        { text: "I’ll know", correct: false },
        { text: "I knew", correct: true },
        { text: "I’d known", correct: false }
      ],
      explanation: "The correct answer is 'I knew,' which is the correct past perfect tense for the hypothetical situation presented."
    },
    {
      question: "I was in Nepal and ......",
      answers: [
        { text: "so were my parents", correct: true },
        { text: "were so my parents", correct: false },
        { text: "parents were also", correct: false },
        { text: "so my parents were", correct: false }
      ],
      explanation: "The correct answer is 'so were my parents,' which is the correct structure for indicating agreement."
    },
    {
      question: "We haven’t got ........ on holiday at the moment.",
      answers: [
        { text: "money enough to go", correct: false },
        { text: "enough money to go", correct: true },
        { text: "money enough for going", correct: false },
        { text: "enough money for going", correct: false }
      ],
      explanation: "The correct answer is 'enough money to go,' which is the correct structure for indicating sufficiency."
    },
    {
      question: "No sooner ...... one of the engines caught fire.",
      answers: [
        { text: "had we taken off when", correct: true },
        { text: "had we taken off than", correct: false },
        { text: "we had taken off when", correct: false },
        { text: "we had taken off", correct: false }
      ],
      explanation: "The correct answer is 'had we taken off when,' which follows the correct structure for expressing 'no sooner... than.'"
    },
    {
      question: "It was inevitable that women would be sent into space along with them.",
      answers: [
        { text: "unlikely", correct: false },
        { text: "influential", correct: false },
        { text: "fantastic", correct: false },
        { text: "unavoidable", correct: true }
      ],
      explanation: "The correct answer is 'unavoidable,' which means something that cannot be avoided or prevented."
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
      question: "Our flat is ........ the second floor of the building.",
      answers: [
        { text: "in", correct: false },
        { text: "at", correct: false },
        { text: "on", correct: true },
        { text: "to", correct: false }
      ],
      explanation: "The correct answer is 'on,' which indicates the location of the flat within the building."
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
  <h1 className="text-xl text-center">Mock Test 2078</h1>
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


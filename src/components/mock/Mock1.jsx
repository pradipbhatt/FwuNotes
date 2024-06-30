import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const quizData2077 = [
  // Define quiz data for 2077
  {
    question: "2077 Q.1) The value of tan 15° + cot 15° is:",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: true }
    ],
    explanation: "The correct value of tan 15° + cot 15° is 4."
  },
  {
    question: "2077 Q.2) The value of cot 5° · cot 10° · ... · cot 85° is:",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: true },
      { text: "-1", correct: false },
      { text: "1/2", correct: false }
    ],
    explanation: "The product of cot 5° · cot 10° · ... · cot 85° is 1."
  },
  {
    question: "2077 Q.3) The domain of sin⁻¹x is:",
    answers: [
      { text: "(-π, π)", correct: false },
      { text: "(-1, 1)", correct: false },
      { text: "(-π/2, π/2)", correct: false },
      { text: "[-π/2, π/2]", correct: true }
    ],
    explanation: "The domain of sin⁻¹x is [-π/2, π/2]."
  },
  {
    question: "2077 Q.4) If x + y + z = xyz, then the value of tan⁻¹x + tan⁻¹y + tan⁻¹z is:",
    answers: [
      { text: "π", correct: false },
      { text: "π/2", correct: true },
      { text: "π/3", correct: false },
      { text: "π/4", correct: false }
    ],
    explanation: "The sum of inverse tangents of x, y, and z is π/2."
  },
  {
    question: "2077 Q.5) In △ABC, if a = 4, b = 3, and A = 60°, then C is the root of the equation:",
    answers: [
      { text: "x² + 3x + 7 = 0", correct: false },
      { text: "x² - 3x - 7 = 0", correct: false },
      { text: "x² - 3x + 7 = 0", correct: false },
      { text: "x² + 3x - 7 = 0", correct: true }
    ],
    explanation: "Using the cosine rule, we can find the value of side c and then use it to find the value of angle C."
  },
  {
    question: "2077 Q.6) The value of sin A + sin B + sin C is:",
    answers: [
      { text: "S/r", correct: true },
      { text: "R/s", correct: false },
      { text: "r/S", correct: false },
      { text: "S/R", correct: false }
    ],
    explanation: "In a triangle, the sum of sines of angles is equal to the radius of the circumcircle."
  },
  {
    question: "2077 Q.7) The equation sin x + cos x is:",
    answers: [
      { text: "Unique solution", correct: false },
      { text: "No solution", correct: false },
      { text: "Finite solution", correct: false },
      { text: "Infinite solution", correct: true }
    ],
    explanation: "The equation sin x + cos x has infinitely many solutions."
  },
  {
    question: "2077 Q.8) If tan θ + tan 2θ + tan 3θ = tan θ tan 2θ tan 3θ, then the general value of θ is:",
    answers: [
      { text: "nπ + π/2", correct: false },
      { text: "nπ/6", correct: false },
      { text: "2nπ + -π/4", correct: false },
      { text: "nπ + - (-1)ⁿ π/6", correct: true }
    ],
    explanation: "The given equation holds true for the general value of θ as nπ + - (-1)ⁿ π/6."
  },
  {
    question: "2077 Q.9) A is a square matrix of order 3 and det(A) = 4, then |adj A| =:",
    answers: [
      { text: "12", correct: false },
      { text: "20", correct: false },
      { text: "8", correct: false },
      { text: "16", correct: true }
    ],
    explanation: "The determinant of the adjugate matrix of A is equal to the square of the determinant of A."
  },
  {
    question: "2077 Q.10) The sum of infinity of the series 1 + 4/5 + 7/5 + 10/5 + ... is:",
    answers: [
      { text: "16/7", correct: true },
      { text: "25/9", correct: false },
      { text: "35/16", correct: false },
      { text: "50/16", correct: false }
    ],
    explanation: "The sum of the infinite series 1 + 4/5 + 7/5 + 10/5 + ... is 16/7."
  },
  {
    question: "2077 Q.11) The number of committee of 5 members that can be selected from 6 men and 5 ladies consisting of 3 men and 2 ladies can be formed in:",
    answers: [
      { text: "220 ways", correct: false },
      { text: "540 ways", correct: false },
      { text: "315 ways", correct: true },
      { text: "240 ways", correct: false }
    ],
    explanation: "The number of committees of 5 members selected from 6 men and 5 ladies, including 3 men and 2 ladies, is 315 ways.",
  },  
   {
    question: "2077 Q.12) The sum of the series 1/2! + 1/4! + 1/6! + ... is:",
    answers: [
      { text: "e² - 1/2e", correct: true },
      { text: "e² - 1/2", correct: false },
      { text: "e² - 1", correct: false },
      { text: "2e - 1", correct: false }
    ],
    explanation: "The sum of the series 1/2! + 1/4! + 1/6! + ... is e² - 1/2e."
  },

{
  question: "2077 Q.13) In a GP, the 8th term is 192 and the 10th term is 768. The 12th term of the GP is:",
  answers: [
    { text: "3072", correct: false },
    { text: "3456", correct: true },
    { text: "3840", correct: false },
    { text: "4096", correct: false }
  ],
  explanation: "Given the 8th term is 192 and the 10th term is 768, we can find the common ratio and then calculate the 12th term."
},
{
  question: "2077 Q.14) The sum of the series 1 + 2 + 3 + ... + n is:",
  answers: [
    { text: "n(n+1)/2", correct: true },
    { text: "n(n-1)/2", correct: false },
    { text: "n(n+1)/3", correct: false },
    { text: "n(n-1)/3", correct: false }
  ],
  explanation: "The sum of the series 1 + 2 + 3 + ... + n is given by the formula n(n+1)/2."
},
{
  question: "2077 Q.15) The sum of the series 1/2 + 3/8 + 7/16 + ... is:",
  answers: [
    { text: "1/3", correct: false },
    { text: "3/4", correct: false },
    { text: "2/3", correct: true },
    { text: "3/2", correct: false }
  ],
  explanation: "The sum of the series 1/2 + 3/8 + 7/16 + ... is 2/3."
},
{
  question: "2077 Q.16) If nC₂ : nC₃ = 2 : 3, then the value of n is:",
  answers: [
    { text: "5", correct: false },
    { text: "6", correct: true },
    { text: "7", correct: false },
    { text: "8", correct: false }
  ],
  explanation: "Given nC₂ : nC₃ = 2 : 3, we can solve for n."
},
{
  question: "2077 Q.17) The value of (1 + 1/n)ⁿ as n approaches infinity is:",
  answers: [
    { text: "0", correct: false },
    { text: "1", correct: true },
    { text: "e", correct: false },
    { text: "2", correct: false }
  ],
  explanation: "As n approaches infinity, (1 + 1/n)ⁿ approaches e, so the value is 1."
},
{
  question: "2077 Q.18) The sum of the first n terms of the series 4 + 7 + 10 + ... is:",
  answers: [
    { text: "3n", correct: false },
    { text: "3n + 1", correct: true },
    { text: "3n - 1", correct: false },
    { text: "4n", correct: false }
  ],
  explanation: "The common difference of the series is 3. So, the sum of the first n terms is given by (first term + last term) * n / 2."
},
{
  question: "2077 Q.19) If 4x - 3y = 7 and 3x + 5y = 19, then the value of x - y is:",
  answers: [
    { text: "5", correct: false },
    { text: "2", correct: false },
    { text: "4", correct: true },
    { text: "-4", correct: false }
  ],
  explanation: "Solve the given system of equations to find the value of x and y, then calculate x - y."
},
{
  question: "2077 Q.20) The area of the triangle formed by the lines x/a + y/b = 1, x/b + y/c = 1, and x/c + y/a = 1 is:",
  answers: [
    { text: "abc", correct: true },
    { text: "a + b + c", correct: false },
    { text: "a² + b² + c²", correct: false },
    { text: "1", correct: false }
  ],
  explanation: "The area of the triangle formed by the lines given by the equation Ax + By + C = 0 is |AC - AB - BC| / 2."
},
{
  question: "2077 Q.21) The ratio in which the line joining the points (a, 0) and (0, b) is divided by the x-axis is:",
  answers: [
    { text: "b : a", correct: false },
    { text: "a : b", correct: true },
    { text: "a² : b²", correct: false },
    { text: "b² : a²", correct: false }
  ],
  explanation: "The line joining the points (a, 0) and (0, b) divides the x-axis in the ratio of -b : a."
},
{
  question: "2077 Q.22) The distance between the points (a, b) and (c, d) is:",
  answers: [
    { text: "√(a² + b²)", correct: false },
    { text: "√((c-a)² + (d-b)²)", correct: true },
    { text: "|a-c| + |b-d|", correct: false },
    { text: "√(c² + d²)", correct: false }
  ],
  explanation: "The distance between two points (x₁, y₁) and (x₂, y₂) is given by √((x₂-x₁)² + (y₂-y₁)²)."
},

{
    question: "2077 Q.23) The points (3, -4), (0, 0), and (-3, 4) are:",
    answers: [
      { text: "Collinear", correct: true },
      { text: "Non-collinear", correct: false },
      { text: "Coplanar", correct: false },
      { text: "non-coplanar", correct: false }
],
explanation: "The points (3, -4), (0, 0), and (-3, 4) lie on the same line, hence they are collinear."
},

{
    question: "2077 Q.24) The equation of the line passing through the points (2, 3) and (4, 5) is:",
    answers: [
    { text: "2x - y = 1", correct: false },
    { text: "x - 2y = -1", correct: false },
    { text: "2x - y = -1", correct: true },
    { text: "x - 2y = 1", correct: false }
    ],
    explanation: "The equation of a line passing through two points (x₁, y₁) and (x₂, y₂) is given by (y - y₁) / (y₂ - y₁) = (x - x₁) / (x₂ - x₁)."
    },
    {
    question: "2077 Q.25) The area of the quadrilateral whose vertices are A(0, 0), B(4, 0), C(4, 3), and D(0, 3) is:",
    answers: [
    { text: "12 sq. units", correct: true },
    { text: "6 sq. units", correct: false },
    { text: "9 sq. units", correct: false },
    { text: "8 sq. units", correct: false }
    ],
    explanation: "The area of a quadrilateral with vertices (x₁, y₁), (x₂, y₂), (x₃, y₃), and (x₄, y₄) is given by |x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂) + x₄(y₁-y₃)| / 2."
    },
    {
    question: "2077 Q.26) If A(2, 1), B(5, 3), and C(7, 5) are the vertices of a triangle, then the triangle is:",
    answers: [
    { text: "Scalene", correct: false },
    { text: "Isosceles", correct: false },
    { text: "Equilateral", correct: false },
    { text: "Right-angled", correct: true }
    ],
    explanation: "To determine if the triangle is right-angled, check if the sum of the squares of the lengths of two sides is equal to the square of the length of the third side."
    },
    {
    question: "2077 Q.27) If the coordinates of the mid-point of the sides of a triangle are (1, 2), (3, 4), and (5, 6), then the coordinates of its centroid are:",
    answers: [
    { text: "(3, 4)", correct: true },
    { text: "(2, 3)", correct: false },
    { text: "(4, 5)", correct: false },
    { text: "(1, 2)", correct: false }
    ],
    explanation: "The centroid divides each median of the triangle in the ratio 2:1. Hence, the coordinates of the centroid are the averages of the coordinates of the vertices."
    },
    {
    question: "2077 Q.28) If A(2, -1), B(3, 2), and C(-1, 1) are the vertices of a triangle, then the length of the median through A is:",
    answers: [
    { text: "√13", correct: false },
    { text: "√17", correct: false },
    { text: "√10", correct: true },
    { text: "√5", correct: false }
    ],
    explanation: "The length of the median through A is the distance between the midpoint of BC and A, which can be found using the distance formula."
    },
    {
    question: "2077 Q.29) If A(2, 3), B(-1, 2), and C(4, -1) are the vertices of a triangle, then the triangle is:",
    answers: [
    { text: "Equilateral", correct: false },
    { text: "Isosceles", correct: true },
    { text: "Scalene", correct: false },
    { text: "Right-angled", correct: false }
    ],
    explanation: "Check if the lengths of any two sides of the triangle are equal to determine if it is isosceles."
    },
    {
    question: "2077 Q.30) The length of the perpendicular drawn from the point (1, 2, 3) on the x-axis is:",
    answers: [
    { text: "1", correct: true },
    { text: "2", correct: false },
    { text: "3", correct: false },
    { text: "√14", correct: false }
    ],
    explanation: "The distance between a point (x, y, z) and the x-axis is the absolute value of the x-coordinate."
    },
    {
    question: "2077 Q.31) The equation of the line passing through the points (1, 2, -3) and (4, 7, 2) is:",
    answers: [
    { text: "2x + y - 5z - 7 = 0", correct: false },
    { text: "2x - y - 5z + 7 = 0", correct: true },
    { text: "2x - y - 5z - 7 = 0", correct: false },
    { text: "2x + y - 5z + 7 = 0", correct: false }
    ],
    explanation: "The equation of a line passing through two points (x₁, y₁, z₁) and (x₂, y₂, z₂) is obtained using vector form."
    },
    {
    question: "2077 Q.32) The centroid of a triangle is the point of intersection of its:",
    answers: [
    { text: "Medians", correct: true },
    { text: "Altitudes", correct: false },
    { text: "Perpendicular bisectors", correct: false },
    { text: "Angle bisectors", correct: false }
    ],
    explanation: "The centroid of a triangle is the point of intersection of its medians."
    },
    {
        question: "2077 Q.33) The equation of the line perpendicular to the plane 2x - 3y + z = 7 and passing through the point (-1, 2, 1) is:",
        answers: [
          { text: "2x - 3y + z + 7 = 0", correct: false },
          { text: "2x - 3y + z - 7 = 0", correct: true },
          { text: "2x + 3y - z + 7 = 0", correct: false },
          { text: "2x + 3y - z - 7 = 0", correct: false }
        ],
        explanation: "The equation of a line perpendicular to a plane passing through a given point can be found using the normal vector of the plane."
      },
      {
        question: "2077 Q.34) The acute angle between the lines 3x + 4y - 5 = 0 and 4x - 3y - 7 = 0 is:",
        answers: [
          { text: "45°", correct: false },
          { text: "60°", correct: false },
          { text: "75°", correct: false },
          { text: "30°", correct: true }
        ],
        explanation: "The acute angle between two lines with slopes 𝑚1​ and 𝑚2​ is given by tan⁡−1∣𝑚2​−𝑚1​∣1+m1​⋅m2​​."
      },
      {
        question: "2077 Q.35) The angle between the lines 2x + 3y = 5 and 3x - 2y = 7 is:",
        answers: [
          { text: "45°", correct: false },
          { text: "60°", correct: false },
          { text: "75°", correct: true },
          { text: "30°", correct: false }
        ],
        explanation: "The angle between two lines with slopes 𝑚1​ and 𝑚2​ is given by tan⁡−1∣𝑚2​−𝑚1​∣1+m1​⋅m2​​."
      },
      {
        question: "2077 Q.36) If the lines 3x - 4y = 7 and 6x - 8y = 14 are coincident, then the value of k is:",
        answers: [
          { text: "0", correct: false },
          { text: "1", correct: true },
          { text: "2", correct: false },
          { text: "3", correct: false }
        ],
        explanation: "Two lines are coincident if their equations are proportional. So, 𝑘=36=48=1."
      },
      {
        question: "2077 Q.37) The equation of the line passing through the points (1, 2, 3) and (3, 4, 5) is:",
        answers: [
          { text: "2x - y - z - 1 = 0", correct: false },
          { text: "2x - y - z + 1 = 0", correct: false },
          { text: "2x - y - z - 2 = 0", correct: false },
          { text: "2x - y - z + 2 = 0", correct: true }
        ],
        explanation: "The equation of a line passing through two points (𝑥1​,𝑦1​,𝑧1​) and (𝑥2​,𝑦2​,𝑧2​) is obtained using vector form."
      },
      {
        question: "2077 Q.38) The value of a for which the lines 2x + y - 3 = 0 and 4x + ay - 1 = 0 are parallel is:",
        answers: [
          { text: "-3", correct: false },
          { text: "1", correct: false },
          { text: "2", correct: true },
          { text: "3", correct: false }
        ],
        explanation: "Two lines are parallel if their slopes are equal. So, for 2=4a, a=12​."
      },
      {
        question: "2077 Q.39) The equation of the line parallel to the y-axis and passing through the point (4, -2) is:",
        answers: [
          { text: "x = 4", correct: true },
          { text: "y = 4", correct: false },
          { text: "x = -4", correct: false },
          { text: "y = -4", correct: false }
        ],
        explanation: "A line parallel to the y-axis has the equation of the form 𝑥=𝑐, where 𝑐 is a constant. Since it passes through (4,-2), the equation is 𝑥=4."
      },
      {
        question: "2077 Q.40) The equation of the line parallel to the x-axis and passing through the point (-3, 5) is:",
        answers: [
          { text: "x = 5", correct: false },
          { text: "y = 5", correct: true },
          { text: "x = -3", correct: false },
          { text: "y = -3", correct: false }
        ],
        explanation: "A line parallel to the x-axis has the equation of the form 𝑦=𝑐, where 𝑐 is a constant. Since it passes through (-3,5), the equation is 𝑦=5."
      },
      {
        question: "2077 Q.41) The distance between the skew lines 𝑥−1/2=𝑦+1/3=𝑧−1/4 and 𝑥+2=𝑦−1=𝑧+2 is:",
        answers: [
          { text: "1", correct: false },
          { text: "2", correct: true },
          { text: "3", correct: false },
          { text: "4", correct: false }
        ],
        explanation: "The distance between two skew lines is the shortest distance between them, which can be found using vector and scalar product."
      },
      {
        question: "2077 Q.42) If the lines 𝑥−1/2=𝑦+1/3=𝑧−1/4 and 𝑥+2=𝑦−1=𝑧+2 are parallel, then the value of k is:",
        answers: [
          { text: "1/4", correct: false },
          { text: "1/3", correct: true },
          { text: "1/2", correct: false },
          { text: "1", correct: false }
        ],
        explanation: "Two lines are parallel if their direction ratios are proportional. So, (k = 2/1 = 3/2)."
      },


      {
        "question": "2077 Q.43) If the lines 2x - y + z = 4 and 4x - 2y + 2z = k are perpendicular, then the value of k is:",
        "answers": [
          {"text": "4", "correct": true},
          {"text": "8", "correct": false},
          {"text": "16", "correct": false},
          {"text": "12", "correct": false}
        ],
        "explanation": "Two lines are perpendicular if the dot product of their direction ratios is zero. So, for 2⋅4+(−1)⋅(−2)+1⋅2=0, k = 8."
      },
      {
        "question": "2077 Q.44) The distance between the lines 3x + 4y - 5 = 0 and 4x - 3y - 7 = 0 is:",
        "answers": [
          {"text": "2√6", "correct": false},
          {"text": "2√5", "correct": false},
          {"text": "2√13", "correct": true},
          {"text": "2√10", "correct": false}
        ],
        "explanation": "The distance between two parallel lines ax + by + c = 0 and dx + ey + f = 0 is given by |f2 - f1|/√(a^2 + b^2). Therefore, for |(-7) - (-5)|√(4^2 + (-3)^2) = 2√13."
      },
      {
        "question": "2077 Q.45) The acute angle between the lines 3x + 4y - 5 = 0 and 4x - 3y - 7 = 0 is:",
        "answers": [
          {"text": "45°", "correct": false},
          {"text": "60°", "correct": false},
          {"text": "75°", "correct": false},
          {"text": "30°", "correct": true}
        ],
        "explanation": "The acute angle between two lines with slopes m1 and m2 is given by arctan(|(m2 - m1)/(1 + m1 * m2)|)."
      },
      {
        "question": "2077 Q.46) The angle between the lines 2x + 3y = 5 and 3x - 2y = 7 is:",
        "answers": [
          {"text": "45°", "correct": false},
          {"text": "60°", "correct": false},
          {"text": "75°", "correct": true},
          {"text": "30°", "correct": false}
        ],
        "explanation": "The angle between two lines with slopes m1 and m2 is given by arctan(|(m2 - m1)/(1 + m1 * m2)|)."
      },
      {
        "question": "2077 Q.47) If the lines 3x - 4y = 7 and 6x - 8y = 14 are coincident, then the value of k is:",
        "answers": [
          {"text": "0", "correct": false},
          {"text": "1", "correct": true},
          {"text": "2", "correct": false},
          {"text": "3", "correct": false}
        ],
        "explanation": "Two lines are coincident if their equations are proportional. So, k = 3/6 = 4/8 = 1."
      },
      {
        "question": "2077 Q.48) The equation of the line passing through the points (1, 2, 3) and (3, 4, 5) is:",
        "answers": [
          {"text": "2x - y - z - 1 = 0", "correct": false},
          {"text": "2x - y - z + 1 = 0", "correct": false},
          {"text": "2x - y - z - 2 = 0", "correct": false},
          {"text": "2x - y - z + 2 = 0", "correct": true}
        ],
        "explanation": "The equation of a line passing through two points (x1, y1, z1) and (x2, y2, z2) is obtained using vector form."
      },
      {
        "question": "2077 Q.49) The value of a for which the lines 2x + y - 3 = 0 and 4x + ay - 1 = 0 are parallel is:",
        "answers": [
          {"text": "-3", "correct": false},
          {"text": "1", "correct": false},
          {"text": "2", "correct": true},
          {"text": "3", "correct": false}
        ],
        "explanation": "Two lines are parallel if their slopes are equal. So, for 2 = 4a, a = 1/2."
      },
      {
        "question": "2077 Q.50) The equation of the line parallel to the y-axis and passing through the point (4, -2) is:",
        "answers": [
          {"text": "x = 4", "correct": true},
          {"text": "y = 4", "correct": false},
          {"text": "x = -4", "correct": false},
          {"text": "y = -4", "correct": false}
        ],
        "explanation": "A line parallel to the y-axis has the equation of the form x = c, where c is a constant. Since it passes through (4, -2), the equation is x = 4."
      },
      {
        "question": "2077 Q.51) The equation of the line parallel to the x-axis and passing through the point (-3, 5) is:",
        "answers": [
          {"text": "x = 5", "correct": false},
          {"text": "y = 5", "correct": true},
          {"text": "x = -3", "correct": false},
          {"text": "y = -3", "correct": false}
        ],
        "explanation": "A line parallel to the x-axis has the equation of the form y = c, where c is a constant. Since it passes through (-3, 5), the equation is y = 5."
      },
      {
        "question": "2077 Q.52) The distance between the skew lines \(x - \\frac{1}{2} = y + \\frac{1}{3} = z - \\frac{1}{4}\) and \(x + 2 = y - 1 = z + 2\) is:",
        "answers": [
          {"text": "1", "correct": false},
          {"text": "2", "correct": true},
          {"text": "3", "correct": false},
          {"text": "4", "correct": false}
        ],
        "explanation": "The distance between two skew lines is the shortest distance between them, which can be found using vector and scalar product."
      },
      {
        "question": "2077 Q.53) If the lines \(x - \\frac{1}{2} = y + \\frac{1}{3} = z - \\frac{1}{4}\) and \(x + 2 = y - 1 = z + 2\) are parallel, then the value of \(k\) is:",
        "answers": [
          {"text": "\\frac{1}{4}", "correct": false},
          {"text": "\\frac{1}{3}", "correct": true},
          {"text": "\\frac{1}{2}", "correct": false},
          {"text": "1", "correct": false}
        ],
        "explanation": "Two lines are parallel if their direction ratios are proportional. So, \\(k = \\frac{2}{1} = \\frac{3}{2}\\)."
      },
      {
        "question": "2077 Q.54) If the lines \(x - \\frac{1}{2} = y + \\frac{1}{3} = z - \\frac{1}{4}\) and \(x + 2 = y - 1 = z + 2\) are perpendicular, then the value of \(k\) is:",
        "answers": [
          {"text": "\\frac{1}{2}", "correct": false},
          {"text": "1", "correct": false},
          {"text": "\\frac{3}{2}", "correct": true},
          {"text": "2", "correct": false}
        ],
        "explanation": "Two lines are perpendicular if the dot product of their direction ratios is zero. So, for 1⋅1+1⋅(−1)+1⋅1=0, \\(k = \\frac{3}{2}\\)."
      },
      {
        "question": "2077 Q.55) The equation of the line passing through the intersection of the lines \(x + y = 2\) and \(2x - y = 1\) and perpendicular to the line \(x - y = 0\) is:",
        "answers": [
          {"text": "x - y = 0", "correct": false},
          {"text": "x + y = 0", "correct": false},
          {"text": "x - y = 1", "correct": false},
          {"text": "x + y = 1", "correct": true}
        ],
        "explanation": "The line passing through the intersection of the given lines and perpendicular to \(x - y = 0\) will have a slope equal to the negative reciprocal of the slope of \(x - y = 0\). The intersection point of \(x + y = 2\) and \(2x - y = 1\) is \((1, 1)\), so the equation of the line passing through this point and perpendicular to \(x - y = 0\) is \(x + y = 1\)."
      },
      {
        "question": "2077 Q.56) The equation of the line passing through the intersection of the lines \(x + y - 1 = 0\) and \(2x - y - 1 = 0\) and perpendicular to the line \(x + 2y = 3\) is:",
        "answers": [
          {"text": "x + y - 1 = 0", "correct": false},
          {"text": "x - y - 1 = 0", "correct": false},
          {"text": "x + y - 3 = 0", "correct": false},
          {"text": "x - y - 3 = 0", "correct": true}
        ],
        "explanation": "The line passing through the intersection of the given lines and perpendicular to \(x + 2y = 3\) will have a slope equal to the negative reciprocal of the slope of \(x + 2y = 3\). The intersection point of \(x + y - 1 = 0\) and \(2x - y - 1 = 0\) is \((1, 0)\), so the equation of the line passing through this point and perpendicular to \(x + 2y = 3\) is \(x - y - 3 = 0\)."
      },
      {
        "question": "2077 Q.57) The equation of the line passing through the intersection of the lines \(x - 2y + 1 = 0\) and \(2x - y - 1 = 0\) and perpendicular to the line \(x + y - 1 = 0\) is:",
        "answers": [
          {"text": "x - 2y - 1 = 0", "correct": false},
          {"text": "x - 2y - 3 = 0", "correct": true},
          {"text": "x + 2y - 1 = 0", "correct": false},
          {"text": "x + 2y - 3 = 0", "correct": false}
        ],
        "explanation": "The line passing through the intersection of the given lines and perpendicular to \(x + y - 1 = 0\) will have a slope equal to the negative reciprocal of the slope of \(x + y - 1 = 0\). The intersection point of \(x - 2y + 1 = 0\) and \(2x - y - 1 = 0\) is \((1, 0)\), so the equation of the line passing through this point and perpendicular to \(x + y - 1 = 0\) is \(x - 2y - 3 = 0\)."
      },
      {
        "question": "2077 Q.58) If the lines \(x - y = 2\), \(2x - 3y + 4 = 0\), and \(3x - 2y + k = 0\) are concurrent, then the value of k is:",
        "answers": [
          {"text": "1", "correct": true},
          {"text": "2", "correct": false},
          {"text": "3", "correct": false},
          {"text": "4", "correct": false}
        ],
        "explanation": "Three lines are concurrent if they intersect at a single point. So, the point of concurrency must satisfy the equations of all three lines. By solving the equations \(x - y = 2\), \(2x - 3y + 4 = 0\), and \(3x - 2y + k = 0\), we find that \(k = 1\)."
      },

      {
        "question": "2077 Q.59) The equation of the line perpendicular to 3x - 4y - 7 = 0 and passing through the point (1, -2) is:",
        "answers": [
          {"text": "3x - 4y -7 = 0", "correct": false},
          {"text": "4x + 3y - 5 = 0", "correct": true},
          {"text": "3x + 4y - 5 = 0", "correct": false},
          {"text": "4x - 3y - 7 = 0", "correct": false}
        ],
        "explanation": "The equation of a line perpendicular to \(ax + by + c = 0\) is of the form \(bx - ay + d = 0\), and it passes through the point \((x_1, y_1)\) if \(bx_1 - ay_1 + d = 0\). Substituting \((1, -2)\) into the equation \(bx - ay + d = 0\) gives \(4(1) + 3(-2) - 5 = 0\), so the equation of the line is \(4x + 3y - 5 = 0\)."
      },
      {
        "question": "2077 Q.60) The equation of the line parallel to 2x + 3y - 4 = 0 and passing through the midpoint of the segment joining the points (3, 2) and (-1, 4) is:",
        "answers": [
          {"text": "2x + 3y - 5 = 0", "correct": false},
          {"text": "2x + 3y + 5 = 0", "correct": false},
          {"text": "2x + 3y - 7 = 0", "correct": true},
          {"text": "2x + 3y + 7 = 0", "correct": false}
        ],
        "explanation": "The midpoint of the segment joining the points \((x_1, y_1)\) and \((x_2, y_2)\) is given by \(\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)\). For the points \((3, 2)\) and \((-1, 4)\), the midpoint is \(\left(\frac{3 - 1}{2}, \frac{2 + 4}{2}\right) = (1, 3)\). So, the line passing through this point and parallel to \(2x + 3y - 4 = 0\) has the equation \(2(1) + 3(3) - 7 = 0\), which simplifies to \(2x + 3y - 7 = 0\)."
      }
  // Add more quiz data as needed
];

const Mock1 = () => {
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
            <div className="text-center">
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
              <div className="mb-4 mt-10">
              <h1 className="text-xl mb-3 text-center">Far Western University</h1>
  <h1 className="text-2xl text-center">School of Engineering</h1>
  <h1 className="text-xl text-center">Mock Test 2079 A</h1>
                <h5 className="text-xl mb-2">
                  Question {currentQuestion + 1}/{quizData2077.length}
                </h5>
                <p className="text-base mb-2">
                  {quizData2077[currentQuestion].question}
                </p>
                <p className="text-sm text-red-600">
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
                  className="bg-orange-800 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  className="bg-orange-800 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
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

export default Mock1;


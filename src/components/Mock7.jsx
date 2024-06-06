import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const quizData2077 = [ // Define quiz data for 2077
    {
        "question": "What is the derivative of sin(x)?",
        "answers": [
          { "text": "cos(x)", "correct": true },
          { "text": "sin(x)", "correct": false },
          { "text": "-cos(x)", "correct": false },
          { "text": "-sin(x)", "correct": false }
        ],
        "explanation": "The derivative of sin(x) is cos(x)."
      },
      {
        "question": "Solve the equation: 2x + 3 = 7.",
        "answers": [
          { "text": "x = 1", "correct": false },
          { "text": "x = 2", "correct": true },
          { "text": "x = 3", "correct": false },
          { "text": "x = 4", "correct": false }
        ],
        "explanation": "Subtracting 3 from both sides gives 2x = 4, and dividing by 2 gives x = 2."
      },
      {
        "question": "If f(x) = x², what is f'(x)?",
        "answers": [
          { "text": "2x", "correct": true },
          { "text": "x", "correct": false },
          { "text": "x²", "correct": false },
          { "text": "1", "correct": false }
        ],
        "explanation": "The derivative of x² is 2x."
      },
      {
        "question": "Find the integral of 1/x dx.",
        "answers": [
          { "text": "ln|x| + C", "correct": true },
          { "text": "1/x + C", "correct": false },
          { "text": "x + C", "correct": false },
          { "text": "ln(x) + C", "correct": false }
        ],
        "explanation": "The integral of 1/x dx is ln|x| + C."
      },
      {
        "question": "What is the value of π?",
        "answers": [
          { "text": "3.14", "correct": true },
          { "text": "2.71", "correct": false },
          { "text": "1.62", "correct": false },
          { "text": "1.41", "correct": false }
        ],
        "explanation": "The value of π is approximately 3.14."
      },
      {
        "question": "What is the limit of (1 + 1/n)^n as n approaches infinity?",
        "answers": [
          { "text": "e", "correct": true },
          { "text": "1", "correct": false },
          { "text": "∞", "correct": false },
          { "text": "0", "correct": false }
        ],
        "explanation": "The limit of (1 + 1/n)^n as n approaches infinity is e."
      },
      {
        "question": "What is the quadratic formula?",
        "answers": [
          { "text": "(-b ± √(b²-4ac))/(2a)", "correct": true },
          { "text": "(b ± √(b²-4ac))/2a", "correct": false },
          { "text": "(-b ± 2√(b²-4ac))/(2a)", "correct": false },
          { "text": "(b ± 2√(b²-4ac))/(2a)", "correct": false }
        ],
        "explanation": "The quadratic formula is (-b ± √(b²-4ac))/(2a)."
      },
      {
        "question": "Solve for x: x² - 4 = 0.",
        "answers": [
          { "text": "x = ±2", "correct": true },
          { "text": "x = 2", "correct": false },
          { "text": "x = -2", "correct": false },
          { "text": "x = 4", "correct": false }
        ],
        "explanation": "The solutions are x = 2 and x = -2, so x = ±2."
      },
      {
        "question": "What is the area of a circle with radius r?",
        "answers": [
          { "text": "πr²", "correct": true },
          { "text": "2πr", "correct": false },
          { "text": "πr", "correct": false },
          { "text": "r²", "correct": false }
        ],
        "explanation": "The area of a circle with radius r is πr²."
      },
      {
        "question": "What is the volume of a sphere with radius r?",
        "answers": [
          { "text": "(4/3)πr³", "correct": true },
          { "text": "πr²", "correct": false },
          { "text": "2πr", "correct": false },
          { "text": "πr³", "correct": false }
        ],
        "explanation": "The volume of a sphere with radius r is (4/3)πr³."
      },
      {
        "question": "If sin(θ) = 1/2, what is θ?",
        "answers": [
          { "text": "π/6", "correct": true },
          { "text": "π/4", "correct": false },
          { "text": "π/3", "correct": false },
          { "text": "π/2", "correct": false }
        ],
        "explanation": "θ = π/6 when sin(θ) = 1/2."
      },
      {
        "question": "What is the value of cos(π)?",
        "answers": [
          { "text": "-1", "correct": true },
          { "text": "1", "correct": false },
          { "text": "0", "correct": false },
          { "text": "π", "correct": false }
        ],
        "explanation": "The value of cos(π) is -1."
      },
      {
        "question": "What is the value of tan(π/4)?",
        "answers": [
          { "text": "1", "correct": true },
          { "text": "0", "correct": false },
          { "text": "√2", "correct": false },
          { "text": "π/4", "correct": false }
        ],
        "explanation": "The value of tan(π/4) is 1."
      },
      {
        "question": "What is the value of sec(0)?",
        "answers": [
          { "text": "1", "correct": true },
          { "text": "0", "correct": false },
          { "text": "∞", "correct": false },
          { "text": "undefined", "correct": false }
        ],
        "explanation": "The value of sec(0) is 1."
      },
      {
        "question": "What is the hypotenuse of a right triangle with legs of length 3 and 4?",
        "answers": [
          { "text": "5", "correct": true },
          { "text": "6", "correct": false },
          { "text": "7", "correct": false },
          { "text": "4", "correct": false }
        ],
        "explanation": "The hypotenuse is √(3² + 4²) = 5."
      },
      {
        "question": "What is the distance between the points (1, 2) and (4, 6)?",
        "answers": [
          { "text": "5", "correct": true },
          { "text": "3", "correct": false },
          { "text": "7", "correct": false },
          { "text": "4", "correct": false }
        ],
        "explanation": "The distance is √((4-1)² + (6-2)²) = 5."
      },
      {
        "question": "What is the midpoint of the line segment joining (1, 2) and (4, 6)?",
        "answers": [
          { "text": "(2.5, 4)", "correct": true },
          { "text": "(3, 4)", "correct": false },
          { "text": "(1.5, 3)", "correct": false },
          { "text": "(2, 3)", "correct": false }
        ],
        "explanation": "The midpoint is ((1+4)/2, (2+6)/2) = (2.5, 4)."
      },

      {
        "question": "What is the sum of the first 10 natural numbers?",
        "answers": [
          { "text": "55", "correct": true },
          { "text": "45", "correct": false },
          { "text": "65", "correct": false },
          { "text": "75", "correct": false }
        ],
        "explanation": "The sum of  the first 10 natural numbers is 1 + 2 + 3 + ... + 10 = 55."
    },
    {
    "question": "Simplify: (x² + 2x - 15) / (x + 5).",
    "answers": [
    { "text": "x + 3", "correct": true },
    { "text": "x - 3", "correct": false },
    { "text": "2x + 5", "correct": false },
    { "text": "2x - 5", "correct": false }
    ],
    "explanation": "Dividing (x² + 2x - 15) by (x + 5) gives x + 3."
    },
    {
    "question": "What is the value of log₂(8)?",
    "answers": [
    { "text": "3", "correct": true },
    { "text": "2", "correct": false },
    { "text": "4", "correct": false },
    { "text": "8", "correct": false }
    ],
    "explanation": "log₂(8) = 3, because 2 raised to the power of 3 equals 8."
    },
    {
    "question": "Solve the system of equations: x + y = 5 and 2x - y = 3.",
    "answers": [
    { "text": "x = 2, y = 3", "correct": true },
    { "text": "x = 3, y = 2", "correct": false },
    { "text": "x = 4, y = 1", "correct": false },
    { "text": "x = 1, y = 4", "correct": false }
    ],
    "explanation": "Solving the equations x + y = 5 and 2x - y = 3, we get x = 2 and y = 3."
    },
    {
    "question": "Which of the following is the equation of a parabola?",
    "answers": [
    { "text": "y = x² + 2x + 1", "correct": true },
    { "text": "y = √(x + 1)", "correct": false },
    { "text": "y = 2x + 3", "correct": false },
    { "text": "y = |x|", "correct": false }
    ],
    "explanation": "The equation y = x² + 2x + 1 represents a parabola."
    },
    {
    "question": "Evaluate: lim(x→1) (x² - 1) / (x - 1).",
    "answers": [
    { "text": "2", "correct": true },
    { "text": "0", "correct": false },
    { "text": "1", "correct": false },
    { "text": "∞", "correct": false }
    ],
    "explanation": "Evaluating the limit gives lim(x→1) (x² - 1) / (x - 1) = 2."
    },
    {
    "question": "What is the value of 4! (4 factorial)?",
    "answers": [
    { "text": "24", "correct": true },
    { "text": "120", "correct": false },
    { "text": "6", "correct": false },
    { "text": "8", "correct": false }
    ],
    "explanation": "4! = 4 × 3 × 2 × 1 = 24."
    },
    {
    "question": "What is the value of 3⁴?",
    "answers": [
    { "text": "81", "correct": true },
    { "text": "64", "correct": false },
    { "text": "27", "correct": false },
    { "text": "12", "correct": false }
    ],
    "explanation": "3⁴ = 3 × 3 × 3 × 3 = 81."
    },
    {
    "question": "If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∩ B?",
    "answers": [
    { "text": "{2, 3}", "correct": true },
    { "text": "{1, 2, 3, 4}", "correct": false },
    { "text": "{1, 4}", "correct": false },
    { "text": "{1, 2}", "correct": false }
    ],
    "explanation": "A ∩ B is the set of elements common to both A and B, so A ∩ B = {2, 3}."
    },
    {
    "question": "What is the domain of the function f(x) = √(x - 1)?",
    "answers": [
    { "text": "[1, ∞)", "correct": true },
    { "text": "(-∞, ∞)", "correct": false },
    { "text": "(-∞, 1]", "correct": false },
    { "text": "[0, ∞)", "correct": false }
    ],
    "explanation": "The domain of f(x) = √(x - 1) requires x - 1 ≥ 0, so the domain is [1, ∞)."
    },
    {
    "question": "What is the value of arctan(1)?",
    "answers": [
    { "text": "π/4", "correct": true },
    { "text": "π/3", "correct": false },
    { "text": "π/2", "correct": false },
    { "text": "1", "correct": false }
    ],
    "explanation": "arctan(1) = π/4."
    },
    {
    "question": "What is the value of log₄(16)?",
    "answers": [
    { "text": "2", "correct": true },
    { "text": "4", "correct": false },
    { "text": "8", "correct": false },
    { "text": "1/2", "correct": false }
    ],
    "explanation": "log₄(16) = 2."
    },
    {
    "question": "If a + b = 5 and a - b = 1, what is the value of 2a?",
    "answers": [
    { "text": "12", "correct": true },
    { "text": "10", "correct": false },
    { "text": "8", "correct": false },
    { "text": "6", "correct": false }
    ],
    "explanation": "Solving the system gives a = 3 and b = 2, so 2a = 2 × 3 = 6."
    },
    {
    "question": "What is the value of cos(0)?",
    "answers": [
    { "text": "1", "correct": true },
    { "text": "0", "correct": false },
    { "text": "-1", "correct": false },
    { "text": "π", "correct": false }
    ],
    "explanation": "The value of cos(0) is 1."
    },
    {
    "question": "What is the value of tan(π)?",
    "answers": [
    { "text": "0", "correct": true },
    { "text": "1", "correct": false },
    { "text": "π", "correct": false },
    { "text": "∞", "correct": false }
    ],
    "explanation": "The value of tan(π) is 0."
    },
    {
    "question": "Evaluate: lim(x→0) sin(x)/x.",
    "answers": [
    { "text": "1", "correct": true },
    { "text": "0", "correct": false },
    { "text": "π", "correct": false },
    { "text": "∞", "correct": false }
    ],
    "explanation": "The limit lim(x→0) sin(x)/x is 1."
    },
    {
    "question": "What is the value of e³?",
    "answers": [
    { "text": "20.0855", "correct": true },
    { "text": "2.7183", "correct": false },
    { "text": "5.4366", "correct": false },
    { "text": "7.3891", "correct": false }
    ],
    "explanation": "e³ ≈ 20.0855."
    },
    {
    "question": "What is the derivative of ln(x)?",
    "answers": [
    { "text": "1/x", "correct": true },
    { "text": "x", "correct": false },
    { "text": "e^x", "correct": false },
    { "text": "cos(x)", "correct": false }
    ],
    "explanation": "The derivative of ln(x) is 1/x."
    },
    {
        "question": "What is the derivative of e^x?",
        "answers": [
          { "text": "e^x", "correct": true },
          { "text": "1/x", "correct": false },
          { "text": "cos(x)", "correct": false },
          { "text": "x", "correct": false }
        ],
        "explanation": "The derivative of e^x is e^x."
      },
      {
        "question": "What is the integral of 3x² dx?",
        "answers": [
          { "text": "x³ + C", "correct": true },
          { "text": "x² + C", "correct": false },
          { "text": "3x + C", "correct": false },
          { "text": "3x³ + C", "correct": false }
        ],
        "explanation": "The integral of 3x² dx is x³ + C."
      },
      {
        "question": "What is the sum of the first 20 terms of the arithmetic sequence: 3, 7, 11, ...?",
        "answers": [
          { "text": "460", "correct": true },
          { "text": "480", "correct": false },
          { "text": "440", "correct": false },
          { "text": "500", "correct": false }
        ],
        "explanation": "The 20th term is 75. The sum is 20 × (3 + 75) / 2 = 460."
      },
      {
        "question": "Solve for x: 2^x = 8.",
        "answers": [
          { "text": "x = 3", "correct": true },
          { "text": "x = 2", "correct": false },
          { "text": "x = 4", "correct": false },
          { "text": "x = 1", "correct": false }
        ],
        "explanation": "2^x = 8, so x = 3."
      },
      {
        "question": "What is the value of log₁₀(100)?",
        "answers": [
          { "text": "2", "correct": true },
          { "text": "1", "correct": false },
          { "text": "10", "correct": false },
          { "text": "100", "correct": false }
        ],
        "explanation": "log₁₀(100) = 2."
      },
      {
        "question": "If a quadratic equation has roots α and β, what is the sum of the roots?",
        "answers": [
          { "text": "-b/a", "correct": true },
          { "text": "c/a", "correct": false },
          { "text": "-c/a", "correct": false },
          { "text": "b/a", "correct": false }
        ],
        "explanation": "The sum of the roots of a quadratic equation -b/a."
      },
      {
        "question": "If a quadratic equation has roots α and β, what is the product of the roots?",
        "answers": [
          { "text": "c/a", "correct": true },
          { "text": "-b/a", "correct": false },
          { "text": "-c/a", "correct": false },
          { "text": "b/a", "correct": false }
        ],
        "explanation": "The product of the roots of a quadratic equation is c/a."
      },
      {
        "question": "If a, b, and c are the sides of a right triangle, where a = 3, b = 4, and c = 5, which one of the following is correct?",
        "answers": [
          { "text": "a² + b² = c²", "correct": true },
          { "text": "a + b = c", "correct": false },
          { "text": "2a + 2b = 2c", "correct": false },
          { "text": "a³ + b³ = c³", "correct": false }
        ],
        "explanation": "For a right triangle, a² + b² = c² holds true (Pythagoras' theorem)."
      },
      {
        "question": "What is the value of sin(π/2)?",
        "answers": [
          { "text": "1", "correct": true },
          { "text": "0", "correct": false },
          { "text": "-1", "correct": false },
          { "text": "π", "correct": false }
        ],
        "explanation": "The value of sin(π/2) is 1."
      },
      {
        "question": "What is the value of cos(π/2)?",
        "answers": [
          { "text": "0", "correct": true },
          { "text": "1", "correct": false },
          { "text": "-1", "correct": false },
          { "text": "π", "correct": false }
        ],
        "explanation": "The value of cos(π/2) is 0."
      },
      {
        "question": "What is the value of tan(π/2)?",
        "answers": [
          { "text": "undefined", "correct": true },
          { "text": "0", "correct": false },
          { "text": "1", "correct": false },
          { "text": "π", "correct": false }
        ],
        "explanation": "The value of tan(π/2) is undefined."
      },
      {
        "question": "Which of the following is an identity for all values of x?",
        "answers": [
          { "text": "sin²(x) + cos²(x) = 1", "correct": true },
          { "text": "sin(x) + cos(x) = 1", "correct": false },
          { "text": "sin(x) - cos(x) = 0", "correct": false },
          { "text": "sin(x) * cos(x) = 1", "correct": false }
        ],
        "explanation": "sin²(x) + cos²(x) = 1 is the Pythagorean identity."
      },
      {
        "question": "What is the area of a triangle with base 5 units and height 8 units?",
        "answers": [
          { "text": "20 square units", "correct": true },
          { "text": "40 square units", "correct": false },
          { "text": "30 square units", "correct": false },
          { "text": "10 square units", "correct": false }
        ],
        "explanation": "The area of a triangle is (1/2) × base × height = (1/2) × 5 × 8 = 20 square units."
      },
      {
        "question": "What is the surface area of a sphere with radius 4 units?",
        "answers": [
          { "text": "64π square units", "correct": true },
          { "text": "32π square units", "correct": false },
          { "text": "16π square units", "correct": false },
          { "text": "8π square units", "correct": false }
        ],
        "explanation": "The surface area of a sphere is 4πr² = 4π × 4² = 64π square units."
      },
      {
        "question": "What is the volume of a cylinder with radius 3 units and height 6 units?",
        "answers": [
          { "text": "54π cubic units", "correct": true },
          { "text": "18π cubic units", "correct": false },
          { "text": "36π cubic units", "correct": false },
          { "text": "27π cubic units", "correct": false }
        ],
        "explanation": "The volume of a cylinder is πr²h = π × 3² × 6 = 54π cubic units."
      },
      {
        "question": "What is the equation of the line passing through the points (2, 3) and (4, 5)?",
        "answers": [
          { "text": "y = x + 1", "correct": true },
          { "text": "y = 2x + 1", "correct": false },
          { "text": "y = 2x - 1", "correct": false },
          { "text": "y = 2x + 3", "correct": false }
        ],
        "explanation": "The slope is (5 - 3) / (4 - 2) = 1. The equation is y - 3 = 1(x - 2), so y = x + 1."
      },
      {
        "question": "Which of the following is a vector quantity?",
        "answers": [
          { "text": "Force", "correct": true },
          { "text": "Energy", "correct": false },
          { "text": "Temperature", "correct": false },
          { "text": "Power", "correct": false }
        ],
        "explanation": "Force is a vector quantity as it has both magnitude and direction."
      },
      {
        "question": "What is the SI unit of electric charge?",
        "answers": [
          { "text": "Coulomb", "correct": true },
          { "text": "Ohm", "correct": false },
          { "text": "Watt", "correct": false },
          { "text": "Volt", "correct": false }
        ],
        "explanation": "Electric charge is measured in Coulombs (C)."
      },
      {
        "question": "Which of the following is not a type of electromagnetic wave?",
        "answers": [
          { "text": "Sound wave", "correct": true },
          { "text": "Radio wave", "correct": false },
          { "text": "X-ray", "correct": false },
          { "text": "Microwave", "correct": false }
        ],
        "explanation": "Sound wave is not an electromagnetic wave; it is a mechanical wave."
      },
      {
        "question": "Which law of motion states 'To every action, there is an equal and opposite reaction'?",
        "answers": [
          { "text": "Newton's Third Law", "correct": true },
          { "text": "Newton's First Law", "correct": false },
          { "text": "Newton's Second Law", "correct": false },
          { "text": "Law of Inertia", "correct": false }
        ],
        "explanation": "Newton's Third Law of Motion states that every action has an equal and opposite reaction."
      },
      {
        "question": "What is the SI unit of power?",
        "answers": [
          { "text": "Watt", "correct": true },
          { "text": "Joule", "correct": false },
          { "text": "Newton", "correct": false },
          { "text": "Pascal", "correct": false }
        ],
        "explanation": "Power is measured in Watts (W)."
      },
      {
        "question": "What is the SI unit of energy?",
        "answers": [
          { "text": "Joule", "correct": true },
          { "text": "Watt", "correct": false },
          { "text": "Newton", "correct": false },
          { "text": "Pascal", "correct": false }
        ],
        "explanation": "Energy is measured in Joules (J)."
      },
      {
        "question": "Which of the following is an example of a scalar quantity?",
        "answers": [
          { "text": "Speed", "correct": true },
          { "text": "Force", "correct": false },
          { "text": "Velocity", "correct": false },
          { "text": "Acceleration", "correct": false }
        ],
        "explanation": "Speed is a scalar quantity as it has only magnitude and no direction."
      },
      {
        "question": "What is the force called that opposes the relative motion of two surfaces in contact?",
        "answers": [
          { "text": "Friction", "correct": true },
          { "text": "Tension", "correct": false },
          { "text": "Torque", "correct": false },
          { "text": "Gravity", "correct": false }
        ],
        "explanation": "Friction is the force that opposes the relative motion of two surfaces in contact."
      },
      {
        "question": "What is the SI unit of frequency?",
        "answers": [
          { "text": "Hertz", "correct": true },
          { "text": "Watt", "correct": false },
          { "text": "Joule", "correct": false },
          { "text": "Newton", "correct": false }
        ],
        "explanation": "Frequency is measured in Hertz (Hz)."
      },
      {
        "question": "Which of the following is an example of a longitudinal wave?",
        "answers": [
          { "text": "Sound wave", "correct": true },
          { "text": "Light wave", "correct": false },
          { "text": "X-ray", "correct": false },
          { "text": "Radio wave", "correct": false }
        ],
        "explanation": "Sound waves are longitudinal waves where the vibrations occur in the direction of propagation."
      },
      {
        "question": "What is the term for the resistance of a fluid to flow?",
        "answers": [
          { "text": "Viscosity", "correct": true },
          { "text": "Density", "correct": false },
          { "text": "Inertia", "correct": false },
          { "text": "Friction", "correct": false }
        ],
        "explanation": "Viscosity is the resistance of a fluid to flow."
      },
      {
        "question": "Which law of motion states 'An object at rest will remain at rest, and an object in motion will remain in motion unless acted upon by an external force'?",
        "answers": [
          { "text": "Newton's First Law", "correct": true },
          { "text": "Newton's Second Law", "correct": false },
          { "text": "Newton's Third Law", "correct": false },
          { "text": "Law of Inertia", "correct": false }
        ],
        "explanation": "Newton's First Law of Motion is also known as the Law of Inertia."
      },
      {
        "question": "What is the SI unit of pressure?",
        "answers": [
          { "text": "Pascal", "correct": true },
          { "text": "Watt", "correct": false },
          { "text": "Joule", "correct": false },
          { "text": "Coulomb", "correct": false }
        ],
        "explanation": "Pressure is measured in Pascals (Pa)."
      },
      {
        "question": "What is the force that causes objects to fall towards the Earth called?",
        "answers": [
          { "text": "Gravity", "correct": true },
          { "text": "Friction", "correct": false },
          { "text": "Tension", "correct": false },
          { "text": "Inertia", "correct": false }
        ],
        "explanation": "Gravity is the force that causes objects to fall towards the Earth."
      },
      {
        "question": "What is the term for the change in velocity of an object over time?",
        "answers": [
          { "text": "Acceleration", "correct": true },
          { "text": "Speed", "correct": false },
          { "text": "Force", "correct": false },
          { "text": "Velocity", "correct": false }
        ],
        "explanation": "Acceleration is the change in velocity of an object over time."
      },
      {
        "question": "What is the SI unit of electric current?",
        "answers": [
          { "text": "Ampere", "correct": true },
          { "text": "Watt", "correct": false },
          { "text": "Volt", "correct": false },
          { "text": "Ohm", "correct": false }
        ],
        "explanation": "Electric current is measured in Amperes (A)."
      },
      {
        "question": "What is the term for the energy of motion?",
        "answers": [
          { "text": "Kinetic energy", "correct": true },
          { "text": "Potential energy", "correct": false },
          { "text": "Mechanical energy", "correct": false },
          { "text": "Thermal energy", "correct": false }
        ],
        "explanation": "Kinetic energy is the energy of motion."
      },
      {
        "question": "Which of the following is an example of an insulator?",
        "answers": [
          { "text": "Rubber", "correct": true },
          { "text": "Copper", "correct": false },
          { "text": "Silver", "correct": false },
          { "text": "Gold", "correct": false }
        ],
        "explanation": "Rubber is an example of an insulator."
      },
      {
        "question": "Which law states that the total electric charge in an isolated system is constant?",
        "answers": [
          { "text": "Law of Conservation of Charge", "correct": true },
          { "text": "Ohm's Law", "correct": false },
          { "text": "Coulomb's Law", "correct": false },
          { "text": "Newton's Law of Gravitation", "correct": false }
        ],
        "explanation": "The Law of Conservation of Charge states that the total electric charge in an isolated system is constant."
      },
      {
        "question": "What is the term for the change in position of an object?",
        "answers": [
          { "text": "Displacement", "correct": true },
          { "text": "Distance", "correct": false },
          { "text": "Velocity", "correct": false },
          { "text": "Acceleration", "correct": false }
        ],
        "explanation": "Displacement is the change in position of an object."
      },
      {
        "question": "What is the term for the force that acts on a body moving in a circular path?",
        "answers": [
          { "text": "Centripetal force", "correct": true },
          { "text": "Frictional force", "correct": false },
          { "text": "Gravitational force", "correct": false },
          { "text": "Tension force", "correct": false }
        ],
        "explanation": "Centripetal force is the force that acts on a body moving in a circular path."
      },
      {
        "question": "What is the unit of electrical resistance?",
        "answers": [
          { "text": "Ohm", "correct": true },
          { "text": "Volt", "correct": false },
          { "text": "Ampere", "correct": false },
          { "text": "Watt", "correct": false }
        ],
        "explanation": "Electrical resistance is measured in Ohms (Ω)."
      },
      {
        "question": "Which of the following is not an example of electromagnetic radiation?",
        "answers": [
          { "text": "Sound waves", "correct": true },
          { "text": "Visible light", "correct": false },
          { "text": "X-rays", "correct": false },
          { "text": "Radio waves", "correct": false }
        ],
        "explanation": "Sound waves are not electromagnetic radiation; they are mechanical waves."
      },
      {
        "question": "What is the unit of work and energy?",
        "answers": [
          { "text": "Joule", "correct": true },
          { "text": "Watt", "correct": false },
          { "text": "Newton", "correct": false },
          { "text": "Ampere", "correct": false }
        ],
        "explanation": "Work and energy are measured in Joules (J)."
      },
      {
        "question": "What is the acceleration due to gravity on the surface of the Earth?",
        "answers": [
          { "text": "9.8 m/s²", "correct": true },
          { "text": "10 m/s²", "correct": false },
          { "text": "8 m/s²", "correct": false },
          { "text": "5 m/s²", "correct": false }
        ],
        "explanation": "The acceleration due to gravity on the surface of the Earth is approximately 9.8 m/s²."
      },
      {
        "question": "What is the law that states 'The pressure of a given mass of gas is inversely proportional to its volume at constant temperature'?",
        "answers": [
          { "text": "Boyle's Law", "correct": true },
          { "text": "Charles's Law", "correct": false },
          { "text": "Gay-Lussac's Law", "correct": false },
          { "text": "Archimedes's Principle", "correct": false }
        ],
        "explanation": "Boyle's Law states that the pressure of a given mass of gas is inversely proportional to its volume at constant temperature."
      },
      {
        "question": "What is the law that states 'The volume of a given mass of gas is directly proportional to its temperature at constant pressure'?",
        "answers": [
          { "text": "Charles's Law", "correct": true },
          { "text": "Boyle's Law", "correct": false },
          { "text": "Gay-Lussac's Law", "correct": false },
          { "text": "Archimedes's Principle", "correct": false }
        ],
        "explanation": "Charles's Law states that the volume of a given mass of gas is directly proportional to its temperature at constant pressure."
      },
      {
        "question": "What is the law that states 'The pressure of a gas is directly proportional to its absolute temperature at constant volume'?",
        "answers": [
          { "text": "Gay-Lussac's Law", "correct": true },
          { "text": "Boyle's Law", "correct": false },
          { "text": "Charles's Law", "correct": false },
          { "text": "Archimedes's Principle", "correct": false }
        ],
        "explanation": "Gay-Lussac's Law states that the pressure of a gas is directly proportional to its absolute temperature at constant volume."
      },
      {
        "question": "Which of the following is the SI unit of magnetic field?",
        "answers": [
          { "text": "Tesla", "correct": true },
          { "text": "Newton", "correct": false },
          { "text": "Watt", "correct": false },
          { "text": "Coulomb", "correct": false }
        ],
        "explanation": "The SI unit of magnetic field is Tesla (T)."
      },
      {
        "question": "Which of the following is the SI unit of electric potential difference?",
        "answers": [
          { "text": "Volt", "correct": true },
          { "text": "Ampere", "correct": false },
          { "text": "Ohm", "correct": false },
          { "text": "Watt", "correct": false }
        ],
        "explanation": "The SI unit of electric potential difference (voltage) is Volt (V)."
      },
      {
        "question": "What is the property of a body to remain in its state of rest or uniform motion in a straight line called?",
        "answers": [
          { "text": "Inertia", "correct": true },
          { "text": "Velocity", "correct": false },
          { "text": "Acceleration", "correct": false },
          { "text": "Force", "correct": false }
        ],
        "explanation": "Inertia is the property of a body to remain in its state of rest or uniform motion in a straight line."
      },
      {
        "question": "What is the phenomenon where a wave changes direction as it passes from one medium to another?",
        "answers": [
          { "text": "Refraction", "correct": true },
          { "text": "Reflection", "correct": false },
          { "text": "Diffraction", "correct": false },
          { "text": "Interference", "correct": false }
        ],
        "explanation": "Refraction is the phenomenon where a wave changes direction as it passes from one medium to another."
      },
      {
        "question": "What is the unit of electrical capacitance?",
        "answers": [
          { "text": "Farad", "correct": true },
          { "text": "Henry", "correct": false },
          { "text": "Ohm", "correct": false },
          { "text": "Watt", "correct": false }
        ],
        "explanation": "Electrical capacitance is measured in Farads (F)."
      },
      {
        "question": "What is the law that states 'The rate of effusion of a gas is inversely proportional to the square root of its molar mass'?",
        "answers": [
          { "text": "Graham's Law", "correct": true },
          { "text": "Avogadro's Law", "correct": false },
          { "text": "Dalton's Law", "correct": false },
          { "text": "Charles's Law", "correct": false }
        ],
        "explanation": "Graham's Law states that the rate of effusion of a gas is inversely proportional to the square root of its molar mass."
      },
      {
        "question": "What is the phenomenon where a wave bends around obstacles or spreads out after passing through an opening?",
        "answers": [
          { "text": "Diffraction", "correct": true },
          { "text": "Refraction", "correct": false },
          { "text": "Reflection", "correct": false },
          { "text": "Interference", "correct": false }
        ],
        "explanation": "Diffraction is the phenomenon where a wave bends around obstacles or spreads out after passing through an opening."
      },
      {
        "question": "What is the term for the force of attraction between any two objects with mass?",
        "answers": [
          { "text": "Gravity", "correct": true },
          { "text": "Friction", "correct": false },
          { "text": "Tension", "correct": false },
          { "text": "Inertia", "correct": false }
        ],
        "explanation": "Gravity is the force of attraction between any two objects with mass."
      },
      {
        "question": "Which element is represented by the symbol 'He'?",
        "answers": [
          { "text": "Helium", "correct": true },
          { "text": "Hydrogen", "correct": false },
          { "text": "Hassium", "correct": false },
          { "text": "Holmium", "correct": false }
        ],
        "explanation": "The element Helium is represented by the symbol 'He'."
      },
      {
        "question": "What is the molecular formula of water?",
        "answers": [
          { "text": "H₂O", "correct": true },
          { "text": "CO₂", "correct": false },
          { "text": "CH₄", "correct": false },
          { "text": "NH₃", "correct": false }
        ],
        "explanation": "The molecular formula of water is H₂O."
      },
      {
        "question": "Which gas is produced when a metal reacts with an acid?",
        "answers": [
          { "text": "Hydrogen", "correct": true },
          { "text": "Oxygen", "correct": false },
          { "text": "Nitrogen", "correct": false },
          { "text": "Carbon dioxide", "correct": false }
        ],
        "explanation": "Hydrogen gas is produced when a metal reacts with an acid."
      },
      {
        "question": "What is the formula of sodium chloride?",
        "answers": [
          { "text": "NaCl", "correct": true },
          { "text": "NaOH", "correct": false },
          { "text": "HCl", "correct": false },
          { "text": "KCl", "correct": false }
        ],
        "explanation": "The formula of sodium chloride is NaCl."
      },
      {
        "question": "Which gas is essential for respiration?",
        "answers": [
          { "text": "Oxygen", "correct": true },
          { "text": "Carbon dioxide", "correct": false },
          { "text": "Nitrogen", "correct": false },
          { "text": "Methane", "correct": false }
        ],
        "explanation": "Oxygen gas is essential for respiration."
      },
      {
        "question": "Which gas turns lime water milky?",
        "answers": [
          { "text": "Carbon dioxide", "correct": true },
          { "text": "Oxygen", "correct": false },
          { "text": "Nitrogen", "correct": false },
          { "text": "Hydrogen", "correct": false }
        ],
        "explanation": "Carbon dioxide gas turns lime water milky."
      },
      {
        "question": "What is the chemical formula of methane?",
        "answers": [
          { "text": "CH₄", "correct": true },
          { "text": "CO₂", "correct": false },
          { "text": "H₂O", "correct": false },
          { "text": "NaCl", "correct": false }
        ],
        "explanation": "The chemical formula of methane is CH₄."
      },
      {
        "question": "Which metal is found in liquid state at room temperature?",
        "answers": [
          { "text": "Mercury", "correct": true },
          { "text": "Iron", "correct": false },
          { "text": "Copper", "correct": false },
          { "text": "Aluminum", "correct": false }
        ],
        "explanation": "Mercury is found in a liquid state at room temperature."
      },
      {
        "question": "What is the chemical formula of sulfuric acid?",
        "answers": [
          { "text": "H₂SO₄", "correct": true },
          { "text": "HCl", "correct": false },
          { "text": "HNO₃", "correct": false },
          { "text": "NaOH", "correct": false }
        ],
        "explanation": "The chemical formula of sulfuric acid is H₂SO₄."
      },
      {
        "question": "Which metal is used for making bullets?",
        "answers": [
          { "text": "Lead", "correct": true },
          { "text": "Iron", "correct": false },
          { "text": "Copper", "correct": false },
          { "text": "Zinc", "correct": false }
        ],
        "explanation": "Lead is used for making bullets."
      },
      {
        "question": "Which gas is produced during the breakdown of organic matter by bacteria in the absence of oxygen?",
        "answers": [
          { "text": "Methane", "correct": true },
          { "text": "Oxygen", "correct": false },
          { "text": "Carbon dioxide", "correct": false },
          { "text": "Nitrogen", "correct": false }
        ],
        "explanation": "Methane gas is produced during the breakdown of organic matter by bacteria in the absence of oxygen."
      },
      {
        "question": "What is the chemical symbol for gold?",
        "answers": [
          { "text": "Au", "correct": true },
          { "text": "Ag", "correct": false },
          { "text": "Al", "correct": false },
          { "text": "Fe", "correct": false }
        ],
        "explanation": "The chemical symbol for gold is Au."
      },
      {
        "question": "Which acid is present in vinegar?",
        "answers": [
          { "text": "Acetic acid", "correct": true },
          { "text": "Hydrochloric acid", "correct": false },
          { "text": "Sulfuric acid", "correct": false },
          { "text": "Nitric acid", "correct": false }
        ],
        "explanation": "Acetic acid is present in vinegar."
      }
    // Add more quiz data as needed
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
  <h1 className="text-xl text-center">Mock Test 2080 Sample Paper</h1>
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


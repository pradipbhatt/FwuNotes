import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import logo from "../../../public/fwu.png";

// Total time in seconds for 150 questions in 3 hours
const TOTAL_TIME = 3 * 60 * 60;
const quizData2077 = [ // Define quiz data for 2077
  {
    "question": "The value of sin50° —sin 70° +sin10° is...",
    "answers": [
        {"text": "1", "correct": false},
        {"text": "0", "correct": true},
        {"text": "-1", "correct": false},
        {"text": "2", "correct": false}
    ]
},
{
    "question": "The value of sina+sinb+sinc in terms of area of triangle is........",
    "answers": [
        {"text": "4As / 2R", "correct": false},
        {"text": "4A / abe", "correct": false},
        {"text": "4s / abcA", "correct": false},
        {"text": "4A / 2R", "correct": true}
    ]
},
{
    "question": "All values of x satisfying the equation tan ax = cot bx are given by.......",
    "answers": [
        {"text": "x=na+(a+b)x", "correct": false},
        {"text": "x=na—(a+b)x", "correct": false},
        {"text": "x=na+(a+b)", "correct": false},
        {"text": "x=na—(a+b)", "correct": true}
    ]
},
{
    "question": "In a triangle ABC, the value of es is...",
    "answers": [
        {"text": "2R", "correct": false},
        {"text": "-c/2R", "correct": true},
        {"text": "2R°", "correct": false},
        {"text": "a/2R°", "correct": false}
    ]
},
{
    "question": "If (3,3) lies on the line joining the points (4,0) & (0,k) then...",
    "answers": [
        {"text": "k+3=3", "correct": false},
        {"text": "(k+3)/3 = 3", "correct": true},
        {"text": "4k=3", "correct": false},
        {"text": "3k-3=1", "correct": false}
    ]
},
{
    "question": "The equation of a straight line in double intercept form is...........+...",
    "answers": [
        {"text": "bx +ay = ab", "correct": true},
        {"text": "y=mx+e", "correct": false},
        {"text": "y—y1 = m(x—x)", "correct": false},
        {"text": "y—y1 = mx—x1", "correct": false}
    ]
},
{
    "question": "The circum center of the triangle whose vertices are (2,-1), (1,2) and (-2,1) is...........",
    "answers": [
        {"text": "(3,2)", "correct": false},
        {"text": "(-3,3)", "correct": false},
        {"text": "(0,0)", "correct": true},
        {"text": "none of the above", "correct": false}
    ]
},
{
    "question": "The points of intersections of the lines represented by 3x^2 — 7xy +2y^2+9x+2y-12 =0 are......",
    "answers": [
        {"text": "(2,3)", "correct": false},
        {"text": "(3,2)", "correct": false},
        {"text": "(-3,2)", "correct": true},
        {"text": "(1,2)", "correct": false}
    ]
},
{
    "question": "The angle between the pair of lines x^2 —2xy—cotθ—y^2 =0 is...........",
    "answers": [
        {"text": "0", "correct": false},
        {"text": "π/2", "correct": true},
        {"text": "tan^(-1)(2)", "correct": false},
        {"text": "tan^(-1)(3)", "correct": false}
    ]
},
{
    "question": "Which of the following is the equation of hyperbola?",
    "answers": [
        {"text": "x^2+4y^2 —4x+24y+24=0", "correct": false},
        {"text": "x^2 + y^2 -12x-6y-9=0", "correct": false},
        {"text": "x^2 —5xy —4y^2 +x+2y-2=0", "correct": true},
        {"text": "9x^2 —16y^2 —18x-64y~-199=0", "correct": false}
    ]
},
{
    "question": "The straight lines y = 2x+ 3/5 are always tangent to the circle...",
    "answers": [
        {"text": "x^2 + y^2 = 4", "correct": false},
        {"text": "x^2 + y^2 = 9", "correct": false},
        {"text": "x^2 + y^2 = 25", "correct": false},
        {"text": "x^2 + y^2 = 16", "correct": true}
    ]
},
{
    "question": "The angle between the lines whose direction ratios are 2, 3, 4 and 2, 1, 1 is...",
    "answers": [
        {"text": "π/2", "correct": false},
        {"text": "π/3", "correct": true},
        {"text": "π/4", "correct": false},
        {"text": "π/6", "correct": false}
    ]
},
{
    "question": "lim[x→2] (e^x-2) is equal to...",
    "answers": [
        {"text": "1", "correct": true},
        {"text": "-1", "correct": false},
        {"text": "0", "correct": false},
        {"text": "does not exist", "correct": false}
    ]
},
{
    "question": "lim[x→a] (sin(x—a))/(x—a) is equal to........",
    "answers": [
        {"text": "1", "correct": true},
        {"text": "2a", "correct": false},
        {"text": "2", "correct": false},
        {"text": "a", "correct": false}
    ]
},
{
    "question": "lim[x→0] (sinx^2)/x is equal to...",
    "answers": [
        {"text": "1", "correct": true},
        {"text": "0", "correct": false},
        {"text": "∞", "correct": false},
        {"text": "does not exist", "correct": false}
    ]
},
{
    "question": "If ax^2 +2hxy +by^2 =1, then dy/dx is equal to...",
    "answers": [
        {"text": "ax+by", "correct": false},
        {"text": "hx+by", "correct": false},
        {"text": "by/ax+by", "correct": false},
        {"text": "hx+by/by", "correct": true}
    ]
},
{
    "question": "The derivative of f(x) = |x| is...",
    "answers": [
        {"text": "1", "correct": false},
        {"text": "0", "correct": true},
        {"text": "-1", "correct": false},
        {"text": "does not exist", "correct": false}
    ]
},
{
    "question": "The value of ∫ (x^2)/(x^2 + 1) dx is...",
    "answers": [
        {"text": "tan^(-1)(x^2) + c", "correct": false},
        {"text": "sin^2(x^2) + c", "correct": false},
        {"text": "(x^2/2) + c", "correct": true},
        {"text": "ln(x^2 + 1) + c", "correct": false}
    ]
},
{
    "question": "∫ log(x) dx is equal to...",
    "answers": [
        {"text": "xlog(x) - x + c", "correct": true},
        {"text": "log(x) + x + c", "correct": false},
        {"text": "2log(x) - x + c", "correct": false},
        {"text": "log(x) - x + c", "correct": false}
    ]
},
{
    "question": "The maximum value of f(x) = 5 + 4x — x^2 is...",
    "answers": [
        {"text": "3", "correct": false},
        {"text": "6", "correct": true},
        {"text": "5", "correct": false},
        {"text": "2", "correct": false}
    ]
},
{
    "question": "The solution of the equation y'' + y' + y = e^(2x) is...",
    "answers": [
        {"text": "x^2 + x - y = e", "correct": false},
        {"text": "x + x - 4y - y = c", "correct": false},
        {"text": "x^2 + x + y - y = e", "correct": false},
        {"text": "2x^2 - x + 4y + y = e", "correct": true}
    ]
},
{
    "question": "The area of the ellipse (x^2)/4 + (y^2)/9 = 1 is...",
    "answers": [
        {"text": "27", "correct": false},
        {"text": "47", "correct": false},
        {"text": "62", "correct": false},
        {"text": "12π", "correct": true}
    ]
},
{
    "question": "If a = 2i + 3j then |2a| is...",
    "answers": [
        {"text": "√13", "correct": false},
        {"text": "√26", "correct": true},
        {"text": "2√26", "correct": false},
        {"text": "2√13", "correct": false}
    ]
},
{
    "question": "(a-b)(a+b) is equal to...",
    "answers": [
        {"text": "a^2 - b^2", "correct": true},
        {"text": "a^2 + b^2", "correct": false},
        {"text": "ab", "correct": false},
        {"text": "0", "correct": false}
    ]
},
{
    "question": "The area of parallelogram whose diagonals are (2,3,-3) & (2,5,-5) is...",
    "answers": [
        {"text": "6√2 sq. units", "correct": true},
        {"text": "12√2 sq. units", "correct": false},
        {"text": "6 sq. units", "correct": false},
        {"text": "12 sq. units", "correct": false}
    ]
},
{
    "question": "The vectors (2,1,—1) & (λ,—2,2) are collinear if the value of λ is...",
    "answers": [
        {"text": "2", "correct": false},
        {"text": "4", "correct": false},
        {"text": "-4", "correct": true},
        {"text": "-2", "correct": false}
    ]
},
{
    "question": "If n(U) = 360, n(A) = 240, n(B) = 160, then the maximum value of (A ∩ B) is...",
    "answers": [
        {"text": "360", "correct": false},
        {"text": "240", "correct": true},
        {"text": "160", "correct": false},
        {"text": "300", "correct": false}
    ]
},
{
    "question": "Which of the following is false?",
    "answers": [
        {"text": "e + yf2[x1 + y1]", "correct": true},
        {"text": "k - 9 = b - 4", "correct": false},
        {"text": "(a + b)/(a - b) = 1", "correct": false},
        {"text": "all of these", "correct": false}
    ]
},
{
    "question": "The range of the function f : R → R defined by f(x) = x^2 - 6x + 6 is...",
    "answers": [
        {"text": "[3,∞)", "correct": false},
        {"text": "[-3,∞)", "correct": false},
        {"text": "[-3,3)", "correct": false},
        {"text": "[0,∞)", "correct": true}
    ]
},
{
    "question": "The function f : R → R defined by f(x) = x^3 is...",
    "answers": [
        {"text": "odd function", "correct": false},
        {"text": "injective function", "correct": false},
        {"text": "surjective function", "correct": false},
        {"text": "all of the above", "correct": true}
    ]
},
{
    "question": "The set A - (B ∪ C) is equal to the set...",
    "answers": [
        {"text": "A ∪ B ∪ C", "correct": false},
        {"text": "(A - B) ∪ (A - C)", "correct": false},
        {"text": "(A - B) ∩ (A - C)", "correct": true},
        {"text": "A ∩ B ∪ C", "correct": false}
    ]
},
{
  "question": "The value of C(2n, 2) + C(2n, 4) +...+ C(2n, 2n) is...",
  "answers": [
      {"text": "(2n)!", "correct": false},
      {"text": "1", "correct": false},
      {"text": "(2n)!/n!", "correct": false},
      {"text": "2^(2n-1)", "correct": true}
  ]
},
{
  "question": "The sum of the series 1 + (3/4) + (3/4)^2 + ... upto infinity is...",
  "answers": [
      {"text": "4", "correct": false},
      {"text": "1/4", "correct": false},
      {"text": "3", "correct": true},
      {"text": "16/9", "correct": false}
  ]
},
{
  "question": "The equation of the circle passing through the points (2,3) and having its center at (1,1) is...",
  "answers": [
      {"text": "x^2 + y^2 + 2x - 4y + 1 = 0", "correct": false},
      {"text": "x^2 + y^2 - 2x - 4y + 1 = 0", "correct": false},
      {"text": "x^2 + y^2 - 2x + 4y - 1 = 0", "correct": false},
      {"text": "x^2 + y^2 - 2x - 2y = 0", "correct": true}
  ]
},
{
  "question": "If a = 2i + 3j and b = 4i + 5j, then a·b is...",
  "answers": [
      {"text": "23", "correct": false},
      {"text": "26", "correct": true},
      {"text": "20", "correct": false},
      {"text": "22", "correct": false}
  ]
},
{
  "question": "If a = 2i + 3j and b = 4i + 5j, then |a × b| is...",
  "answers": [
      {"text": "2", "correct": false},
      {"text": "4", "correct": false},
      {"text": "5", "correct": false},
      {"text": "2", "correct": true}
  ]
},
{
  "question": "The value of k for which the system of equations 3x + 5y = 7 and kx + 10y = 14 has no solution is...",
  "answers": [
      {"text": "6", "correct": true},
      {"text": "3", "correct": false},
      {"text": "5", "correct": false},
      {"text": "7", "correct": false}
  ]
},
{
  "question": "If A = {1, 2, 3} and B = {2, 3, 4}, then A ∩ B is...",
  "answers": [
      {"text": "{1, 2, 3, 4}", "correct": false},
      {"text": "{2, 3}", "correct": true},
      {"text": "{1, 4}", "correct": false},
      {"text": "{1, 3}", "correct": false}
  ]
},
{
  "question": "The equation of the line passing through the point (1,2) and perpendicular to the line 3x + 4y = 7 is...",
  "answers": [
      {"text": "4x - 3y = -2", "correct": true},
      {"text": "3x + 4y = 1", "correct": false},
      {"text": "4x + 3y = 7", "correct": false},
      {"text": "3x - 4y = 5", "correct": false}
  ]
},
{
  "question": "The general solution of the differential equation dy/dx = y is...",
  "answers": [
      {"text": "y = Ce^x", "correct": true},
      {"text": "y = Cx", "correct": false},
      {"text": "y = e^Cx", "correct": false},
      {"text": "y = x", "correct": false}
  ]
},
{
  "question": "The area under the curve y = x^2 between x = 0 and x = 2 is...",
  "answers": [
      {"text": "8/3", "correct": true},
      {"text": "4/3", "correct": false},
      {"text": "2/3", "correct": false},
      {"text": "1/3", "correct": false}
  ]
},
{
  "question": "If f(x) = x^2 + 2x + 1, then f'(x) is...",
  "answers": [
      {"text": "2x + 2", "correct": true},
      {"text": "2x - 2", "correct": false},
      {"text": "x + 2", "correct": false},
      {"text": "x - 2", "correct": false}
  ]
},
{
  "question": "The roots of the quadratic equation x^2 - 5x + 6 = 0 are...",
  "answers": [
      {"text": "2 and 3", "correct": true},
      {"text": "3 and 4", "correct": false},
      {"text": "1 and 2", "correct": false},
      {"text": "2 and 4", "correct": false}
  ]
},
{
  "question": "The value of sin(π/2) is...",
  "answers": [
      {"text": "0", "correct": false},
      {"text": "1", "correct": true},
      {"text": "-1", "correct": false},
      {"text": "√2", "correct": false}
  ]
},
{
  "question": "The value of cos(π) is...",
  "answers": [
      {"text": "0", "correct": false},
      {"text": "1", "correct": false},
      {"text": "-1", "correct": true},
      {"text": "√2", "correct": false}
  ]
},
{
  "question": "The equation of the circle with center at (0,0) and radius 5 is...",
  "answers": [
      {"text": "x^2 + y^2 = 5", "correct": false},
      {"text": "x^2 + y^2 = 25", "correct": true},
      {"text": "x^2 + y^2 = 10", "correct": false},
      {"text": "x^2 + y^2 = 1", "correct": false}
  ]
},
{
  "question": "If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, then A ∪ B is...",
  "answers": [
      {"text": "{1, 2, 3, 4, 5, 6}", "correct": true},
      {"text": "{3, 4}", "correct": false},
      {"text": "{1, 2, 3, 4}", "correct": false},
      {"text": "{1, 2, 5, 6}", "correct": false}
  ]
},
{
  "question": "The derivative of f(x) = ln(x) is...",
  "answers": [
      {"text": "1/x", "correct": true},
      {"text": "ln(x)", "correct": false},
      {"text": "x", "correct": false},
      {"text": "e^x", "correct": false}
  ]
},
{
  "question": "The value of ∫ 2x dx is...",
  "answers": [
      {"text": "x^2 + C", "correct": true},
      {"text": "2x^2 + C", "correct": false},
      {"text": "x + C", "correct": false},
      {"text": "2x + C", "correct": false}
  ]
},
{
  "question": "The value of the determinant of the matrix [[1, 2], [3, 4]] is...",
  "answers": [
      {"text": "-2", "correct": true},
      {"text": "2", "correct": false},
      {"text": "-1", "correct": false},
      {"text": "1", "correct": false}
  ]
},
{
  "question": "The value of cos(0) is...",
  "answers": [
      {"text": "0", "correct": false},
      {"text": "1", "correct": true},
      {"text": "-1", "correct": false},
      {"text": "√2", "correct": false}
  ]
},
{
  "question": "The value of sin(0) is...",
  "answers": [
      {"text": "0", "correct": true},
      {"text": "1", "correct": false},
      {"text": "-1", "correct": false},
      {"text": "√2", "correct": false}
  ]
},
{
  "question": "The number of ways of selecting one or more objects out of n objects is...",
  "answers": [
      {"text": "2^n", "correct": false},
      {"text": "2^n - 1", "correct": true},
      {"text": "n!", "correct": false},
      {"text": "n^2", "correct": false}
  ]
},
{
  "question": "1 + 1/3 + 1/3^2 + ... is equal to...",
  "answers": [
      {"text": "√3", "correct": false},
      {"text": "2", "correct": true},
      {"text": "√5", "correct": false},
      {"text": "1 + √2", "correct": false}
  ]
},
{
  "question": "A concave mirror forms a real image at 25 cm from the mirror surface along the principal axis. If the corresponding object is at a 10.0 cm distance, what is the mirror’s focal length?",
  "answers": [
      {"text": "14 cm", "correct": false},
      {"text": "7.1 cm", "correct": false},
      {"text": "12 cm", "correct": true},
      {"text": "17 cm", "correct": false}
  ]
},
{
  "question": "The bottom of a pond or lake appears closer than it actually is and seems to ripple. This “bending” of light due to the water is defined as...",
  "answers": [
      {"text": "interference", "correct": false},
      {"text": "diffraction", "correct": false},
      {"text": "refraction", "correct": true},
      {"text": "reflection", "correct": false}
  ]
},
{
  "question": "A person can't see objects clearly beyond 50cm. The power of the lens to correct the vision is...",
  "answers": [
      {"text": "+0.5D", "correct": false},
      {"text": "-0.5D", "correct": false},
      {"text": "+2D", "correct": false},
      {"text": "-2D", "correct": true}
  ]
},
{
  "question": "White light is passed through a prism of angle 5°. If the refractive indices for the red and blue colors are 1.641 and 1.659 respectively, the angle of dispersion will be...",
  "answers": [
      {"text": "2°", "correct": false},
      {"text": "0.09°", "correct": true},
      {"text": "0.9°", "correct": false},
      {"text": "4°", "correct": false}
  ]
},
{
  "question": "The dimension formula for the Planck's constant is...",
  "answers": [
      {"text": "M L^2 T^-1", "correct": true},
      {"text": "M L^2 T^-2", "correct": false},
      {"text": "M L^1 T^-1", "correct": false},
      {"text": "M L T^-1", "correct": false}
  ]
},
{
  "question": "A stone is dropped from the top of a tower. If it covers 24.5m in the last second of its motion, the height of the tower is...",
  "answers": [
      {"text": "49m", "correct": true},
      {"text": "44.1m", "correct": false},
      {"text": "88.4m", "correct": false},
      {"text": "72m", "correct": false}
  ]
},
{
  "question": "The kinetic energy needed to project a body of mass m from the surface (radius R) to infinite is...",
  "answers": [
      {"text": "mgR", "correct": true},
      {"text": "2mgR", "correct": false},
      {"text": "mgh", "correct": false},
      {"text": "2mgh", "correct": false}
  ]
},
{
  "question": "A ball is dropped from a 45 m high platform. Neglecting air resistance, how much time will it take for this ball to hit the ground?",
  "answers": [
      {"text": "1.05s", "correct": false},
      {"text": "2.05s", "correct": false},
      {"text": "3.0s", "correct": true},
      {"text": "4.0s", "correct": false}
  ]
},
{
  "question": "If two masses of 4Kg and 16Kg are moving with equal kinetic energy, the ratio of their momentum will be...",
  "answers": [
      {"text": "1:4", "correct": false},
      {"text": "1:2", "correct": true},
      {"text": "4:1", "correct": false},
      {"text": "2:1", "correct": false}
  ]
},
{
  "question": "The time period for a simple pendulum inside a satellite orbiting the earth is...",
  "answers": [
      {"text": "0", "correct": true},
      {"text": "infinite", "correct": false},
      {"text": "1 sec", "correct": false},
      {"text": "9.8 sec", "correct": false}
  ]
},
{
  "question": "The radius of the circular path of a particle is doubled but its frequency of rotation remains constant. If the initial centripetal force be F, then the final centripetal force will be...",
  "answers": [
      {"text": "F", "correct": true},
      {"text": "2F", "correct": false},
      {"text": "4F", "correct": false},
      {"text": "F/2", "correct": false}
  ]
},
{
  "question": "A sphere is rolling. The ratio of the rotational energy to total kinetic energy is given by...",
  "answers": [
      {"text": "7:10", "correct": true},
      {"text": "2:5", "correct": false},
      {"text": "10:7", "correct": false},
      {"text": "2:7", "correct": false}
  ]
},
{
  "question": "If the liquid does not wet the solid surface, the angle of contact is...",
  "answers": [
      {"text": "acute", "correct": false},
      {"text": "obtuse", "correct": true},
      {"text": "90°", "correct": false},
      {"text": "Zero", "correct": false}
  ]
},
{
  "question": "If a wire of Young's modulus Y and longitudinal strain X is produced, then the value of potential energy stored in its unit volume will be...",
  "answers": [
      {"text": "Y X^2", "correct": false},
      {"text": "2Y X^2", "correct": false},
      {"text": "0.5Y X", "correct": false},
      {"text": "0.5Y X^2", "correct": true}
  ]
},
{
  "question": "The temperature of a body recorded by a Celsius thermometer is -50°C; its temperature recorded by a Kelvin scale is...",
  "answers": [
      {"text": "223K", "correct": true},
      {"text": "323K", "correct": false},
      {"text": "23K", "correct": false},
      {"text": "-50K", "correct": false}
  ]
},
{
  "question": "1 gm of ice at 0°C and 1 gm of steam at 100°C are mixed. The resulting temperature is...",
  "answers": [
      {"text": "0°C", "correct": true},
      {"text": "230°C", "correct": false},
      {"text": "50°C", "correct": false},
      {"text": "100°C", "correct": false}
  ]
},
{
  "question": "A black body when it is hot emits heat radiation of...",
  "answers": [
      {"text": "IR wavelength", "correct": false},
      {"text": "UV wavelength", "correct": false},
      {"text": "Particular wavelength", "correct": false},
      {"text": "All wavelengths", "correct": true}
  ]
},
{
  "question": "A sample of gas expands from volume V1 to V2. The amount of work done by the gas is greatest when the expansion is...",
  "answers": [
      {"text": "isothermal", "correct": false},
      {"text": "isobaric", "correct": true},
      {"text": "adiabatic", "correct": false},
      {"text": "equal in all cases", "correct": false}
  ]
},



{
  "question": "An ideal heat engine operates in a Carnot cycle between 227°C and 127°C. It absorbs 6KJ of heat at the higher temperature. The amount of heat converted into work is...",
  "answers": [
      {"text": "1.2KJ", "correct": false},
      {"text": "1.6KJ", "correct": true},{"text": "3.5KJ", "correct": false},
      {"text": "4.8KJ", "correct": false}
  ]
},
{
  "question": "A certain mass of gas at 273K is expanded to 81 times its volume under adiabatic conditions. If γ=1.25 for the gas, then the final temperature is...",
  "answers": [
      {"text": "0°C", "correct": false},
      {"text": "91°C", "correct": true},
      {"text": "−182°C", "correct": false},
      {"text": "−235°C", "correct": false}
  ]
},
{
  "question": "The frequency of an organ pipe is f. If half part of the organ pipe is dipped into water, its frequency will be...",
  "answers": [
      {"text": "f", "correct": false},
      {"text": "2f", "correct": true},
      {"text": "2√f", "correct": false},
      {"text": "f/2", "correct": false}
  ]
},
{
  "question": "The minimum distance between the source and the reflector, so that an echo is heard, is approximately equal to...",
  "answers": [
      {"text": "10m", "correct": false},
      {"text": "17m", "correct": true},
      {"text": "34m", "correct": false},
      {"text": "50m", "correct": false}
  ]
},
{
  "question": "Bats detect obstacles in their path by receiving the reflected...",
  "answers": [
      {"text": "infrasonic waves", "correct": false},
      {"text": "radio waves", "correct": false},
      {"text": "electromagnetic waves", "correct": false},
      {"text": "ultrasonic waves", "correct": true}
  ]
},
{
  "question": "When the prongs of a tuning fork are made thinner, the frequency of vibration...",
  "answers": [
      {"text": "increases", "correct": true},
      {"text": "decreases", "correct": false},
      {"text": "remains constant", "correct": false},
      {"text": "none of the above", "correct": false}
  ]
},
{
  "question": "The magnetic field lines inside a coil...",
  "answers": [
      {"text": "are straight", "correct": false},
      {"text": "point in the same direction", "correct": false},
      {"text": "all of the above", "correct": true},
      {"text": "none of the above", "correct": false}
  ]
},
{
  "question": "An iron nail can be turned into a temporary magnet if it is held in a strong magnetic field. This method of magnetization is called...",
  "answers": [
      {"text": "induction", "correct": true},
      {"text": "charging", "correct": false},
      {"text": "saturation", "correct": false},
      {"text": "convection", "correct": false}
  ]
},
{
  "question": "The electric or magnetic field can't accelerate...",
  "answers": [
      {"text": "alpha particle", "correct": false},
      {"text": "beta particle", "correct": false},
      {"text": "protons", "correct": false},
      {"text": "neutrons", "correct": true}
  ]
},
{
  "question": "Charged particles enter a magnetic field at an angle of 45° with the magnetic field intensity. The path of the particle will be...",
  "answers": [
      {"text": "a straight line", "correct": false},
      {"text": "a circle", "correct": true},
      {"text": "an ellipse", "correct": false},
      {"text": "a helix", "correct": false}
  ]
},
{
  "question": "A toy train set has a resistance of 20.00Ω and uses a current of 250 mA. If it ran for one hour, what is the power of the train?",
  "answers": [
      {"text": "1.2W", "correct": false},
      {"text": "2.2 × 10^-2 W", "correct": false},
      {"text": "5.0 W", "correct": true},
      {"text": "4.5 × 10^3 W", "correct": false}
  ]
},
{
  "question": "To give an electrically neutral object a positive charge, you must...",
  "answers": [
      {"text": "add electrons to it", "correct": false},
      {"text": "remove electrons from it", "correct": true},
      {"text": "add protons to it", "correct": false},
      {"text": "remove protons from it", "correct": false}
  ]
},
{
  "question": "The terminal potential difference when the circuit is open is...",
  "answers": [
      {"text": "E", "correct": true},
      {"text": "E - Ir", "correct": false},
      {"text": "E - Ir", "correct": false},
      {"text": "0", "correct": false}
  ]
},
{
  "question": "How many seconds will it take for 10.0 C of charge to pass through a 12.0 A circuit?",
  "answers": [
      {"text": "120 s", "correct": true},
      {"text": "100 s", "correct": false},
      {"text": "0.120 s", "correct": false},
      {"text": "0.833 s", "correct": false}
  ]
},
{
  "question": "Which voltage source converts chemical energy to electrical energy?",
  "answers": [
      {"text": "Electrical generator", "correct": false},
      {"text": "Battery", "correct": true},
      {"text": "Solar cell", "correct": false},
      {"text": "Electronic power supply", "correct": false}
  ]
},
{
  "question": "The value of α for a given transistor is 0.99. What is the value of current transfer ratio β?",
  "answers": [
      {"text": "49", "correct": false},
      {"text": "50", "correct": false},
      {"text": "90", "correct": false},
      {"text": "99", "correct": true}
  ]
},
{
  "question": "A particle of mass 5m at rest decays into two particles of masses 2m and 3m having non-zero velocities. The ratio of the de Broglie wavelength of the particles is...",
  "answers": [
      {"text": "√3", "correct": false},
      {"text": "√2", "correct": true},
      {"text": "2", "correct": false},
      {"text": "none of the above", "correct": false}
  ]
},
{
  "question": "Which of the following digital logic gates are used to build a NOT gate?",
  "answers": [
      {"text": "AND gates", "correct": false},
      {"text": "OR gates", "correct": false},
      {"text": "NOT gates", "correct": true},
      {"text": "NAND gates", "correct": false}
  ]
},
{
  "question": "Which digital system translates coded characters into a more intelligible form?",
  "answers": [
      {"text": "Encoder", "correct": false},
      {"text": "Display", "correct": false},
      {"text": "Counter", "correct": false},
      {"text": "Decoder", "correct": true}
  ]
},
{
  "question": "Charge carrier in a semiconductor is due to...",
  "answers": [
      {"text": "electrons and holes", "correct": true},
      {"text": "electrons only", "correct": false},
      {"text": "holes only", "correct": false},
      {"text": "none", "correct": false}
  ]
},
{
  "question": "The radius of the first Bohr orbit in a hydrogen atom is...",
  "answers": [
      {"text": "0.53 nm", "correct": true},
      {"text": "0.53 Å", "correct": false},
      {"text": "53 Å", "correct": false},
      {"text": "5.3 Å", "correct": false}
  ]
},
{
  "question": "Which photon of light has the highest energy?",
  "answers": [
      {"text": "Photon of blue light", "correct": true},
      {"text": "Photon of red light", "correct": false},
      {"text": "Photon of green light", "correct": false},
      {"text": "Photon of violet light", "correct": false}
  ]
},
{
  "question": "Which of the following statements is correct?",
  "answers": [
      {"text": "Sodium nitride has the formula NaN3", "correct": true},
      {"text": "K reacts with N, to give K3N", "correct": false},
      {"text": "Lithium nitride forms when Li reacts with N,S", "correct": false},
      {"text": "All are incorrect", "correct": false}
  ]
},
{
  "question": "What is the formula of copper sulphate crystal?",
  "answers": [
      {"text": "CuSO", "correct": false},
      {"text": "CuSO4 · 5H2O", "correct": true},
      {"text": "CuCO3", "correct": false},
      {"text": "CuSO4 · 3H2O", "correct": false}
  ]
},
{
  "question": "The molecular formula of Ammonia solution is...",
  "answers": [
      {"text": "NH3", "correct": false},
      {"text": "(NH4)2SO4", "correct": false},
      {"text": "NH2OH", "correct": false},
      {"text": "NH2CONH2", "correct": true}
  ]
},
{
  "question": "Which of these has the least boiling point?",
  "answers": [
      {"text": "HF", "correct": true},
      {"text": "HCl", "correct": false},
      {"text": "HBr", "correct": false},
      {"text": "HI", "correct": false}
  ]
},
{
  "question": "Which of these is both Bronsted acid and Lewis acid?",
  "answers": [
      {"text": "BF3", "correct": true},
      {"text": "HCl", "correct": false},
      {"text": "HS2", "correct": false},
      {"text": "NH3", "correct": false}
  ]
},
{
  "question": "The reactive species present in Aqua-regia is...",
  "answers": [
      {"text": "nascent oxygen", "correct": false},
      {"text": "nascent hydrogen", "correct": false},
      {"text": "NO2", "correct": false},
      {"text": "nascent Cl", "correct": true}
  ]
},
{
  "question": "Which of these is the strongest reducing agent?",
  "answers": [
      {"text": "HF", "correct": false},
      {"text": "HCl", "correct": false},
      {"text": "HBr", "correct": false},
      {"text": "HI", "correct": true}
  ]
},
{
  "question": "Which of these is an ore of zinc?",
  "answers": [
      {"text": "siderite", "correct": false},
      {"text": "malachite", "correct": false},
      {"text": "franklinite", "correct": false},
      {"text": "tincal", "correct": true}
  ]
},
{
  "question": "The raw material used in the manufacture of sodium carbonate by Solvay's process is...",
  "answers": [
      {"text": "NH3 and CO2", "correct": false},
      {"text": "NaCl and CO2", "correct": true},
      {"text": "NaCl, CaCO3, and CO2", "correct": false},
      {"text": "NaCl, CaCO3, and CO3", "correct": false}
  ]
},
{
  "question": "The number(s) of orbital in 'd' sub-shell is/are...",
  "answers": [
      {"text": "1", "correct": false},
      {"text": "2", "correct": true},
      {"text": "5", "correct": false},
      {"text": "4", "correct": false}
  ]
},
{
  "question": "Which one of these forms precipitates on passing H2S gas?",
  "answers": [
      {"text": "acidified Al2(SO4)3", "correct": false},
      {"text": "acidified CuSO4", "correct": true},
      {"text": "acidified ZnSO4", "correct": false},
      {"text": "acidified ZnSO3", "correct": false}
  ]
},
{
  "question": "An element of atomic number 37 belongs to...",
  "answers": [
      {"text": "s-block", "correct": false},
      {"text": "p-block", "correct": true},
      {"text": "d-block", "correct": false},
      {"text": "f-block", "correct": false}
  ]
},
{
  "question": "The types of bonds present in hydrogen peroxide are...",
  "answers": [
      {"text": "only covalent", "correct": false},
      {"text": "covalent and ionic", "correct": false},
      {"text": "covalent and coordinate", "correct": true},
      {"text": "none of the above", "correct": false}
  ]
},
{
  "question": "CH4 + O2 → CO2 + H2O, the reaction that occurs here is...",
  "answers": [
      {"text": "reduction", "correct": false},
      {"text": "combustion", "correct": true},
      {"text": "single displacement", "correct": false},
      {"text": "double displacement", "correct": false}
  ]
},
{
  "question": "Nitrous acid is...",
  "answers": [
      {"text": "reducing agent", "correct": true},
      {"text": "bleaching agent", "correct": false},
      {"text": "both a and b", "correct": false},
      {"text": "none of above", "correct": false}
  ]
},
{
  "question": "During electrophilic substitution, nitro group in nitrobenzene is...",
  "answers": [
      {"text": "ortho para directors", "correct": true},
      {"text": "meta directors", "correct": false},
      {"text": "neither ortho nor meta", "correct": false},
      {"text": "group director", "correct": false}
  ]
},
{
  "question": "Alkaline KMnO4 is called...",
  "answers": [
      {"text": "Hoffmann's reagent", "correct": false},
      {"text": "Tollen's reagent", "correct": false},
      {"text": "Bayer's reagent", "correct": false},
      {"text": "group reagent", "correct": true}
  ]
},
{
  "question": "Unsaturated hydrocarbons contain...",
  "answers": [
      {"text": "Carbon-carbon multiple bonds", "correct": true},
      {"text": "covalent bond", "correct": false},
      {"text": "Carbon-carbon single bonds", "correct": false},
      {"text": "homogeneous solution", "correct": false}
  ]
},
{
  "question": "The correct IUPAC name of the compound with molecular formula (CH3)3C-CH3 is...",
  "answers": [
      {"text": "2,3-dimethyl butane", "correct": false},
      {"text": "2,2-dimethyl propane", "correct": true},
      {"text": "iso-propane", "correct": false},
      {"text": "trimethylpropane", "correct": false}
  ]
},
{
  "question": "An example of disaccharide is...",
  "answers": [
      {"text": "sucrose", "correct": true},
      {"text": "glucose", "correct": false},
      {"text": "fructose", "correct": false},
      {"text": null, "correct": false}
  ]
},
{
  "question": "The distillation of phenol with zinc dust gives...",
  "answers": [
      {"text": "toluene", "correct": true},
      {"text": "aniline", "correct": false},
      {"text": "benzene", "correct": false},
      {"text": "benzaldehyde", "correct": false}
  ]
},
{
  "question": "Glucose is converted into ethyl alcohol and CO2 during fermentation by...",
  "answers": [
      {"text": "Zymase", "correct": true},
      {"text": "invertase", "correct": false},
      {"text": "maltase", "correct": false},
      {"text": "KOH", "correct": false}
  ]
},
{
  "question": "Among the amines...",
  "answers": [
      {"text": "1° amine is most basic", "correct": true},
      {"text": "2° amine is most basic", "correct": false},
      {"text": "3° amine is most basic", "correct": false},
      {"text": "Amines are not basic", "correct": false}
  ]
},
{
  "question": "Formaldehyde when reacts with Grignard reagent followed by hydrolysis gives...",
  "answers": [
      {"text": "1° alcohols", "correct": true},
      {"text": "2° alcohols", "correct": false},
      {"text": "3° alcohols", "correct": false},
      {"text": "none of these", "correct": false}
  ]
},
{
  "question": "C2H5OH is the general formula of...",
  "answers": [
      {"text": "alkynes", "correct": false},
      {"text": "alcohols", "correct": true},
      {"text": "alkanes", "correct": false},
      {"text": "none of these", "correct": false}
  ]
},
{
  "question": "The mean speed of oxygen molecules in air at 25°C is...",
  "answers": [
      {"text": "482 m/s", "correct": false},
      {"text": "444 m/s", "correct": false},
      {"text": "14.0 m/s", "correct": false},
      {"text": "129 m/s", "correct": true}
  ]
},
{
  "question": "A perfect gas expands reversibly at a constant temperature of 298 K so that its volume doubles. What is the change in the molar internal energy of the gas?",
  "answers": [
      {"text": "+2.27 kJ/mol", "correct": true},
      {"text": "0 J/mol", "correct": false},
      {"text": "1.72 kJ/mol", "correct": false},
      {"text": "-2.27 kJ/mol", "correct": false}
  ]
},
{
  "question": "The correct combined gas equation is...",
  "answers": [
      {"text": "PV = nRT", "correct": true},
      {"text": "PV = RT/n", "correct": false},
      {"text": "PV = nR/T", "correct": false},
      {"text": "none of above", "correct": false}
  ]
},
{
  "question": "0.2 gm of a metal gives 68.4 ml of hydrogen measured at NTP on treatment with dilute HCl. The equivalent weight of the metal is...",
  "answers": [
      {"text": "12", "correct": false},
      {"text": "32.78", "correct": true},
      {"text": "36", "correct": false},
      {"text": "53", "correct": false}
  ]
},
{
  "question": "1 gram mole of sodium hydroxide (NaOH) is...",
  "answers": [
      {"text": "53 g of NaOH", "correct": false},
      {"text": "32 g of NaOH", "correct": false},
      {"text": "40 g of NaOH", "correct": false},
      {"text": "none of the above", "correct": true}
  ]
},
{
  "question": "Which of the following is the equivalent conductivity of 0.12N solution of an electrolyte whose specific conductance is 0.024 S cm^-1?",
  "answers": [
      {"text": "200 S cm^2/mol", "correct": true},
      {"text": "50 S cm^2/mol", "correct": false},
      {"text": "300 S cm^2/mol", "correct": false},
      {"text": "none of the above", "correct": false}
  ]
},
{
  "question": "The molality of 4% by weight of NaOH solution is...",
  "answers": [
      {"text": "0.104 m", "correct": false},
      {"text": "0.402 m", "correct": true},
      {"text": "1.04 m", "correct": false},
      {"text": "4.01 m", "correct": false}
  ]
},
{
  "question": "What is the main function of the brain stem?",
  "answers": [
      {"text": "Controls thinking and emotions", "correct": false},
      {"text": "Regulates involuntary functions such as heartbeat and breathing", "correct": true},
      {"text": "Processes sensory information", "correct": false},
      {"text": "Coordinates movement", "correct": false}
  ]
},
{
  "question": "Which part of the brain controls voluntary movements?",
  "answers": [
      {"text": "Cerebrum", "correct": true},
      {"text": "Cerebellum", "correct": false},
      {"text": "Brain stem", "correct": false},
      {"text": "Thalamus", "correct": false}
  ]
},
{
  "question": "What is the function of the hypothalamus?",
  "answers": [
      {"text": "Controls body temperature, hunger, and thirst", "correct": true},
      {"text": "Controls balance and coordination", "correct": false},
      {"text": "Processes visual information", "correct": false},
      {"text": "Regulates sleep and wake cycles", "correct": false}
  ]
},
{
  "question": "Which part of the brain is responsible for processing sensory information such as touch and taste?",
  "answers": [
      {"text": "Cerebrum", "correct": false},
      {"text": "Thalamus", "correct": true},
      {"text": "Hypothalamus", "correct": false},
      {"text": "Pituitary gland", "correct": false}
  ]
},
{
  "question": "What is the role of the pituitary gland in the brain?",
  "answers": [
      {"text": "Controls voluntary movements", "correct": false},
      {"text": "Regulates emotions and memory", "correct": false},
      {"text": "Produces hormones that regulate growth and other bodily functions", "correct": true},
      {"text": "Coordinates balance and motor control", "correct": false}
  ]
},
{
  "question": "The brain is divided into how many hemispheres?",
  "answers": [
      {"text": "One", "correct": false},
      {"text": "Two", "correct": true},
      {"text": "Three", "correct": false},
      {"text": "Four", "correct": false}
  ]
},
{
  "question": "Which part of the brain is responsible for higher cognitive functions such as problem-solving and language?",
  "answers": [
      {"text": "Cerebellum", "correct": false},
      {"text": "Cerebrum", "correct": true},
      {"text": "Brain stem", "correct": false},
      {"text": "Thalamus", "correct": false}
  ]
},
{
  "question": "What is the function of the limbic system?",
  "answers": [
      {"text": "Controls involuntary functions such as breathing and heartbeat", "correct": false},
      {"text": "Regulates emotions, memory, and pleasure", "correct": true},
      {"text": "Coordinates movement and balance", "correct": false},
      {"text": "Processes sensory information", "correct": false}
  ]
},
{
  "question": "Which part of the brain coordinates voluntary movements and balance?",
  "answers": [
      {"text": "Cerebrum", "correct": false},
      {"text": "Cerebellum", "correct": true},
      {"text": "Thalamus", "correct": false},
      {"text": "Brain stem", "correct": false}
  ]
},
{
  "question": "What is the role of the frontal lobe in the brain?",
  "answers": [
      {"text": "Processes visual information", "correct": false},
      {"text": "Regulates emotions and memory", "correct": false},
      {"text": "Controls voluntary movements and decision-making", "correct": true},
      {"text": "Coordinates balance and motor control", "correct": false}
  ]
}
];

const Mock6 = () => {
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

export default Mock6;

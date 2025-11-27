# Match Matrix

A classic memory game written in HTML, CSS and Javascript

---

## How to Play

#### Objective

Find all matching pairs

#### Gameplay

- Click on cards to flip them over
- Remember the colors and their position
- Match 2 cards with the same color
- Complete all pairs to win the game!

#### Features

- **8 Color Pairs**: Red, orange, yellow, green, teal, blue, purple
- **Random Shuffle**: Cards are randomised each turn to keep the game fresh
- **Win Condition**: Match all pairs

#### Technologies Used

- **HTML 5**: Game structure, layout
- **CSS**: Styling, animation
- **Javascript**: Game logic, card interactions and win condition

#### Game Rules

- Click on any card to reveal its color
- Click a second card to find a match
- If cards match, they stay face up
- If cards don't match, they flip back
- Game ends when all 8 pairs are found

---

## Project Structure

```txt
memory-game/
├── index.html          # Main game page
├── style.css           # Styles and animations
├── script.js           # Game logic and functionality
└── README.md           # This file
```

---

## Stretch Goals

- [ ] Insert alert using div and css styling
- [ ] Random hex code color generator
- [ ] Extended version of color matrix

---

## Pseudocode

1. User should see a 4x4 grid of cards (16 squares) faced down with same background upon loading the page.
2. User can click on any card on screen that is face down. Card should flip over to reveal a color. Card stays open.
3. User can click on another card that is faced down to flip it over to reveal another color. There will be 1 second delay to compare both cards. Flipped cards will remain open if both cards have the same color. Otherwise, both cards will flip over.
4. Game ends when user finds all 8 pairs of different colors.

---

Built with <3 using Vanilla Javascript :)

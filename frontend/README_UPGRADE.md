# YouthDrive Solutions — Clean 2030: visual update

This package updates only the React/Vite frontend. It does **not** touch the original root `index.html`, `Youth.html`, `sim1.html`, or production website.

## What's included
- True full-width hero using the original `/images/fleet7.jpg` and a CSS feathered + blurred fade to white.
- Larger original YouthDrive logo (no duplicate text).
- Five-item navigation with accessible mobile toggle.
- Floating 'Next Step' glass card.
- Four overlapping service cards.
- Soft-green lesson-enquiry bar visually resembling the selected mockup.
- Responsive desktop/tablet/mobile styling.

## Installation (from Git Bash)
1. Download the `YouthDrive_Clean2030_Phase2.zip` file to `~/Downloads`.
2. `cd /c/Projects/youthdrivesolutions/frontend`
3. `unzip -o ~/Downloads/YouthDrive_Clean2030_Phase2.zip -d .`
4. `npm run dev` (if not already running)
5. Open `http://localhost:5173/`
6. `npm run lint && npm run build`

The existing `/images/` folder must contain `fleet7.jpg` and `logo.jpg` (copied in Phase 1).

## Important scope note
The form is a **visual prototype** and intentionally does not claim to find live availability or confirm bookings. It displays a notice on submit. Client-approved backend integration can be added later.

The reference mockup is a composited design image, so a live page cannot reproduce every pixel exactly from the raw original photos alone; this CSS implementation matches the overall composition, blur/fade and component structure while preserving functional HTML.

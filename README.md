# CULT.FIT Mind

A mobile-first, interactive mental-wellness prototype for the CULT.FIT app. The flow moves from a mood check-in to personalized support, a five-minute breathing reset, therapist discovery, session booking, and confirmation.

## Screenshots

Captured at **402 × 874**. Therapist profiles, availability, and booking details are mock data; booking is a local prototype interaction.

<table>
  <tr>
    <td align="center"><img src="screenshots/mind-mood-checkin.png" width="190" alt="Mood check-in screen" /><br /><sub>Mood check-in</sub></td>
    <td align="center"><img src="screenshots/mind-topic-checkin.jpg" width="190" alt="Topic check-in screen" /><br /><sub>What’s on your mind</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/mind-personalized-actions.jpg" width="190" alt="Personalized support choices" /><br /><sub>Personalized support</sub></td>
    <td align="center"><img src="screenshots/mind-breathing-reset.jpg" width="190" alt="Animated breathing reset" /><br /><sub>Five-minute reset</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/mind-therapist-discovery.jpg" width="190" alt="Therapist discovery cards" /><br /><sub>Therapist discovery</sub></td>
    <td align="center"><img src="screenshots/mind-booking.jpg" width="190" alt="Session booking screen" /><br /><sub>Choose a session</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/mind-booking-confirmed.jpg" width="190" alt="Booking confirmation screen" /><br /><sub>Booking confirmed</sub></td>
    <td></td>
  </tr>
</table>

## Run locally

Requires Node.js and pnpm.

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Vite. The prototype is tuned for a **402 × 874** mobile viewport and adapts to smaller screens.

## About

- React + Vite, with minimal dependencies
- No authentication, backend, or database
- Mock therapist data and local-only interactions
- Responsive dark UI with CULT.FIT pink accents

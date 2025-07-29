# **App Name**: MyChannels

## Core Features:

- Hero Section: Display a personalized hero section with a prominent movie poster, title, and action buttons.
- Content Carousels: Render content carousels displaying movies fetched from Firestore, with horizontal scrolling and 'See All' links.
- Refresh Functionality: Enable users to refresh the content, triggering a re-render of the movie lists (placeholder).
- Search Functionality: Implement a search bar (placeholder) that allows users to search for movies.
- Data Fetching: Retrieve movie data including posters, titles, and video URLs from a Firestore database.

## Style Guidelines:

- Background: Dark gradient from #660000 to black for an immersive viewing experience. (RGB hex: #660000)
- Primary: Accent green (#00e676) to highlight key elements and labels. (RGB hex: #00E676)
- Text: White text for high contrast and readability against the dark background. (RGB hex: #FFFFFF)
- Font: 'Inter' (sans-serif) for a clean, modern look in both headlines and body text.
- Simple, white icons for the refresh and search buttons, ensuring clarity and easy recognition.
- Use Tailwind CSS utility classes exclusively to create a responsive layout with consistent spacing and padding.
- Carousels displaying 3.3 cards per viewport, snapped into view for easy browsing.
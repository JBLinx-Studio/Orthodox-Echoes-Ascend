
# Orthodox Echoes - Eastern Orthodox Wisdom & Community

A comprehensive web application dedicated to exploring the ancient traditions and teachings of Eastern Orthodoxy. Built to serve the Orthodox community with spiritual resources, educational content, and tools for deepening faith.

## About Orthodox Echoes

Orthodox Echoes is a digital sanctuary that brings together the rich heritage of Eastern Orthodox Christianity through:

- **Sacred Content**: Articles, blogs, and spiritual writings
- **Faith & Doctrine**: Core Orthodox teachings and theology
- **Saints & Tradition**: Lives of saints and Orthodox traditions
- **Prayer & Worship**: Daily prayers and liturgical resources
- **Sacred Arts**: Iconography and Orthodox visual culture
- **Liturgical Life**: Calendar events and feast days
- **Sacred Music**: Byzantine and Slavic chant traditions
- **Community**: Connect with fellow Orthodox Christians

## Features

- **Responsive Design**: Optimized for all devices
- **Audio Integration**: Sacred music and chant player
- **User Authentication**: Secure login and personal profiles
- **Content Management**: Rich blog and article system
- **Interactive Calendar**: Liturgical events and saint days
- **Icon Gallery**: Sacred iconography with detailed descriptions
- **Prayer Guide**: Daily prayers and spiritual practices

## Technology Stack

This project is built with modern web technologies:

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom Orthodox theming
- **UI Components**: Shadcn/ui component library
- **Routing**: React Router for navigation
- **Build Tool**: Vite for fast development and builds
- **Icons**: Lucide React icon library
- **Charts**: Recharts for data visualization
- **Motion**: Framer Motion for animations

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Orthodox-Echoes-Ascend.git
cd Orthodox-Echoes-Ascend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project can be deployed to any static hosting service:

### GitHub Pages

The project includes automated GitHub Actions for deployment:

1. Push your changes to the `main` branch
2. The GitHub Action will automatically build and deploy to `gh-pages` branch
3. Your site will be available at: `https://yourusername.github.io/Orthodox-Echoes-Ascend/`

### Manual Deployment

You can also deploy manually using:

```bash
npm run build
node src/scripts/deploy-gh-pages.js
```

### Other Hosting Services

The built files in the `dist` directory can be deployed to:
- Netlify
- Vercel
- AWS S3
- Any static hosting provider

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── layouts/            # Page layout components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # CSS and styling files
└── types/              # TypeScript type definitions
```

## Contributing

We welcome contributions from the Orthodox community! Please read our contributing guidelines before submitting pull requests.

### Development Guidelines

1. Follow the existing code style and patterns
2. Ensure all content is doctrinally accurate to Orthodox teaching
3. Test your changes thoroughly
4. Update documentation as needed

## Orthodox Content Guidelines

All content should adhere to traditional Orthodox Christian teachings:
- Follow the consensus of the Church Fathers
- Respect liturgical traditions
- Maintain theological accuracy
- Honor the saints and their teachings

## License

This project is open source and available under the MIT License.

## Support

For questions, suggestions, or support:
- Open an issue on GitHub
- Contact us through the website
- Join our Orthodox community discussions

## Acknowledgments

- The Holy Orthodox Church and its teachings
- Church Fathers and Orthodox theologians
- The Orthodox Christian community worldwide
- All contributors to this project

---

*"Orthodox Echoes - Where ancient wisdom meets modern technology"*

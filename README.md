# Mindhaven - Mental Health & Wellness Platform

<div align="center">
  <img src="public/logo.png" alt="Mindhaven Logo" width="100" height="100" />

**Mindhaven** is a comprehensive mental health and wellness platform that empowers users to take control of their wellness journey through personalized tools, expert support, AI-powered assistance, and evidence-based interventions.

[![GitHub repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/DevAgnihotri/Mindhaven)
[![React](https://img.shields.io/badge/React-18.0+-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Integrated-orange?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-blue?logo=tailwindcss)](https://tailwindcss.com/)

</div>

## 🌟 Features

### 🤖 AI-Powered Mental Health Support

- **Intelligent ChatBot**: 50+ pre-programmed responses for mental health support
- **Smart Navigation**: Voice commands and quick actions for accessibility
- **Crisis Support**: Immediate resources and emergency contact integration
- **Personalized Conversations**: Context-aware responses based on user needs

### 📊 Comprehensive Health Tracking

- **Mental Health Assessments**: EPDS (Edinburgh Postnatal Depression Scale) and other validated tools
- **Wellness Metrics**: Real-time tracking of psychological and physiological indicators
- **Health Dashboard**: Visual representation of progress and trends
- **Goal Setting**: Personalized wellness goals with progress tracking

### 🎓 Educational Resources

- **Mental Health Courses**: Evidence-based educational content
- **Interactive Video Player**: Engaging multimedia learning experience
- **Course Notes**: Personal note-taking and progress tracking
- **Content Recommendations**: AI-curated content based on user needs

### 👩‍⚕️ Professional Support

- **Therapist Booking System**: Schedule appointments with licensed professionals
- **Calendar Integration**: Google Calendar sync for appointment management
- **Booking Confirmation**: Automated confirmation and reminder system
- **Professional Profiles**: Detailed therapist information and specializations

### 👥 Community & Social Features

- **Support Communities**: Connect with others on similar wellness journeys
- **Peer Support**: Moderated discussion forums and group activities
- **Resource Sharing**: Community-driven content and experience sharing

### 🔐 Privacy & Security

- **Firebase Authentication**: Secure user authentication and authorization
- **HIPAA-Compliant**: Privacy-focused design for sensitive health data
- **Data Encryption**: End-to-end encryption for user information
- **Document Management**: Secure upload and storage of personal documents

## 🚀 Technology Stack

### Frontend

- **React 18** - Modern UI library with hooks and functional components
- **TypeScript** - Type-safe development environment
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components

### Backend & Services

- **Firebase Firestore** - NoSQL database for real-time data
- **Firebase Authentication** - User management and security
- **Firebase Storage** - File upload and document management
- **Google Calendar API** - Appointment scheduling integration

### Development Tools

- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Bun** - Fast package manager and runtime

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ or Bun
- Firebase project with Firestore and Authentication enabled
- Google Calendar API credentials (optional, for booking features)

### 1. Clone the Repository

```bash
git clone https://github.com/DevAgnihotri/Mindhaven.git
cd Mindhaven
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using bun (recommended)
bun install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google Calendar API (Optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password, Google)
3. Create Firestore database
4. Set up Storage rules
5. Deploy the provided `firestore.rules`

### 5. Start Development Server

```bash
# Using npm
npm run dev

# Using bun
bun dev
```

Visit `http://localhost:5173` to see the application running.

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── courses/         # Course-related components
│   ├── ChatBot.tsx      # AI chatbot component
│   ├── Profile.tsx      # User profile management
│   ├── HealthMetrics.tsx # Health tracking dashboard
│   └── ...
├── contexts/            # React context providers
│   ├── AuthContext.tsx  # Authentication context
│   └── ...
├── lib/                 # Utility functions and services
│   ├── firebase.ts      # Firebase configuration
│   ├── googleCalendar.ts # Google Calendar integration
│   └── ...
├── pages/               # Page components
│   ├── Landing.tsx      # Landing page
│   ├── Courses.tsx      # Courses page
│   └── ...
└── data/                # Static data and configurations
```

## 🌐 Deployment

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

### Vercel (Recommended)

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every commit

### Other Platforms

- **Netlify**: Connect GitHub repo for automatic deployments
- **AWS Amplify**: Full-stack hosting with CI/CD
- **Docker**: Use provided Dockerfile for containerized deployment

## 🤝 Contributing

We welcome contributions to improve Mindhaven! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint configuration for code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/DevAgnihotri/Mindhaven/issues)
- **Developer**: DevAgnihotri
- **Project Repository**: https://github.com/DevAgnihotri/Mindhaven

## 🙏 Acknowledgments

- **Mental Health Professionals** who provided guidance on evidence-based practices
- **Open Source Community** for the amazing tools and libraries
- **Users and Testers** who help make this platform better
- **shadcn/ui** for beautiful, accessible UI components
- **Firebase** for reliable backend services

---

<div align="center">
  <strong>Built with ❤️ for mental health and wellness</strong>
  <br>
  <em>Empowering individuals on their journey to better mental health</em>
</div>

# 🥚 EggPrices NZ

A comprehensive egg price comparison platform for New Zealand, helping Kiwis find the best deals on eggs across major supermarket chains.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![Express](https://img.shields.io/badge/express-4.21.2-green)

## 🌟 Features

### Core Features
- **Real-time Egg Price Comparison** across NZ supermarkets

- **User Authentication** with JWT tokens
- **Premium Subscriptions** via Stripe integration
- **Egg Price Alerts** and favorites (Premium feature)
- **Mobile-Responsive Design**

### Supported Stores
- Countdown
- New World  
- PAK'nSAVE
- Four Square
- The Mad Butcher
- FreshChoice
- Farro Fresh

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sigmacoding69/EggPrices-NZ.git
   cd EggPrices-NZ
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=3001
   
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   JWT_SECRET=your-secure-jwt-secret
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3001`

## 🏗️ Architecture

### Backend (Node.js/Express)
- **Authentication**: JWT-based user management
- **Payments**: Stripe integration for premium subscriptions

- **Security**: Helmet, CORS, rate limiting
- **Data**: JSON file storage (demo) - ready for database integration

### Frontend (Vanilla JS)
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Live price feeds and notifications
- **Interactive UI**: Advanced filtering, sorting, and search
- **Progressive Enhancement**: Works without JavaScript

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

#### Prices
- `GET /api/prices` - Get all egg prices
- `GET /api/prices/:id` - Get specific item
- `POST /api/prices/alerts` - Create price alert (Premium)
- `POST /api/prices/submit` - Submit crowdsourced price


- `GET /api/ai/conversations/:id` - Get conversation history

#### Stripe/Payments
- `POST /api/stripe/create-checkout-session` - Create payment session
- `POST /api/stripe/webhook` - Handle Stripe webhooks



## 💳 Payment Integration

Premium features are powered by Stripe:

- **Subscription Management**
- **Secure Payment Processing**
- **Webhook Handling**
- **Usage Tracking**

### Premium Features

- Real-time egg price alerts
- Advanced egg tracking lists
- Historical egg price tracking
- Priority support

## 🔧 Development

### Project Structure
```
├── routes/           # API route handlers
│   ├── auth.js      # Authentication routes
│   ├── prices.js    # Egg price comparison routes

│   └── stripe.js    # Payment routes
├── middleware/      # Express middleware
├── models/          # Data models
├── data/           # JSON data storage
├── public/         # Static frontend files
└── server.js       # Main server file
```

### Running in Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Environment Variables
See `env.example` for all available configuration options.

## 🌐 Deployment

The application is designed for easy deployment to:
- **Heroku** (included Procfile)
- **Railway** 
- **DigitalOcean App Platform**
- **AWS/Azure/GCP**

### Production Considerations
1. Replace JSON storage with a proper database (PostgreSQL recommended)
2. Set up Redis for session management
3. Configure proper logging
4. Set up monitoring and error tracking
5. Enable SSL/HTTPS

## 🧪 Testing

```bash
npm test           # Run test suite
npm run test:watch # Watch mode
npm run coverage   # Coverage report
```

## 📊 Current Status

### ✅ Implemented
- Complete backend API
- User authentication system
- Stripe payment integration

- Egg price comparison engine
- Responsive frontend
- Real-time egg price updates (simulated)

### 🚧 In Development
- Real supermarket egg price API integrations
- Database migration
- Advanced egg price analytics
- Mobile app
- API rate limiting improvements

### 🔮 Planned Features
- Web scraping for real-time egg prices
- Machine learning egg price predictions
- Barcode scanning for eggs
- Egg tracking collaboration
- Egg delivery integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **[@sigmacoding69](https://github.com/sigmacoding69)** - Initial work and development

## 🙏 Acknowledgments


- Stripe for payment processing
- New Zealand supermarket chains for inspiration
- The open-source community

## 📞 Support

- 📧 Email: support@eggprices.nz
- 🐛 Issues: [GitHub Issues](https://github.com/sigmacoding69/EggPrices-NZ/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/sigmacoding69/EggPrices-NZ/discussions)

---

**Made with ❤️ for the NZ community**

*Helping Kiwis save money on eggs, one comparison at a time!*
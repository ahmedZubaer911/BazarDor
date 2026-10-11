# 🛒 বাজার দর | BazarDor

**বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে।**

BazarDor is a responsive web application that helps users explore daily prices of essential products, compare prices across different markets, and understand price changes. The application provides product categories, detailed market-wise pricing, and secure user authentication.

## 🌐 Live Demo

**GitHub Repository:** [ahmedZubaer911/BazarDor](https://github.com/ahmedZubaer911/BazarDor)

## ✨ Key Features

- **Product Price Overview:** Browse essential products with today's prices, units, and price-change indicators.
- **Price Trends:** Explore products whose prices have increased or decreased.
- **Category Browsing and Sorting:** Browse products by category and sort them by default order, lowest price, or highest price.
- **Product Details and Market Comparison:** View minimum, maximum, and average prices alongside market-wise price information.
- **User Authentication:** Register and sign in using email and password, Google, or GitHub.
- **Protected Routes:** Require authentication to access product details.
- **Responsive Design:** Enjoy a mobile-friendly, tablet-friendly, and desktop-friendly interface.
- **Loading Skeletons and Error Handling:** Display loading placeholders and friendly error pages for invalid routes.
- **Bengali Interface:** Browse product information, prices, units, and navigation in Bengali.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Application framework and routing |
| React | User interface components |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive styling |
| Better Auth | Authentication and session management |
| MongoDB Atlas | Authentication data storage |
| React Hot Toast | Success, error, and validation notifications |
| Lucide React | Icons |
| React Icons | Social login icons |
| BazarDor API | Product, category, and market-price data |
| Vercel | Application deployment |

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- A MongoDB database
- Google and GitHub OAuth credentials for social authentication

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ahmedZubaer911/BazarDor.git
   ```

2. Navigate to the project directory:

   ```bash
   cd BazarDor
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the environment variables in a local `.env.local` file. Use the variable names expected by the application's authentication configuration, including the MongoDB connection string, Better Auth secret and URL, and OAuth credentials.

   **Never commit real secrets or credentials to GitHub.**

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
src/
├── app/
│   ├── category/
│   │   └── [slug]/
│   ├── product/
│   │   └── [slug]/
│   ├── signin/
│   ├── signup/
│   ├── profile/
│   ├── api/
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── layout.tsx
├── components/
└── lib/
```

## 📱 Responsive Experience

BazarDor is designed to adapt to mobile phones, tablets, and desktop screens. Product grids, navigation, forms, market tables, and page layouts use responsive styling for different screen sizes.

## 📌 Disclaimer

Displayed prices are indicative and may vary depending on the market, location, and current conditions.

## 👨‍💻 Developer

Developed as an academic web development project.

**Project:** BazarDor — বাজার দর

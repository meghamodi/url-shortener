### URL SHORTENER

The URL Shortener is used for shortening long URLs.

---

### How URL Shortener Works?

1. The URL Shortener requests you to input a URL that you want shortened.
2. The server ingests the long URL and feeds it into a hash function to generate a hash.
3. The server sends the shortened URL to the user.
4. The user can copy the shortened URL and paste it into a new window.
5. Voilà! You have the short URL redirecting to the original page.

---

### Setup for Redis Database

1. Go to the official documentation of Redis and sign up.
2. Select the free tier plan.
3. Get the credentials by navigating to:
   - **Subscriptions** -> **Databases** -> Click on **Connect** -> **Redis CLI**.

---

### Setup and Running Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the folder and install the packages:
   ```bash
   npm i
   ```
3. After successful installation, run the application:
   ```bash
   nodemon app.js
   ```
4. Open `localhost:3000` in your browser. You will see a page where you can paste the long URL, submit it, and get the shortened URL.

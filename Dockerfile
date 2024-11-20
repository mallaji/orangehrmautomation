FROM mcr.microsoft.com/playwright:v1.39.0-focal

# Set working directory
WORKDIR /app

# Copy project files
COPY . /app

# Install dependencies
RUN npm install

# Default command to run the Playwright test in headless mode
CMD ["npx", "playwright", "test", "./tests/adduser.test.js"]

# X Math Bot

A scheduled bot that posts math problem images to X (Twitter).

## Setup

1.  **Clone the repository** (or copy these files).
2.  **Get X API Keys**:
    - Go to [X Developer Portal](https://developer.x.com/).
    - Create a Project and an App.
    - Enable **Read and Write** permissions.
    - Generate:
        - API Key & Secret
        - Access Token & Secret (User authentication)
3.  **Local Development & Manual Generation**:
    - Create a `.env` file based on `.env.example`.
    - Install dependencies: `npm install`.
    - **Generate images manually to test**:
        ```bash
        node manual-generate.js math  # Generates manual_math.png
        node manual-generate.js grid  # Generates manual_grid.png
        ```
    - Run the full bot manually (posts to X): `node app.js`.
4.  **GitHub Actions Deployment**:
    - Push this code to a private GitHub repository.
    - Go to **Settings > Secrets and variables > Actions**.
    - Add the following Repository Secrets:
        - `TWITTER_API_KEY`
        - `TWITTER_API_SECRET`
        - `TWITTER_ACCESS_TOKEN`
        - `TWITTER_ACCESS_SECRET`
    - The bot will run automatically every 3 hours as defined in `.github/workflows/post-bot.yml`.

## Customization

- **Scheduling**: Modify the `cron` value in `.github/workflows/post-bot.yml`.
- **Logic**: Update `math-generator.js` for different problem types.
- **Aesthetics**: Change colors or fonts in `image-generator.js`.

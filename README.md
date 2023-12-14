# TCG Deck Builder Project: README File Template

## Welcome to the TCG Deck Builder Project!

This project aims to create a Discord-based trading card game (TCG) bot that can be used to beta test and balance game mechanics. As a collaborative effort, we encourage creativity and teamwork. Below you'll find the necessary steps to get started and contribute effectively. Remember, before starting anything here, please reference the [sign-up sheet](https://docs.google.com/spreadsheets/d/19ygf8WNcKbuk6CzLK_ckKKBWaB3X5C3dqLPzsg_zMYw/edit#gid=1006194246).

### Getting Started

#### 1. Clone the Repository
- Clone this GitHub repository to your local machine to start working on your task.
  ```
  git clone [repository URL]
  ```

#### 2. Setting Up Your Development Environment
- Ensure you have Node.js and necessary dependencies installed.
- Install project dependencies:
  ```
  npm install
  ```

#### 3. Source a Discord Bot Token
- Create your own Discord bot for testing purposes on the [Discord Developer Portal](https://discord.com/developers/applications).
- Generate a bot token and keep it secure.
- Add your own version of a bot to a personal server to test with

#### 4. Set Up Your Test Environment
- Add your bot to a test server on Discord for live testing.
- Edit the `.env` file in your local repository and include your bot token:
  ```
  DISCORD_TOKEN=your_bot_token_here
  ```

#### 5. Start Developing
- Begin working on your task. Refer to the project sign-up sheet for guidance.
- Begin to prompt GPT, BARD, or your chosen LLM for a sketch of your file.
- Have your chosen LLM fill our that sketch function by function.
- Test your features thoroughly in your test environment.
- Human oversight when troubleshooting is fair game. The idea is to have the LLM build the bulk of your code, 70% or more.
- Use discord.js v14, !commands have been established in the initial guidance and will be the most simple for both participants and the AI to manage.
- Add additional comments to help give clarity to other participants.

### Contributing to the Project

#### Pushing Changes
- Once you're confident with your work, commit your changes.
- **Important**: Do not include your bot token in any commits. Discord will deactivate exposed tokens for security reasons.
- Push your changes to a new branch and create a pull request.

#### Daily Bot Reset
- The bot on the main server will be reset daily to incorporate everyone's latest pushed progress.

#### Need Help or Have Questions?
- For any queries, manual downloads, or uploads of progress, or if you face any issues, please contact Elodine.

### General Guidelines
- Keep your code clean and well-commented.
- Stay in sync with the team and participate in discussions.
- Respect the project structure and coding conventions.

### Conclusion
Your contributions are vital to the success of this project. Let's work together to create an engaging and fun TCG bot. Happy coding!

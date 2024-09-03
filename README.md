# GitHub Roaster

This is a  project that roasts GitHub profiles  using OpenAI and Anthropic APIs.

# Architecture

![Architecture](https://github.com/daytimedrinkingclub/fightme-live/blob/main/arch?raw=true)

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/roaster.git
    cd roaster
    ```

2. Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Copy the `.env.template` to `.env` and fill in your API keys:
    ```bash
    cp .env.template .env
    ```

    Edit the `.env` file and add your OpenAI and Anthropic API keys:
    ```plaintext
    OPENAI_API_KEY=your_openai_api_key
    ANTHROPIC_API_KEY=your_anthropic_api_key
    ```

### Running the Development Server

1. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

1. Build the project:
    ```bash
    npm run build
    # or
    yarn build
    ```

2. Start the production server:
    ```bash
    npm start
    # or
    yarn start
    ```


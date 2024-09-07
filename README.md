# Fight Me Live

Go fight on [fightme.live](https://fightme.live)
# Architecture

![Architecture](https://github.com/daytimedrinkingclub/fightme-live/blob/main/arch?raw=true)

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/daytimedrinkingclub/fightme-live.git
    cd fightme-live
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

    Edit the `.env` file and add Anthropic API keys:
    ```plaintext
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


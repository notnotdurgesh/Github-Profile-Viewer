# GitHub Profile Viewer

A React-based application for viewing GitHub profiles, created using Vite. This application allows users to search for GitHub profiles, view profile details, repositories, followers, and following lists. It also includes a dark mode toggle for a better user experience.

## Features

- **Profile Search:** Search for GitHub profiles by username.
- **Profile Details:** View user details including avatar, name, bio, location, and company.
- **Repositories:** List all public repositories of the user with details like stars and forks.
- **Followers & Following:** Display the list of followers and users the profile is following.
- **Suggestions:** Get username suggestions as you type.
- **Dark Mode:** Toggle between light and dark themes.

## Tech Stack

- **React:** JavaScript library for building user interfaces.
- **Vite:** Next generation frontend tooling for faster builds.
- **Axios:** Promise-based HTTP client for making API requests.
- **Lodash.debounce:** Utility for debouncing API calls.
- **Tailwind CSS:** Utility-first CSS framework for styling.

## Live Demo

Check out the live demo of the application [here](https://github-profileviewer.netlify.app/)).

## Getting Started

### Prerequisites

- Node.js (>=14.0.0)
- npm (>=6.0.0) or yarn (>=1.22.0)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/notnotdurgesh/Github-Profile-Viewer.git
   cd Github-Profile-Viewer
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Application

Start the development server:

```sh
npm run dev
# or
yarn dev
```

Open your browser and visit `http://localhost:3000` to see the application in action.

### Building for Production

To build the project for production, run:

```sh
npm run build
# or
yarn build
```

This will create an optimized build of the application in the `dist` folder.

### Deployment

You can deploy the contents of the `dist` folder to any static site hosting service, such as Vercel, Netlify, GitHub Pages, etc.

## Usage

1. Enter a GitHub username in the input field.
2. Get suggestions as you type.
3. Select a suggestion or press the search button to fetch and display the user's profile data.
4. Toggle between light and dark mode using the button in the header.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [GitHub API](https://docs.github.com/en/rest)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

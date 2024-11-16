# JusticeMet

JusticeMet is an AI-powered platform designed to help legal professionals analyze cases and determine whether a defendant is guilty or not. The platform uses advanced AI algorithms to evaluate case details and provide an analysis based on existing legal data.

## Project Structure

## Components

### `App.js`

The main entry point of the application. It sets up the navigation and loads the saved navigation state from AsyncStorage.

### `index.js`

Registers the root component of the application.

### `components/Home.js`

The landing page of the application. It includes navigation to the Login and Signup screens.

### `components/HomeScreen.js`

The main screen after logging in. It includes sections for adding a new case, viewing case history, and searching cases.

### `components/CaseInput.js`

A form for inputting case details and analyzing them.

### `components/Analysis.js`

Displays the analysis of cases.

### `components/ChatInterface.js`

A chat interface for interacting with the AI legal assistant.

### `components/Header.js`

A header component with the application logo.

### `components/LoginScreen.js`

A screen for logging into the application.

### `components/SignupScreen.js`

A screen for signing up for a new account.

### `components/ImageCheck.js`

A placeholder component for checking images.

### `components/apiService.js`

Contains functions for interacting with the backend API.

### `style.js`

Contains global styles used throughout the application.

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the application:
    ```sh
    npm start
    ```

## Usage

- **Home Screen**: The landing page with options to log in or sign up.
- **Login Screen**: Enter your email and password to log in.
- **Signup Screen**: Create a new account by entering your name, email, and password.
- **Main Screen**: After logging in, you can add a new case, view case history, or search for cases.
- **Case Input**: Enter case details and analyze them.
- **Case Analysis**: View the analysis of cases.
- **Chat Interface**: Interact with the AI legal assistant.


## API Service

The `components/apiService.js` file contains functions for interacting with the backend API:

- `addCase(caseData)`: Adds a new case to the database.
- `searchCase(title)`: Searches for cases by title.

## Navigation

The application uses React Navigation for navigating between screens. The navigation state is saved and restored using AsyncStorage.

## Styles

Global styles are defined in `style.js` and can be imported and used in any component.

## Assets

Images and other static assets are stored in the `assets` directory.

## Configuration

The `app.json` file contains configuration settings for the Expo project.

## Dependencies

- React
- React Native
- Expo
- Axios
- React Navigation
- AsyncStorage
- DateTimePicker

## License

This project is licensed under the 0BSD License.


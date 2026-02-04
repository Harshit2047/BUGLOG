# BUGLOG - A Modern React Blogging Platform

BUGLOG is a feature-rich, responsive blogging application built with React, Vite, and Tailwind CSS. It provides a seamless user experience for creating, reading, and managing blog posts, complete with authentication, a dark/light theme, and real-time filtering.

## Table of Contents

1.  [Local Setup](#local-setup)
2.  [State Management: Redux vs. Context API](#state-management-redux-vs-context-api)
3.  [Deployment](#deployment)
4.  [Public URL](#public-url)
5.  [Assumptions Made](#assumptions-made)

## Local Setup

To get the project running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd vite-project
    ```

3.  **Install dependencies:**
    This project uses `npm` for package management.
    ```bash
    npm install
    ```

4.  **Run the development server:**
    This command starts the Vite development server.
    ```bash
    npm run dev
    ```

5.  **Open in browser:**
    The application will be available at `http://localhost:5173`.

## State Management: Redux vs. Context API

This project strategically uses both Redux Toolkit and the React Context API for state management, leveraging the strengths of each.

### Redux Toolkit (`blogSlice.js`)

Redux is employed for managing the global, complex state of the blog posts.

*   **Why Redux?**
    *   **Centralized State:** It provides a single source of truth for all blog data, which is accessed and modified by many unrelated components (e.g., `FeedPage`, `BlogDetailPage`, `DashboardPage`).
    *   **Complex Logic:** The logic for creating, updating, deleting, liking, and commenting on posts is complex. Redux actions and reducers provide a robust and predictable pattern for managing these state transitions.
    *   **Performance:** Redux helps prevent unnecessary re-renders by allowing components to subscribe to only the specific slices of state they need.
    *   **Debugging:** Redux DevTools offer powerful time-travel debugging, making it easier to trace state changes.
    *   **Persistence:** The state is persisted to `localStorage`, ensuring data is not lost on page refresh.

*   **Usage in this Project:**
    *   **`src/redux/blogSlice.js`**: Manages the `posts` array, including all CRUD operations, likes, and comments.

### React Context API

The Context API is used for simpler, more "ambient" state that needs to be passed down the component tree without prop-drilling.

*   **Why Context?**
    *   **Simplicity:** It is easier to set up for state that doesn't require complex update logic.
    *   **Prop-Drilling Avoidance:** It's perfect for providing application-wide data like theme settings or user authentication status to nested components.

*   **Usage in this Project:**
    *   **`src/context/AuthContext.jsx`**: Manages the current user's authentication status (`user` object, `isAuthenticated` flag) and provides `login` and `logout` functions.
    *   **`src/context/ThemeContext.jsx`**: Manages the application's theme (dark or light mode) and provides a function to toggle it.
    *   **`src/context/NotificationContext.jsx`**: Manages the display of toast notifications for user feedback.

## Deployment

This Vite project can be deployed to any static site hosting service. Here are the steps for deploying to Netlify:

1.  **Build the project:**
    Run the build command to generate a production-ready `dist` folder.
    ```bash
    npm run build
    ```

2.  **Deploy to a hosting provider (e.g., Netlify, Vercel):**

    *   **Using the CLI:**
        ```bash
        # Install Netlify CLI
        npm install netlify-cli -g
        
        # Deploy
        netlify deploy --prod
        ```
        Follow the prompts, setting the "Publish directory" to `dist`.

    *   **Using the Web UI:**
        1.  Push your code to a GitHub/GitLab/Bitbucket repository.
        2.  Create a new site on Netlify and link it to your repository.
        3.  Set the build command to `npm run build`.
        4.  Set the publish directory to `dist`.
        5.  Deploy the site.

## Public URL

The application is deployed and accessible at the following URL:

**[Your Deployed URL Here]**

## Assumptions Made

During the development of this project, the following assumptions were made:

1.  **No Backend Database:** The application operates without a traditional backend or database. All blog data is managed on the client-side and persisted in the browser's `localStorage` via Redux Persist.
2.  **Authentication:** User authentication is simulated. User data is stored in `localStorage`, and there is no server-side session management.
3.  **Image Handling:** Uploaded images are converted to a Base64 string and stored directly in the blog post object in `localStorage`. This is suitable for a small-scale application but would be inefficient for a large-scale platform.
4.  **User Roles:** There is a simple authorization model. A user can edit or delete their own posts. A blog author can delete any comment on their post. There are no other roles like "admin" or "moderator".
5.  **Styling:** The UI is built using Tailwind CSS, assuming a utility-first approach is preferred for styling.

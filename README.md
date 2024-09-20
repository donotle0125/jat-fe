# Job Application Tracker - Frontend

This is the frontend of the Job Application Tracker project, built with React. The application allows users to track their job applications, update statuses, and manage all their job search activities in one place. The frontend communicates with the backend (built with Flask) via RESTful APIs.

## **Features**

-   **User Authentication**: Register, log in, and log out to manage your job applications securely.
-   **Job Application Management**: Add, update, and delete job applications.
-   **Status Tracking**: Track the status of each job application (e.g., applied, interview, offer).
-   **Responsive Design**: Fully responsive layout to work on all devices.

## **Technologies Used**

-   **React**: JavaScript library for building user interfaces.
-   **React Router**: For client-side routing and navigation.
-   **Axios**: For making HTTP requests to the backend.
-   **CSS/SCSS**: For styling the components.
-   **dotenv**: For managing environment variables.

## **Getting Started**

### **Prerequisites**

-   **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js](https://nodejs.org/).
-   **npm**: Node package manager, which comes with Node.js.

### **Installation**

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/job-tracker-frontend.git
    cd job-tracker-frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your API URLs:

    ```plaintext
    REACT_APP_DEV_API_URL=http://localhost:5000
    REACT_APP_PROD_API_URL=https://your-app-name.herokuapp.com
    ```

4. Start the development server:

    ```bash
    npm start
    ```

    By default, the app will be running on `http://localhost:3000`.

## **API Endpoints**

The frontend communicates with the backend using the following API endpoints:

| Endpoint    | Method | Description                    |
| ----------- | ------ | ------------------------------ |
| `/register` | POST   | Register a new user            |
| `/login`    | POST   | Log in a user                  |
| `/jobs`     | GET    | Retrieve all job applications  |
| `/jobs`     | POST   | Add a new job application      |
| `/jobs/:id` | PUT    | Update a job application by ID |
| `/jobs/:id` | DELETE | Delete a job application by ID |

## **Deployment**

To deploy the application:

1. **Build the app**:

    ```bash
    npm run build
    ```

2. **Deploy**: Use a platform like Vercel, Netlify, or GitHub Pages to deploy the built files.

## **Contributing**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## **License**

This project is licensed under the MIT License.

## **Contact**

For questions or suggestions, please reach out at [dtle647@gmail.com](mailto:dtle647@gmail.com).

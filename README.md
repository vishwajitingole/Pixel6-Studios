<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Management with 3D Experience - README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            max-width: 800px;
        }
        h1, h2, h3 {
            color: #333;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 4px;
            border-radius: 4px;
            font-family: 'Courier New', Courier, monospace;
        }
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        ul {
            list-style-type: square;
        }
        ul li ul {
            list-style-type: circle;
            margin-left: 20px;
        }
    </style>
</head>
<body>
    <h1>Customer Management with 3D Experience</h1>
    <h2>Overview</h2>
    <p>This is a React-based web application for managing customers. It utilizes Redux for state management and Three.js for 3D experiences, allowing users to interact with a dynamic environment in the browser.</p>
    <p>The project is designed to provide an engaging UI that combines customer management functionality with a visually appealing 3D environment using the <code>@react-three/fiber</code> and <code>@react-three/drei</code> libraries.</p>
    <h2>Features</h2>
    <ul>
        <li><strong>Add, Edit, and Delete Customers:</strong> Easily manage your customer list with intuitive forms and lists.</li>
        <li><strong>3D Environment:</strong> Explore a 3D experience powered by Three.js and React Three Fiber.</li>
        <li><strong>Dynamic Environment Mapping:</strong> Change the environment using HDR files to provide realistic lighting effects.</li>
        <li><strong>Responsive Design:</strong> Works on both desktop and mobile browsers.</li>
    </ul>
    <h2>Technologies Used</h2>
    <ul>
        <li><strong>React:</strong> Frontend library for building user interfaces.</li>
        <li><strong>Redux:</strong> State management for handling customer data.</li>
        <li><strong>Three.js:</strong> 3D graphics library for rendering and animating 3D models.</li>
        <li><strong>@react-three/fiber:</strong> React renderer for Three.js to simplify the creation of 3D scenes.</li>
        <li><strong>@react-three/drei:</strong> Helpers and abstractions to work efficiently with Three.js and React Three Fiber.</li>
        <li><strong>Vite:</strong> Build tool for fast and optimized web application development.</li>
        <li><strong>Tailwind CSS:</strong> Utility-first CSS framework for styling the UI.</li>
    </ul>
    <h2>Getting Started</h2>
    <p>Follow these instructions to set up and run the project on your local machine.</p>
    <h3>Prerequisites</h3>
    <p>Make sure you have the following installed:</p>
    <ul>
        <li><strong>Node.js:</strong> <a href="https://nodejs.org/">Download Node.js</a></li>
        <li><strong>npm:</strong> Comes with Node.js, but you can verify using <code>npm -v</code>.</li>
        <li><strong>Git:</strong> <a href="https://git-scm.com/">Download Git</a></li>
    </ul>
    <h3>Installation</h3>
    <ol>
        <li><strong>Clone the repository:</strong>
            <pre><code>git clone https://github.com/yourusername/your-repo.git
cd your-repo</code></pre>
        </li>
        <li><strong>Install dependencies:</strong>
            <pre><code>npm install</code></pre>
        </li>
        <li><strong>Start the development server:</strong>
            <pre><code>npm run dev</code></pre>
        </li>
        <li><strong>Open the application in your browser:</strong>
            <p>Open <a href="http://localhost:5173">http://localhost:5173</a> in your browser to view the app.</p>
        </li>
    </ol>
    <h3>Folder Structure</h3>
    <p>Here's an overview of the project's folder structure:</p>
    <pre><code>.
├── public
│   ├── golf.hdr           # HDR file for environment lighting
│   ├── favicon.ico        # Application icon
│   ├── index.html         # Main HTML file
│   └── ...                # Other static assets
├── src
│   ├── Components
│   │   ├── Form.jsx       # Form component for adding/editing customers
│   │   └── List.jsx       # List component for displaying customers
│   ├── store
│   │   ├── customerReducer.js # Redux reducer for customer state
│   ├── App.jsx            # Main application component
│   ├── Experience.jsx     # 3D experience component using Three.js
│   └── main.jsx           # Entry point for the React app</code></pre>
    <h2>Usage</h2>
    <p>Here's a quick guide on how to use the application:</p>
    <ol>
        <li><strong>Add a Customer:</strong> Use the form at the top to add new customers. Fill in the necessary details and click "Add Customer".</li>
        <li><strong>Edit a Customer:</strong> Click the "Edit" button next to a customer to modify their information. Make your changes and click "Save".</li>
        <li><strong>Delete a Customer:</strong> Click the "Delete" button to remove a customer from the list.</li>
        <li><strong>Explore the 3D Environment:</strong> Interact with the 3D scene rendered at the bottom of the page.</li>
    </ol>
    <h2>Configuration</h2>
    <p>You can customize the environment by changing the HDR files used for lighting. Place your HDR files in the <code>public</code> directory and update the path in the <code>Experience.jsx</code> file:</p>
    <pre><code>import { Environment } from '@react-three/drei';
function Experience() {
    return (
        &lt;Environment files="/path-to-your-hdr-file.hdr" background /&gt;
    );
}</code></pre>
    <h2>Contributing</h2>
    <p>If you'd like to contribute to this project, please follow these steps:</p>
    <ol>
        <li>Fork the repository.</li>
        <li>Create a new branch (<code>git checkout -b feature/YourFeature</code>).</li>
        <li>Make your changes and commit them (<code>git commit -m 'Add some feature'</code>).</li>
        <li>Push to the branch (<code>git push origin feature/YourFeature</code>).</li>
        <li>Open a pull request.</li>
    </ol>
    <h2>License</h2>
    <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>
    <h2>Contact</h2>
    <p>If you have any questions or feedback, feel free to contact me at <a href="mailto:yourname@example.com">yourname@example.com</a>.</p>
</body>
</html>

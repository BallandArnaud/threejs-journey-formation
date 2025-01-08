const fs = require("fs");
const path = require("path");

const demoDir = path.join(__dirname, "demo");

// List of project numbers to include (e.g., [28, 32]).
// Leave empty to include all projects.
const selectedProjects = [
    19, 24, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 40, 48, 52, 64,
];

function formatTitle(project) {
    // Remove the number at the beginning and replace dashes with spaces
    const parts = project.split("-");
    parts.shift(); // Remove the number
    return parts
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

// Read the directories in the "demo" folder
const projects = fs
    .readdirSync(demoDir)
    .filter((file) => {
        const fullPath = path.join(demoDir, file);
        return fs.statSync(fullPath).isDirectory();
    })
    .filter((project) => {
        if (selectedProjects.length === 0) {
            return true; // Include all projects if no specific selection is made
        }
        const projectNumber = parseInt(project.split("-")[0], 10); // Extract the project number
        return selectedProjects.includes(projectNumber); // Include only selected projects
    })
    .map((project) => ({
        title: formatTitle(project),
        name: project,
        image: `assets/${project}.jpg`,
    }));

// Write the data to a JSON file
fs.writeFileSync(
    path.join(__dirname, "projects.json"),
    JSON.stringify(projects, null, 2)
);

console.log("projects.json generated!");

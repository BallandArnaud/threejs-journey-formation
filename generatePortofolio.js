const fs = require("fs");
const path = require("path");

const demoDir = path.join(__dirname, "demo");
const assetsDir = path.join(__dirname, "assets");

const projects = fs
    .readdirSync(demoDir)
    .filter((file) => fs.statSync(path.join(demoDir, file)).isDirectory())
    .map((project) => ({
        name: project,
        image: `assets/${project}.jpg`,
    }));

fs.writeFileSync(
    path.join(__dirname, "projects.json"),
    JSON.stringify(projects, null, 2)
);

console.log("projects.json generated!");

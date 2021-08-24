const path = require("path");
const fs = require("fs-extra");
const execa = require("execa");
const { loadComponent, installDependency } = require("@serverless-devs/core");

const currentPath = process.cwd();

class NuxtComponent {
  async deploy(inputs) {
    const publishPath = path.join(currentPath, ".serverless");
    const fcDeployComponent = await loadComponent("devsapp/fc");
    await fs.ensureDir(publishPath);
    await execa("npx", ["nuxt", "build"]);
    await fs.move(
      path.join(currentPath, ".nuxt"),
      path.join(publishPath, ".nuxt"),
      { overwrite: true }
    );
    await fs.copy(path.join(__dirname, "template"), path.join(publishPath), {});
    await fs.copy(
      path.join(currentPath, "static"),
      path.join(publishPath, "static")
    );
    await fs.copy(
      path.join(currentPath, "./nuxt.config.js"),
      path.join(publishPath, "./nuxt.config.js")
    );
    await installDependency({ cwd: publishPath });
    const result = await fcDeployComponent.deploy(inputs);
    console.log(JSON.stringify(result, null, 2));
  }
}

module.exports = NuxtComponent;

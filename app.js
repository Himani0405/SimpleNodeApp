// const express = require("express");
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const port = 3000;
// app.get("/hello/:id", (req, res) => {
//   res.send(req.params.id);
// });

// app.post("/hello", (req, res) => {
//   const userId = req.body.id;
//   const token = req.body.token;

//   res.send({
//     message: `Received userId ${userId} with token ${token}`,
//   });
// });

// app.listen(port, () => {
//   console.log("Example app listening on port " + port);
// });
import express from "express";
import dotenv from "dotenv";
import { Octokit, App } from "octokit";
const app = express();
app.use(express.json());
dotenv.config();
const port = 3000;
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const workflow_id = process.env.GITHUB_WORKFLOW_ID;

const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_TOKEN });

async function gitLogin() {
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  return login;
}

app.post("/workflow", async (req, res) => {
  const login = await gitLogin();
  const applicationUrl = req.body.payload.deployment.url;
  const result = await octokit.request(
    `POST /repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`,
    {
      owner: owner,
      repo: repo,
      workflow_id: workflow_id,
      data: {
        ref: "master",
        inputs: {
          applicationUrl: applicationUrl,
        },
      },
    }
  );
  console.log(result);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

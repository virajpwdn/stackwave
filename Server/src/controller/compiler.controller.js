const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/ApiError");
const AppResonse = require("../utils/ApiResponse");
const config = require("../config/config");
const axios = require("axios");

module.exports.createSubmissionController = asyncHandler(async (req, res) => {
  const sourceCode = `
  #include <stdio.h>

  int main(void) {
    char name[10];
    scanf("%s", name);
    printf("hello, %s\\n", name);
    return 0;
  }
  `;

  const stdin = "Judge0";

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      wait: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": config.JUDGEO_API_KEY,
      "x-rapidapi-host": config.JUDGEO_HOST,
      "Content-Type": "application/json",
    },
    data: {
      language_id: 52,
      source_code: Buffer.from(sourceCode).toString("base64"),
      stdin: Buffer.from(stdin).toString("base64"),
    },
  };

  try {
    const response = await axios.request(options);
    res.send(response.data); // Contains token
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports.getCodeAnswers = asyncHandler(async (req, res) => {
  // const token = req.query.token; // Expecting client to send token as query param

  // if (!token) return res.status(400).json({ error: "Missing token" });
  const token = "612d53c3-173c-40ea-9d8e-fc8f3cd411a9";

  const options = {
    method: "GET",
    url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": config.JUDGEO_API_KEY,
      "x-rapidapi-host": config.JUDGEO_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    const { stdout, stderr, compile_output, status } = response.data;

    // Decode output fields
    const decodedOutput = stdout
      ? Buffer.from(stdout, "base64").toString()
      : null;

    const decodedError = stderr
      ? Buffer.from(stderr, "base64").toString()
      : null;

    const decodedCompileOutput = compile_output
      ? Buffer.from(compile_output, "base64").toString()
      : null;

    res.send({
      status,
      output: decodedOutput,
      error: decodedError,
      compile_output: decodedCompileOutput,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


# Promptfoo NextJS Viewer

This repository is a template for evaluating LLM prompts with [promptfoo](https://github.com/promptfoo/promptfoo). Instead of relying on it's built-in web-viewer, I have a created a NextJS app that can be used to view the results of the evaluation. The frontend is built using [shadcn/ui](https://ui.shadcn.com/).

## Features

- Commit promptfoo cache to git (for reproducibility)
- View promptfoo evaluation results in a nice dashboard
- Save manual promptfoo evaluation scores in a separate json file (for better comparison)

## Installation

Clone the repository.

```bash
git clone https://github.com/michaelheckmann/promptfoo-nextjs-viewer.git
```

Install the dependencies.

```bash
cd experiments && npm install
cd dashboard && npm install
```

Setup the environment variables.

```bash
cd experiments && cp .env.template .env
```

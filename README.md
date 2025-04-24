# Trae Rule CLI

A command-line tool to download and install [Trae Rules](https://traerules.io) rules directly to your local Trae IDE.

## Installation

There are two ways to use this tool:

### Option 1: Use with npx (recommended)

Run directly without installing using npx:

```bash
npx trae-rule rules add <slug|url>
```

### Option 2: Install globally

```bash
npm install -g trae-rule-cli
```

Then run with:

```bash
trae-rule rules add <slug|url>
```

## Usage

```bash
# Using npx (without installation)
npx trae-rule rules add <slug|url>

# Or if globally installed
trae-rule rules add <slug|url>
```

### Examples

```bash
# Using npx with a slug
npx trae-rule rules add tailwind-css-best-practices

# Using npx with a URL
npx trae-rule rules add https://traerules.io/rules/tailwind-css-best-practices

# Or if installed globally
trae-rule rules add tailwind-css-best-practices
```

## How It Works

This CLI tool:

1. Fetches the rule directly from `traerules.io/[slug]/api`
2. If a URL is provided, extracts the slug from it
3. Saves the rule to `.trae/rules/<slug>.md`

## Available Rules

Visit [traerules.io](https://traerules.io) to browse all available rules.

## Features

- Fetches trae rules directly from the specific API endpoint
- Supports both direct slugs and full URLs
- Saves rules in the proper Markdown format
- Creates the necessary directory structure if it doesn't exist
- Validates the existence of rules before attempting to save

## Contributing

Feel free to submit a Pull Request!

## License

MIT

## Acknowledgments

This project was inspired by [cursor-directory-cli](https://github.com/ericzakariasson/cursor-directory-cli) created by Eric Zakariasson. 
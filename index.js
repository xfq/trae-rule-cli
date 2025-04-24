#!/usr/bin/env node

import { Command } from 'commander';
import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to extract slug from input (could be a URL or a direct slug)
function extractSlug(input) {
  // Check if input is a URL
  if (input.startsWith('http://') || input.startsWith('https://')) {
    // Extract the slug from the URL (everything after the last slash)
    const urlParts = input.split('/');
    return urlParts[urlParts.length - 1];
  }
  
  // If not a URL, assume it's already a slug
  return input;
}

const program = new Command();

program
  .name('trae-rule')
  .description('CLI to interact with traerules.io')
  .version('1.0.0');

// Add 'rules' command with subcommands
const rulesCommand = program.command('rules')
  .description('Manage trae rules')
  .action(() => {
    // Display help for the rules command when it's used without a subcommand
    rulesCommand.help();
  });

// Add 'add' subcommand
rulesCommand.command('add')
  .description('Add a trae rule from traerules.io')
  .argument('<input>', 'Slug or URL of the trae rule to fetch (e.g. "my-rule" or "https://traerules.io/rules/my-rule")')
  .action(async (input) => {
    try {
      const slug = extractSlug(input);
      console.log(`Fetching trae rule with slug: ${slug}`);
      
      // Fetch data directly from the specific API endpoint for this rule
      const response = await fetch(`https://traerules.io/rules/${slug}/api`);
      if (!response.ok) {
        throw new Error(`Failed to fetch from API: ${response.statusText}`);
      }
      
      const json = await response.json();
      
      // Access the rule content from the JSON response
      const content = json.content;
      
      if (!content) {
        throw new Error(`No rule found with slug: ${slug}`);
      }
      
      // Prepare the .trae/rules directory
      const rulesDir = path.join(process.cwd(), '.trae', 'rules');
      await fs.ensureDir(rulesDir);
      
      // Prepare the file content
      const fileContent = `${content.trim()}`;
      
      // Write the file
      const filePath = path.join(rulesDir, `${slug}.md`);
      await fs.writeFile(filePath, fileContent);
      
      console.log(`Successfully saved rule to: ${filePath}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

// Show help if no arguments are provided
if (process.argv.length <= 2) {
  program.help();
}

program.parse(process.argv); 
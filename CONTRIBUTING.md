# Contributing to Markdown Blog

Thanks for your interest in contributing! This project stores blog posts as Markdown files in the `posts/` folder. Below are simple guidelines for new authors.

## What to contribute
- Blog posts in Markdown (`.md` files) only.
- Small fixes to documentation, styling, and templates are also welcome.

## Post file rules
- Place new posts inside the `posts/` directory.
- Filename: use a URL-friendly slug (lowercase, words separated by `-`, ending with `.md`) — e.g. `my-first-post.md`.
- Title: the first line of the file must be a top-level heading used as the post title, e.g. `# My First Post`.
- Content: use standard Markdown. Images may be added as remote URLs or placed under `public/` and referenced by path.

Example `posts/example-post.md`:

```
# Example Post

This is a sample post written in Markdown.

- Use lists, code blocks, and headings as needed.
```

## Running the project locally
1. Install dependencies:

```powershell
npm install
```

2. Start the server:

```powershell
npm start
```

3. Open `http://localhost:3000` and confirm your post appears.

## Submit changes
- Fork the repository (if you don't have push access).
- Create a branch named `feature/add-post-my-title`.
- Add your `.md` file under `posts/` and commit.
- Open a pull request against `main` and describe your post.

## Review & merge
- Keep PR descriptions clear and include any images or assets.
- A maintainer will review and merge when ready.

Thank you for contributing!

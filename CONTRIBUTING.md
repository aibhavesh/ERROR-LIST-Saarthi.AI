# Contributing to CityPlanner

Thanks for your interest in contributing! This project welcomes issues, PRs, and ideas.

## Getting Started
- Read the root README for setup and architecture overview.
- Install dependencies in each package: `backend`, `frontend`, `admin`.
- Configure envs: copy `backend/.env.example` to `backend/.env`.

## Workflow
- Fork the repo and create a feature branch: `feat/<topic>` or `fix/<topic>`.
- Keep changes focused; avoid unrelated modifications.
- Follow existing code style (ESM modules, consistent naming).
- Update documentation and `.env.example` if you add new envs.
- Ensure the backend runs and both frontends build before submitting.

## Commit & PR Guidelines
- Use conventional commits when possible: `feat:`, `fix:`, `chore:`, `docs:`.
- Include a clear description, screenshots or logs when helpful.
- Link related issues with `Closes #<issue-number>` in the PR description.

## Coding Standards
- Security first: validate inputs, handle errors, and avoid secrets in code.
- Use bcrypt for passwords and JWT for auth.
- Respect CORS settings and rate limiting.
- Prefer small, testable functions and clear API contracts.

## Reporting Issues
- Provide steps to reproduce, expected vs actual behavior, and environment details.
- Include stack traces or network logs if relevant.

## Code of Conduct
- Be respectful and constructive. Disagreements are okay; harassment is not.
- Maintain a welcoming environment for contributors of all backgrounds.

Happy building!

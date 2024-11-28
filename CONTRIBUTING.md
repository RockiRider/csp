# Contributing to CSP

Thank you for your interest in contributing! We welcome all contributions, from bug reports and feature requests to documentation improvements and code enhancements. This guide will help you get started.

## Getting Started

### Prerequisites

Make sure you have the following tools installed:
- Node.js
- pnpm (via corepack)

Run `pnpm install` and you should be good to go!

## General Info
All the CSP packages are under `/packages` and these are used inside the vite apps that are housed in `apps`
For development I'd recommend using `pnpm r:dev` which starts up a normal ts-react vite application 

Bear in mind playwright tests run across these applications, so there are some parts of these applications that are crucial to these tests passing.

## Submitting your work
- Be on a new branch with a relevent name e.g `fix/react-type-issues`
- Submit your PR filling out the PR Template and linking to any issues you can




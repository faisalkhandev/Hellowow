# AI-Powered Content Creation and File Manipulation Suite

This project is a comprehensive suite of AI-powered tools for content creation, writing assistance, and file manipulation. It's built using [Next.js](https://nextjs.org) and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

### Writing Tools
- Content Summarizer
- Title Rewriter
- Cold Email Writer
- AI Rephraser
- Translate
- Grammar Fixer
- Business Plan Generator
- Trivia Generator
- AI Detector
- Explain Like I'm Five

### PDF Tools
- PDF Summarizer
- PDF Annotator
- PDF Text Extractor

### Video/Audio Tools
- Audio to Text
- Extract Audio
- Video Format Converters (MP4 to AVI, MP4 to MOV, MP4 to WebM)
- Audio Format Converters (M4A to MP3, MP4 to MP3)
- Add Subtitles

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the pages by modifying files in the `app` directory. The pages auto-update as you edit the files.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form (for some components)

## Project Structure

The project is organized into several main directories:

- `app`: Contains the main pages and routing structure
- `components`: Reusable React components
- `public`: Static assets

Key components include:
- TextEditor
- Form
- DownloadFile
- Rating
- QrCode

## Styling

This project uses Tailwind CSS for styling. Custom styles can be found in the respective component files.

## AI Integration

The application integrates various AI capabilities for content generation and manipulation. Please refer to the individual tool components for specific AI implementations.

## Accessibility

The project includes some accessibility features, such as the use of TooltipButton components. However, there's room for further accessibility enhancements.

## Internationalization

The Translate component suggests potential for internationalization, although full i18n implementation may not be present.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
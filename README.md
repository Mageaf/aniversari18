## Birthday Gift Website

This is a small React + TypeScript site that shows a live countdown to a special moment. When the countdown reaches zero, a gift box can be opened to reveal a photo.

### Running the site

- Install dependencies:
  - `npm install`
- Start the dev server:
  - `npm run dev`
- Build for production:
  - `npm run build`

### Changing the target date and texts

Edit `src/config.ts`:

- `TARGET_DATETIME` – the target moment in ISO format with timezone offset.
- `PAGE_TITLE`, `HEADER_MESSAGE`, `LOCKED_MESSAGE`, `READY_MESSAGE`, `REVEAL_MESSAGE` – texts shown on the page.

### Adding your own photo and sound

Place your media files in the `public` folder:

- `birthday-photo.jpg` – the image that is revealed when the gift is opened.
- `gift-open.mp3` – a short sound that plays when the gift is unwrapped.

By default, the app expects those filenames. You can change them in `src/config.ts` by editing:

- `IMAGE_PATH`
- `OPEN_SOUND_PATH`


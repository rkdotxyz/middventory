# Middventory

A pixel-style inventory of everything in Middla Lab, showing which drawer each part lives in.

It's a static site (plain HTML, CSS and JavaScript), so there's nothing to install or build.

## Project files

```
index.html          the page
css/styles.css      all styling
js/data.js          the parts list and drawer names (edit this one)
js/art.js           the drawings each part's pixel icon is made from
js/app.js           grid, search, tabs and the info tooltip
fonts/              Silkscreen and Pixelify Sans (SIL Open Font License)
favicon.svg         browser tab icon
vercel.json         optional Vercel settings (clean URLs, font caching)
```

## Edit the parts

Open `js/data.js`. Each part is one line:

```js
{ name: "Arduino Uno R3", drawer: 'A1', tab: 'boards', icon: 'uno', count: 7, mark: null, tags: "microcontroller board" },
```

- `drawer` must be one of the codes in `DRAWERS` at the top of the file.
- `tab` is `boards`, `parts`, `tools` or `supplies`.
- `icon` is a drawing name from `js/art.js`. Reuse a similar one when there's no exact match.
- `count` is the number in the slot's corner. Use `null` to hide it.
- `mark` is `null`, `'borrowed'`, `'issue'`, `'broken'` or `'low'`.
- `tags` adds extra search words.

## Preview locally

Open `index.html` in a browser, or run a small server from this folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Put it on GitHub

1. Create a new repository on github.com (for example `middventory`).
2. From this folder:

```
git init
git add .
git commit -m "Middventory first version"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/middventory.git
git push -u origin main
```

You can also drag the files into the repository page using "Add file → Upload files".

## Deploy on Vercel

1. Go to vercel.com and choose **Add New → Project**.
2. Import the `middventory` repository.
3. Leave **Framework Preset** as **Other**, with no build command and the output directory left empty.
4. Click **Deploy**.

Every push to `main` redeploys the site automatically.

## Credits

Fonts: [Silkscreen](https://github.com/googlefonts/silkscreen) and [Pixelify Sans](https://github.com/eifetx/Pixelify-Sans), both under the SIL Open Font License 1.1 (licenses in `fonts/`).

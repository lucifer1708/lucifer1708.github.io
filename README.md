# PortfolioOS

A portfolio that boots like a Linux box: kernel log, tty login, a tiling window manager,
and an interactive zsh-style terminal. Pure HTML/CSS/JS with no build step, so it runs on GitHub Pages as-is.

## Edit your content

Everything comes from **`config.js`**: name, about, skills, projects, experience, contact links and the resume URL.
To add a resume, put `resume.pdf` next to `index.html` and set `resume: "resume.pdf"`.

## Run locally

```bash
python3 -m http.server 8642
```

Then open http://localhost:8642

## Deploy to GitHub Pages

1. Create a repo named `<your-username>.github.io`. That repo serves at `https://<your-username>.github.io`.
2. Push the files:
   ```bash
   git init && git add . && git commit -m "feat: initial portfolio"
   git branch -M main
   git remote add origin git@github.com:<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages → Build and deployment**. Pick **Deploy from a branch**, then `main` and `/ (root)`.
4. Wait about a minute, then open the URL.

You can use any repo name. With another name, the site serves at `https://<your-username>.github.io/<repo>/`.

## Wallpapers (wallhaven.cc)

Every reload and every theme change picks a random SFW anime wallpaper whose colours match the theme. It fades in as a blurred thumbnail, then sharpens when the full-resolution image arrives, and it shifts slightly as the mouse moves. To load a new one, press **Alt+W**, click the 🖼 button in the bar, or run `wallpaper`.

wallhaven's API doesn't allow requests from browsers on other sites (no CORS headers), so the site can't search it directly. Instead, `scripts/fetch-wallpapers.mjs` saves about 45 random matches per theme to `wallpapers.json`, and the page picks from that list. The GitHub Action in `.github/workflows/wallpapers.yml` reruns the script every day and commits a new list. You can also start it by hand from the Actions tab, or run it locally:

```bash
node scripts/fetch-wallpapers.mjs
```

To change which colours or search terms each theme uses, edit `THEMES` in the script. Set `wallpapers: false` in `config.js` to turn wallpapers off.

## Features

### Hyprland-style WM
- Spinning gradient borders on the focused window. Focus follows the mouse, and inactive windows are dimmed. Windows are blurred, see-through and have rounded corners.
- Workspaces slide sideways on switch and windows pop in with spring easing, using Hyprland's `0.05, 0.9, 0.1, 1.05` bezier.
- Floating waybar made of pills. The active workspace pill grows to show its name.
- rofi-style launcher with fuzzy search: **Alt+Space**, **Ctrl/⌘+K** or `/`.
- mako-style toast notifications.
- Fullscreen any window with a double-click on its title bar or **Alt+F**. It animates through the View Transitions API. Press Esc to exit.
- Changing theme reveals the new colours in a circle that grows from the cursor.
- Animated aurora wallpaper with a spotlight that follows the cursor. Window titles scramble in like decoded text. A fake cava visualizer bounces along.
- **Alt+←/→** cycles workspaces.
- Drag a window by its title bar onto another window to rearrange the tiling. The window under the cursor swaps into the dragged window's spot straight away, a dashed outline marks where the dragged window will land, and the other windows glide to their new places. On release, the dragged window settles into its new spot.
- **Shift+drag** floats a window so it can sit anywhere in the workspace. It tilts while you move it. Drag the bottom-right corner to resize a window, which also floats it. Double-click a floating window's title bar, press **Alt+T**, or run `tile` to snap it back into the tiling.

- Boot sequence with a fake kernel log, systemd `[ OK ]` lines and an auto-typed login. Press any key to skip. It plays once per tab session.
- Five workspaces in an i3/polybar-style layout: `1 home`, `2 projects` (ranger), `3 experience` (git log and nvim about.md), `4 testimonials`, `5 contact`.
  The top bar always shows each page's name, every window has a section tag in its title bar, and the home page has big buttons that jump to projects, experience, testimonials and contact.
  Switch with **1–5**, **Alt+1..5**, the top bar, or the `ws <n>` command. Deep links work too: `#projects`, `#experience`, `#testimonials`, `#contact` (old `#about` and `#term` links still work).
- **Settings panel** (⚙ in the bar, **Alt+S**, or `settings`). It has sliders for window blur, opacity, corner radius, gaps, border size, font size, animation speed, and wallpaper dim and blur. It also has theme swatches and on/off switches for CRT, wallpaper, animated borders, focus-follows-mouse, tooltips and the idle lock screen. Settings are saved in the browser.
- **Contact workspace** shows a status card with your live local time (set `status`, `timezone` and `replyTime` in `config.js`). Each link has a copy button and glitches on hover. A compose window opens a prefilled email draft in the visitor's mail app.
- **Hints**: styled tooltips appear on hover. **?** opens a keybind cheatsheet. First-time visitors get a few tip notifications, starting with how to switch pages with 1–5.
- Interactive terminal with tab completion, history (↑/↓), Ctrl+L, Ctrl+C, a virtual filesystem (`ls -la`, `cd`, `cat`) and clickable commands.
- Six themes: `theme matrix | amber | vampire | arctic | retro | cyberpunk`. The choice is saved.
- **Fullscreen**: the ⛶ button in the bar, **Alt+Enter**, the launcher, or the `fullscreen` command puts the whole site in browser fullscreen. Esc exits. The button hides itself on browsers without fullscreen support (iPhone Safari).
- CRT scanlines and flicker, off by default. Turn them on or off with `crt` or in settings.
- Easter eggs (spoilers: `cat .secret`):
  - Terminal commands: `matrix`, `hack`, `sl`, `flip`, `gravity`, `do a barrel roll`, `lolcat`, `fortune | lolcat`, `hire`, `:(){ :|:& };:`, `sudo make me a sandwich`, `sudo rm -rf /`, `xyzzy`, `lock`.
  - Mouse: pet the penguin, click the `>_` logo five times quickly, or shake a window while dragging it.
  - Also: the Konami code, an idle lock screen after 90 seconds, and a message in the devtools console.

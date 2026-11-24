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

- Boot sequence with a fake kernel log, systemd `[ OK ]` lines and an auto-typed login. Press any key to skip. It plays once per tab session.
- Four workspaces in an i3/polybar-style layout: `1 term`, `2 projects` (ranger), `3 about` (nvim and git log), `4 contact` (cowsay).
  Switch with **Alt+1..4**, the top bar, or the `ws <n>` command. Deep links work too: `#projects`, `#about`, `#contact`.
- Interactive terminal with tab completion, history (↑/↓), Ctrl+L, Ctrl+C, a virtual filesystem (`ls -la`, `cd`, `cat`) and clickable commands.
- Six themes: `theme matrix | amber | vampire | arctic | retro | cyberpunk`. The choice is saved.
- CRT scanlines and flicker. Turn them off or on with `crt`.
- Easter eggs: `matrix`, `hack`, `sl`, `sudo rm -rf /`, `cowsay`, `vim`, `exit`, `cat .secret`, and the Konami code.

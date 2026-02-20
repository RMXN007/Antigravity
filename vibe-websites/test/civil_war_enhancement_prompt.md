# Enhancement Prompt: Civil War Fight Scene "Director's Cut"

**Objective:**
Elevate the existing CSS animation into an immersive, interactive experience that mimics a video game or a high-end movie marketing site.

**New Features to Implement:**

1.  **Iron Man's HUD (Heads-Up Display):**
    -   Overlay a JARVIS-style interface on the screen.
    -   **Widgets**: Rotating circles, health diagnostics, and "Target Lock" reticles tracking Captain America.
    -   **Dynamic Data**: Show "Thruster capacity" dropping when he flies, or "Shield Integrity" analysis.

2.  **Immersive Audio:**
    -   Add background dramatic orchestral music (e.g., intense strings).
    -   **SFX**:
        -   Repulsor charge-up (humming sound).
        -   Repulsor blast (laser/cannon sound).
        -   Shield metal clang (impact).
        -   Snow crunching footsteps.

3.  **Interactive "Choose Your Side" Ending:**
    -   Instead of a static "Standoff" ending, pause the fight at a critical moment.
    -   Present two glowing buttons:
        -   **Team Iron Man**: Tony unleashes the Unibeam. Cap is knocked back.
        -   **Team Cap**: Steve performs a shield bash combo. Tony is grounded.
    -   Play a different animation finalé based on the choice.

4.  **Parallax & Depth:**
    -   Separate the background into layers: `Foreground (Snow)`, `Midground (Characters)`, `Background (Silo Walls)`.
    -   Use `mousemove` to shift these layers slightly, creating a slight 3D depth effect as the user moves their mouse.

5.  **Environment Destruction:**
    -   When the blast hits the shield, make pieces of the concrete floor crack or fly up (more complex CSS/JS particles).
    -   Flash lighting should illuminate the back walls to reveal Hydra logos or details.

**Technical Upgrade:**
-   Refactor `script.js` to specific class-based structure `Arena`, `Character`, `Effect`.
-   Use `AudioContext` for sound management (play/pause control).

**Deliverable:**
Update the existing file structure to include these "Director's Cut" features.

# Xiaoxi Du

English academic homepage focused on human–computer interaction, multimodal intent recognition, and virtual reality. Prepared for GitHub Pages using plain HTML, CSS, and JavaScript.

## Publish with GitHub Pages

1. Create a public repository named `Sissie1996.github.io` under the `Sissie1996` GitHub account. If that repository already exists, review its contents before changing anything.
2. Upload the files in this directory directly to the repository root, including `.nojekyll`. `index.html` must be at the top level, not inside another folder.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose **main** and **/ (root)**, then save.
6. Wait for the GitHub Pages deployment to finish and visit `https://sissie1996.github.io/`.

All local page and asset links are relative so the files can also be served under a project path if the hosting configuration changes later.

GitHub Pages documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Edit the website

- `index.html`: Research homepage with the perception–action illustration, four research interests, and the existing research approach.
- `publications.html`: independent Publications page, paper filters, and five patent records. Edit patent titles, inventors, numbers, and historical grant/publication dates directly here.
- `research.css`: the four approved composite line illustrations and their responsive placement beside research interests.
- `research.js`: brief hover, focus, and click animations; respects reduced motion and stops when the page is hidden.
- `LICENSE-LUCIDE.txt`: attribution and license notices for the small Lucide pictograms used in the compositions.
- `pages.css`: Research interests, Publications page framing, patent list, and the shared compact footer.
- `site.js`: footer year and redirects from former homepage section links to the independent pages.
- `about.html`: personal introduction, interests, education, and opportunities; edit the English text directly here.
- `about.css`: the About Me layout and four animated illustrations.
- `about.js`: animation play/pause, reduced-motion preferences, and pausing in background tabs.
- `experience.html`: three selected grants, six selected projects, seven mentored students, and academic service. Edit dates, roles, and English descriptions here. Each project has a “Project overview” followed by “My contribution”.
- `experience.css`: the Experience layout, text-led project rows, and small supporting figures.
- `experience.js`: the keyboard-accessible project image viewer.
- `assets/projects/`: supplied project images and presentation assets. P1 uses an English SVG overview and a detailed vector framework; P4 shows only the upper interface. P6 and P7 are text-only project entries.
- `styles.css`: typography, colors, responsive layout, and print styles.
- `publications.js`: complete publication records, short summaries, and first/corresponding-author flags.
- `figures.js`: the eight author-approved paper figures, descriptions, and source links.
- `assets/publications/`: lossless WebP thumbnails and full-resolution source images.
- `FIGURE-CREDITS.md`: figure numbers and publication sources.
- `app.js`: publication filters, verified paper URLs, CV printing, and the conceptual interaction diagram.
- `cv.html`: English academic CV with browser printing and Save as PDF support.
- `favicon.svg`: browser icon.
- `.nojekyll`: serves the static files without Jekyll processing.

No install or build command is required. Open `index.html` locally to preview. The illustration is conceptual and does not collect gaze or behavior data.

Recent shows the current and previous calendar year (2025–2026 at this update). First / Corresponding Author uses each record’s `first` or `corresponding` flag; these flags describe Xiaoxi Du’s role, not another author’s role. Both views show short summaries and approved images in consistent 3:2 frames, with original proportions preserved. The three records without approved images use full-width text without a placeholder. The keyboard/bare-hand image places its two original panels side by side. Images open in a keyboard-accessible viewer. All Publications shows every record in a compact chronological index with complete author names, years, and links. Author asterisks remain, without an explanatory website footnote. The printable CV uses the same complete author lists and full citations.

Only the website's intended public content is included. The original resume document, local test scripts, and hosting credentials/configuration are excluded.

Experience uses concise English translations of the approved CV entries. Each selected project first explains the project’s purpose under “Project overview”, then describes the author’s role under “My contribution”. Small supporting figures align with the overview on desktop and follow the text on mobile, capped at 280 pixels wide on desktop and 240 pixels on mobile. White frames keep transparent diagrams readable. P1-overview.svg presents the main sequence; P1-framework.svg translates and reorganizes the supplied figure’s process, input/output factors, intervention strategies, domains, and collaboration contexts. P4-interface.svg displays only the upper interface through a fixed SVG viewport over the supplied image; existing masking remains intact. The image viewer and full-size links use these revised figures. The original supplied PNG files remain unchanged in the repository. Mentoring currently uses text entries and can be extended with representative thesis figures later.

The four main navigation destinations are Research (index.html), Publications (publications.html), Experience (experience.html), and About Me (about.html). Each page has its own URL and active navigation state. Legacy homepage links #publications, #experience, #about, and #contact lead to the appropriate page; #research still scrolls to the Research section.

Patent entries use the grant or application-publication year, not the filing year. “Granted” describes the historical grant event and does not assert current legal status. Four grants were checked against the author's CNIPA certificates. The scooter entry uses the grant publication CN110979535B rather than the earlier A publication. The faucet entry credits both designers shown on the certificate. CN118963574A is listed as a published application. Links are supplied for the three retrievable public records; certificate-only records retain their verified numbers without a speculative external link. Certificate scans are not included in the public site. English patent titles are translations of the Chinese titles.

Research interests use the approved composite illustrations: multimodal cue convergence, attention focusing on a target, adaptive interface feedback, and coordination across people and devices. The illustrations are embedded locally with no icon-library or network dependency. Desktop uses small graphics beside the text; on phones the graphic sits next to the title and the description spans the full row. They remain still until hovered, focused, or activated and play once. Reduced-motion visitors receive static illustrations.

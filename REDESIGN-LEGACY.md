# Legacy removal checklist

Old dark-system pieces kept alive only so unrebuilt pages compile. Each line
names the step whose rebuild removes its last caller. Tick it and delete the
code in that step. Delete this file when every box is ticked.

- [ ] `ButtonLink` (components/ui/button.tsx): step 6. Last callers: about, case studies, 404
- [ ] `SectionHeader` (components/ui/primitives.tsx): step 6. Last callers: about, case studies
- [ ] `Eyebrow` (components/ui/primitives.tsx): step 6. Last callers: about, case studies, 404
- [ ] `ScreenshotPanel` (components/ui/primitives.tsx): step 6. Last callers: case studies
- [ ] `CtaBanner` (components/ui/primitives.tsx): step 6. Last callers: about, case studies
- [x] `StatusBadge` (components/ui/primitives.tsx): step 3. Only caller was the hero availability badge
- [ ] `Tag` (components/ui/primitives.tsx): step 6. Last callers: case studies
- [ ] `components/ui/browser-frame.tsx`: step 6. Last caller: AI Resume Analyzer case study

Not on the original list, but the same kind of leftover:

- [ ] `components/reveal.tsx` (scroll reveal, banned by the brief): step 6. Last callers: about, case studies
- [ ] `Card`'s deprecated `level` prop: step 6
- [ ] `components/mockups/forgeroom.tsx` (phone mockup, replaced by diagrams): step 4 on home, step 6 on the ForgeRoom case study

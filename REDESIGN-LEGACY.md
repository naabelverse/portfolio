# Legacy removal checklist

Old dark-system pieces that were kept alive only so unrebuilt pages compiled.
Every box is ticked: this file can be deleted once the redesign branch merges.

- [x] `ButtonLink` (components/ui/button.tsx): removed in steps 5–6
- [x] `SectionHeader` (components/ui/primitives.tsx): removed in steps 5–6, replaced by `SectionIntro`
- [x] `Eyebrow` (components/ui/primitives.tsx): removed in steps 5–6; the brief bans eyebrow labels
- [x] `ScreenshotPanel` (components/ui/primitives.tsx): removed in steps 5–6, replaced by `Screenshot` in components/case-study.tsx
- [x] `CtaBanner` (components/ui/primitives.tsx): removed in steps 5–6, replaced by the cobalt `CaseClose` and `ContactBlock`
- [x] `StatusBadge` (components/ui/primitives.tsx): removed in step 3; its only caller was the hero availability badge
- [x] `Tag` (components/ui/primitives.tsx): removed in steps 5–6, replaced by `Chip`
- [x] `components/ui/browser-frame.tsx`: deleted in steps 5–6; screenshots now sit in a plain bordered figure

Not on the original list, but the same kind of leftover:

- [x] `components/reveal.tsx` (scroll reveal, banned by the brief): deleted in steps 5–6
- [x] `Card`'s deprecated `level` prop: removed in steps 5–6
- [x] `components/mockups/forgeroom.tsx`: deleted in steps 5–6. `PhoneShowcase` was replaced by the ForgeRoom system diagram in step 4. `ArchitectureDiagram` was replaced by `LayerDiagram` in components/case-study.tsx. The three phone screens were drawn mockups in the old dark style; the module rows now carry that content as text, next to the real system diagram

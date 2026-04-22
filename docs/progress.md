# Progress Log

## Current Status
- Phase 1 is complete in code.
- App starts successfully with Expo in `LAN` mode.
- `Tunnel` mode currently fails due to an ngrok outage/error (external service issue).

## What We Built (Phase 1)
- Expo + React Native (TypeScript) project initialized.
- Basic app structure created: `src/screens`, `src/components`, `src/utils`, `src/context`, `src/types`.
- Date-based task flow implemented:
  - selected day display
  - previous/next day navigation + `Today` shortcut
  - input and add task button
  - per-day task list
  - remove task action

## Why This Matters
- You already have a working core loop: pick date -> add task -> see only that date’s tasks.
- The code is intentionally simple now, but structured for upcoming phases.

## How To Run (Android + Expo Go)
1. Open terminal in project root.
2. Run: `npm run start -- --lan --port 8095`
3. Open Expo Go on Android and scan QR.
4. If QR fails, press `s` in terminal (switch connection) and retry.

## Quick Debug Checklist
- Ensure phone and PC are on the same Wi-Fi (for LAN mode).
- Update Expo Go app on phone.
- If port conflict appears, run with a new port (example `--port 8096`).
- If terminal shows CI mode, start from a fresh terminal and run again.
- If Tunnel is needed later, retry when ngrok service is healthy.

## Next Step
- Phase 2: add task type selector (`MUST_DO` / `OPTIONAL`) and improve UI clarity.

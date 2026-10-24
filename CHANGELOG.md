# Changelog

Every release of Wynfall Desktop, newest first. Written for the person using the app, not for the person who built it.

Versions are dates in the sense that matters: what changed, and what it means when you open it.

## 0.98.0

**Long tasks stop getting cut off.**

- Streaming thinking now folds when a step ends. A running command shows a ticking clock and the tail of its output, the status line names the step it is on, and the stream keeps a heartbeat so you can tell it is still working.
- A turn can now run 500 tool steps, or 1000 at Max effort. Context is compacted between rounds instead of ending the turn, a shell command can run up to 30 minutes, and a stretch of silence ends in a Continue button rather than a failure. Continue appears on every pause.
- The Changes panel opens on its own at most once per chat, and never outside a git repository. The run stats box closes on a second click, Escape, or a click outside it.

## 0.97.0

**The default model is the right one.**

- Sigel is the default for every plan and every role. A model with no serving host is never picked automatically.
- Connector results keep their structured data and their errors. Picking a tool shows its full schema, and paged tool lists load completely.

## 0.96.0

- You can steer a reply while it is still being written.
- Each connected plan's models carry their own mark in the picker, so you can tell at a glance where a model came from.

## 0.95.0

- User badges appear beside names.

## 0.94.0

- The session rail: a right-hand column of compact cards for Environment, Context, Connectors, Outputs, Changes and Background tasks. Each card summarises something the app already had and opens that view. The Session button in the chat header toggles it, and the choice is remembered. It is on by default at 1280 pixels wide and up.
- The Context ring and the rail now share one usage calculation, so the two numbers cannot disagree.
- Line counts from git show on the Changes card.
- The line under the title on the startup screen is centered. It was about 33 pixels off.

## 0.93.0

- Models from a connected plan fill in the picker by themselves, in the background, so they appear without opening Settings. A look that finds nothing stops the lookup and waits longer before trying again.
- A provider connected with a key lists its models newest first, by the provider's own dates, before the 16 model cap. A long list now drops the oldest instead of dropping at random.
- New setting: show recent models in the picker. Off by default. Picks are recorded either way, so turning it on shows what you have used, and Favorites stay on top.

## 0.92.0

- Multi-agent runs get more room: the lead and workers get 24 tool rounds before they must hand off, and scouts and reviewers get 12, up from 8 for everyone. The out-of-rounds note reports that agent's own limit rather than a shared one.
- When a model writes its next tool call as plain text instead of making the call, the step names the call it did not run and ends as partial. The raw markup is never shown.

## 0.91.0

**Runs stay running, and report honestly.**

- A long run is no longer cut off after three minutes. An empty reply is asked for once more. A run that ends with open tasks is shown as partial, with those tasks listed, and is never shown as done.
- A run has a 60 minute clock and a spend budget. A parked run resumes where it stopped.
- Every worker that changed files gets a reviewer.
- A busy service or a dropped connection is retried with backoff. A prompt that is too long is compacted once and asked again.
- When a drawing is written, it is rendered in an invisible window with no network, measured, and the result handed back to the model, so a finished picture is checked before it is called finished. A model that cannot see gets a description or measured facts instead.
- The model list decides whether a picture can be sent. A refusal marks only that model, and a rejected draft is kept rather than lost.

---

Notes for earlier versions are in the hands of the people who ran them. This file starts when the repository did.

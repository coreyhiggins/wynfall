# Changelog

Every release of Wynfall Desktop, newest first. Written for the person using the app.

## 0.98.0

**Long tasks finish instead of stopping halfway.**

- When the model is working, you can see it working: what step it is on, and that it is still alive rather than hung.
- Long tasks now have much more room before they have to pause, and a pause is a button you press to continue rather than a failure. This matters most on big refactors and long documents.
- The Changes panel no longer opens over your work uninvited. It shows up once at most, and not at all in folders that are not a git repository.

## 0.97.0

- Sigel is the default, everywhere, on every plan. A model that cannot actually serve a request is never chosen for you.
- Connectors are sturdier. Tool results keep their structure and their errors instead of flattening into text, and a long list of tools now loads completely.

## 0.96.0

- You can steer a reply while it is still being written.
- Each connected plan is marked in the model picker, so you can see where a model came from at a glance.

## 0.95.0

- Names in a chat can carry a badge.

## 0.94.0

- The session rail: a column of compact cards down the right side, one for each part of a running session. Each card summarises something the app already had and opens that view when clicked. Toggle it from the header, and the choice is remembered.
- The context indicator and the rail now read from the same calculation, so they cannot disagree.
- Line counts from git appear on the Changes card.
- The line under the title on the startup screen is centered. It was off by a noticeable margin.

## 0.93.0

- Models from a connected plan appear in the picker on their own, without opening Settings first.
- A provider connected with a key lists its newest models first, by the provider's own dates, so a long list no longer drops the recent ones at random.
- New setting: show recent models in the picker. Off by default. Turning it on puts what you have used near the top, with Favorites still above that.

## 0.92.0

- Delegated work gets more room to finish before it has to report back, and the report now names which part ran out rather than blaming the whole task.
- When a model describes an action instead of taking it, the step says so plainly and the run is marked partial. Raw markup is never shown to you.

## 0.91.0

**Runs stay running, and report honestly.**

- A long run is no longer cut off partway through. A run that ends with work still open is shown as partial, with that work listed, and is never shown as finished.
- A parked run picks up where it stopped rather than starting over.
- Anything that changed files gets reviewed before you see it as done.
- A busy service or a dropped connection is retried. A prompt that is too long is shortened once and asked again, instead of failing.
- A finished picture is checked before it is called finished.
- A rejected draft is kept rather than lost.

---

Notes for earlier versions stay internal. This file starts with the first release worth telling you about.

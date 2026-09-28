export class UserError extends Error {}

// Never surface raw SDK or prover exceptions: they may include witness material.
export function safeError(error: unknown): string {
  if (import.meta.env.DEV) console.error("[parity]", error);
  if (error instanceof UserError) return error.message;
  const message = error instanceof Error ? error.message : "";
  const known: [RegExp, string][] = [
    [/reject|denied|cancel/i, "The request was declined in your wallet. Nothing was submitted."],
    [/Organizer authorization/i, "This organizer file does not control this report. Import the file saved when it was created."],
    [/Already disputed/i, "You have already filed a dispute for this report. Each employee can file one."],
    [/not registered|Credential path/i, "This employee file is not registered for this report. Ask HR for your packet."],
    [/Disputes are only accepted/i, "Disputes are only accepted while the check window is open."],
    [/Resolve every open dispute/i, "Resolve every open dispute before closing the check window."],
    [/Records do not match/i, "The payroll in your organizer file differs from what was committed. Import the file that matches this report."],
    [/Category already published/i, "This category has already been proven."],
    [/Close the check window/i, "Close the check window before proving categories."],
    [/Payroll is frozen/i, "The payroll is frozen: proving has started."],
    [/registration is closed/i, "Employees can only be registered before the check window opens."],
    [/already registered/i, "Some of these employees are already registered."],
    [/Commit at least one category/i, "Commit at least one category before opening the check window."],
    [/fetch|network|ECONN|timeout|timed out/i, "The indexer or your local proof server did not respond. If you approved a transaction, check its status before retrying."],
  ];
  for (const [pattern, text] of known) if (pattern.test(message)) return text;
  return "The operation did not complete. Check your wallet, the Preview network and your local proof server. Nothing has been confirmed.";
}

export function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new UserError(message)), ms);
    }),
  ]).finally(() => clearTimeout(timer));
}

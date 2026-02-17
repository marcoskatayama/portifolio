export const logger = (message: string, ...args: any[]) => {
  let formatted = message;
  args.forEach((arg) => {
    formatted = formatted.replace("%s", arg);
  });
  console.log(`[${new Date().toISOString()}] ${formatted}`);
};

const colors = {
  reset: "\x1b[0m",
  info: "\x1b[36m",    // Ciano
  success: "\x1b[32m", // Verde
  warn: "\x1b[33m",    // Amarelo
  error: "\x1b[31m",   // Vermelho
  debug: "\x1b[90m",   // Cinza
};

type LogLevel = "info" | "success" | "warn" | "error" | "debug";

export const logger = (level: LogLevel, message:string, ...args:any[]) =>{
  let formatted = message;

  args.forEach((arg)=>{
    formatted = formatted.replace("%s", arg);
  });

  const timestamp = new Date().toISOString();
  const color = colors[level] || colors.reset;

  // Imprime: [DATA] [NIVEL] MENSAGEM (Colorido)
  console.log(
    `${colors.debug}[${timestamp}]${colors.reset} ` +
    `${color}[${level.toUpperCase()}]${colors.reset} ` +
    `${formatted}`
  );
}

import "dotenv/config";

export function getConfig() {
  return {
    name: process.env.name,
    env: process.env.env,
    port: Number(process.env.port),
    username: process.env.username,
  };
}

if (import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  setInterval(() => {
    console.log(getConfig());
  }, 5000);
}

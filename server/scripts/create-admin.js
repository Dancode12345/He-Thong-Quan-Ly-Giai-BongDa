const readline = require("node:readline/promises");
const bcrypt = require("bcryptjs");
const db = require("../database");

async function askHidden(message) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    if (!stdin.isTTY || !stdin.setRawMode) {
      reject(new Error("Hãy chạy script trong Terminal tương tác của VS Code."));
      return;
    }
    let result = "";
    process.stdout.write(message);
    stdin.setRawMode(true);
    stdin.resume();
    const handleKey = (buffer) => {
      const value = buffer.toString("utf8");
      if (value === "\r" || value === "\n") {
        stdin.removeListener("data", handleKey);
        stdin.setRawMode(false);
        process.stdout.write("\n");
        resolve(result);
      } else if (value === "\u0003") {
        process.exit(130);
      } else if (value === "\u007f" || value === "\b") {
        if (result) {
          result = result.slice(0, -1);
          process.stdout.write("\b \b");
        }
      } else {
        for (const char of value) {
          if (char.charCodeAt(0) >= 32) {
            result += char;
            process.stdout.write("*");
          }
        }
      }
    };
    stdin.on("data", handleKey);
  });
}

(async () => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const username = (await rl.question("Tên đăng nhập: ")).trim();
  const name = (await rl.question("Tên hiển thị: ")).trim();
  const role = (await rl.question("Vai trò (admin hoặc btc): ")).trim().toLowerCase();
  rl.close();

  if (!username || !name || !["admin", "btc"].includes(role)) {
    throw new Error("Tên đăng nhập, tên hiển thị hoặc vai trò không hợp lệ.");
  }
  const secret = await askHidden("Mật khẩu mạnh (tối thiểu 12 ký tự): ");
  if (secret.length < 12) throw new Error("Mật khẩu phải có ít nhất 12 ký tự.");
  const hash = await bcrypt.hash(secret, 12);

  await new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (username, password, role, name) VALUES (?, ?, ?, ?)",
      [username, hash, role, name],
      (error) => error ? reject(error) : resolve()
    );
  });
  console.log(`Đã tạo tài khoản ${role}: ${username}`);
})().catch((error) => {
  console.error("Không thể tạo tài khoản:", error.message);
  process.exitCode = 1;
}).finally(() => db.close());

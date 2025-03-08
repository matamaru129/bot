import { createBot, getBotIdFromToken, startBot, sendMessage } from "@discordeno/mod.ts";
import "$std/dotenv/load.ts";

// Botのトークンを.envから取得
const BotToken: string = Deno.env.get("BOT_TOKEN")!;

// 送信先チャンネルのIDを指定
const channelId = "1343926776757354579"; // ここにチャンネルIDを設定

// ボットの作成
const bot = createBot({
    token: BotToken,
    botId: getBotIdFromToken(BotToken) as bigint,

    // イベント発火時に実行する関数など
    events: {
        // 起動時
        ready: (_bot, payload) => {
            console.log(`${payload.user.username} is ready!`);
        },

        // メッセージ受信時
        messageCreate: async (_bot, message) => {
            // メッセージが「フォート」と一致する場合
            if (message.content === "フォート") {
                // メッセージを送信
                await sendMessage(message.channelId, {
                    content: "ナイト"
                });
            }
        }
    }
});

// ボットを起動
await startBot(bot);

Deno.cron("Continuous Request", "*/2 * * * *", () => {
    console.log("running...");
});

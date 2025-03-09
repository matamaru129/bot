import { createBot, getBotIdFromToken, startBot, sendMessage } from "@discordeno/mod.ts";
import "$std/dotenv/load.ts";

// Botのトークンを.envから取得
const BotToken: string = Deno.env.get("BOT_TOKEN")!;
// プレフィックス「Bot 」を取り除く
const cleanToken = BotToken.replace(/^Bot /, "");
// 送信先チャンネルのIDを指定
const channelId = "1343926776757354579"; // ここにチャンネルIDを設定

// ボットの作成
const bot = createBot({
    token: cleanToken,  // プレフィックスを削除したトークンを使用
    botId: getBotIdFromToken(cleanToken) as bigint,
    // イベント発火時に実行する関数など
    events: {
        // 起動時
        ready: (_bot, payload) => {
            console.log(`${payload.user.username} is ready!`);
            
            // 10秒ごとに「ナイト」と送信する
            setInterval(async () => {
                await sendMessage(channelId, { content: "ナイト" });
                console.log("Message sent: ナイト");
            }, 10000); // 10000ミリ秒 = 10秒
        },
        // メッセージ受信時
        messageCreate: async (_bot, message) => {
            // メッセージが「フォート」と一致する場合
            if (message.content === "フォート") {
                // メッセージを送信
                await sendMessage(message.channelId, { content: "ナイト" });
            }
        }
    }
});

// ボットを起動
await startBot(bot);

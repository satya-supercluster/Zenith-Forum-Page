import cron from "cron";
import https from "https";

const backendUrl = "https://zenith-forum-page.onrender.com/api/cron";

const job = new cron.CronJob("*/5 * * * *", function () {
  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Successfully hit backend endpoint. Server is active.");
      } else {
        console.error(`Failed to hit endpoint. Status code: ${res.statusCode}`);
      }
    })
    .on("error", (err) => {
      console.error("Error during HTTPS request:", err.message);
    });
});

job.start();

export { job };

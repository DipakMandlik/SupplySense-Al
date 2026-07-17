import { notifications } from "@/data/insights";
import { delay } from "./utils";

export const notificationService = {
  async getNotifications() {
    return delay(notifications);
  },
};

import { userQueue } from
  "../src/infrastructure/queues/bullmq/bullmq.client";

import {
  USER_QUEUE_CONSTANTS,
} from
  "../src/infrastructure/constants/queue/user-queue.constants";

const testQueue = async (): Promise<void> => {
  await userQueue.add(
    USER_QUEUE_CONSTANTS.SYNC_UPDATED_USER,
    {
      postgresId: "1",
      
      updates: {
        status: "ACTIVE",
      }
    }
  );

  console.log(
    "Test queue job added"
  );

  process.exit(0);
};

testQueue().catch((error) => {
  console.error(error);

  process.exit(1);
});
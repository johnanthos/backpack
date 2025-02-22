import { Chain } from "@coral-xyz/zeus";

import { AUTH_HASURA_URL, AUTH_JWT } from "../config";

const chain = Chain(AUTH_HASURA_URL, {
  headers: {
    Authorization: `Bearer ${AUTH_JWT}`,
  },
});

export const getSubscriptions = async (uuid: string) => {
  return chain("query")({
    auth_notification_subscriptions: [
      {
        where: { uuid: { _eq: (uuid as string) || "" } },
        limit: 5,
      },
      {
        username: true,
        endpoint: true,
        expirationTime: true,
        p256dh: true,
        auth: true,
        id: true,
      },
    ],
  });
};

export const deleteSubscription = (id: number) => {
  return chain("mutation")({
    delete_auth_notification_subscriptions_by_pk: [
      {
        id,
      },
      {
        id: true,
      },
    ],
  });
};

export const insertNotification = (
  xnftId: string,
  uuid: string,
  { title, body }: { title: string; body: string }
) => {
  return chain("mutation")({
    insert_auth_notifications_one: [
      {
        object: {
          title,
          body,
          uuid,
          xnft_id: xnftId,
          timestamp: new Date(),
          username: "",
          image: "",
        },
      },
      {
        id: true,
      },
    ],
  });
};

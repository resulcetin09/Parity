// Direct reads from the public indexer's GraphQL API, for facts the SDK's
// PublicDataProvider does not expose (which transaction produced an action).
export interface ObservedAction {
  kind: string;
  txHash: string;
  blockHeight: number;
  blockTime: string;
  status: string;
}

async function query<T>(url: string, gql: string, variables: object): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: gql, variables }),
  });
  const body = (await response.json()) as { data?: T; errors?: { message: string }[] };
  if (!response.ok || body.errors?.length || !body.data)
    throw new Error(body.errors?.[0]?.message ?? `Indexer returned ${response.status}`);
  return body.data;
}

const ACTION = `
  __typename
  transaction {
    hash
    block { height timestamp }
    ... on RegularTransaction { transactionResult { status } }
  }`;

type Action = {
  __typename: string;
  transaction: {
    hash: string;
    block: { height: number; timestamp: number };
    transactionResult?: { status: string };
  };
} | null;

const observed = (a: NonNullable<Action>): ObservedAction => ({
  kind: a.__typename,
  txHash: a.transaction.hash,
  blockHeight: a.transaction.block.height,
  blockTime: new Date(a.transaction.block.timestamp).toISOString(),
  status: a.transaction.transactionResult?.status ?? "unknown",
});

/** The most recent action on a contract (its deployment, if nothing else happened yet). */
export async function latestAction(url: string, address: string) {
  const data = await query<{ contractAction: Action }>(
    url,
    `query($a: HexEncoded!) { contractAction(address: $a) { ${ACTION} } }`,
    { a: address },
  );
  return data.contractAction ? observed(data.contractAction) : null;
}

/** The contract's action as of a given block, used to re-check a recorded one. */
export async function actionAtBlock(url: string, address: string, height: number) {
  const data = await query<{ contractAction: Action }>(
    url,
    `query($a: HexEncoded!, $h: Int!) { contractAction(address: $a, offset: { blockOffset: { height: $h } }) { ${ACTION} } }`,
    { a: address, h: height },
  );
  return data.contractAction ? observed(data.contractAction) : null;
}

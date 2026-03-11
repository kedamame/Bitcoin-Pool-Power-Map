import { NextResponse } from "next/server";
import { fetchPoolsData } from "@/lib/fetchPools";

export const revalidate = 3600;

export type BtcPool = {
  name: string;
  share: number;
  blocks24h: number;
  hashrateEHs: number;
  country: string;
  website: string;
};

export async function GET() {
  const data = await fetchPoolsData();
  return NextResponse.json(data);
}

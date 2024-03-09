  //→クエリ引数として、 CompetitionEntry.superpowerID を取得
//→ Superpower のモデルの中の SuperPower.id が CompetitionEntry.superpowerID と一致するレコードを指定
//→ 一致したレコードの  Superpower.year を引数 year にアップデート

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// 更新するための入力データのスキーマを定義
const UpdateSchema = z.object({
  newYear: z.number(), // 更新する年
});

type Params = {
    params: {
      id: string
    }
  }

export const POST = async (request: Request, {params: { id } }: Params) => {
  try {
    const competitionEntries = await prisma.competitionEntry.findMany(
        {
            where: {
                competitionId: id
            }
        }
    )
    const superpowerIDs = competitionEntries.map((entry) => entry.superpowerId)    
    // リクエストボディからJSONデータを取得
    const rawData = await request.json();


    // データのバリデーション
    const { newYear } = UpdateSchema.parse(rawData);

    // 更新処理
        const updatedSuperpowers = await prisma.superpower.updateMany({
          where: { id: {in: superpowerIDs }},
          data: { year: newYear },
        })


    // 成功したレスポンスを返す
    return NextResponse.json({ updatedSuperpowers });
  } catch (error) {
    // エラーハンドリング
    console.error("Error updating superpowers:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update superpowers" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
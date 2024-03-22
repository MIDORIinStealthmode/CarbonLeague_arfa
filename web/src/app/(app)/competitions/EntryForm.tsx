'use client'

import { NftCard } from "@/app/(app)/common/NftCard"
import { CompetitionEntryRequestBody } from "@/app/api/competitions/[id]/entry/schema"
import { useMySuperpowers } from "@/hooks/useSuperpower"
import {Competition, CompetitionEntry, Superpower} from "@/lib/schema/zod"
import { useMutation } from "@tanstack/react-query"
import {FormEvent, useState} from "react";
import {Button} from "@/components/ui/button";
import {SheetClose} from "@/components/ui/sheet";

type Props = {
  competition: Competition
  entries: (CompetitionEntry & { superpower: Superpower })[] | null
}

export const EntryForm = (props: Props) => {
  const { competition } = props
  const { data: nfts } = useMySuperpowers()
  const [token1, setToken1] = useState<string | null>(props.entries && props.entries[0]?.superpower.tokenId?.toString() || null)
  const [token2, setToken2] = useState<string | null>(props.entries && props.entries[1]?.superpower.tokenId?.toString() || null)
  const [token3, setToken3] = useState<string  | null>(props.entries && props.entries[2]?.superpower.tokenId?.toString() || null)
  const invalid = !token1 || !token2 || !token3
  const [submitted, setSubmitted] = useState(false)

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: CompetitionEntryRequestBody) => fetch(`/api/competitions/${competition.id}/entry`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: "include",
    }).then((res) => res.json()),
  })

  const onSelect = (tokenId: string) => {
    if ([token1, token2, token3].includes(tokenId)) {
      return
    }
    if (!token1) {
      setToken1(tokenId)
    } else if (!token2) {
      setToken2(tokenId)
    } else if (!token3) {
      setToken3(tokenId)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!token1 || !token2 || !token3) {
      return alert('3つのスーパーパワーを選択してください')
    } else {
      const data: CompetitionEntryRequestBody = {
        tokenIds: [token1, token2, token3],
      }

      mutate(data, {
        onSuccess: () => {
          setSubmitted(true)
        }
      })
    }
  }

  return (
    <div className="flex h-full">
      {submitted ? (
        <div className="flex flex-col gap-8 flex-1 justify-center items-center">
          <h1 className="text-2xl font-bold">エントリーが完了しました！</h1>
            <SheetClose asChild>
              <Button size="lg" className="w-80 h-20 text-2xl">
                一覧に戻る
              </Button>
            </SheetClose>
        </div>
      ) : (
        <form
          className="flex flex-1 h-full"
          onSubmit={onSubmit}
        >
          <div className="flex gap-4 flex-wrap w-1/3 h-full overflow-y-scroll border-r">
            {(nfts || []).map((nft) => (
              <div key={nft.metadata.id} onClick={() => onSelect(nft.metadata.id)} className="pointer">
                <NftCard key={nft.metadata.id} nft={nft}/>
              </div>
            ))}
            {isLoading && <NftCard />}
          </div>

          <div className="flex flex-col items-center flex-1 p-8">
            <div className="flex gap-4 items-center justify-center flex-1 h-max">
              {nfts && (
                <>
                  <div onClick={() => setToken1(null)} className="pointer">
                    <NftCard nft={nfts.find((nft) => nft.metadata.id === token1)} />
                  </div>
                  <div onClick={() => setToken2(null)} className="pointer">
                    <NftCard nft={nfts.find((nft) => nft.metadata.id === token2)} />
                  </div>
                  <div onClick={() => setToken3(null)} className="pointer">
                    <NftCard nft={nfts.find((nft) => nft.metadata.id === token3)} />
                  </div>
                </>
              )}
            </div>

            <div>
              <Button
                disabled={invalid || isLoading}
                loading={isLoading}
                type="submit"
                size="lg"
                className="w-80 h-20 text-2xl"
              >Submit Entry</Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

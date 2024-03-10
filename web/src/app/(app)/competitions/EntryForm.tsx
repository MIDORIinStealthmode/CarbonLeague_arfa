'use client'

import { NftCard } from "@/app/(app)/common/NftCard"
import { CompetitionEntryBodySchema, CompetitionEntryRequestBody } from "@/app/api/competitions/[id]/entry/schema"
import { useMySuperpowers } from "@/hooks/useSuperpower"
import { Competition } from "@/lib/schema/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import {FormEvent, useState} from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {SheetClose} from "@/components/ui/sheet";

type Props = {
  competition: Competition
}

export const EntryForm = (props: Props) => {
  const { competition } = props
  const router = useRouter()
  const { data: nfts } = useMySuperpowers()
  const [token1, setToken1] = useState<string>()
  const [token2, setToken2] = useState<string>()
  const [token3, setToken3] = useState<string>()
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
          alert('エントリーしました')
          setSubmitted(true)
        }
      })
    }
  }

  return (
    <div className="flex h-full">
      {submitted ? (
        <div className="flex flex-col gap-8 flex-1 justify-center items-center">
          <h1>エントリーが完了しました！</h1>
          <SheetClose>
            一覧に戻る
          </SheetClose>
        </div>
      ) : (
        <form
          className="flex flex-1 h-full"
          onSubmit={onSubmit}
        >
          <div className="flex gap-4 flex-wrap w-1/3 h-full overflow-y-scroll border-r">
            {(nfts || []).map((nft) => (
              <div onClick={() => onSelect(nft.metadata.id)} className="pointer">
                <NftCard key={nft.metadata.id} nft={nft}/>
              </div>
            ))}
            {isLoading && <NftCard />}
          </div>

          <div className="flex flex-col items-center flex-1 p-8">
            <div className="flex gap-4 items-center justify-center flex-1 h-max">
              {nfts && (
                <>
                  <div onClick={() => setToken1(undefined)} className="pointer">
                    <NftCard nft={nfts.find((nft) => nft.metadata.id === token1)} />
                  </div>
                  <div onClick={() => setToken2(undefined)} className="pointer">
                    <NftCard nft={nfts.find((nft) => nft.metadata.id === token2)} />
                  </div>
                  <div onClick={() => setToken3(undefined)} className="pointer">
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
                className="w-80 h-20"
              >Submit</Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/im";
import Link from "next/link";
import {useUser} from "@thirdweb-dev/react";
import {Skeleton} from "@/components/ui/skeleton";
import {useMySuperpowers} from "@/hooks/useSuperpower";

const Item = (props: { isLoading: boolean, complete: boolean, disable: boolean, title: string, description: string, link?: string }) => {
  if (props.isLoading) {
    return (
      <li className={"flex space-x-2 animate-pulse"}>
        <Skeleton className="w-6 h-6"/>
        <div>
          <Skeleton className="w-24 h-6"/>
          <Skeleton className="w-48 h-5 mt-1"/>
        </div>
      </li>
    )
  }

  return (
    <li className={"flex space-x-2"} style={{ filter: props.disable ? 'opacity(0.5)' : undefined }}>
      {props.complete ? <ImCheckboxChecked size={24} className="text-teal-400 hover:text-teal-300" /> : <ImCheckboxUnchecked size={24} className="text-teal-400 hover:text-teal-300" />}
      <div>
        <p className="font-bold underline">
          {(props.link && !props.disable) ? <Link href={props.link}>{props.title}</Link> : props.title}
        </p>
        <p>
          {props.description}
        </p>
      </div>
    </li>
  )
}

export const OnboardingChecklist = () => {
  const { isLoggedIn, isLoading: loginIsLoading } = useUser()
  const { data, isLoading: superpowerIsLoading } = useMySuperpowers()

  const isLoading = loginIsLoading || superpowerIsLoading

  const login = isLoggedIn
  const superpower = data?.length || 0
  const competition = false
  const shop = false

  const steps = [
    { title: 'ログインする', description: '右上のSign Up & Sign Inからログインをしよう', link: '/profile', complete: login },
    { title: `Superpowerを3つ購入する(${superpower}/3)`, description: 'ETHかクレジットカードでお気に入りのSuperpowerを購入しよう', link: '/marketplace', complete: superpower > 2 },
    { title: 'コンペにエントリーする', description: 'Tutorial CompetitionにエントリーしてRewardを受け取ろう', link: '/competitions', complete: competition },
    { title: 'ショップに出品する', description: 'Superpowerを出品してみよう', link: '/profile', complete: shop },
  ]

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Onboarding Checklist</CardTitle>
        <CardDescription>最初のステップをクリアして環境に貢献しよう！</CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-4">
          {steps.map((step, index) => {
            const disable = step.complete || (index !== 0 && !steps[index - 1].complete)
            return <Item key={index} isLoading={isLoading} title={step.title} description={step.description} link={step.link} complete={step.complete} disable={disable} />
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

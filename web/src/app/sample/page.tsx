import {Button} from "@/components/ui/button";
import {Loader, Loader2, Mail} from "lucide-react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

export default function Home() {
  return (
    <main>
      <h1>コンポーネントサンプルページ</h1>
      <Card>
        <CardHeader>Button</CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              ボタン
            </Button>
            <Button variant="secondary" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="sm" disabled>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              ボタン
            </Button>
            <Button variant="outline" size="lg">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ボタン
            </Button>
            <Button variant="ghost">ボタン</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

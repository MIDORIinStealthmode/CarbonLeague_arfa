import prisma from "@/lib/prisma";
import {Prisma} from ".prisma/client";
import SuperpowerCreateInput = Prisma.SuperpowerCreateInput;
import {undefined} from "zod";
import SuperpowerCreateArgs = Prisma.SuperpowerCreateArgs;

export default function AdminSuperpowersPage() {
  async function create(formData: FormData) {
    'use server'

    const data: SuperpowerCreateInput = {
      nftId: formData.get('nftId') as number,
      name: formData.get('name') as string,
      category: {
        connect: {
          id: formData.get('categoryId') as string
        }
      },
      company: {
        connect: {
          id: formData.get('companyId') as string
        }
      },
      rank: formData.get('rank') as number,
      score: formData.get('score') as number,
      year: formData.get('year') as number,
    }

    const superpower = await prisma.superpower.create({
      data
    })
    
    return superpower
  }

  return (
    <div>

    </div>
  );
}

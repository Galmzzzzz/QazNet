import Profile from "@/components/Profile"
import { prisma } from "@/utils/prisma"

type Props = {
  params: { id: string }
}

import { Prisma } from "@prisma/client";

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    posts: {
      include: {
        likes: true;
        author: true;
      };
    };
    likes: true;
  };
}>;

export default async function Profile_Page({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      posts: {
        include: {
          likes: true,
          author: true,
        },
      },
      likes: true,
    },
  });

  if (!user) return <div>Пользователь не найден</div>;

  return <Profile user={user} />;
}

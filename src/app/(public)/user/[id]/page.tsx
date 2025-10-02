import { prisma } from "@/utils/prisma";
import Profile from "@/components/Profile";
export default async function UserPage({ params }: { params: { id: string } }) {
  // Загружаем пользователя и его посты
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    return <div className="text-center text-gray-400 mt-10">Пользователь не найден</div>;
  }

  return <Profile user={user} />;
}

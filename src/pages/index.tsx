import { Button } from '@/components/ui/Button'
import { useAppStore } from '@/store/useStore'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { FiMinus, FiPlus } from 'react-icons/fi'

export default function Home() {
  const { count, increment, decrement } = useAppStore();

  const handleClick = () => {
    toast.success('操作成功！');
  };

  return (
    <>
      <Head>
        <title>我的项目</title>
        <meta name="description" content="基于 Next.js 的前端项目" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="mb-8 text-4xl font-bold">Next.js 项目示例</h1>

        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => {
              decrement();
              handleClick();
            }}
            variant="outline"
          >
            <FiMinus className="mr-2" /> 减少
          </Button>

          <span className="text-2xl">{count}</span>

          <Button
            onClick={() => {
              increment();
              handleClick();
            }}
          >
            <FiPlus className="mr-2" /> 增加
          </Button>
        </div>

        <p className="text-center text-gray-500">使用 Next.js、React 18、TypeScript、Tailwind CSS、Zustand 构建</p>
      </main>
    </>
  );
}

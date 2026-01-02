import { MainNav } from "./components/layout/nav";
import { Link } from "react-router";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col ">
      <header>
        <MainNav />
      </header>
      <main className="flex-1 flex items-center justify-center">
        <section className="flex flex-col items-center justify-center py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 mb-4 text-center">
            PixiJS와 함께하는
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              React 튜토리얼 따라하기
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone-700 dark:text-stone-200 max-w-xl text-center mb-8">
            이 프로젝트는<span className="font-semibold">PixiJS</span>와{" "}
            <span className="font-semibold">React</span>를 활용하여 PixiJS의
            튜토리얼을 리액트로 변환해보면서 익히는 과정을 기록하는
            프로젝트입니다.
          </p>
          <Button asChild variant="outline">
            <Link to="/start">탐색하기 🚀</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}

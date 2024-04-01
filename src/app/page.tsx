import { ChatPluggin } from "@/components/chat-pluggin";

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <h1 className="text-5xl font-bold text-center">Hello, Welcome to Our website</h1>
      <ChatPluggin/>
    </main>
  );
}

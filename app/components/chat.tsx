'use client';

import { Button } from '@/components/ui/button';
import { useChat } from '@ai-sdk/react';
import { useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'api/chat',
    onError: (e) => {
      console.log(e);
      console.log('what');
    },
  });
  const chatParent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    handleSubmit(event); // Call the handleSubmit function from useChat hook with the event object
  };

  return (
    <main className="flex flex-col w-full h-screen max-h-dvh bg-black">
      <section className="container px-4 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
        <p className="mt-6 text-xl text-gray-500 font-semibold mb-4">
          CHAT TO KNOW MORE ABOUT CHRIS
        </p>
        <ul
          ref={chatParent}
          className="h-96 p-4 flex-grow rounded-lg overflow-y-auto flex flex-col gap-4"
        >
          {messages.map((m, index) => (
            <div key={index}>
              {m.role === 'user' ? (
                <li key={m.id} className="flex justify-start">
                  <div className="rounded-lg py-2 px-4 bg-blue-100 text-sm text-gray-800 max-w-[70%] break-words">
                    {m.content}
                  </div>
                </li>
              ) : (
                <li key={m.id} className="flex justify-end">
                  <div className="rounded-lg py-2 px-4 mb-2 bg-green-100 text-sm text-gray-800 max-w-[70%] break-words">
                    {m.content}
                  </div>
                </li>
              )}
            </div>
          ))}
        </ul>
      </section>

      <footer className="p-4 w-full max-w-3xl mx-auto">
        <form
          onSubmit={handleFormSubmit}
          className="flex w-full max-w-3xl mx-auto items-center"
        >
          <Textarea
            className="text-gray-500"
            value={input}
            placeholder="Type your message here."
            onChange={handleInputChange}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent new line in textarea
                handleSubmit(e); // Call handleSubmit function on Enter press and pass the event object
              }
            }}
          />
          <Button type="submit" className="ml-3 h-16 w-20">
            <Send />
          </Button>
          {/* <Button className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Submit
          </Button> */}
        </form>
      </footer>
    </main>
  );
}

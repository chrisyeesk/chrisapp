'use client';

import { Button } from '@/components/ui/button';
import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { BotMessageSquare, Send } from 'lucide-react';

export function Chat() {
  const [showExampleQuestions, setShowExampleQuestions] = useState(true);
  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat({
      api: 'api/chat',
      onError: (e) => {
        console.log(e);
      },
    });
  const chatParent = useRef<HTMLUListElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event);
  };

  const handleClickQuestion = (question: string) => {
    setInput(question);
    setShowExampleQuestions(false);
    setTimeout(() => {
      if (formRef.current) {
        const submitEvent = new Event('submit', {
          bubbles: true,
          cancelable: true,
        });
        formRef.current.dispatchEvent(submitEvent);
      }
    }, 0);
  };

  const handleTextareaKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in textarea
      setShowExampleQuestions(false);
      handleSubmit(e); // Call handleSubmit function on Enter press and pass the event object
    }
  };

  return (
    <main className="flex flex-col w-full h-screen max-h-dvh bg-black">
      <section className="container px-4 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
        <div className="flex mt-3 items-center">
          <BotMessageSquare size={36} className="text-gray-400 pt-1" />
          <p className="ml-2 pb-2 mt-5 text-xl text-gray-400 font-semibold mb-2">
            Chris' AI Assistant
          </p>
        </div>
        <ul
          ref={chatParent}
          className="h-96 flex-grow rounded-lg overflow-y-auto flex flex-col gap-4"
        >
          <li className="flex justify-end">
            <div className="mb-1 rounded-lg py-3 px-5 bg-gray-600 text-sm text-white max-w-[70%] break-words">
              Hi there! I am Chris' AI assistant. Ask me anything about Chris'
              education background, work experience and skills.
            </div>
          </li>
          {messages.map((m, index) => (
            <div key={index}>
              {m.role === 'user' ? (
                <li key={m.id} className="flex justify-start">
                  <div className="mb-1 rounded-lg py-3 px-5 bg-gray-800 text-sm text-white max-w-[70%] break-words">
                    {m.content}
                  </div>
                </li>
              ) : (
                <li key={m.id} className="flex justify-end">
                  <div className="mb-1 rounded-lg py-3 px-5 bg-gray-600 text-sm  text-white max-w-[70%] break-words">
                    {m.content}
                  </div>
                </li>
              )}
            </div>
          ))}
        </ul>
      </section>

      <footer className="p-4 mb-4 w-full max-w-3xl mx-auto">
        {showExampleQuestions && (
          <>
            <section className="mb-2 gap-3 flex">
              <div
                onClick={() =>
                  handleClickQuestion('What did Chris Study for University?')
                }
                className="w-1/2 h-30 sm:h-20 py-3 px-4 text-sm text-left items-center align-middle rounded-md border border-gray-600 bg-gray-900 hover:bg-gray-800 "
              >
                <div className="text-gray-100">Example Question 1:</div>
                <div className="text-gray-400">
                  What did Chris Study for University?
                </div>
              </div>
              <div
                onClick={() =>
                  handleClickQuestion(
                    'What programming language is Chris proficient in?'
                  )
                }
                className="w-1/2 h-30 sm:h-20 py-3 px-4 text-sm text-left items-center align-middle rounded-md border border-gray-600 bg-gray-900 hover:bg-gray-800 "
              >
                <div className="text-gray-100">Example Question 2:</div>
                <div className="text-gray-400">
                  What programming language is Chris proficient in?
                </div>
              </div>
            </section>
            <section className="mb-4 gap-3 flex">
              <div
                onClick={() =>
                  handleClickQuestion(
                    'What did Chris Learn in his software engineering internship at Sincidium?'
                  )
                }
                className="w-1/2 h-30 sm:h-20 py-2 px-4 text-sm text-left items-center align-middle rounded-md border border-gray-600 bg-gray-900 hover:bg-gray-800 "
              >
                <div className="text-gray-100">Example Question 3:</div>
                <div className="text-gray-400">
                  What did Chris Learn in his software engineering internship at Sincidium?
                </div>
              </div>
              <div
                onClick={() =>
                  handleClickQuestion(
                    'What did Chris Learn during his internship as a frontend developer at Webby Group?'
                  )
                }
                className="w-1/2 h-30 sm:h-20 py-2 px-4 text-sm text-left items-center align-middle rounded-md border border-gray-600 bg-gray-900 hover:bg-gray-800 "
              >
                <div className="text-gray-100">Example Question 4:</div>
                <div className="text-gray-400">
                  What did Chris Learn during his internship as a frontend developer at Webby Group?
                </div>
              </div>
            </section>
          </>
        )}
        <form
          onSubmit={handleFormSubmit}
          className="flex w-full max-w-3xl mx-auto items-center"
          ref={formRef}
        >
          <Textarea
            className="text-gray-400"
            value={input}
            placeholder="Type your message here."
            onChange={handleInputChange}
            onKeyDown={handleTextareaKeyDown}
            style={{ touchAction: 'manipulation' }} // Prevent zooming on touch devices
          />
          <Button type="submit" className="ml-3 h-[60px] w-[60px]">
            <Send />
          </Button>
        </form>
        <div className="text-gray-400 text-xs flex mt-3 mb-2 justify-center">
          Response from my AI Assistant does not represent my stance.
        </div>
      </footer>
    </main>
  );
}

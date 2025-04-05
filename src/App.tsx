import { KeyboardEvent, useEffect, useState } from "react"
import ListTask from "./components/ListTask"

export interface ITask {
  task: string
  isChecked: boolean
}

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>(JSON.parse(localStorage.getItem("tasks") || '[]'))
  const [currentTask, setCurrentTask] = useState<string>("")

  const handleAddTask = () => {
    if (currentTask !== '') {
      setTasks([...tasks, { task: currentTask, isChecked: false }])
      setCurrentTask("")
    }
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask()
    }
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <main className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-300 to-pink-700">
      <section className="rounded-xl py-10 px-6 border border-blue/100 bg-white/10 backdrop-blur-md shadow-xl w-[30rem]">
        <h1 className="text-2xl font-semibold text-center text-white mb-2">Buat Tugas di To do List Website</h1>
        <div className="flex gap-2 mb-2 w-full">
          <input
            type="text"
            value={currentTask}
            onKeyDown={handleEnter}
            onChange={(e) => setCurrentTask(e.target.value)}
            placeholder="Masukan Tugas Anda"
            className="outline-none bg-white/20 rounded-md px-2 py-1 text-white/80 w-full"
          />
          <button
            onClick={handleAddTask}
            className="border border-white/30 px-2 cursor-pointer rounded-md text-white bg-red-800 hover:bg-orange-500"
          >+</button>
        </div>
        <ul>
          {tasks.map((item, idx) => {
            return (
              <ListTask
                key={idx}
                item={item}
                listIdx={idx}
                tasks={tasks}
                setTasks={setTasks}
              />
            )
          })}
        </ul>
      </section>
    </main>
  )
}

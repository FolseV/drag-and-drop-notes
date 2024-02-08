import { DragEvent, useState } from "react";
import "./App.css";

type TTodo = {
  id: number;
  message: string;
  index: number;
};

function App() {
  const [todoItem, setTodoItem] = useState<TTodo | null>(null);
  const [todo, setTodo] = useState<TTodo[]>([
    {
      id: 1,
      message: "lorem5 d gkdugfkuygs dugdksg fkds guf sg fksdgf ksdg kfugskduygf fusdg ",
      index: 1,
    },
    {
      id: 2,
      message: "second note",
      index: 2,
    },
    {
      id: 3,
      message: "third note",
      index: 3,
    },
    {
      id: 4,
      message: "fourth note",
      index: 4,
    },
  ]);

  function onDrageOverHandler(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    if (e.currentTarget.className === "itemTodo") {
      e.currentTarget.style.boxShadow = "0 2px 2px 2px white";
    }
  }
  function onDragLeaveHandler(e: DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.boxShadow = "none";
  }
  function onDragStartHandler(e: DragEvent<HTMLDivElement>, item: TTodo): void {
    setTodoItem(item);
  }
  function onDragEndHandler(e: DragEvent<HTMLDivElement>): void {
    e.currentTarget.style.boxShadow = "none";
  }
  function onDropHandler(e: DragEvent<HTMLDivElement>, item: TTodo): void {
    e.preventDefault();
    setTodo((prev) =>
      [...prev].map((key) => {
        if (key.id === item.id && todoItem) {
          return { ...key, index: todoItem.index };
        }
        if (todoItem && key.id === todoItem.id) {
          return { ...key, index: item.index };
        }
        return key;
      })
    );
    e.currentTarget.style.boxShadow = "none";
  }

  return (
    <>
      <h1 className="todoTitle">Notes</h1>
      <div className="todoList">
        {todo.length &&
          todo
            .sort((a, b) => a.index - b.index)
            .map((item) => {
              return (
                <div
                  key={item.id}
                  className="itemTodo"
                  draggable={true}
                  onDragOver={(e) => onDrageOverHandler(e)}
                  onDragLeave={(e) => onDragLeaveHandler(e)}
                  onDragStart={(e) => onDragStartHandler(e, item)}
                  onDragEnd={(e) => onDragEndHandler(e)}
                  onDrop={(e) => onDropHandler(e, item)}
                >
                  <p className="todoText">{item.message}</p>
                  <div className="todoButtons">
                    <button>edit</button>
                    <button>delete</button>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
}

export default App;

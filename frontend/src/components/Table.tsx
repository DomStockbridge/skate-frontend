import { useEffect, useState } from "react";
import type { IGetTricksResponse, IUpdateTrick, ITrick } from "../types";

function Table() {
  const [tricks, setTricks] = useState<ITrick[]>([])

  async function getTricks() {
    // const url = process.env.BASE_URL
    try {
      const response = await fetch("http://localhost:3030/api/tricks");

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json() as IGetTricksResponse;
      console.log("Data Received ✅", result.tricks)

      if (result.error || !result.tricks) {
        throw new Error(`Response status: ${response.status}`);
      }

      setTricks(result.tricks)
    } catch (error: any) {
      console.error(error.message);
    }
  }


  async function updateTrick(trick: ITrick) {
    // const url = process.env.BASE_URL
    try {
      const response = await fetch(`http://localhost:3030/api/tricks/${trick.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...trick, done: !trick.done }),
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json() as IUpdateTrick;

      if (!result.trick) {
        throw new Error(`Response status: ${response.status}`);
      }

      const trickIndex = tricks.findIndex(trickAttr => trickAttr.id === trick.id)
      const tricksToUpdate = [...tricks]
      tricksToUpdate.splice(trickIndex, 1, result.trick)

      setTricks(tricksToUpdate)
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTricks()
  }, [])

  async function handleDelete(trick: ITrick) {
    try {
      const response = await fetch(`http://localhost:3030/api/tricks/${trick.id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      setTricks(prev => prev.filter(t => t.id !== trick.id))
    } catch (error: any) {
      console.error(error.message)
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Difficulty</th>
          <th>Done</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {tricks.slice(0, 10).map((trick) => (
          <tr key={trick.id}>
            <td>{trick.id}</td>
            <td>{trick.name}</td>
            <td>{trick.category}</td>
            <td>{trick.difficulty}</td>
            <td>
              <button onClick={() => updateTrick(trick)}>{trick.done ? '✅' : '❌'}</button>
            </td>
            <td>
              <button onClick={() => handleDelete(trick)}>❌</button>
            </td>
            
        </tr>
        )
        )}
      </tbody>
    </table>

  )
}

export default Table


import { useEffect, useState } from "react";
import type { IGetTricksResponse, IUpdateTrick, ITrick } from "../types";

function Table() {
  const [tricks, setTricks] = useState<ITrick[]>([])
  const [visibleTricks, setVisibleTricks] = useState(10)

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

  function showMore() {
    setVisibleTricks(prev => prev + 5)
    console.log(tricks)
  }

  function showLess() {
    setVisibleTricks(prev => prev - 5)
    console.log(tricks)
  }

  const visibleTricksArray = tricks.slice(0, visibleTricks)

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th className="large-column">Name</th>
            <th>Category</th>
            <th>Difficulty</th>
            <th className="large-column">Done</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {visibleTricksArray.map((trick) => (
            <tr key={trick.id}>
              <td>{trick.id}</td>
              <td className="trick-name">{trick.name}</td>
              <td>{trick.category}</td>
              <td>{trick.difficulty}</td>
              <td>
                <button
                  onClick={() => updateTrick(trick)}
                  className={trick.done ? "landed" : "not-landed"}
                >{trick.done ? 'Landed' : 'Not yet Landed'}
                </button>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(trick)}>Delete</button>
              </td>
            </tr>
          )
          )}
        </tbody>
      </table>
      <div className="show-more-or-less-container">
        <button onClick={showMore}>Show More</button>
        {visibleTricks <= 10 ? "" : <button onClick={showLess}>Show Less</button>}
      </div>
    </>
  )
}

export default Table


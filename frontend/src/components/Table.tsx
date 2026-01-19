import React from "react"
import type { ITrick } from "../types/types"

function Table({ tricks, onDelete, onUpdate }: {
  tricks: ITrick[]
  setTricks: React.Dispatch<React.SetStateAction<ITrick[]>>
  onDelete: (trick: ITrick) => void
  onUpdate: (trick: ITrick) => void
}) {

  function handleDeleteClick(trick: ITrick) {
    onDelete(trick)
  }

  const [visibleTricks, setVisibleTricks] = React.useState(10)

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
                  onClick={() => onUpdate(trick)}
                  className={trick.done ? "landed" : "not-landed"}
                >{trick.done ? 'Landed' : 'Not yet Landed'}
                </button>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteClick(trick)}>Delete</button>
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


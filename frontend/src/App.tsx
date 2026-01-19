import Table from './components/Table'
import Header from "./components/Header"
import DeletedTricks from "./components/DeletedTricks"
import React from "react"
import type { IGetTricksResponse, IUpdateTrick, ITrick } from "./types/types";


function App() {

  const [tricks, setTricks] = React.useState<ITrick[]>([])
  const [deletedTricks, setDeletedTricks] = React.useState<ITrick[]>([])

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
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
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getTricks()
  }, [])

  const [deletedTricksShowing, setDeletedTricksShowing] = React.useState(false)

  function showDeletedTricks() {
    setDeletedTricksShowing(prev => !prev)
  }

  function handleDelete(trick: ITrick) {
    setTricks(prev => prev.filter(t => t.id !== trick.id))

    setDeletedTricks(prev => [...prev, trick])
  }

  function recoverTrick(trick: ITrick) {
    setTricks(prevTricks => [...prevTricks, trick])
    setDeletedTricks(prevDeleted => prevDeleted.filter(t => t.id !== trick.id))
  }


  return (
    <>

      <Header showDeletedTricks={showDeletedTricks} />
      <Table
        tricks={tricks}
        setTricks={setTricks}
        onDelete={handleDelete}
        onUpdate={updateTrick}
      />
      {deletedTricksShowing && (
        <DeletedTricks
          tricks={deletedTricks}
          onClose={showDeletedTricks}
          onRecover={recoverTrick}
        />
      )}
    </>
  )
}
export default App

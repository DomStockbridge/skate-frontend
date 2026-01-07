import type { ITrick } from "../types/index"

export default function DeletedTricks({
    tricks,
    onClose
}: {
    tricks: ITrick[]
    onClose: () => void
}) {
    return (
        <div className="overlay">
            <div className="modal">
                <h2>Deleted Tricks</h2>

                {tricks.length === 0 ? (
                    <p>No deleted tricks</p>
                ) : (
                    <table>
                        <tbody>
                            {tricks.map(trick => (
                                <tr key={trick.id}>
                                    <td>{trick.name}</td>
                                    <td>
                                        <button>Recover</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

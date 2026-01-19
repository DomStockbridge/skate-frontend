import type { ITrick } from "../types/types"

type Props = {
    tricks: ITrick[]
    onClose: () => void
    onRecover: (trick: ITrick) => void
}

export default function DeletedTricks({
    tricks,
    onClose,
    onRecover
}: Props) {
    return (
        <div className="overlay">
            <div className="modal">
                <h2>Deleted Tricks</h2>
                <table>
                    <tbody>
                        {tricks.map(trick => (
                            <tr key={trick.id}>
                                <td>{trick.name}</td>
                                <td>
                                    <button onClick={() => onRecover(trick)}>
                                        Recover
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}


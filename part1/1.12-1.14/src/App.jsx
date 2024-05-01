import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const points = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(points)
  const switchAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const handleVoting = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const maxVotes = votes.indexOf(Math.max(...votes))

  return (
    <div className='p-8'>
      {anecdotes[selected]}
      <br />
      <p>This anecdote has {votes[selected]} votes.</p>
      <br />
      <button className='p-2 border-black border-2 rounded-xl mr-2' onClick={handleVoting}>Add Vote</button>
      <button className='p-2 border-black border-2 rounded-xl' onClick={switchAnecdote}>Next anecdote </button>
      <h1 className='font-bold text-xl'>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotes]}</p>
      <p>has {votes[maxVotes]} votes!</p>
    </div>
  )
}

export default App
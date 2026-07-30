import { GitHubCalendar } from 'react-github-calendar'

const Calendar = ({ username }) => {
  return (
    <section id="next-steps" className="py-16 bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">GitHub Activity</h2>
      <div className="flex justify-center overflow-x-auto w-full max-w-4xl p-4">
        <GitHubCalendar
          username={username}
          labels={{
            totalCount: '{{count}} contributions',
          }}
          blockSize={12}
          blockMargin={4}
          colorScheme="light"
        />
      </div>
    </section>
  )
}
export default Calendar 
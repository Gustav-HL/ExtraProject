import { GitHubCalendar } from 'react-github-calendar'
import './Calendar.css'

const Calendar = ({ username }) => {
  return (
    
    <section id="next-steps" className="py-20 bg-transparent flex flex-col items-center justify-center ">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-fit mx-auto overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">My GitHub Activity</h2>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-medium text-black-600 hover:text-teal-700 hover:underline transition-colors flex items-center gap-1 shrink-0"
          >
            Check my GitHub 
          </a>
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
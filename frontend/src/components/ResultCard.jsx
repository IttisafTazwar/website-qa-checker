function ResultCard({ title, status, items, emptyMessage }) {
  const statusStyles = {
    pass: 'bg-green-50 border-green-200',
    warn: 'bg-yellow-50 border-yellow-200',
    fail: 'bg-red-50 border-red-200',
  }

  const badgeStyles = {
    pass: 'bg-green-100 text-green-700',
    warn: 'bg-yellow-100 text-yellow-700',
    fail: 'bg-red-100 text-red-700',
  }

  const badgeText = {
    pass: 'Pass',
    warn: 'Warning',
    fail: 'Fail',
  }

  return (
    <div className={`rounded-xl border p-6 ${statusStyles[status]}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${badgeStyles[status]}`}>
          {badgeText[status]}
        </span>
      </div>
      {items && items.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {items.map((item, index) => (
            <li key={index} className="text-sm text-gray-700 bg-white rounded-lg px-4 py-2 border border-gray-100">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      )}
    </div>
  )
}

export default ResultCard
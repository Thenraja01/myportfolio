export function ContactTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  rows = 4,
  required = true,
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-xs font-mono font-semibold text-slate-800 dark:text-slate-300">
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full p-4 rounded-2xl bg-white/80 dark:bg-slate-950/70 border text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 shadow-sm transition-all ${
          error ? "border-red-500/50" : "border-indigo-200/80 dark:border-slate-800/90 focus:border-purple-500"
        }`}
      />

      {error && (
        <p id={`${name}-error`} className="text-xs text-red-500 dark:text-red-400 font-mono mt-1 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
}

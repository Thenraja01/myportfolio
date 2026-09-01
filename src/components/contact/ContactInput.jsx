import { User, Mail, MessageSquare } from "lucide-react";

export function ContactInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = true,
  autocomplete,
}) {
  const getIcon = () => {
    if (name === "name") return <User size={16} className="text-indigo-500 dark:text-slate-500" />;
    if (name === "email") return <Mail size={16} className="text-indigo-500 dark:text-slate-500" />;
    return <MessageSquare size={16} className="text-indigo-500 dark:text-slate-500" />;
  };

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-xs font-mono font-semibold text-slate-800 dark:text-slate-300">
        {label}
      </label>

      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none">
          {getIcon()}
        </div>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autocomplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/80 dark:bg-slate-950/70 border text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 shadow-sm transition-all ${
            error ? "border-red-500/50" : "border-indigo-200/80 dark:border-slate-800/90 focus:border-purple-500"
          }`}
        />
      </div>

      {error && (
        <p id={`${name}-error`} className="text-xs text-red-500 dark:text-red-400 font-mono mt-1 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
}

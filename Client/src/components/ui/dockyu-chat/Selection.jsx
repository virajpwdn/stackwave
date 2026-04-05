import { useState } from "react";

import Container from "../../Container";

const DEFAULT_DOCUMENTS = ["C++", "DevOps", "HTML", "SQL", "Git", "Python"];

const DOC_META = {
  "C++": { icon: "⚙️", desc: "Systems & performance programming" },
  DevOps: { icon: "🔧", desc: "CI/CD, Docker, Kubernetes & more" },
  HTML: { icon: "🌐", desc: "Web structure & semantics" },
  SQL: { icon: "🗄️", desc: "Databases, queries & schemas" },
  Git: { icon: "🌿", desc: "Version control & workflows" },
  Python: { icon: "🐍", desc: "Scripting, ML & general purpose" },
};

const Selection = ({ onStart }) => {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [link, setLink] = useState("");
  const [linkAdded, setLinkAdded] = useState(false);
  const [linkError, setLinkError] = useState("");

  const toggleDoc = (doc) => {
    setSelectedDocs((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const isValidUrl = (val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddLink = () => {
    if (!link.trim()) return setLinkError("Please enter a URL.");
    if (!isValidUrl(link.trim()))
      return setLinkError("Enter a valid URL (include https://).");
    setLinkError("");
    setLinkAdded(true);
  };

  const handleRemoveLink = () => {
    setLink("");
    setLinkAdded(false);
    setLinkError("");
  };

  const canStart = selectedDocs.length > 0 || linkAdded;

  const handleStart = () => {
    if (!canStart) return;
    onStart?.({ selectedDocs, customLink: linkAdded ? link : null });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f6f2] px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-stone-500 shadow-sm">
            Knowledge Base
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight text-stone-800">
            What do you want
            <br />
            to explore today?
          </h1>
          <p className="mt-3 text-sm text-stone-500">
            Pick from our indexed library or bring your own document link.
          </p>
        </div>

        {/* Custom Link Section */}
        <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
            Your Document
          </p>

          {!linkAdded ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setLinkError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleAddLink()}
                placeholder="https://docs.example.com/..."
                className={`flex-1 rounded-xl border bg-stone-50 px-4 py-2.5 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-2 focus:ring-stone-200 ${
                  linkError
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-stone-200"
                }`}
              />
              <button
                onClick={handleAddLink}
                className="rounded-xl bg-stone-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 active:scale-95"
              >
                Add
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex-shrink-0 text-base text-emerald-500">
                  ✓
                </span>
                <span className="truncate text-sm font-medium text-emerald-700">
                  {link}
                </span>
              </div>
              <button
                onClick={handleRemoveLink}
                className="ml-3 flex-shrink-0 text-xs text-stone-400 transition hover:text-red-400"
              >
                Remove
              </button>
            </div>
          )}

          {linkError && (
            <p className="mt-2 text-xs text-red-500">{linkError}</p>
          )}
        </div>

        {/* Divider */}
        <div className="relative mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-stone-200" />
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">
            or choose from library
          </span>
          <div className="h-px flex-1 bg-stone-200" />
        </div>

        {/* Default Documents Grid */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {DEFAULT_DOCUMENTS.map((doc) => {
            const isSelected = selectedDocs.includes(doc);
            return (
              <button
                key={doc}
                onClick={() => toggleDoc(doc)}
                className={`group relative rounded-2xl border p-4 text-left transition-all duration-150 active:scale-95 ${
                  isSelected
                    ? "border-stone-800 bg-stone-800 shadow-md"
                    : "border-stone-200 bg-white hover:border-stone-400 hover:shadow-sm"
                }`}
              >
                {/* Checkmark */}
                {isSelected && (
                  <span className="absolute right-3 top-3 text-xs text-stone-300">
                    ✓
                  </span>
                )}
                <div className="mb-2 text-2xl">{DOC_META[doc].icon}</div>
                <p
                  className={`text-sm font-semibold ${isSelected ? "text-white" : "text-stone-700"}`}
                >
                  {doc}
                </p>
                <p
                  className={`mt-0.5 text-xs leading-snug ${isSelected ? "text-stone-400" : "text-stone-400"}`}
                >
                  {DOC_META[doc].desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selection Summary + CTA */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-stone-400">
            {selectedDocs.length > 0 || linkAdded ? (
              <span className="text-stone-600">
                <span className="font-semibold text-stone-800">
                  {selectedDocs.length + (linkAdded ? 1 : 0)}
                </span>{" "}
                source
                {selectedDocs.length + (linkAdded ? 1 : 0) !== 1 ? "s" : ""}{" "}
                selected
              </span>
            ) : (
              "No sources selected yet"
            )}
          </p>

          <button
            onClick={handleStart}
            disabled={!canStart}
            className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-150 active:scale-95 ${
              canStart
                ? "bg-stone-800 text-white shadow-md hover:bg-stone-700"
                : "cursor-not-allowed bg-stone-200 text-stone-400"
            }`}
          >
            Start Chatting →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selection;

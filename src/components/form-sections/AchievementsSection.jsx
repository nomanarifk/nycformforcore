import React from "react";
import { PlusCircle, Award, Calendar, X, ChevronRight } from "lucide-react";
import FormError from "../ui/FormError";

export default function AchievementsSection({
  data,
  errors,
  onChange,
  onStartAdding,
  onCancelAdding,
  onPendingChange,
}) {
  const MAX = 5;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const {
    entries = [],
    otherAchievements = "",
    _addingEntry = false,
    _pendingName = "",
    _pendingYear = currentYear,
  } = data;

  const handleAdd = () => {
    if (!_pendingName.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: _pendingName.trim(),
      year: _pendingYear,
    };

    onChange({
      ...data,
      entries: [...entries, newEntry],
      _addingEntry: false,
      _pendingName: "",
    });
  };

  const handleRemove = (idx) => {
    const copy = [...entries];
    copy.splice(idx, 1);
    onChange({ ...data, entries: copy });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-secondary-800 flex items-center gap-2">
          <Award className="text-primary-600" size={22} />
          <span>Awards & Certifications</span>
          <span className="text-sm text-secondary-500 font-normal ml-1">
            ({entries.length}/{MAX})
          </span>
        </h3>

        {!_addingEntry && entries.length < MAX && (
          <button
            onClick={onStartAdding}
            className="flex items-center gap-1 text-sm font-medium px-1.5 md:px-3 py-1.5 text-primary-600 bg-primary-50 rounded-full hover:bg-primary-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200"
          >
            <PlusCircle size={12} />
            <span className="hidden md:block">Add New</span>
          </button>
        )}
      </div>

      {/* Add Achievement Form */}
      {_addingEntry && (
        <div className="mb-6 bg-primary-50 p-4 rounded-lg border border-primary-100 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-secondary-800">Add Achievement</h4>
            <button
              onClick={onCancelAdding}
              className="text-secondary-500 hover:text-secondary-700"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 bg-white rounded-lg border border-secondary-200 p-2 focus-within:ring-2 focus-within:ring-primary-200 focus-within:border-primary-300">
              <Award className="text-secondary-400 ml-1" size={18} />
              <input
                type="text"
                value={_pendingName}
                onChange={(e) => onPendingChange(e.target.value, _pendingYear)}
                onKeyDown={handleKeyDown}
                placeholder="Award or certification name"
                className="flex-grow py-1 px-2 bg-transparent focus:outline-none text-secondary-800"
                autoFocus
              />
            </div>

            <div className="flex items-center gap-2 bg-white rounded-lg border border-secondary-200 p-2 focus-within:ring-2 focus-within:ring-primary-200 focus-within:border-primary-300">
              <Calendar className="text-secondary-400 ml-1" size={18} />
              <select
                value={_pendingYear}
                onChange={(e) => onPendingChange(_pendingName, +e.target.value)}
                className="flex-grow py-1 px-2 bg-transparent focus:outline-none text-secondary-800 appearance-none"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronRight
                className="text-secondary-400 rotate-90"
                size={18}
              />
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={onCancelAdding}
                className="px-4 py-2 text-sm border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!_pendingName.trim()}
                className={`px-4 py-2 text-sm rounded-lg flex items-center gap-1 transition-all duration-200 ${
                  _pendingName.trim()
                    ? "bg-primary-600 text-white hover:bg-primary-700"
                    : "bg-primary-300 text-white cursor-not-allowed"
                }`}
              >
                <PlusCircle size={16} />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of entries */}
      {entries.length > 0 ? (
        <ul className="space-y-3 mb-6">
          {entries.map((e, i) => (
            <li
              key={e.id}
              className="p-4 flex justify-between items-center rounded-lg border border-secondary-200 bg-white hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary-100 text-primary-600">
                  <Award size={18} />
                </div>
                <div>
                  <p className="font-medium text-secondary-800">{e.name}</p>
                  <p className="text-sm text-secondary-500 flex items-center gap-1 mt-1">
                    <Calendar size={14} />
                    {e.year}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(i)}
                className="ml-4 p-2 text-secondary-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                aria-label="Remove"
              >
                <X size={18} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-secondary-500 py-8 mb-6 border border-dashed border-secondary-300 rounded-lg bg-secondary-50">
          <Award size={28} className="text-secondary-400" />
          <p className="text-center">No achievements added yet.</p>
          {!_addingEntry && (
            <button
              onClick={onStartAdding}
              className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Add your first achievement
            </button>
          )}
        </div>
      )}

      {errors?.entries && <FormError message={errors.entries} />}
      {errors?._pendingName && <FormError message={errors._pendingName} />}

      {/* Other Achievements */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-secondary-800 mb-3 flex items-center gap-2">
          <span>Other Achievements</span>
          <span className="text-sm text-secondary-500 font-normal">
            (Optional)
          </span>
        </h3>
        <textarea
          value={otherAchievements}
          onChange={(e) =>
            onChange({ ...data, otherAchievements: e.target.value })
          }
          rows={4}
          className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-all duration-200"
          placeholder="List any additional achievements or honors..."
        />
      </div>
    </div>
  );
}

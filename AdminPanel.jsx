import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Save, X, Edit3 } from 'lucide-react';

const AdminPanel = ({ isEditMode, toggleEditMode, onSave, onCancel, hasUnsavedChanges }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Control Bar - Only visible in Edit Mode */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-gray-200 pointer-events-auto flex flex-col gap-3 min-w-[200px]"
          >
            <div className="flex items-center justify-between border-b pb-2 mb-1">
              <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" />
                Edit Mode Active
              </span>
            </div>
            
            <p className="text-xs text-gray-500 mb-2">
              Click on any dashed text to edit content.
            </p>

            <div className="flex gap-2">
              <button
                onClick={onCancel}
                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={onSave}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all shadow-md flex items-center justify-center gap-2 ${
                  hasUnsavedChanges 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={toggleEditMode}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`pointer-events-auto w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 border-2 ${
          isEditMode 
            ? "bg-gray-800 text-white border-gray-700 rotate-180" 
            : "bg-white text-gray-800 border-gray-100 hover:border-blue-200"
        }`}
      >
        {isEditMode ? (
          <X className="w-6 h-6" />
        ) : (
          <Settings className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default AdminPanel;
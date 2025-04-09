"use client"

import { motion } from "framer-motion"

interface DieProps {
  value: number
  kept: boolean
  onClick: () => void
  disabled?: boolean
  isRolling?: boolean
  isComputer?: boolean
}

// Inline SVG components for each die face with classic design
const DieFaces = {
  1: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="15" fill="white" stroke="black" strokeWidth="6"/>
      <circle cx="50" cy="50" r="8" fill="black"/>
    </svg>
  ),
  2: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="15" fill="white" stroke="black" strokeWidth="6"/>
      <circle cx="25" cy="25" r="8" fill="black"/>
      <circle cx="75" cy="75" r="8" fill="black"/>
    </svg>
  ),
  3: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="15" fill="white" stroke="black" strokeWidth="6"/>
      <circle cx="25" cy="25" r="8" fill="black"/>
      <circle cx="50" cy="50" r="8" fill="black"/>
      <circle cx="75" cy="75" r="8" fill="black"/>
    </svg>
  ),
  4: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="15" fill="white" stroke="black" strokeWidth="6"/>
      <circle cx="25" cy="25" r="8" fill="black"/>
      <circle cx="75" cy="25" r="8" fill="black"/>
      <circle cx="25" cy="75" r="8" fill="black"/>
      <circle cx="75" cy="75" r="8" fill="black"/>
    </svg>
  ),
  5: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="15" fill="white" stroke="black" strokeWidth="6"/>
      <circle cx="25" cy="25" r="8" fill="black"/>
      <circle cx="75" cy="25" r="8" fill="black"/>
      <circle cx="50" cy="50" r="8" fill="black"/>
      <circle cx="25" cy="75" r="8" fill="black"/>
      <circle cx="75" cy="75" r="8" fill="black"/>
    </svg>
  ),
  6: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="15" fill="white" stroke="black" strokeWidth="6"/>
      <circle cx="25" cy="25" r="8" fill="black"/>
      <circle cx="75" cy="25" r="8" fill="black"/>
      <circle cx="25" cy="50" r="8" fill="black"/>
      <circle cx="75" cy="50" r="8" fill="black"/>
      <circle cx="25" cy="75" r="8" fill="black"/>
      <circle cx="75" cy="75" r="8" fill="black"/>
    </svg>
  ),
}

export default function Die({ value, kept, onClick, disabled, isRolling, isComputer = false }: DieProps) {
  return (
    <motion.div
      className={`relative ${disabled ? "cursor-default" : "cursor-pointer"}`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      animate={
        isRolling
          ? {
              rotate: [0, 360, 720, 1080],
              scale: [1, 0.9, 1.1, 1],
            }
          : {}
      }
      transition={{ duration: 0.8 }}
    >
      {/* Glow effect for kept dice */}
      {kept && (
        <motion.div
          className={`absolute inset-0 rounded-xl opacity-50 blur-md ${isComputer ? "bg-red-500" : "bg-blue-500"}`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        />
      )}

      {/* Die SVG */}
      <motion.div
        className={`relative w-20 h-20 md:w-24 md:h-24 ${kept ? "z-10" : ""}`}
        animate={kept ? { y: -10 } : { y: 0 }}
      >
        <div
          className={`w-full h-full rounded-xl shadow-lg ${
            kept ? (isComputer ? "ring-4 ring-red-500" : "ring-4 ring-blue-500") : ""
          }`}
        >
          {DieFaces[value as keyof typeof DieFaces]}
        </div>
      </motion.div>

      {/* "Kept" indicator */}
      {kept && (
        <motion.div
          className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${
            isComputer ? "bg-red-500" : "bg-blue-500"
          } text-white text-xs px-2 py-0.5 rounded-full font-bold`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          KEPT
        </motion.div>
      )}
    </motion.div>
  )
}

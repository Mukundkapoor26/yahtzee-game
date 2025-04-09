'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Die } from '../../types/game'

interface DiceRollProps {
  dice: Die[]
  onDieClick?: (index: number) => void
  isRolling?: boolean
  isPlayerTurn?: boolean
}

export default function DiceRoll({ 
  dice, 
  onDieClick, 
  isRolling = false,
  isPlayerTurn = true 
}: DiceRollProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio only on client side
    audioRef.current = new Audio('/sounds/dice-roll.mp3')
    audioRef.current.preload = 'auto'
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (isRolling && audioRef.current) {
      const playSound = async () => {
        try {
          audioRef.current!.currentTime = 0
          await audioRef.current!.play()
        } catch (error) {
          console.log('Audio playback failed:', error)
        }
      }
      playSound()
    }
  }, [isRolling])

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-6 p-4">
      {dice.map((die, index) => (
        <motion.div
          key={index}
          className={cn(
            "aspect-square bg-white rounded-xl shadow-lg cursor-pointer relative",
            "hover:bg-gray-50 transition-colors duration-200",
            die.isKept && "ring-4 ring-emerald-500",
            !isPlayerTurn && "opacity-50 cursor-not-allowed"
          )}
          animate={{
            rotate: isRolling && !die.isKept ? [0, 360, 720] : 0,
            scale: isRolling && !die.isKept ? [1, 0.8, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          onClick={() => isPlayerTurn && onDieClick?.(index)}
          role="button"
          aria-label={`Die ${index + 1} showing ${die.value}`}
        >
          <div className="absolute inset-0 grid place-items-center">
            {die.value === 1 && <div className="w-3 h-3 bg-black rounded-full" />}
            {die.value === 2 && (
              <>
                <div className="absolute top-2 right-2 w-3 h-3 bg-black rounded-full" />
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-black rounded-full" />
              </>
            )}
            {die.value === 3 && (
              <>
                <div className="absolute top-2 right-2 w-3 h-3 bg-black rounded-full" />
                <div className="absolute center w-3 h-3 bg-black rounded-full" />
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-black rounded-full" />
              </>
            )}
            {die.value === 4 && (
              <>
                <div className="absolute top-2 left-2 w-3 h-3 bg-black rounded-full" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-black rounded-full" />
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-black rounded-full" />
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-black rounded-full" />
              </>
            )}
            {die.value === 5 && (
              <>
                <div className="absolute top-2 left-2 w-3 h-3 bg-black rounded-full" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-black rounded-full" />
                <div className="absolute center w-3 h-3 bg-black rounded-full" />
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-black rounded-full" />
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-black rounded-full" />
              </>
            )}
            {die.value === 6 && (
              <>
                <div className="absolute top-2 left-2 w-3 h-3 bg-black rounded-full" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-black rounded-full" />
                <div className="absolute center-left w-3 h-3 bg-black rounded-full" />
                <div className="absolute center-right w-3 h-3 bg-black rounded-full" />
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-black rounded-full" />
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-black rounded-full" />
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
} 
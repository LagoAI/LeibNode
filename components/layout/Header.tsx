'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Wallet, Github, Twitter, Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-[#1A1A1A] border-b border-gray-800 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-white">
            Lieb.AI
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/deploy" className="text-white hover:text-[#26890d]">
              DEPLOY NODES
            </Link>
            <Link href="/my-nodes" className="text-gray-400 hover:text-white">
              MY NODES
            </Link>
            <Link href="/sola" className="text-gray-400 hover:text-white">
              MY SOLA
            </Link>
            <Link href="/points" className="text-gray-400 hover:text-white">
              POINTS
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
          </div>
          
          <button className="flex items-center px-4 py-2 bg-[#26890d] hover:bg-[#1d6a0a] rounded-lg text-white">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden absolute top-[60px] left-0 right-0 bg-[#1A1A1A] border-b border-gray-800`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link href="/deploy" className="text-white hover:text-green-400">
            DEPLOY NODES
          </Link>
          <Link href="/my-nodes" className="text-gray-400 hover:text-white">
            MY NODES
          </Link>
          <Link href="/sola" className="text-gray-400 hover:text-white">
            MY SOLA
          </Link>
          <Link href="/points" className="text-gray-400 hover:text-white">
            POINTS
          </Link>
        </nav>
      </motion.div>
    </header>
  )
} 
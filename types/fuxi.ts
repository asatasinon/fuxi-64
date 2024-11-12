export interface Hexagram {
  number: number
  name: string
  nature: string
  attribute: string
  description: string
  lines: string[]
  meaning: {
    overall: string
    love: string
    career: string
    health: string
  }
} 
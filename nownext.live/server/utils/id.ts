import { customAlphabet } from 'nanoid'

export const generateId = (length: number = 16) => customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', length)()

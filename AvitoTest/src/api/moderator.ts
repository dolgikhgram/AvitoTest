import client from './client'
import type { Moderator } from '../types'

export const getModeratorInfo = (): Promise<Moderator> => {
  return client.get('/moderators/me')
}
